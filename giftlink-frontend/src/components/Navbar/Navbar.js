import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold" to="/">GiftLink</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-collapse navbar-nav me-auto mb-2 mb-lg-0">
                        {/* Task 1: Add structural anchor text links pointing to Home page and MainPage */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/home.html">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Gifts</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
