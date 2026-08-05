import { NavLink } from "react-router-dom";
import "./Navbar.css";
import {
    FaHome,
    FaBriefcase,
    FaFileAlt,
    FaHeart,
    FaUser
} from "react-icons/fa";

import NavLogo from "./NavLogo";
import NavSearch from "./NavSearch";
import UserMenu from "./UserMenu";

function CandidateNav() {

    return (

        <header className="app-navbar">

            {/* Top Row */}

            <div className="navbar-top">

                <div className="left-section">

                    <NavLogo />

                    <NavSearch
                        placeholder="Search jobs..."
                    />

                </div>

                <UserMenu />

            </div>

            {/* Bottom Row */}

            <div className="navbar-bottom">

                <nav className="nav-links">

                    <NavLink to="/candidateDashboard">
                        <FaHome />
                        Home
                    </NavLink>

                    <NavLink to="/jobs">
                        <FaBriefcase />
                        Jobs
                    </NavLink>

                    <NavLink to="/applications">
                        <FaFileAlt />
                        Applications
                    </NavLink>

                    <NavLink to="/saved-jobs">
                        <FaHeart />
                        Saved Jobs
                    </NavLink>

                    <NavLink to="/candidate/profile">
                        <FaUser />
                        My Profile
                    </NavLink>

                </nav>

            </div>

        </header>

    );

}

export default CandidateNav;