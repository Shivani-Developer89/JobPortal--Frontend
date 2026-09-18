import { useEffect, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import {
    FaBriefcase,
    FaHome,
    FaTachometerAlt,
    FaBell,
    FaChevronDown,
    FaUser,
    FaCog,
    FaSignOutAlt,
    FaSearch,
    FaUserCircle,
    FaPlus,
    FaCheck
} from "react-icons/fa";

import "./RecruiterNavbar.css";

import { getMyProfile } from "../../services/RecruiterProfileService";

import {
    getNotifications,
    getUnreadNotificationCount,
    markNotificationAsRead,
    markAllNotificationsAsRead
} from "../../services/NotificationService";


function RecruiterNavbar() {

    const navigate = useNavigate();

    const [profileOpen, setProfileOpen] = useState(false);

    const [notificationOpen, setNotificationOpen] =
        useState(false);

    const [notifications, setNotifications] =
        useState([]);

    const [unreadCount, setUnreadCount] =
        useState(0);


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


    // =========================================================
    // LOAD RECRUITER PROFILE
    // =========================================================

    useEffect(() => {

        const loadRecruiterProfile = async () => {

            try {

                const response =
                    await getMyProfile();

                const data =
                    response.data || {};

                setRecruiterProfile({

                    name:
                        data.name ||
                        localStorage.getItem("userName") ||
                        "Recruiter",

                    designation:
                        data.designation ||
                        "Recruiter",

                    profileImagePath:
                        data.profileImagePath ||
                        null
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


    // =========================================================
    // LOAD NOTIFICATION COUNT
    // =========================================================

    useEffect(() => {

        loadUnreadCount();

        // Refresh notification count every 30 seconds
        const interval = setInterval(() => {
            loadUnreadCount();
        }, 30000);

        return () => clearInterval(interval);

    }, []);


    const loadUnreadCount = async () => {

        try {

            const response =
                await getUnreadNotificationCount();

            setUnreadCount(
                Number(response.data) || 0
            );

        } catch (error) {

            console.error(
                "Failed to load notification count:",
                error
            );
        }
    };


    // =========================================================
    // OPEN NOTIFICATIONS
    // =========================================================

    const handleNotificationClick = async () => {

        setNotificationOpen(
            !notificationOpen
        );

        // Close profile dropdown
        setProfileOpen(false);

        // Load notifications when opening
        if (!notificationOpen) {

            try {

                const response =
                    await getNotifications();

                setNotifications(
                    response.data || []
                );

            } catch (error) {

                console.error(
                    "Failed to load notifications:",
                    error
                );
            }
        }
    };


    // =========================================================
    // MARK NOTIFICATION AS READ
    // =========================================================

    const handleMarkAsRead = async (notification) => {

        if (notification.read) {
            return;
        }

        try {

            await markNotificationAsRead(
                notification.id
            );

            setNotifications(prev =>
                prev.map(item =>
                    item.id === notification.id
                        ? { ...item, read: true }
                        : item
                )
            );

            setUnreadCount(prev =>
                Math.max(prev - 1, 0)
            );

        } catch (error) {

            console.error(
                "Failed to mark notification as read:",
                error
            );
        }
    };


    // =========================================================
    // MARK ALL AS READ
    // =========================================================

    const handleMarkAllAsRead = async () => {

        try {

            await markAllNotificationsAsRead();

            setNotifications(prev =>
                prev.map(notification => ({
                    ...notification,
                    read: true
                }))
            );

            setUnreadCount(0);

        } catch (error) {

            console.error(
                "Failed to mark all notifications as read:",
                error
            );
        }
    };


    // =========================================================
    // LOGOUT
    // =========================================================

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("role");

        navigate("/login");
    };


    // =========================================================
    // FORMAT NOTIFICATION TIME
    // =========================================================

    const formatNotificationTime = (createdAt) => {

        if (!createdAt) {
            return "";
        }

        const date =
            new Date(createdAt);

        const now =
            new Date();

        const difference =
            Math.floor(
                (now - date) / 1000
            );

        if (difference < 60) {
            return "Just now";
        }

        if (difference < 3600) {

            return `${Math.floor(
                difference / 60
            )} min ago`;
        }

        if (difference < 86400) {

            return `${Math.floor(
                difference / 3600
            )} hr ago`;
        }

        if (difference < 604800) {

            return `${Math.floor(
                difference / 86400
            )} days ago`;
        }

        return date.toLocaleDateString();
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

                <span>
                    JobPortal
                </span>

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
                NAVIGATION LINKS
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

                    <span>
                        Home
                    </span>

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

                    <span>
                        Dashboard
                    </span>

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

                    <span>
                        My Jobs
                    </span>

                </NavLink>

            </div>


            {/* =================================================
                RIGHT SIDE
            ================================================= */}

            <div className="recruiter-nav-right">


                {/* =================================================
                    NOTIFICATION
                ================================================= */}

                <div className="notification-wrapper">

                    <button
                        type="button"
                        className="notification-btn"
                        aria-label="Notifications"
                        onClick={handleNotificationClick}
                    >

                        <FaBell />

                        {unreadCount > 0 && (

                            <span className="notification-badge">

                                {unreadCount > 99
                                    ? "99+"
                                    : unreadCount}

                            </span>

                        )}

                    </button>


                    {/* =================================================
                        NOTIFICATION DROPDOWN
                    ================================================= */}

                    {notificationOpen && (

                        <div className="notification-dropdown">

                            <div className="notification-header">

                                <div>

                                    <strong>
                                        Notifications
                                    </strong>

                                    {unreadCount > 0 && (

                                        <span>
                                            {unreadCount} unread
                                        </span>

                                    )}

                                </div>


                                {unreadCount > 0 && (

                                    <button
                                        type="button"
                                        className="mark-all-btn"
                                        onClick={handleMarkAllAsRead}
                                    >

                                        Mark all read

                                    </button>

                                )}

                            </div>


                            <div className="notification-list">

                                {notifications.length === 0 ? (

                                    <div className="no-notifications">

                                        <FaBell />

                                        <p>
                                            No notifications yet
                                        </p>

                                    </div>

                                ) : (

                                    notifications
                                        .slice(0, 8)
                                        .map(notification => (

                                            <button
                                                key={notification.id}
                                                type="button"
                                                className={`notification-item ${
                                                    notification.read
                                                        ? "read"
                                                        : "unread"
                                                }`}
                                                onClick={() =>
                                                    handleMarkAsRead(
                                                        notification
                                                    )
                                                }
                                            >

                                                <div className="notification-icon">

                                                    <FaBell />

                                                </div>


                                                <div className="notification-content">

                                                    <strong>
                                                        {notification.title}
                                                    </strong>

                                                    <p>
                                                        {notification.message}
                                                    </p>

                                                    <span>
                                                        {formatNotificationTime(
                                                            notification.createdAt
                                                        )}
                                                    </span>

                                                </div>


                                                {!notification.read && (

                                                    <span className="unread-dot" />

                                                )}

                                            </button>

                                        ))

                                )}

                            </div>


                            <div className="notification-footer">

                                <button
                                    type="button"
                                    onClick={() => {

                                        setNotificationOpen(false);

                                        navigate(
                                            "/recruiter/notifications"
                                        );

                                    }}
                                >

                                    View all notifications

                                </button>

                            </div>

                        </div>

                    )}

                </div>


                {/* =================================================
                    RECRUITER PROFILE
                ================================================= */}

                <div className="recruiter-profile">

                    <button
                        type="button"
                        className="profile-button"
                        onClick={() => {

                            setProfileOpen(
                                !profileOpen
                            );

                            setNotificationOpen(false);

                        }}
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

                            <strong>
                                {recruiterProfile.name}
                            </strong>

                            <span>
                                {recruiterProfile.designation}
                            </span>

                        </div>


                        <FaChevronDown
                            className={`profile-arrow ${
                                profileOpen ? "open" : ""
                            }`}
                        />

                    </button>


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


                            <button
                                type="button"
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


                            <button
                                type="button"
                                onClick={() => {

                                    setProfileOpen(false);

                                    navigate(
                                        "/recruiter/create-job"
                                    );

                                }}
                            >

                                <FaPlus />

                                <span>
                                    Post a Job
                                </span>

                            </button>


                            <button
                                type="button"
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


                            <button
                                type="button"
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