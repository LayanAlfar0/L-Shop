import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import './Navbar.css'
import logo from '../../img/logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../Contex/User';
import { MdLogout } from "react-icons/md";


export default function Navbar() {
    const { userName, setUserName, setUserToken } = useContext(UserContext);
    const navigate = useNavigate();
    const signOut = () => {
        localStorage.removeItem('userToken');
        setUserName(null);
        setUserToken(null);
        navigate('/signin');
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary main-navbar">
            <div className="container-fluid">
                <div className="navbar navbar-light bg-light logoClass">
                    <img src={logo} alt="Logo" width="40 px" height="40 px" className="d-inline-block align-top" />
                    <Link className="navbar-brand" to="/">
                        L-Shop
                    </Link>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to='Categories'>Categories</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='Products'>Products</NavLink>
                        </li>
                        {userName ? <>
                            <li className="nav-item">
                                <NavLink className="nav-link" to='Cart'>Cart</NavLink>
                            </li></> : null}
                    </ul>
                    {userName ? <>
                        {/* <li className="nav-item">
                                <NavLink className="nav-link" to='Cart'>Cart</NavLink>
                            </li> */}
                        <form className="d-flex auth " role="search">
                            <button className='nav-link btn' onClick={signOut}><MdLogout /></button>
                        </form>
                    </> : <form className="d-flex auth " role="search">
                        <NavLink className="nav-link btn" to='signin'>SignIn</NavLink>
                        <NavLink className="nav-link btn" to='signup'>SignUp</NavLink>
                    </form>}

                </div>
            </div>
        </nav>
    )
}
