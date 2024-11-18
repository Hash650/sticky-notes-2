import axios from "axios";

const API_URL = "http://localhost:3000/api"


//login a user

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        return response.data
    }
    catch (error) {
        console.log("Login Error: ", error.response.data);
        throw error.response.data;
    }
}

export const signupUser = async (userData) => {

    try {
        const response = await axios.post(`${API_URL}/signup`, userData, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        return response.data

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