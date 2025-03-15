import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useContext } from "react";

const PrivateRoute = ({ children }) => {

    const { isAuthenticated } = useContext(AuthContext)
    console.log(isAuthenticated)
    return isAuthenticated ? children : <Navigate to='/login' />
};

export default PrivateRoute;