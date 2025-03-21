import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL+"/api"



//login a user

export const loginUser = async (userData) => {
    try {

        const response = await axios.post(`${API_URL}/login`, userData);
        return response.data

    }
    catch (error) {
        console.log("Login Error: ", error.response.data.message);
        throw error.response.data;
    }
}

export const resendVerificationEmail = async (userEmail) => {

    try{
        const response = await axios.post(`${API_URL}/resend-verification`, {userEmail});
        return response.data
    }
    catch(err)
    {
        console.log("Email resend error")
        throw err.response.data
    }
}

export const signupUser = async (userData) => {

    try {
        const response = await axios.post(`${API_URL}/signup`, userData, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        const res = {
            data : response.data,
            status: response.status,
        }

        return res

    } catch (error) {
        console.log('Signup Error: ', error.response.data)
        throw error.response.data
    }
}

export const validateUser = async (token) => {

    try {


        const response = await axios.get(`${API_URL}/authenticate`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        if(response.data.message === 'User authentication successful')
        {
            return true
        }

    }
    catch (error) {


        if (error.response.data != 'User authentication successful') {
            return false
        }
        else {
            return true
        }
    }





}
