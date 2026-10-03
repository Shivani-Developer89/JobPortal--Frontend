import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaBell,
    FaArrowLeft,
    FaCheckDouble
} from "react-icons/fa";

import {
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead
} from "../services/NotificationService";

import "../styles/RecruiterNotifications.css";


function RecruiterNotifications() {

    const navigate = useNavigate();

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // =========================================
    // LOAD NOTIFICATIONS
    // =========================================

    useEffect(() => {
        loadNotifications();
    }, []);


    const loadNotifications = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await getNotifications();

            setNotifications(
                response.data || []
            );

        } catch (error) {

            console.error(
                "Failed to load recruiter notifications:",
                error
            );

            setError(
                "Unable to load notifications."
            );

        } finally {

            setLoading(false);

        }
    };


    // =========================================
    // MARK ONE AS READ
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

        } catch (error) {

            console.error(
                "Failed to mark notification as read:",
                error
            );

        }
    };


    // =========================================
    // MARK ALL AS READ
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

        } catch (error) {

            console.error(
                "Failed to mark all notifications as read:",
                error
            );

        }
    };


    // =========================================
    // FORMAT TIME
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


    const unreadCount =
        notifications.filter(
            notification => !notification.read
        ).length;


    // =========================================
    // LOADING
    // =========================================

    if (loading) {

        return (

            <div className="recruiter-notifications-page">

                <div className="recruiter-notifications-card">

                    <div className="recruiter-notifications-loading">
                        Loading notifications...
                    </div>

                </div>

            </div>

        );
    }


    // =========================================
    // PAGE
    // =========================================

    return (

        <div className="recruiter-notifications-page">

            <div className="recruiter-notifications-card">


                {/* =================================
                    HEADER
                ================================== */}

                <div className="recruiter-notifications-page-header">

                    <button
                        type="button"
                        className="recruiter-notifications-back"
                        onClick={() => navigate(-1)}
                    >

                        <FaArrowLeft />

                        Back

                    </button>


                    <div className="recruiter-notifications-title">

                        <div className="recruiter-notifications-title-icon">

                            <FaBell />

                        </div>

                        <div>

                            <h1>
                                Notifications
                            </h1>

                            <p>
                                Stay updated with your jobs
                                and applications.
                            </p>

                        </div>

                    </div>


                    {unreadCount > 0 && (

                        <button
                            type="button"
                            className="recruiter-notifications-mark-all"
                            onClick={handleMarkAllAsRead}
                        >

                            <FaCheckDouble />

                            Mark all as read

                        </button>

                    )}

                </div>


                {/* =================================
                    ERROR
                ================================== */}

                {error && (

                    <div className="recruiter-notifications-error">

                        {error}

                        <button
                            type="button"
                            onClick={loadNotifications}
                        >
                            Try again
                        </button>

                    </div>

                )}


                {/* =================================
                    EMPTY STATE
                ================================== */}

                {!error && notifications.length === 0 ? (

                    <div className="recruiter-notifications-empty">

                        <div className="recruiter-empty-icon">

                            <FaBell />

                        </div>

                        <h2>
                            No notifications yet
                        </h2>

                        <p>
                            We'll let you know when
                            something important happens.
                        </p>

                    </div>

                ) : (

                    <div className="recruiter-notifications-list">

                        {notifications.map(notification => (

                            <button
                                key={notification.id}
                                type="button"
                                className={`recruiter-notification-card-item ${
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

                                <div className="recruiter-page-notification-icon">

                                    <FaBell />

                                </div>


                                {/* CONTENT */}

                                <div className="recruiter-page-notification-content">

                                    <div className="recruiter-page-notification-title-row">

                                        <h3>
                                            {notification.title}
                                        </h3>

                                        {!notification.read && (

                                            <span className="recruiter-page-unread-badge">
                                                New
                                            </span>

                                        )}

                                    </div>


                                    <p>
                                        {notification.message}
                                    </p>


                                    <span className="recruiter-page-notification-time">

                                        {formatNotificationTime(
                                            notification.createdAt
                                        )}

                                    </span>

                                </div>


                                {/* UNREAD DOT */}

                                {!notification.read && (

                                    <span className="recruiter-page-unread-dot" />

                                )}

                            </button>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );
}


export default RecruiterNotifications;