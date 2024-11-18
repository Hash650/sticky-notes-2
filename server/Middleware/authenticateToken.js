import jwt from 'jsonwebtoken'

const authenticateToken = (req, res, next) => {
    console.log('trying to authenticate token')
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log('Token verification failed:', err.message);
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ message: 'Token has expired' });
            } else {
                return res.status(403).json({ message: 'Invalid token' });
            }
        }
        req.user = user

        next();
    })
}

export default authenticateToken;