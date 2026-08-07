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

        <header className="guest-navbar">

            <div className="guest-navbar-content">

                <NavLogo />

                <NavSearch placeholder="Search jobs..." />

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
                        About
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