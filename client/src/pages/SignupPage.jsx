import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function SignupPage() {

    const {isAuthenticated,signup} = useContext(AuthContext)
    const navigate = useNavigate();
    const [formData, setFormData] = useState(
        { username: '', email: '', password: '', repassword: '' }
    )
    const [error, setError] = useState();

    useEffect(() => {
        if(isAuthenticated)
        {
            navigate('/')
        }
    },[])

    const signinRedirect = (e) => {
        e.preventDefault();
        navigate('/login')
    }


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signup(formData)

            console.log('signup successful')
        }
        catch(error) {
            // console.log(error)
            setError(error.message)
        }
    }


    return (
        <div className="signup-page">
            <form onSubmit={handleSubmit}>
                <div className="signup-box w-96 rounded-md p-4">
                    <h1 className="box-title">Signup</h1>
                    <label htmlFor="username" className="input input-bordered flex items-center gap-2">

                        <svg
                            fill="currentColor"
                            width="800px"
                            height="800px"
                            className="h-5 w-5 opacity-70"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M12,1a11,11,0,0,0,0,22,1,1,0,0,0,0-2,9,9,0,1,1,9-9v2.857a1.857,1.857,0,0,1-3.714,0V7.714a1,1,0,1,0-2,0v.179A5.234,5.234,0,0,0,12,6.714a5.286,5.286,0,1,0,3.465,9.245A3.847,3.847,0,0,0,23,14.857V12A11.013,11.013,0,0,0,12,1Zm0,14.286A3.286,3.286,0,1,1,15.286,12,3.29,3.29,0,0,1,12,15.286Z" />
                        </svg>
                        <input onChange={handleChange} type="text" name="username" id="" placeholder="Enter username" className="grow input-field" autoComplete="false" />
                    </label>


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
                        <input onChange={handleChange} type="email" name="email" id="" placeholder="Email" className="grow input-field" />
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
                        <input onChange={handleChange} type="password" name="password" id="" className="grow input-field" placeholder="Enter password" />
                    </label>

                    <label htmlFor="repassword" className="input input-bordered  flex items-center gap-2">
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
                        <input onChange={handleChange} type="password" name="repassword" id="" className="grow input-field" placeholder="Re-enter password" />
                    </label>





                    <button className="btn btn-signup">Sign Up</button>
                    <div className="signup-redirect-text">
                        <p>Already have an account? <a href="" onClick={signinRedirect} className="signin-btn">sign in</a></p>
                        {error && <p className="error-message">{error}</p>}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignupPage;