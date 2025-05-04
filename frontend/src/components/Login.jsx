import { useState } from 'react';
import {Link, Navigate} from 'react-router';
import Navbar from './Navbar';

const LoginForm = () => {
    const [userName, setuserName] = useState('');
    const [passWord, setpassWord] = useState('');

    const login = () => {

    }

    return(
    <div>
        {/* <Navbar/> */}
        <div className='wrapper'>
            <form >
                <h1>Login</h1>
                <div className='input-box'>
                        <input 
                        type='text'
                        className='form-input'
                        value={userName}
                        placeholder='Email'
                        onChange={((e) => setuserName(e.target.value))}
                        />
                </div>
                <div className='input-box'>
                        <input 
                        type='text'
                        className='form-input'
                        value={passWord}
                        placeholder='Password'
                        onChange={((e) => setpassWord(e.target.value))}
                        />
                </div>

                <button onClick={login}>Login</button>

                <div className='ex-links'>
                     <p>Don't have an account sign up? <Link to='/register'>Here</Link></p>
                </div>
                <div className='ex-links'>
                    <p>Forgot Password<Link to='/forgotpassword'>Forgot Password</Link></p>
                </div>
                </form>

                {/* <div className='register-link'>
                    <p>Don't have an account sign up? <Link to='/register' className='links-btn'>Here</Link></p>
                </div> */}
        </div>
    </div>
    )
};

export default LoginForm;