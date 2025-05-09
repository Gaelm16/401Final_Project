import { useState, useContext } from 'react';
import {Link, Navigate} from 'react-router';
import Navbar from './Navbar';
import { AuthContext } from '../UserContext';

const LoginForm = () => {
    const [userEmail, setUserEmail] = useState('');
    const [passWord, setPassWord] = useState('');

    const {isLoggedIn, setIsLoggedin, getloggedIn, user, setUser} = useContext(AuthContext);

    // const login = async(e) => {
    //     e.preventDefault();
    //         try{
    //             let { data } = await axios.post('http://localhost:5173/', {userEmail, passWord});
    //             setUser(data.result);
    //             getloggedIn();
    
    //         } catch(err){
    //             console.log('there is an error', err);
    //         }

    //     setUserEmail('');
    //     setpassWord('');
    
    // }

    // if(loggedIn){
    //     return (<Navigate to='/'/>);
    // }

    const login = (e) => {
        e.preventDefault();
        console.log(isLoggedIn);
        console.log(user);
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
                        value={passWord}
                        placeholder='Password'
                        onChange={((e) => setPassWord(e.target.value))}
                        />
                </div>
{/* 
                <button onClick={login}>Login</button> */}

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