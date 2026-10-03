import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    FaBell,
    FaUserCircle,
    FaChevronDown,
    FaUser,
    FaFileAlt,
    FaCog,
    FaSignOutAlt,
    FaBriefcase,
    FaHeart
} from "react-icons/fa";

import {
    getNotifications,
    getUnreadNotificationCount,
    markNotificationAsRead,
    markAllNotificationsAsRead
} from "../../services/NotificationService";

import { useAuth } from "../../context/AuthContext";
import { getMyProfile } from "../../services/CandidateProfileService";

import "./Navbar.css";


function UserMenu() {

    const {
        name,
        role,
        logout
    } = useAuth();

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const [notificationOpen, setNotificationOpen] =
        useState(false);

    const [notifications, setNotifications] =
        useState([]);

    const [unreadCount, setUnreadCount] =
        useState(0);

    const [profileImage, setProfileImage] =
        useState(null);

    // Reference for notification dropdown
    const notificationRef = useRef(null);


    // =========================================
    // LOAD CANDIDATE PROFILE IMAGE
    // =========================================

    useEffect(() => {

        if (role !== "CANDIDATE") {

            setProfileImage(null);

            return;
        }

        const loadProfileImage = async () => {

            try {

                const response =
                    await getMyProfile();

                const imagePath =
                    response.data?.profileImagePath;

                if (imagePath) {

                    const normalizedPath =
                        imagePath.replace(/\\/g, "/");

                    setProfileImage(
                        `http://localhost:81/${normalizedPath}`
                    );

                } else {

                    setProfileImage(null);

                }

            } catch (error) {

                console.error(
                    "Failed to load profile image",
                    error
                );

                setProfileImage(null);
            }
        };

        loadProfileImage();

    }, [role]);


    // =========================================
    // LOAD NOTIFICATION COUNT
    // =========================================

    useEffect(() => {

        if (role !== "CANDIDATE") {
            return;
        }

        loadUnreadCount();

        const interval = setInterval(() => {

            loadUnreadCount();

        }, 30000);

        return () => clearInterval(interval);

    }, [role]);


    // =========================================
    // CLOSE NOTIFICATION WHEN CLICKING OUTSIDE
    // =========================================

    useEffect(() => {

        const handleOutsideClick = (event) => {

            if (
                notificationRef.current &&
                !notificationRef.current.contains(
                    event.target
                )
            ) {

                setNotificationOpen(false);

            }
        };

        if (notificationOpen) {

            document.addEventListener(
                "mousedown",
                handleOutsideClick
            );

        }

        return () => {

            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );

        };

    }, [notificationOpen]);


    // =========================================
    // LOAD UNREAD COUNT
    // =========================================

    const loadUnreadCount = async () => {

        try {

            const response =
                await getUnreadNotificationCount();

            setUnreadCount(
                Number(response.data) || 0
            );

        } catch (error) {

            console.error(
                "Failed to load candidate notification count:",
                error
            );
        }
    };


    // =========================================
    // OPEN / CLOSE NOTIFICATIONS
    // =========================================

    const handleNotificationClick = async () => {

        const willOpen = !notificationOpen;

        setNotificationOpen(willOpen);

        // Close profile menu
        setOpen(false);

        if (!willOpen) {
            return;
        }

        try {

            const response =
                await getNotifications();

            setNotifications(
                response.data || []
            );

        } catch (error) {

            console.error(
                "Failed to load candidate notifications:",
                error
            );
        }
    };


    // =========================================
    // MARK ONE NOTIFICATION AS READ
    // =========================================

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
                        ? {
                            ...item,
                            read: true
                        }
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


    // =========================================
    // MARK ALL NOTIFICATIONS AS READ
    // =========================================

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


    // =========================================
    // FORMAT NOTIFICATION TIME
    // =========================================

    const formatNotificationTime = (createdAt) => {

        if (!createdAt) {
            return "";
        }

        const date = new Date(createdAt);

        const now = new Date();

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


    // =========================================
    // LOGOUT
    // =========================================

    const handleLogout = () => {

        logout();

        setOpen(false);

        setNotificationOpen(false);

        navigate("/", {
            replace: true
        });
    };


    // =========================================
    // RENDER
    // =========================================

    return (

        <div className="user-menu">


            {/* =====================================
                NOTIFICATION
            ====================================== */}

            <div
                className="candidate-notification-wrapper"
                ref={notificationRef}
            >

                <button
                    type="button"
                    className="notification-btn"
                    aria-label="Notifications"
                    onClick={handleNotificationClick}
                >

                    <FaBell />

                    {unreadCount > 0 && (

                        <span className="candidate-notification-badge">

                            {unreadCount > 99
                                ? "99+"
                                : unreadCount}

                        </span>

                    )}

                </button>


                {notificationOpen && (

                    <div className="candidate-notification-dropdown">


                        {/* HEADER */}

                        <div className="candidate-notification-header">

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
                                    className="candidate-mark-all-btn"
                                    onClick={handleMarkAllAsRead}
                                >
                                    Mark all read
                                </button>

                            )}

                        </div>


                        {/* NOTIFICATION LIST */}

                        <div className="candidate-notification-list">

                            {notifications.length === 0 ? (

                                <div className="candidate-no-notifications">

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
                                            className={`candidate-notification-item ${
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

                                            {/* ICON */}

                                            <div className="candidate-notification-icon">

                                                <FaBell />

                                            </div>


                                            {/* CONTENT */}

                                            <div className="candidate-notification-content">

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


                                            {/* UNREAD DOT */}

                                            {!notification.read && (

                                                <span
                                                    className="candidate-unread-dot"
                                                />

                                            )}

                                        </button>

                                    ))

                            )}

                        </div>


                        {/* FOOTER */}

            <div className="candidate-notification-footer">

    <button
        type="button"
        onClick={() => {

            setNotificationOpen(false);

            navigate(
                role === "CANDIDATE"
                    ? "/candidate/notifications"
                    : "/recruiter/notifications"
            );

        }}
    >
        View all notifications
    </button>

</div>

                    </div>

                )}

            </div>


            {/* =====================================
                PROFILE
            ====================================== */}

            <div
                className="profile-wrapper"
                onClick={() => {

                    setOpen(prev => !prev);

                    setNotificationOpen(false);

                }}
            >

                <div className="profile-menu">


                    {/* PROFILE IMAGE */}

                    <div className="navbar-profile-avatar">

                        {profileImage ? (

                            <img
                                src={profileImage}
                                alt="Profile"
                            />

                        ) : (

                            <FaUserCircle
                                className="profile-icon"
                            />

                        )}

                    </div>


                    {/* NAME + ROLE */}

                    <div className="profile-info">

                        <span className="profile-name">

                            {name || "User"}

                        </span>


                        <span className="profile-role">

                            {role === "CANDIDATE"
                                ? "Candidate"
                                : "Recruiter"}

                        </span>

                    </div>


                    {/* DROPDOWN ARROW */}

                    <FaChevronDown
                        className="dropdown-icon"
                    />

                </div>


                {/* =================================
                    PROFILE DROPDOWN
                ================================== */}

                {open && (

                    <div className="profile-dropdown">


                        {/* DROPDOWN HEADER */}

                        <div className="dropdown-header">

                            <h4>
                                {name || "User"}
                            </h4>

                            <p>

                                {role === "CANDIDATE"
                                    ? "Candidate"
                                    : "Recruiter"}

                            </p>

                        </div>


                        {/* MY PROFILE */}

                        <Link
                            to={
                                role === "CANDIDATE"
                                    ? "/candidate/profile"
                                    : "/recruiter/profile"
                            }
                            onClick={() =>
                                setOpen(false)
                            }
                        >

                            <FaUser />

                            My Profile

                        </Link>


                        {/* CANDIDATE OPTIONS */}

                        {role === "CANDIDATE" && (

                            <>

                                <Link
                                    to="/resume"
                                    onClick={() =>
                                        setOpen(false)
                                    }
                                >

                                    <FaFileAlt />

                                    Resume

                                </Link>


                                <Link
                                    to="/saved-jobs"
                                    onClick={() =>
                                        setOpen(false)
                                    }
                                >

                                    <FaHeart />

                                    Saved Jobs

                                </Link>

                            </>

                        )}


                        {/* RECRUITER OPTIONS */}

                        {role === "RECRUITER" && (

                            <>

                                <Link
                                    to="/my-jobs"
                                    onClick={() =>
                                        setOpen(false)
                                    }
                                >

                                    <FaBriefcase />

                                    My Jobs

                                </Link>


                                <Link
                                    to="/applicants"
                                    onClick={() =>
                                        setOpen(false)
                                    }
                                >

                                    <FaUser />

                                    Applicants

                                </Link>

                            </>

                        )}


                        {/* SETTINGS */}

                        <Link
                            to={
                                role === "CANDIDATE"
                                    ? "/candidate/settings"
                                    : "/recruiter/settings"
                            }
                            onClick={() =>
                                setOpen(false)
                            }
                        >

                            <FaCog />

                            Settings

                        </Link>


                        <hr />


                        {/* LOGOUT */}

                        <button
                            type="button"
                            onClick={handleLogout}
                        >

                            <FaSignOutAlt />

                            Logout

                        </button>


                    </div>

                )}

            </div>

        </div>

    );
}


export default UserMenu;