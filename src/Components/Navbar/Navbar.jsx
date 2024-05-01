import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import './Navbar.css'
import logo from '../../img/logo.png'

import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">

                <div className="navbar navbar-light bg-light logoClass">
                    <img src={logo} alt="Logo" width="50 px" height="50 px" className="d-inline-block align-top" />
                    <a className="navbar-brand" href="#">
                        L-Shop
                    </a>
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
                        <li className="nav-item">
                            <NavLink className="nav-link" to='Cart#'>Cart</NavLink>
                        </li>
                    </ul>
                    <form className="d-flex test" role="search">
                        <button className="btn btn-outline-success" type="submit">SignIn</button>
                        <button className="btn btn-outline-success" type="submit">SignUp</button>
                    </form>
                </div>
            </div>
        </nav>

    )
}
