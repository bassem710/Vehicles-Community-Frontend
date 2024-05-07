import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import gif from "../assets/car-gif-png-1.gif"

import '../index.css';

const Nav = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [logged, setLogged] = useState(localStorage.getItem("user"));

    const handleLogout = () => {
        if(logged) {
            localStorage.removeItem("user");
            setLogged(false);
        }
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Vehicles Community <img src={gif} width="100px" alt="" height="40px"/></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav m-auto mb-2 mb-md-0">
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/home">Home</Link>
                    </li>
                    {
                        logged && user.role === "user" &&
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/favorites">Favorites</Link>
                        </li>
                    }
                    {
                        logged && user.role === "user" &&
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/book-appointment">Book Appointment</Link>
                        </li>
                    }
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/events">Events</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/news">News</Link>
                    </li>
                    {
                        logged && user.role === "admin" &&
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/appointments">Appointments</Link>
                        </li>
                    }
                    {
                        logged && user.role === "admin" &&
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/admin">Admin Panel</Link>
                        </li>
                    }
                </ul>
                <form className="d-flex align-items-center" role="search">
                    {logged && <span className='fw-light me-2'>Welcome, {user.firstName}</span>}
                    <Link className="btn btn-outline-success mx-2" onClick={handleLogout} to="/login">{logged ? "Logout" : "Login"}</Link>
                </form>
                </div>
            </div>
        </nav>
    )
}

export default Nav