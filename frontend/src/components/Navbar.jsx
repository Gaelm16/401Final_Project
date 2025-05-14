import React, {useContext} from 'react'
// import '../index.css'
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../UserContext';

const Navbar = () => {

    const {isLoggedIn, logOut} = useContext(AuthContext);

    return (
    
        <nav>
           <Link to='/' className='title'> Forensic Audit System</Link>
                {isLoggedIn === false && (
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
                {isLoggedIn === true && (
                    <ul> 
                        {/* <li>
                            <button onClick={() => logOut()}>Logout</button>
                        </li> */}
                    </ul>
                 )}
        </nav>
    )
}

export default Navbar