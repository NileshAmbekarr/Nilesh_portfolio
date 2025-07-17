import React, { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar() {
    const [navbarVisible, setNavbarVisible] = useState(false);

    useEffect(() => {
        // Animation effect - similar to dynamic island
        setTimeout(() => {
            setNavbarVisible(true);
        }, 500);
    }, []);

    return (
        <div className={`navbar ${navbarVisible ? 'visible' : ''}`}>
            <div className="navbar-left">
                <div className="logo">Nilesh</div>
            </div>
            
            <div className="navbar-right">
                <ul className="nav-links">
                    <li><a href="#about">About</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#skills">Skills</a></li>
                </ul>
                <button className="contact-btn">Contact</button>
                <div className="notification-dot"></div>
            </div>
        </div>
    );
}

export default Navbar;
