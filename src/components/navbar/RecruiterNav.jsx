import { NavLink } from "react-router-dom";
import "./Navbar.css";

import {
    FaHome,
    FaBriefcase,
    FaTachometerAlt
} from "react-icons/fa";

import NavLogo from "./NavLogo";
import NavSearch from "./NavSearch";
import UserMenu from "./UserMenu";

function RecruiterNav() {

    return (
        <header className="candidate-navbar">

            <div className="candidate-navbar-content">

                <div className="nav-left">
                    <NavLogo />
                    <NavSearch />
                </div>

                <nav className="nav-center">

                    <NavLink to="/">
                        <FaHome />
                        Home
                    </NavLink>

                    <NavLink to="/recruiterDashboard">
                        <FaTachometerAlt />
                        Dashboard
                    </NavLink>

                    <NavLink to="/recruiter/jobs">
                        <FaBriefcase />
                        My Jobs
                    </NavLink>

                </nav>

                <div className="nav-right">
                    <UserMenu />
                </div>

            </div>

        </header>
    );
}

export default RecruiterNav;