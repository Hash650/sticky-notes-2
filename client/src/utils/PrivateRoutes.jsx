import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useContext, useLocation } from "react";

const PrivateRoute = ({ children }) => {

    const { isAuthenticated } = useContext(AuthContext)
    const location = useLocation()

    console.log(location.pathname);
    if (location.pathname === '/verification-success') {
        return children; // Allow access to /verification-success without auth
    }
    // console.log(isAuthenticated)
    return isAuthenticated ? children : <Navigate to='/login' />
};

export default PrivateRoute;
