import {useNavigate} from "react-router-dom"

function VerificationConfirmationPage()
{
    const navigate = useNavigate();
    return (
        <div className="verification-page flex items-center justify-center h-screen">
            <div className="verification-msg-card p-6 bg-white rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-semibold">Email Verified Successfully!</h1>
                <p className="text-pink-200 mt-2">Your email has been successfully verified. You can now log in and start using your account.</p>
                <a onClick={()=>{
                    navigate("/login")
                }} className="mt-4 inline-block bg-[#c084fc] text-white px-4 py-2 rounded-md cursor-pointer">
                    Go to Login
                </a>
            </div>
        </div>

    )
}

export default VerificationConfirmationPage;