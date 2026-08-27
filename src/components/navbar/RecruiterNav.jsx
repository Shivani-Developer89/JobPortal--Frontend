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
    FaUserCircle,
    FaPlus
} from "react-icons/fa";

import "./RecruiterNavbar.css";

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

    const getProfileImageUrl = (path) => {
        if (!path) return null;
        const normalizedPath = path.replace(/\\/g, "/");
        return `http://localhost:81/${normalizedPath}`;
    };

    useEffect(() => {
        const loadRecruiterProfile = async () => {
            try {
                const response = await getMyProfile();
                const data = response.data || {};

                setRecruiterProfile({
                    name: data.name || localStorage.getItem("userName") || "Recruiter",
                    designation: data.designation || "Recruiter",
                    profileImagePath: data.profileImagePath || null
                });

                setProfileImage(
                    data.profileImagePath
                        ? getProfileImageUrl(data.profileImagePath)
                        : null
                );
            } catch (error) {
                console.error("Failed to load recruiter navbar profile:", error);
            }
        };

        loadRecruiterProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <nav className="recruiter-navbar">
            <div
                className="recruiter-logo"
                onClick={() => navigate("/")}
            >
                <FaBriefcase />
                <span>JobPortal</span>
            </div>

            <div className="recruiter-search">
                <FaSearch />
                <input type="text" placeholder="Search" />
            </div>

            <div className="recruiter-nav-links">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `recruiter-nav-link ${isActive ? "active" : ""}`
                    }
                >
                    <FaHome />
                    <span>Home</span>
                </NavLink>

                <NavLink
                    to="/recruiterDashboard"
                    className={({ isActive }) =>
                        `recruiter-nav-link ${isActive ? "active" : ""}`
                    }
                >
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/recruiter/jobs"
                    className={({ isActive }) =>
                        `recruiter-nav-link ${isActive ? "active" : ""}`
                    }
                >
                    <FaBriefcase />
                    <span>My Jobs</span>
                </NavLink>
            </div>

            <div className="recruiter-nav-right">
                <button
                    type="button"
                    className="notification-btn"
                    aria-label="Notifications"
                >
                    <FaBell />
                </button>

                <div className="recruiter-profile">
                    <button
                        type="button"
                        className="profile-button"
                        onClick={() => setProfileOpen(!profileOpen)}
                        aria-expanded={profileOpen}
                        aria-label="Open recruiter profile menu"
                    >
                        <div className="profile-icon">
                            {profileImage ? (
                                <img
                                    src={profileImage}
                                    alt={recruiterProfile.name}
                                    className="recruiter-navbar-profile-image"
                                />
                            ) : (
                                <FaUserCircle />
                            )}
                        </div>

                        <div className="profile-info">
                            <strong>{recruiterProfile.name}</strong>
                            <span>{recruiterProfile.designation}</span>
                        </div>

                        <FaChevronDown
                            className={`profile-arrow ${profileOpen ? "open" : ""}`}
                        />
                    </button>

                    {profileOpen && (
                        <div className="profile-dropdown">
                            <div className="dropdown-user">
                                <strong>{recruiterProfile.name}</strong>
                                <span>{recruiterProfile.designation}</span>
                            </div>

                            <div className="dropdown-divider" />

                            <button
                                type="button"
                                onClick={() => {
                                    setProfileOpen(false);
                                    navigate("/recruiter/profile");
                                }}
                            >
                                <FaUser />
                                <span>My Profile</span>
                            </button>
<button
    type="button"
    onClick={() => {
        setProfileOpen(false);
        navigate("/recruiter/create-job");
    }}
>
    <FaPlus />
    <span>Post a Job</span>
</button>

                            
                            <button
                                type="button"
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
                                type="button"
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