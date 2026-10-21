
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
    const { name, role, logout } = useAuth();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [profileImage, setProfileImage] = useState(null);

    const notificationRef = useRef(null);

    // Load candidate profile image
    useEffect(() => {
        if (role !== "CANDIDATE") {
            setProfileImage(null);
            return;
        }

        const loadProfileImage = async () => {
            try {
                const response = await getMyProfile();
                const imagePath = response.data?.profileImagePath;

                if (imagePath) {
                    const normalizedPath = imagePath.replace(/\\/g, "/");

                    setProfileImage(
                        `http://localhost:81/${normalizedPath}`
                    );
                } else {
                    setProfileImage(null);
                }
            } catch (error) {
                console.error("Failed to load profile image:", error);
                setProfileImage(null);
            }
        };

        loadProfileImage();
    }, [role]);

    // Load unread notification count for both roles
    const loadUnreadCount = async () => {
        try {
            const response = await getUnreadNotificationCount();
            setUnreadCount(Number(response.data) || 0);
        } catch (error) {
            console.error("Failed to load notification count:", error);
        }
    };

    useEffect(() => {
        if (!role) return;

        loadUnreadCount();

        const interval = setInterval(() => {
            loadUnreadCount();
        }, 30000);

        return () => clearInterval(interval);
    }, [role]);

    // Close notification dropdown when clicking outside
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target)
            ) {
                setNotificationOpen(false);
            }
        };

        if (notificationOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [notificationOpen]);

    // Open or close notifications
    const handleNotificationClick = async () => {
        const willOpen = !notificationOpen;

        setNotificationOpen(willOpen);
        setOpen(false);

        if (!willOpen) return;

        try {
            const response = await getNotifications();
            const allNotifications = response.data || [];

            const visibleNotifications =
                role === "CANDIDATE"
                    ? allNotifications.filter((notification) =>
                          [
                              "APPLICATION_STATUS",
                              "INTERVIEW_SCHEDULED",
                              "INTERVIEW_UPDATED",
                              "INTERVIEW_CANCELLED",
                              "NEW_JOB",
                              "NEW_MESSAGE"
                          ].includes(notification.type)
                      )
                    : allNotifications;

            setNotifications(visibleNotifications);
        } catch (error) {
            console.error("Failed to load notifications:", error);
        }
    };

    // Mark one notification as read
    const handleMarkAsRead = async (notification) => {
        if (notification.read) return;

        try {
            await markNotificationAsRead(notification.id);

            setNotifications((previous) =>
                previous.map((item) =>
                    item.id === notification.id
                        ? { ...item, read: true }
                        : item
                )
            );

            setUnreadCount((previous) => Math.max(previous - 1, 0));
        } catch (error) {
            console.error("Failed to mark notification as read:", error);
            throw error;
        }
    };

    // Mark all notifications as read
    const handleMarkAllAsRead = async () => {
        try {
            await markAllNotificationsAsRead();

            setNotifications((previous) =>
                previous.map((notification) => ({
                    ...notification,
                    read: true
                }))
            );

            setUnreadCount(0);
        } catch (error) {
            console.error("Failed to mark all notifications as read:", error);
        }
    };

    // Format notification timestamp
    const formatNotificationTime = (createdAt) => {
        if (!createdAt) return "";

        const date = new Date(createdAt);
        if (Number.isNaN(date.getTime())) return "";

        const difference = Math.floor((Date.now() - date.getTime()) / 1000);

        if (difference < 60) return "Just now";
        if (difference < 3600) return `${Math.floor(difference / 60)} min ago`;
        if (difference < 86400) return `${Math.floor(difference / 3600)} hr ago`;
        if (difference < 604800) {
            return `${Math.floor(difference / 86400)} days ago`;
        }

        return date.toLocaleDateString();
    };

    // Navigate according to role and notification type
    

const handleNotificationItemClick = async (notification) => {
    console.log("Notification clicked:", notification);
    console.log("Current user role:", role);

    setNotificationOpen(false);

    // Navigate based on the logged-in user's role.
    if (role === "RECRUITER") {
        if (
            notification.type === "INTERVIEW_UPDATED" ||
            notification.title === "Interview Response Received"
        ) {
            navigate("/recruiter/interviews");
        } else if (
            notification.type === "NEW_APPLICATION" ||
            notification.type === "APPLICATION_WITHDRAWN" ||
            notification.title === "New Application Received"
        ) {
            navigate("/applicants");
        } else {
            navigate("/recruiter/notifications");
        }
    } else if (role === "CANDIDATE") {
        if (
            [
                "INTERVIEW_SCHEDULED",
                "INTERVIEW_UPDATED",
                "INTERVIEW_CANCELLED"
            ].includes(notification.type)
        ) {
            navigate("/candidate/interviews");
        } else {
            navigate("/candidate/notifications");
        }
    } else {
        console.error("Unknown user role:", role);
        return;
    }

    // Mark the notification as read after initiating navigation.
    try {
        await handleMarkAsRead(notification);
    } catch (error) {
        console.error("Failed to mark notification as read:", error);
    }
};



    // Logout
    const handleLogout = () => {
        logout();
        setOpen(false);
        setNotificationOpen(false);
        navigate("/", { replace: true });
    };

    return (
        <div className="user-menu">
            {/* Notifications */}
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
                            {unreadCount > 99 ? "99+" : unreadCount}
                        </span>
                    )}
                </button>

                {notificationOpen && (
                    <div className="candidate-notification-dropdown">
                        {/* Header */}
                        <div className="candidate-notification-header">
                            <div>
                                <strong>Notifications</strong>

                                {unreadCount > 0 && (
                                    <span>{unreadCount} unread</span>
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

                        {/* Notification list */}
                        <div className="candidate-notification-list">
                            {notifications.length === 0 ? (
                                <div className="candidate-no-notifications">
                                    <FaBell />
                                    <p>No notifications yet</p>
                                </div>
                            ) : (
                                notifications.slice(0, 8).map((notification) => (
                                    <button
                                        key={notification.id}
                                        type="button"
                                        className={`candidate-notification-item ${
                                            notification.read ? "read" : "unread"
                                        }`}
                                        onClick={() =>
                                            handleNotificationItemClick(notification)
                                        }
                                    >
                                        <div className="candidate-notification-icon">
                                            <FaBell />
                                        </div>

                                        <div className="candidate-notification-content">
                                            <strong>{notification.title}</strong>

                                            <p>{notification.message}</p>

                                            <span>
                                                {formatNotificationTime(
                                                    notification.createdAt
                                                )}
                                            </span>
                                        </div>

                                        {!notification.read && (
                                            <span className="candidate-unread-dot" />
                                        )}
                                    </button>
                                ))
                            )}
                        </div>

                        {/* Footer */}
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

            {/* Profile menu */}
            <div
                className="profile-wrapper"
                onClick={() => {
                    setOpen((previous) => !previous);
                    setNotificationOpen(false);
                }}
            >
                <div className="profile-menu">
                    {/* Profile image */}
                    <div className="navbar-profile-avatar">
                        {profileImage ? (
                            <img src={profileImage} alt="Profile" />
                        ) : (
                            <FaUserCircle className="profile-icon" />
                        )}
                    </div>

                    {/* Name and role */}
                    <div className="profile-info">
                        <span className="profile-name">
                            {name || "User"}
                        </span>

                        <span className="profile-role">
                            {role === "CANDIDATE" ? "Candidate" : "Recruiter"}
                        </span>
                    </div>

                    <FaChevronDown className="dropdown-icon" />
                </div>

                {open && (
                    <div
                        className="profile-dropdown"
                        onClick={(event) => event.stopPropagation()}
                    >
                        {/* Dropdown header */}
                        <div className="dropdown-header">
                            <h4>{name || "User"}</h4>
                            <p>
                                {role === "CANDIDATE"
                                    ? "Candidate"
                                    : "Recruiter"}
                            </p>
                        </div>

                        {/* Profile */}
                        <Link
                            to={
                                role === "CANDIDATE"
                                    ? "/candidate/profile"
                                    : "/recruiter/profile"
                            }
                            onClick={() => setOpen(false)}
                        >
                            <FaUser />
                            My Profile
                        </Link>

                        {/* Candidate options */}
                        {role === "CANDIDATE" && (
                            <>
                                <Link
                                    to="/resume"
                                    onClick={() => setOpen(false)}
                                >
                                    <FaFileAlt />
                                    Resume
                                </Link>

                                <Link
                                    to="/saved-jobs"
                                    onClick={() => setOpen(false)}
                                >
                                    <FaHeart />
                                    Saved Jobs
                                </Link>
                            </>
                        )}

                        {/* Recruiter options */}
                        {role === "RECRUITER" && (
                            <>
                                <Link
                                    to="/my-jobs"
                                    onClick={() => setOpen(false)}
                                >
                                    <FaBriefcase />
                                    My Jobs
                                </Link>

                                <Link
                                    to="/applicants"
                                    onClick={() => setOpen(false)}
                                >
                                    <FaUser />
                                    Applicants
                                </Link>
                            </>
                        )}

                        {/* Settings */}
                        <Link
                            to={
                                role === "CANDIDATE"
                                    ? "/candidate/settings"
                                    : "/recruiter/settings"
                            }
                            onClick={() => setOpen(false)}
                        >
                            <FaCog />
                            Settings
                        </Link>

                        <hr />

                        {/* Logout */}
                        <button type="button" onClick={handleLogout}>
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
