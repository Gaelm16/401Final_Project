import React, {useContext} from "react";
import {AuthContext} from "../UserContext";
import { Navigate } from "react-router";

const DashBoard = () => {
    const {logOut, isLoggedIn, user} = useContext(AuthContext);

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return(
        <div className='dash'>
            <h3>Welcome to your dashboard This is the page once you have successfully logged in</h3>
            {/* <h3>Welcome to your dashboard {user.userEmail}!This is the page once you have successfully logged in</h3> */}
            <button onClick={logOut}>Log out</button>
        </div>
    )
}

export default DashBoard;