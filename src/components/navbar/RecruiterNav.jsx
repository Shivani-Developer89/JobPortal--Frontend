import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    FaBriefcase,
    FaHome,
    FaTachometerAlt,
    FaBell,
    FaUserCircle,
    FaChevronDown,
    FaUser,
    FaUsers,
    FaCog,
    FaSignOutAlt,
    FaSearch
} from "react-icons/fa";

import "./Navbar.css";

function RecruiterNavbar() {

    const navigate = useNavigate();
    const [profileOpen, setProfileOpen] = useState(false);

    // Change this later according to your logged-in user data
    const recruiterName =
        localStorage.getItem("userName") || "Recruiter";

    const handleLogout = () => {

        // Remove according to your existing auth implementation
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("role");

        navigate("/login");
    };

    return (
        <nav className="recruiter-navbar">

            {/* Logo */}
            <div
                className="recruiter-logo"
                onClick={() => navigate("/")}
            >
                <FaBriefcase />
                <span>JobPortal</span>
            </div>


            {/* Search */}
            <div className="recruiter-search">
                <FaSearch />
                <input
                    type="text"
                    placeholder="Search"
                />
            </div>


            {/* Navigation */}
            <div className="recruiter-nav-links">

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `recruiter-nav-link ${
                            isActive ? "active" : ""
                        }`
                    }
                >
                    <FaHome />
                    <span>Home</span>
                </NavLink>


                <NavLink
                    to="/recruiterDashboard"
                    className={({ isActive }) =>
                        `recruiter-nav-link ${
                            isActive ? "active" : ""
                        }`
                    }
                >
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                </NavLink>


                <NavLink
                    to="/recruiter/jobs"
                    className={({ isActive }) =>
                        `recruiter-nav-link ${
                            isActive ? "active" : ""
                        }`
                    }
                >
                    <FaBriefcase />
                    <span>My Jobs</span>
                </NavLink>

            </div>


            {/* Right side */}
            <div className="recruiter-nav-right">

                {/* Notification */}
                <button className="notification-btn">
                    <FaBell />
                </button>


                {/* Profile */}
                <div className="recruiter-profile">

                    <button
                        className="profile-button"
                        onClick={() =>
                            setProfileOpen(!profileOpen)
                        }
                    >

                        <div className="profile-icon">
                            <FaUserCircle />
                        </div>

                        <div className="profile-info">
                            <strong>{recruiterName}</strong>
                            <span>Recruiter</span>
                        </div>

                        <FaChevronDown className="profile-arrow" />

                    </button>


                    {/* Dropdown */}
                   {profileOpen && (
    <div className="profile-dropdown">

        <div className="dropdown-user">
            <strong>{recruiterName}</strong>
            <span>Recruiter</span>
        </div>

        <div className="dropdown-divider" />

        <button
            onClick={() => {
                setProfileOpen(false);
                navigate("/recruiter/profile");
            }}
        >
            <FaUser />
            <span>My Profile</span>
        </button>

        <button
            onClick={() => {
                setProfileOpen(false);
                navigate("/recruiter/jobs");
            }}
        >
            <FaBriefcase />
            <span>My Jobs</span>
        </button>

        <button
            onClick={() => {
                setProfileOpen(false);
                navigate("/recruiter/jobs");
            }}
        >
            <FaUsers />
            <span>Applicants</span>
        </button>

        <button
            onClick={() => {
                setProfileOpen(false);
                navigate("/recruiter/settings");
            }}
        >
            <FaCog />
            <span>Settings</span>
        </button>

        <div className="dropdown-divider" />

        <button
            className="logout-btn"
            onClick={handleLogout}
        >
            <FaSignOutAlt />
            <span>Logout</span>
        </button>

    </div>
)}

                </div>

            </div>

        </nav>
    );
}

export default RecruiterNavbar;