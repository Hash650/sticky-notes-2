import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import authenticateToken from './Middleware/authenticateToken.js';
import crypto from "node:crypto";
import nodemailer from "nodemailer";



dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());


app.get('/api/notes', authenticateToken, async (req, res) => {

    const userId = req.user.id;
    try {
        const q = await pool.query('SELECT * FROM notes WHERE user_id = $1', [userId])

        if (q.rows.length > 0) {

            const notes = q.rows

            res.json(notes)
        }
        else {
            res.json([])
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

app.get('/api/events', authenticateToken, async (req, res) => {
    const userId = req.user.id
    try {
        const q = await pool.query('SELECT * FROM events WHERE user_id = $1 AND event_date >= NOW() ORDER BY event_date ASC', [userId])

        if (q.rows.length > 0) {
            const events = q.rows

            res.json(events)
        }
        else {
            res.json([])
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }

})


app.get('/api/authenticate', authenticateToken, async (req, res) => {

    res.status(200).json({ message: 'User authentication successful' })
})

app.post("/api/login", async (req, res) => {

    const { email, password } = req.body;

    try {

        const q = await pool.query('SELECT * FROM users WHERE email = $1', [email])

        if (q.rows.length > 0) {
            const isPasswordValid = await bcrypt.compare(password, q.rows[0].pass)
            const { is_verified } = q.rows[0]

            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid password or username' })
            }
            
            const token = jwt.sign({ id: q.rows[0].id, username: q.rows[0].username }, process.env.JWT_SECRET, { expiresIn: '7h' })
            if (!is_verified) {
                return res.status(400).json({
                    message: 'Please verify your email before logging in'
                })
            }

            const username = q.rows[0].username
            console.log('User logged in successfully')
            res.json({ token, username })

        }
        else {
            res.status(404).json({ message: 'User not found' })
        }
    }
    catch (err) {
        console.error('Error finding user:', err);
        res.status(500).json({ error: 'Database failed query' })
    }

})

app.post("/api/resend-verification", async (req, res) => {

    const email = req.body.userEmail
    // console.log(req.body)

    const verificationString = crypto.randomBytes(32).toString("hex"); // Generate verification string
    const q = await pool.query("UPDATE users SET verification_token = $1 WHERE email = $2", [verificationString, email])
    const verificationLink = `${process.env.SERVER_URL}/verify?token=${verificationString}`
    await sendVerificationEmail(email, verificationLink)

    res.status(202).json({ message: 'resent verification email' })
    // console.log('user created, verification email sent');
})



app.post("/api/signup", async (req, res) => {

    const { hash } = bcrypt;
    const { username, email, password, repassword } = req.body

    if (!username || !email || !password || !repassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }


    if (password !== repassword) {
        return res.status(400).json({ message: 'Passwords do not match' })
    }

    if (password.length < 8) {

        return res.status(400).json({ message: 'Password must be at least 8 characters long' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' })
    }

    try {
        // first we check whether if email already exists in our db
        const q = await pool.query('SELECT * FROM users WHERE email = $1 or username = $2', [email, username])

        if (q.rows.length != 0) {

            const { is_verified } = q.rows[0]

            if (is_verified) // if user is already verified then we just let them know an account already exists
            {
                return res.status(400).json({ message: 'Email or Username already in use' })
            }
            else {
                return res.status(401).json({ message: 'Email verification required' })
            }

        }

        // if password is valid and email doesnt exist in db 

        const hashedPassword = await bcrypt.hash(password, 5);
        const verificationString = crypto.randomBytes(32).toString("hex"); // Generate verification string

        const q2 = await pool.query(
            "INSERT INTO users (username, email, pass, is_verified, verification_token) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [username, email, hashedPassword, false, verificationString]
        );

        const verificationLink = `${process.env.SERVER_URL}/verify?token=${verificationString}`
        await sendVerificationEmail(email, verificationLink)

        console.log('user created, verification email sent');

        const token = jwt.sign({ id: q2.rows[0].id, username: q2.rows[0].username }, process.env.JWT_SECRET, { expiresIn: '1h' }) // change hard coded token
        res.json({ token, username })

    } catch (error) {
        console.error('Signup error: ', error)
        res.status(500).json({ message: 'An error occured during signup' })
    }

    return res.status(200)
})


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SERVER_EMAIL,
        pass: process.env.APP_PASSWORD,
    },
})

async function sendVerificationEmail(email, verificationLink) {
    const mailOptions = {
        from: process.env.SERVER_EMAIL,
        to: email,
        subject: "Verify your email",
        html: `
            <h2>Email Verification</h2>
            <p>Please click the link below to verify your email:</p>
            <a href="${verificationLink}">${verificationLink}</a>
        `,
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to ${email}`);
    } catch (error) {
        console.error("Error sending verification email:", error);
    }

}



app.get("/verify", async (req, res) => {

    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ message: "Invalid verification link" });
    }

    try {
        const q = await pool.query("SELECT * FROM users WHERE verification_token = $1", [token]);

        if (q.rows.length === 0) {
            return res.status(400).json({ message: "Invalid or expired verification token" });
        }

        await pool.query(
            "UPDATE users SET is_verified = true, verification_token = NULL WHERE verification_token = $1",
            [token]
        );

        res.redirect(`${process.env.CLIENT_URL}/verification-success`);
    } catch (error) {
        console.error("Verification error:", error);
        res.status(500).json({ message: "Error verifying email" });
    }
})







app.put("/api/notes/:noteId", async (req, res) => {
    const { noteId } = req.params;
    const { field, value } = req.body

    try {
        const q = await pool.query(`UPDATE notes SET ${field} = $1 WHERE id = $2 RETURNING *`, [JSON.stringify(value), noteId])

        res.json(q.rows[0])
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Failed to update note' })
    }

})

app.post('/api/notes/create', authenticateToken, async (req, res) => {


    const userId = req.user.id;
    const { payload } = req.body

    const { position, colors } = payload
    const defaultTitle = 'Note Title'
    const defaultBody = ''

    // console.log(position, colors, userId)

    try {
        const q = await pool.query('INSERT INTO notes (title, content, colors, position, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [JSON.stringify(defaultTitle), JSON.stringify(defaultBody), JSON.stringify(colors), JSON.stringify(position), userId])

        const newNote = q.rows[0];

        res.json(newNote)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to create new note' })
    }

})


app.post('/api/events/create', authenticateToken, async (req, res) => {
    const userId = req.user.id
    const { event } = req.body

    const { title, description, date } = event

    try {
        const q = await pool.query('INSERT INTO events (user_id, title, event_date, description) VALUES ($1,$2, $3, $4) RETURNING *',
            [userId, title, date, description]
        )

        const newEvent = q.rows[0]

        res.json(newEvent)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to create new event' })
    }

})




app.delete('/api/events/delete/:eventId', async (req, res) => {
    const { eventId } = req.params;

    try {
        const q = await pool.query('DELETE from events WHERE id = $1 RETURNING *', [eventId])

        res.json(q.rows[0])
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to delete event' })
    }
})



app.delete('/api/notes/:noteId', async (req, res) => {
    const { noteId } = req.params;

    try {
        const q = await pool.query('DELETE FROM notes WHERE id = $1 RETURNING *', [noteId])

        res.json(q.rows[0])
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Failed to delete note' })
    }
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})




