import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
    FaBriefcase,
    FaHome,
    FaTachometerAlt,
    FaBell,
    FaChevronDown,
    FaUser,
    FaUsers,
    FaCog,
    FaSignOutAlt,
    FaSearch,
    FaUserCircle
} from "react-icons/fa";

import "./Navbar.css";

import { getMyProfile } from "../../services/RecruiterProfileService";

function RecruiterNavbar() {

    const navigate = useNavigate();

    const [profileOpen, setProfileOpen] = useState(false);

    const [recruiterProfile, setRecruiterProfile] = useState({
        name: localStorage.getItem("userName") || "Recruiter",
        designation: "Recruiter",
        profileImagePath: null
    });

    const [profileImage, setProfileImage] = useState(null);


    /* =====================================================
       PROFILE IMAGE URL
       ===================================================== */

    const getProfileImageUrl = (path) => {

        if (!path) return null;

        const normalizedPath = path.replace(/\\/g, "/");

        return `http://localhost:81/${normalizedPath}`;
    };


    /* =====================================================
       LOAD RECRUITER PROFILE
       ===================================================== */

    useEffect(() => {

        const loadRecruiterProfile = async () => {

            try {

                const response = await getMyProfile();

                const data = response.data || {};

                setRecruiterProfile({
                    name: data.name ||
                        localStorage.getItem("userName") ||
                        "Recruiter",

                    designation:
                        data.designation || "Recruiter",

                    profileImagePath:
                        data.profileImagePath || null
                });

                setProfileImage(
                    data.profileImagePath
                        ? getProfileImageUrl(
                            data.profileImagePath
                        )
                        : null
                );

            } catch (error) {

                console.error(
                    "Failed to load recruiter navbar profile:",
                    error
                );

            }

        };

        loadRecruiterProfile();

    }, []);


    /* =====================================================
       LOGOUT
       ===================================================== */

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("role");

        navigate("/login");
    };


    return (

        <nav className="recruiter-navbar">

            {/* =================================================
                LOGO
            ================================================= */}

            <div
                className="recruiter-logo"
                onClick={() => navigate("/")}
            >

                <FaBriefcase />

                <span>JobPortal</span>

            </div>


            {/* =================================================
                SEARCH
            ================================================= */}

            <div className="recruiter-search">

                <FaSearch />

                <input
                    type="text"
                    placeholder="Search"
                />

            </div>


            {/* =================================================
                NAVIGATION
            ================================================= */}

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


            {/* =================================================
                RIGHT SIDE
            ================================================= */}

            <div className="recruiter-nav-right">


                {/* NOTIFICATION */}

                <button className="notification-btn">

                    <FaBell />

                </button>


                {/* =================================================
                    PROFILE
                ================================================= */}

                <div className="recruiter-profile">

                    <button
                        className="profile-button"
                        onClick={() =>
                            setProfileOpen(!profileOpen)
                        }
                    >

                        {/* PROFILE IMAGE */}

                        <div className="profile-icon">

                            {profileImage ? (

                                <img
                                    src={profileImage}
                                    alt={
                                        recruiterProfile.name
                                    }
                                    className="recruiter-navbar-profile-image"
                                />

                            ) : (

                                <FaUserCircle />

                            )}

                        </div>


                        {/* PROFILE INFO */}

                        <div className="profile-info">

                            <strong>
                                {recruiterProfile.name}
                            </strong>

                            <span>
                                {recruiterProfile.designation}
                            </span>

                        </div>


                        <FaChevronDown
                            className="profile-arrow"
                        />

                    </button>


                    {/* =================================================
                        DROPDOWN
                    ================================================= */}

                    {profileOpen && (

                        <div className="profile-dropdown">


                            <div className="dropdown-user">

                                <strong>
                                    {recruiterProfile.name}
                                </strong>

                                <span>
                                    {recruiterProfile.designation}
                                </span>

                            </div>


                            <div className="dropdown-divider" />


                            {/* MY PROFILE */}

                            <button
                                onClick={() => {

                                    setProfileOpen(false);

                                    navigate(
                                        "/recruiter/profile"
                                    );

                                }}
                            >

                                <FaUser />

                                <span>
                                    My Profile
                                </span>

                            </button>


                            {/* MY JOBS */}

                            <button
                                onClick={() => {

                                    setProfileOpen(false);

                                    navigate(
                                        "/recruiter/jobs"
                                    );

                                }}
                            >

                                <FaBriefcase />

                                <span>
                                    My Jobs
                                </span>

                            </button>


                            {/* APPLICANTS */}

                            <button
                                onClick={() => {

                                    setProfileOpen(false);

                                    navigate(
                                        "/recruiter/jobs"
                                    );

                                }}
                            >

                                <FaUsers />

                                <span>
                                    Applicants
                                </span>

                            </button>


                            {/* SETTINGS */}

                            <button
                                onClick={() => {

                                    setProfileOpen(false);

                                    navigate(
                                        "/recruiter/settings"
                                    );

                                }}
                            >

                                <FaCog />

                                <span>
                                    Settings
                                </span>

                            </button>


                            <div className="dropdown-divider" />


                            {/* LOGOUT */}

                            <button
                                className="logout-btn"
                                onClick={handleLogout}
                            >

                                <FaSignOutAlt />

                                <span>
                                    Logout
                                </span>

                            </button>


                        </div>

                    )}

                </div>

            </div>

        </nav>

    );

}

export default RecruiterNavbar;