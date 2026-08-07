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

        </nav>

        <div className="nav-right">
            <UserMenu />
        </div>

    </div>

</header>

    );

}

export default CandidateNav;