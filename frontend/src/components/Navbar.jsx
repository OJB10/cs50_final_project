import React from "react";
import "./Navbar.css"; // Import styles specific to the Navbar

import tempLogo from "../assets/images/temp_logo.png"; // Placeholder logo
import tempProfile from "../assets/images/temp_profile.png"; // Placeholder profile image

const Navbar = () => {
    return (
        <nav className="navbar full-width">
            {/* Logo */}
            <div className="navbar-logo">
                <a href="/">
                    <img
                        src={tempLogo}
                        alt="Logo"
                        className="logo-image"
                    />
                </a>
            </div>

            {/* Search Bar */}
            <div className="navbar-search">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search"
                    aria-label="Search"
                />
            </div>

            {/* Profile Image */}
            <div className="navbar-profile">
                <a href="/profile" className="profile-link">
                    <img
                        src={tempProfile}
                        alt="Profile"
                        className="profile-image"
                    />
                </a>
            </div>
        </nav>
    );
};

export default Navbar;