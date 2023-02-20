import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {

    let [authToken, setAuthToken] = useState(localStorage.getItem("authToken") ? JSON.parse(localStorage.getItem("authToken")) : null);
    let [user, setUser] = useState(localStorage.getItem("authToken") ? jwt_decode(localStorage.getItem("authToken")) : null);

    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();

        let response = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 'username': e.target.username.value, 'password': e.target.password.value }),
        });

        let data = await response.json();

        if (response.status === 200) {
            setAuthToken(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem("authToken", JSON.stringify(data));
            navigate("/");

        } else {
            alert("Invalid Credentials");
        }
    }

    let logoutUser = () => {
        setAuthToken(null);
        setUser(null);
        localStorage.removeItem("authToken");
        navigate("/login");
    }

    let contextData = {
        user: user,
        logoutUser: logoutUser,
        loginUser: loginUser,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}
