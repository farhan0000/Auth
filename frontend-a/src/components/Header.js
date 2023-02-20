import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import AuthContext from '../context/AuthContext'

const Header = () => {
    const { user, logoutUser } = useContext(AuthContext)
    return (
        <div>
            <Link to="/">Home</Link>
            <span> | </span>
            {user ?
                <p onClick={logoutUser}>Logout</p>
                :
                <Link to="/login">Login</Link>
            }

            {user && <p>{user.username}</p>}
        </div>
    )
}

export default Header