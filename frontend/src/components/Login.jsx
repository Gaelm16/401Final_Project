import { useState, useContext } from 'react';
import {Link, Navigate} from 'react-router';
import { AuthContext } from '../UserContext';
import axios from 'axios';

const LoginForm = () => {
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassWord] = useState('');

    const {isLoggedIn, getloggedIn, user, setUser} = useContext(AuthContext);

    if (isLoggedIn) {
        return <Navigate to="/dashboard" replace />;
    }

    const login = async(e) => {
        e.preventDefault();
            try{
                let { data } = await axios.post('http://localhost:4000/login', {userEmail, password});
                setUser(data.result);
                console.log(data.result)
                console.log(data);
                getloggedIn();
    
            } catch(err){
                console.log('there is an error', err);
            }

        setUserEmail('');
        setPassWord('');
    }

    if(isLoggedIn){
        return (<Navigate to='/dashboard'/>);
    }

    return(
    <div>
        <div className='wrapper'>
            <form >
                <h1>Login</h1>
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
                        value={password}
                        placeholder='Password'
                        onChange={((e) => setPassWord(e.target.value))}
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
        </div>
    </div>
    )
};

export default LoginForm;