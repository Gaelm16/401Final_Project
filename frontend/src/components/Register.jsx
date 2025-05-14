import React, { useState, useContext } from 'react';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import { AuthContext } from '../UserContext';
import axios from 'axios';
axios.defaults.withCredentials = true;

const Register = () => {
    const [userEmail, setUserEmail] = useState('');
    const [passWord, setPassWord] = useState('');
    const [retypePassWord, setRetypePassWord] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [successfulRegisterModal, setSuccessfulRegisterModal] = useState(false);
    let navigate = useNavigate();

    const { isLoggedIn } = useContext(AuthContext);

    if (isLoggedIn) {
        return <Navigate to="/dashboard" replace />;
    }

    const signUp = async (e) => {
        e.preventDefault();
    
        const validationErrors = [];
    
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
        if (passWord !== retypePassWord) {
            validationErrors.push("Password does not match retyped password.");
        }
    
        if (validationErrors.length > 0) {
            setValidationErrors(validationErrors); // Assuming you have this state set
            setShowModal(true); // Show modal or some error UI
            return;
        }
    
        try {
            const data = { userEmail, passWord };
            await axios.post('http://localhost:4000/signup', data, {
                credential: 'include', // fix: `credentials`, not `credential`
                withCredentials: true
            });

            setSuccessfulRegisterModal(true);
            setTimeout(() => setSuccessfulRegisterModal(false), 2000);
            navigate('/login');

            console.log('Sign-up successful');
        } catch (err) {
            console.log(err);
        }
    
        setUserEmail('');
        setPassWord('');
        setRetypePassWord('');
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

                <button onClick={signUp}>Sign Up</button>

                <div className='ex-links'>
                     <p>Already have an account? <Link to='/login'>Here</Link></p>
                </div>
            </form>

            {/* Modal to report password validation errors */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                    <ul>
                        {validationErrors.length > 0 ? (
                            <>
                            {validationErrors.map((err, index) => (
                                <li className='list' key={index}>{err}</li>
                            ))}
                            </>
                        ) : (
                            <p>No errors — this shouldn't show.</p>
                        )}
                    </ul>
                        <button className='button' onClick={() => {
                            setShowModal(false) 
                            setValidationErrors([])} 
                        }>Close</button>
                    </div>
                </div>
            )}
            {successfulRegisterModal && (
                <div className="success-modal">
                    Successfully Registered!
                </div>
            )}
        </div>  
    </div>
  )
}

export default Register;