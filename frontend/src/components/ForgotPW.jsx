import {React, useState} from 'react';

const ForgotPassword = () =>{
    const [userEmail, setUserEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    return(
        <div>
            <h1>Forgot PW</h1>
        </div>
    )
}

export default ForgotPassword;