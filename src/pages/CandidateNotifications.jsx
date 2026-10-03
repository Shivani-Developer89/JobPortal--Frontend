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

import "../styles/CandidateNotifications.css";


function CandidateNotifications() {

    const navigate = useNavigate();

    const [notifications, setNotifications] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


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

            <div className="candidate-notifications-page">

                <div className="candidate-notifications-card">

                    <div className="candidate-notifications-loading">

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

        <div className="candidate-notifications-page">


            <div className="candidate-notifications-card">


                {/* =================================
                    HEADER
                ================================== */}

                <div className="candidate-notifications-page-header">


                    <button
                        type="button"
                        className="candidate-notifications-back"
                        onClick={() => navigate(-1)}
                    >

                        <FaArrowLeft />

                        Back

                    </button>


                    <div className="candidate-notifications-title">

                        <div className="candidate-notifications-title-icon">

                            <FaBell />

                        </div>

                        <div>

                            <h1>
                                Notifications
                            </h1>

                            <p>
                                Stay updated with your
                                applications and job activity.
                            </p>

                        </div>

                    </div>


                    {unreadCount > 0 && (

                        <button
                            type="button"
                            className="candidate-notifications-mark-all"
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

                    <div className="candidate-notifications-error">

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
                    CONTENT
                ================================== */}

                {!error && notifications.length === 0 ? (

                    <div className="candidate-notifications-empty">

                        <div className="candidate-empty-icon">

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

                    <div className="candidate-notifications-list">

                        {notifications.map(notification => (

                            <button
                                key={notification.id}
                                type="button"
                                className={`candidate-notification-card-item ${
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

                                <div className="candidate-page-notification-icon">

                                    <FaBell />

                                </div>


                                {/* CONTENT */}

                                <div className="candidate-page-notification-content">

                                    <div className="candidate-page-notification-title-row">

                                        <h3>
                                            {notification.title}
                                        </h3>

                                        {!notification.read && (

                                            <span className="candidate-page-unread-badge">
                                                New
                                            </span>

                                        )}

                                    </div>


                                    <p>
                                        {notification.message}
                                    </p>


                                    <span className="candidate-page-notification-time">

                                        {formatNotificationTime(
                                            notification.createdAt
                                        )}

                                    </span>

                                </div>


                                {/* UNREAD DOT */}

                                {!notification.read && (

                                    <span className="candidate-page-unread-dot" />

                                )}

                            </button>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );
}


export default CandidateNotifications;