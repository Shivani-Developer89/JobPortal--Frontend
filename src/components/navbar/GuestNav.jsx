import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

import {
    FaHome,
    FaBriefcase,
    FaBuilding,
    FaInfoCircle
} from "react-icons/fa";

import NavLogo from "./NavLogo";
import NavSearch from "./NavSearch";

function GuestNav() {

    return (

        <header className="navbar">

            {/* Top Row */}

            <div className="navbar-top">

               <div className="left-section">
        <NavLogo />
        <NavSearch placeholder="Search jobs..." />
    </div>

            </div>

            {/* Bottom Row */}

            <div className="navbar-bottom">

                <nav className="nav-links">

                    <NavLink to="/">
                        <FaHome />
                        Home
                    </NavLink>

                    <NavLink to="/jobs">
                        <FaBriefcase />
                        Jobs
                    </NavLink>

                    <NavLink to="/companies">
                        <FaBuilding />
                        Companies
                    </NavLink>

                    <NavLink to="/about">
                        <FaInfoCircle />
                        About Us
                    </NavLink>

                </nav>

                <div className="guest-actions">

                    <Link
                        to="/login"
                        className="login-btn"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="register-btn"
                    >
                        Register
                    </Link>

                </div>

            </div>

        </header>

    );

}

export default GuestNav;