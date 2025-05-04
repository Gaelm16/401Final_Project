import React, { useState, useContext } from 'react';
import { Link } from 'react-router';
import Navbar from './Navbar';
// import {AuthContext} from '../../UserContext'
import axios from 'axios';
axios.defaults.withCredentials = true;

const Register = () => {
    const [userEmail, setUserEmail] = useState('');
    const [passWord, setPassWord] = useState('');
    const [retypePassWord, setRetypePassWord] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    // const {getLoggedIn} = useContext(AuthContext)

    // const signUp = async(e) => {
    //     e.preventDefault()

    //     try{
    //         const data = {userName, passWord}
    //         await axios.post('http://localhost:4000/register', data, {credential: 'include', withCredentials: true})
    //         getLoggedIn();

    //     } catch(err) {
    //         console.log(err);
    //     }

    //     setUserEmail('');
    //     setPassWord('');
    // }

    // const isValidPassword = (password) => {
    //     const lengthCheck = /.{8,}/;
    //     const uppercaseCheck = /[A-Z]/;
    //     const lowercaseCheck = /[a-z]/;
    //     const specialCharCheck = /[!@#$%^&*(),.?":{}|<>]/;
      
    //     return (
    //       lengthCheck.test(password) &&
    //       uppercaseCheck.test(password) &&
    //       lowercaseCheck.test(password) &&
    //       specialCharCheck.test(password)
    //     );
    //   };


    // Function to check whether a new user's password meets the requirements
    const validatePassword = (e) => {
        e.preventDefault();
    
        if (passWord.length < 8) {
            validationErrors.push("Password must be at least 8 characters long.");
        }
        if (!/[A-Z]/.test(passWord)) {
            validationErrors.push("Password must contain at least one uppercase letter.");
        }
        if (!/[a-z]/.test(passWord)) {
            validationErrors.push("Password must contain at least one lowercase letter.");
        }
        if (!/[!@#$%^&*(),.?\":{}|<>]/.test(passWord)) {
            validationErrors.push("Password must contain at least one special character.");
        }
        if (!/[0-9]/.test(passWord)) {
            validationErrors.push("Password must contain at least one number (0-9).");
        }
        if(passWord != retypePassWord){
            validationErrors.push("Password does not match retyped password");
        }
        
        console.log(validationErrors);
        setValidationErrors([]);
        return;
      };
    
  return (
     <div>
        <div className='wrapper'>
            <form >
                <h1>Sign Up</h1>
                <div className='input-box'>
                        <input 
                        type='text'
                        className='form-input'
                        value={userEmail}
                        placeholder='Email'
                        onChange={((e) => setUserEmail(e.target.value))}
                        />
                </div>
                <div className='input-box'>
                        <input 
                        type='text'
                        className='form-input'
                        value={passWord}
                        placeholder='Password'
                        onChange={((e) => setPassWord(e.target.value))}
                        />
                </div>
                <div className='input-box'>
                        <input 
                        type='text'
                        className='form-input'
                        value={retypePassWord}
                        placeholder='Retype Password'
                        onChange={((e) => setRetypePassWord(e.target.value))}
                        />
                </div>

                <button onClick={validatePassword}>Sign Up</button>

                <div className='ex-links'>
                     <p>Already have an account? <Link to='/login'>Here</Link></p>
                </div>
            </form>

            {showModal && (
                <div className="modal">
                <div className="modal-content">
                    <h3>Password Requirements Not Met</h3>
                    <ul>
                    {validationErrors.map((err, index) => (
                        <li key={index}>{err}</li>
                    ))}
                    </ul>
                    <button onClick={() => setShowModal(false)}>Close</button>
                </div>
                </div>
            )}
        </div>  
    </div>
  )
}

export default Register;