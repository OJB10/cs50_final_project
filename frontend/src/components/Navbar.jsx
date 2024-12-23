import React from "react";
import "./Navbar.css";
import tempLogo from '../assets/images/temp_logo.png';
import tempProfile from '../assets/images/temp_profile.png';

const Navbar = () => {
    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="navbar-logo">
                <a href="/">
                    <img src={tempLogo} alt="Logo" className="logo-image" />
                </a>
            </div>

            {/* Search Bar */}
            <div className="navbar-search">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search"
                />
                <button className="search-button">
                    <span className="search-icon"></span>
                </button>
            </div>

            {/* Profile Circle */}
            <div className="navbar-profile">
                <div className="profile-circle">
                    <img src={tempProfile} alt="Profile" className="profile-image" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;