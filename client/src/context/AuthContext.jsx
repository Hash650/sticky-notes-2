import { createContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, signupUser, validateUser } from "../api/auth";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        checkAuthentication()
    }, [])

    const login = async (formData) => {

        setLoading(true)
        try {
            const response = await loginUser(formData)
            localStorage.setItem('token', response.token)
            localStorage.setItem('username', response.username)
            setIsAuthenticated(true)
            setUser(response.username)
            navigate('/')

        }
        catch (error) {
            console.error('Login Failed:', error)
            setLoading(false)
            throw error
        }
        setLoading(false)
    }

    const checkAuthentication = async () => {


        setLoading(true)
        const token = localStorage.getItem('token')
        const username = localStorage.getItem('username')

        if (token && username) {

            const isValidated = await validateUser(token)


            if(isValidated)
            {

                console.log('authentication successful')
                setUser(username)
                setIsAuthenticated(true)
            }
            else{

                console.log('authentication failure')
                logout()

            }
            
        }
        else{

            console.log('authentication failure')
            logout()
        }

        setLoading(false)
    }

    const signup = async (formData) => {

        // setLoading(true)
        try {
            const response = await signupUser(formData)
            localStorage.setItem('token', response.token)
            localStorage.setItem('username', response.username)

            setIsAuthenticated(true)
            setUser(response.username)
            navigate('/')
            // setLoading(false)
            return response.username
        }
        catch (error) {
            console.error('Signup failed', error)
            // setLoading(false)
            throw error
        }
    }


    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('shownWelcomeMsg')
        setIsAuthenticated(false)
        setUser(null)
        navigate('/login')
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout}}>
            {
                loading? (
                    <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh'
                    }}
                    >
                    <l-helix
                        color={'rgba(206, 144, 225, 0.851)'}
                        size={100}
                        speed={2}
                        >

                    </l-helix>
                    </div>
                ):(children)
            }

        </AuthContext.Provider>
    )

}