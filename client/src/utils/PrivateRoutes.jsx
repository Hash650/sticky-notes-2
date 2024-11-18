import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useContext } from "react";

const PrivateRoute = ({children}) => {

    const {isAuthenticated} = useContext(AuthContext)
    // localStorage.removeItem('token')
    // localStorage.removeItem('username')
    return isAuthenticated ? children : <Navigate to='/login'/>
};

export default PrivateRoute;