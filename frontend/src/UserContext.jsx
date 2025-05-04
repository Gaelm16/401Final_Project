import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export const AuthContext = createContext();

const UserContext = ({children}) => {
    const [loggedIn, setloggedIn] = useState(true);
    const [user, setUser] = useState();
    
    let navigate = useNavigate();

    const getloggedIn = async () => {
        const loggedInResponse = await axios.get('http://localhost:4000/loggedIn');
        setloggedIn(loggedInResponse.data);
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
        <AuthContext.Provider value={{loggedIn, setloggedIn, user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default UserContext