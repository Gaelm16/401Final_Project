import React, {useContext} from 'react'
// import '../index.css'
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../UserContext';

const Navbar = () => {

    const {loggedIn, logOut} = useContext(AuthContext);

    return (
        <nav >
           <Link to='/' className='title'> Forensic Audit System</Link>
           <ul>
                <li>
                    <Link to='/login'>
                        Login
                    </Link>
                </li>
                <li>
                    <Link to='/register' >
                        Register
                    </Link>
                </li>
                {loggedIn === false && (
                    <ul>
                        <li>
                            <Link to='/login' >
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to='/register'>
                                Register
                            </Link>
                        </li>
                    </ul>
                )}
                {loggedIn === true && (
                    <ul> 
                        <li>
                            <button className='links-btn' onClick={() => logOut()}>Log Out</button>
                        </li>
                    </ul>
                 )}
            </ul>
        </nav>
    )
}

export default Navbar