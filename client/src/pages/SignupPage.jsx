import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Slide, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function SignupPage() {
    const { isAuthenticated, signup } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', email: '', password: '', repassword: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated, navigate]);

    const signinRedirect = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    const showVerificationPopup = (username) => {
        toast(`Hi ${username}, please check your inbox to verify your email.`, {
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
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            setLoading(true)
            const response = await signup(formData);

            setLoading(false)

            showVerificationPopup(formData.username)

            // navigate('/')

            // if (response.requiresVerification) {
            //     showVerificationPopup(formData.username);
            // } else {
            //     navigate('/');
            // }
        } catch (error) {
            setError(error.message);
            setLoading(false)
        }
    };

    return (
        <div className="signup-page">
            <form onSubmit={handleSubmit}>
                <div className="signup-box w-96 rounded-md p-4">
                    <h1 className="box-title">Signup</h1>
                    <label htmlFor="username" className="input input-bordered flex items-center gap-2">
                        <input onChange={handleChange} type="text" name="username" placeholder="Enter username" className="grow input-field" autoComplete="off" />
                    </label>

                    <label htmlFor="email" className="input input-bordered flex items-center gap-2">
                        <input onChange={handleChange} type="email" name="email" placeholder="Email" className="grow input-field" />
                    </label>

                    <label htmlFor="password" className="input input-bordered flex items-center gap-2">
                        <input onChange={handleChange} type="password" name="password" className="grow input-field" placeholder="Enter password" />
                    </label>

                    <label htmlFor="repassword" className="input input-bordered flex items-center gap-2">
                        <input onChange={handleChange} type="password" name="repassword" className="grow input-field" placeholder="Re-enter password" />
                    </label>

                    {loading ?

                        <button className="btn btn-signup">
                            <l-helix
                                color={'rgba(206, 144, 225, 0.851)'}
                                size={30}
                                speed={2}
                            >

                            </l-helix>
                        </button>
                        : <button className="btn btn-signup">Sign Up</button>}
                    <div className="signup-redirect-text">
                        <p>Already have an account? <a href="" onClick={signinRedirect} className="signin-btn">sign in</a></p>
                        {error && <p className="error-message">{error}</p>}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SignupPage;
