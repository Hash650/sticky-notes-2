import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { resendVerificationEmail } from "../api/auth";
import { Slide, toast } from "react-toastify";

function LoginPage() {

    const { isAuthenticated, login } = useContext(AuthContext)
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [error, setError] = useState();
    const [emailNotVerified, setEmailNotVerified] = useState(false);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {

        if (isAuthenticated) {
            navigate('/')
        }
    }, [])

    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const showVerificationPopup = () => {
        toast(`Resent verification request, please check your inbox to verify your email.`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "dark",
                    transition: Slide,
                    style: {
                        backgroundColor: 'rgb(18, 18, 18)',
                        color: 'rgba(206, 144, 225, 0.851)',
                        border: '2px solid pink'
                    },
                });
    }


    const handleResend = async () => {

        const email = formData.email;
        if(email== '') // email field is empty when user asks for a new verification email
        {
            setError("Email field empty")
        }
        else
        {
            try
            {
                const res = await resendVerificationEmail(email)
                console.log(res.message)
                setEmailNotVerified(false) // hide the resend button
                setError(null)
                showVerificationPopup()
            }
            catch(err) 
            {
                setError('Error sending verification email')
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await login(formData)
            setLoading(false)
            console.log(response)
        }
        catch (err) {
            
            setError(err.message);

            if(err.message == "Please verify your email before logging in")
            {
                setEmailNotVerified(true);
            }
            setLoading(false)
        }
    }

    const signupRedirect = (e) => {
        e.preventDefault();
        navigate('/signup')
    }


    return (
        <div className="login-page">

            <div className="welcome-box w-96">
                <div>
                    <h2>Welcome to StickyNotes!</h2>
                </div>
                <div>
                    <p>Unleash your productivity with our dynamic sticky notes—drag, resize, and color-code your thoughts effortlessly. Stay on top of your tasks with event scheduling and never miss an important date. Organize, plan, and boost your workflow—all in one place! 💡🎯</p>
                </div>
            </div>

            {/* form has the handleSubmit method */}
            <form action="" method="post" onSubmit={handleSubmit} >

                <div className="login-box w-96 bg-accent rounded-md p-4">

                    <h1 className="box-title">Login</h1>
                    <label htmlFor="email" className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-5 w-5 opacity-70">
                            <path
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path
                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input onChange={handleChange} type="email" name="email" id="" placeholder="Email" className="grow input-field" value={formData.email} />
                    </label>

                    <label htmlFor="password" className="input input-bordered  flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd" />
                        </svg>
                        <input onChange={handleChange} type="password" name="password" id="" className="grow input-field" placeholder="Enter password" value={formData.password} />
                    </label>
                    {
                        loading ?
                            <button className="btn btn-login">
                                <l-helix
                                    color={'rgba(206, 144, 225, 0.851)'}
                                    size={30}
                                    speed={2}
                                >
                                </l-helix>
                            </button>
                            : <button className="btn btn-login">Sign in</button>
                    }
                    <div className="signup-redirect-text">
                        <p>Dont have an account? <a href="" className="signup-btn" onClick={signupRedirect}>sign up</a></p>
                        {error && <p className="error-message">{error}</p>}
                        {emailNotVerified && <p><a onClick={handleResend} className="underline text-[#ce90e1] cursor-pointer">Resend</a> verification email?</p>}
                    </div>
                </div>
            </form>
        </div >
    )
}

export default LoginPage;