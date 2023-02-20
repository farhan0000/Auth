import { useContext } from "react";
import { Navigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
        <div {...rest}>{!user ? <Navigate to="/login" /> : children}</div>
    )
};

export default PrivateRoute; 