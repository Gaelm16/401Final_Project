import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export const AuthContext = createContext();

const UserContext = ({children}) => {
    const [isLoggedIn, setIsloggedIn] = useState(false);
    const [user, setUser] = useState(null);
    
    let navigate = useNavigate();

    const getloggedIn = async () => {
        const loggedInResponse = await axios.get('http://localhost:4000/loggedIn');
        setIsloggedIn(loggedInResponse.data);
    }

    const logOut = async() => {
        await axios.get('http://localhost:4000/logout');
        await getloggedIn();
        navigate('/');
    }

    useEffect(() => {
        getloggedIn()
    },[])
    
    return (
        <AuthContext.Provider value={{isLoggedIn, setIsloggedIn, user, setUser, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export default UserContext