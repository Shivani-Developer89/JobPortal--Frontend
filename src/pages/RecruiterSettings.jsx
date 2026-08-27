import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaArrowLeft,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaCheckCircle,
    FaUser,
    FaBell,
    FaBriefcase,
    FaShieldAlt,
    FaExclamationTriangle,
    FaChevronRight,
    FaEnvelope,
    FaClock,
    FaMapMarkerAlt,
    FaUsers
} from "react-icons/fa";
import axios from "axios";
import "../styles/RecruiterSettings.css";  

function RecruiterSettings() {
    const navigate = useNavigate();

    // ============================
    // PASSWORD
    // ============================

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordLoading, setPasswordLoading] = useState(false);

    // ============================
    // NOTIFICATIONS
    // ============================

    const [notifications, setNotifications] = useState({
        newApplicants: true,
        emailNotifications: true,
        jobExpiryReminders: true
    });

    // ============================
    // JOB PREFERENCES
    // ============================

    const [jobPreferences, setJobPreferences] = useState({
        defaultLocation: "",
        employmentType: "Full Time",
        salaryVisibility: "Disclose"
    });

    const [preferencesSaved, setPreferencesSaved] = useState(false);

    // ============================
    // LOAD LOCAL SETTINGS
    // ============================

    useEffect(() => {
        const savedNotifications =
            localStorage.getItem("recruiterNotifications");

        const savedPreferences =
            localStorage.getItem("recruiterJobPreferences");

        if (savedNotifications) {
            try {
                setNotifications(JSON.parse(savedNotifications));
            } catch (error) {
                console.error("Failed to load notification settings");
            }
        }

        if (savedPreferences) {
            try {
                setJobPreferences(JSON.parse(savedPreferences));
            } catch (error) {
                console.error("Failed to load job preferences");
            }
        }
    }, []);

    // ============================
    // NOTIFICATION TOGGLE
    // ============================

    const handleNotificationChange = (name) => {
        const updatedNotifications = {
            ...notifications,
            [name]: !notifications[name]
        };

        setNotifications(updatedNotifications);

        localStorage.setItem(
            "recruiterNotifications",
            JSON.stringify(updatedNotifications)
        );
    };

    // ============================
    // JOB PREFERENCE CHANGE
    // ============================

    const handlePreferenceChange = (name, value) => {
        setJobPreferences((previous) => ({
            ...previous,
            [name]: value
        }));

        setPreferencesSaved(false);
    };

    const saveJobPreferences = () => {
        localStorage.setItem(
            "recruiterJobPreferences",
            JSON.stringify(jobPreferences)
        );

        setPreferencesSaved(true);

        setTimeout(() => {
            setPreferencesSaved(false);
        }, 2500);
    };

    // ============================
    // CHANGE PASSWORD
    // ============================

    const handleChangePassword = async (e) => {
        e.preventDefault();

        setPasswordMessage("");
        setPasswordError("");

        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordError("Please fill all password fields.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError(
                "New password and confirm password do not match."
            );
            return;
        }

        if (newPassword.length < 6) {
            setPasswordError(
                "New password must be at least 6 characters."
            );
            return;
        }

        if (currentPassword === newPassword) {
            setPasswordError(
                "New password must be different from current password."
            );
            return;
        }

        try {
            setPasswordLoading(true);

            const token = localStorage.getItem("token");

            const response = await axios.put(
                "http://localhost:81/user/change-password",
                {
                    currentPassword,
                    newPassword
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            setPasswordMessage(
                response.data || "Password changed successfully."
            );

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

        } catch (error) {
            console.error("Change password error:", error);

            if (error.response?.data) {
                setPasswordError(
                    typeof error.response.data === "string"
                        ? error.response.data
                        : error.response.data.message ||
                          "Failed to change password."
                );
            } else {
                setPasswordError(
                    "Unable to connect to the server."
                );
            }
        } finally {
            setPasswordLoading(false);
        }
    };

    // ============================
    // ACCOUNT INFO
    // ============================

    const userName =
        localStorage.getItem("userName") || "Recruiter";

    const userRole =
        localStorage.getItem("role") || "RECRUITER";

    // ============================
    // RENDER
    // ============================

    return (
        <div className="recruiter-settings-page">

            {/* HEADER */}

            <div className="settings-header">

                <div>
                    <h1>Settings</h1>
                    <p>
                        Manage your recruiter account and preferences.
                    </p>
                </div>

                <button
                    type="button"
                    className="settings-back-btn"
                    onClick={() =>
                        navigate("/recruiterDashboard")
                    }
                >
                    <FaArrowLeft />
                    Back to Dashboard
                </button>

            </div>

            <div className="settings-content">

                {/* =========================================
                    ACCOUNT
                ========================================= */}

                <section className="settings-section">

                    <div className="section-title">

                        <div className="section-title-icon account-icon">
                            <FaUser />
                        </div>

                        <div>
                            <h2>Account</h2>
                            <p>
                                Manage your recruiter account information.
                            </p>
                        </div>

                    </div>

                    <div className="settings-card">

                        <div className="account-row">

                            <div className="account-row-icon">
                                <FaUser />
                            </div>

                            <div className="account-row-content">
                                <h3>My Profile</h3>
                                <p>
                                    Update your name, designation,
                                    profile photo and other information.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="settings-action-btn"
                                onClick={() =>
                                    navigate("/recruiter/profile")
                                }
                            >
                                Open
                                <FaChevronRight />
                            </button>

                        </div>

                        <div className="settings-divider" />

                        <div className="account-row">

                            <div className="account-row-icon">
                                <FaEnvelope />
                            </div>

                            <div className="account-row-content">
                                <h3>Account Information</h3>

                                <p>
                                    Name: <strong>{userName}</strong>
                                </p>

                                <p>
                                    Role: <strong>{userRole}</strong>
                                </p>

                            </div>

                            <span className="read-only-badge">
                                Read only
                            </span>

                        </div>

                    </div>

                </section>

                {/* =========================================
                    NOTIFICATIONS
                ========================================= */}

                <section className="settings-section">

                    <div className="section-title">

                        <div className="section-title-icon notification-icon">
                            <FaBell />
                        </div>

                        <div>
                            <h2>Notifications</h2>
                            <p>
                                Choose which recruiter notifications
                                you want to receive.
                            </p>
                        </div>

                    </div>

                    <div className="settings-card">

                        <SettingToggle
                            icon={<FaUsers />}
                            title="New Applicant Alerts"
                            description="Get notified when a candidate applies to your job."
                            checked={notifications.newApplicants}
                            onChange={() =>
                                handleNotificationChange(
                                    "newApplicants"
                                )
                            }
                        />

                        <div className="settings-divider" />

                        <SettingToggle
                            icon={<FaEnvelope />}
                            title="Email Notifications"
                            description="Receive important recruiter updates through email."
                            checked={notifications.emailNotifications}
                            onChange={() =>
                                handleNotificationChange(
                                    "emailNotifications"
                                )
                            }
                        />

                        <div className="settings-divider" />

                        <SettingToggle
                            icon={<FaClock />}
                            title="Job Expiry Reminders"
                            description="Get reminded when your job postings are approaching expiry."
                            checked={notifications.jobExpiryReminders}
                            onChange={() =>
                                handleNotificationChange(
                                    "jobExpiryReminders"
                                )
                            }
                        />

                        <div className="local-settings-note">
                            Notification preferences are currently
                            saved on this browser.
                        </div>

                    </div>

                </section>

                {/* =========================================
                    JOB PREFERENCES
                ========================================= */}

                <section className="settings-section">

                    <div className="section-title">

                        <div className="section-title-icon job-icon">
                            <FaBriefcase />
                        </div>

                        <div>
                            <h2>Job Preferences</h2>
                            <p>
                                Configure your default job posting preferences.
                            </p>
                        </div>

                    </div>

                    <div className="settings-card">

                        <div className="preference-grid">

                            <div className="preference-field">

                                <label>
                                    <FaMapMarkerAlt />
                                    Default Location
                                </label>

                                <input
                                    type="text"
                                    value={
                                        jobPreferences.defaultLocation
                                    }
                                    onChange={(e) =>
                                        handlePreferenceChange(
                                            "defaultLocation",
                                            e.target.value
                                        )
                                    }
                                    placeholder="e.g. Delhi"
                                />

                            </div>

                            <div className="preference-field">

                                <label>
                                    <FaBriefcase />
                                    Employment Type
                                </label>

                                <select
                                    value={
                                        jobPreferences.employmentType
                                    }
                                    onChange={(e) =>
                                        handlePreferenceChange(
                                            "employmentType",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option>Full Time</option>
                                    <option>Part Time</option>
                                    <option>Contract</option>
                                    <option>Internship</option>
                                    <option>Remote</option>
                                </select>

                            </div>

                            <div className="preference-field">

                                <label>
                                    Salary Visibility
                                </label>

                                <select
                                    value={
                                        jobPreferences.salaryVisibility
                                    }
                                    onChange={(e) =>
                                        handlePreferenceChange(
                                            "salaryVisibility",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option>Disclose</option>
                                    <option>Do not disclose</option>
                                </select>

                            </div>

                        </div>

                        <div className="preference-footer">

                            {preferencesSaved && (
                                <div className="preference-success">
                                    <FaCheckCircle />
                                    Preferences saved.
                                </div>
                            )}

                            <button
                                type="button"
                                className="save-preferences-btn"
                                onClick={saveJobPreferences}
                            >
                                Save Preferences
                            </button>

                        </div>

                    </div>

                </section>

                {/* =========================================
                    SECURITY
                ========================================= */}

                <section className="settings-section">

                    <div className="section-title">

                        <div className="section-title-icon security-icon">
                            <FaShieldAlt />
                        </div>

                        <div>
                            <h2>Security</h2>
                            <p>
                                Protect your recruiter account.
                            </p>
                        </div>

                    </div>

                    <div className="settings-card password-card">

                        <div className="password-header">

                            <div className="password-header-icon">
                                <FaLock />
                            </div>

                            <div>
                                <h3>Change Password</h3>
                                <p>
                                    Use a strong password that you
                                    don't use elsewhere.
                                </p>
                            </div>

                        </div>

                        <form
                            className="change-password-form"
                            onSubmit={handleChangePassword}
                        >

                            <PasswordField
                                label="Current Password"
                                value={currentPassword}
                                setValue={setCurrentPassword}
                                show={showCurrent}
                                setShow={setShowCurrent}
                                placeholder="Enter current password"
                            />

                            <PasswordField
                                label="New Password"
                                value={newPassword}
                                setValue={setNewPassword}
                                show={showNew}
                                setShow={setShowNew}
                                placeholder="Enter new password"
                            />

                            <PasswordField
                                label="Confirm New Password"
                                value={confirmPassword}
                                setValue={setConfirmPassword}
                                show={showConfirm}
                                setShow={setShowConfirm}
                                placeholder="Confirm new password"
                            />

                            {passwordError && (
                                <div className="settings-error">
                                    {passwordError}
                                </div>
                            )}

                            {passwordMessage && (
                                <div className="settings-success">
                                    <FaCheckCircle />
                                    <span>{passwordMessage}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="change-password-btn"
                                disabled={passwordLoading}
                            >
                                <FaLock />

                                {passwordLoading
                                    ? "Changing Password..."
                                    : "Change Password"
                                }
                            </button>

                        </form>

                    </div>

                </section>

                {/* =========================================
                    DANGER ZONE
                ========================================= */}

                <section className="settings-section danger-section">

                    <div className="section-title">

                        <div className="section-title-icon danger-icon">
                            <FaExclamationTriangle />
                        </div>

                        <div>
                            <h2>Danger Zone</h2>
                            <p>
                                Actions that can affect your account.
                            </p>
                        </div>

                    </div>

                    <div className="danger-card">

                        <div className="danger-row">

                            <div>
                                <h3>Deactivate Account</h3>
                                <p>
                                    Temporarily disable your recruiter
                                    account.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="danger-outline-btn"
                                onClick={() =>
                                    alert(
                                        "Account deactivation will be connected after the backend endpoint is added."
                                    )
                                }
                            >
                                Deactivate
                            </button>

                        </div>

                        <div className="settings-divider" />

                        <div className="danger-row">

                            <div>
                                <h3>Delete Account</h3>
                                <p>
                                    Permanently delete your recruiter
                                    account and associated data.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="danger-btn"
                                onClick={() =>
                                    alert(
                                        "Account deletion will be connected after the backend endpoint is added."
                                    )
                                }
                            >
                                Delete Account
                            </button>

                        </div>

                        <div className="danger-note">
                            Account deletion is intentionally not
                            connected yet because your backend does
                            not currently have a dedicated delete-account
                            endpoint.
                        </div>

                    </div>

                </section>

            </div>

        </div>
    );
}


/* =========================================================
   PASSWORD FIELD
   ========================================================= */

function PasswordField({
    label,
    value,
    setValue,
    show,
    setShow,
    placeholder
}) {
    return (
        <div className="password-field">

            <label>{label}</label>

            <div className="password-input-wrapper">

                <input
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={(e) =>
                        setValue(e.target.value)
                    }
                    placeholder={placeholder}
                />

                <button
                    type="button"
                    onClick={() =>
                        setShow(!show)
                    }
                    aria-label={
                        show
                            ? "Hide password"
                            : "Show password"
                    }
                >
                    {show
                        ? <FaEyeSlash />
                        : <FaEye />
                    }
                </button>

            </div>

        </div>
    );
}


/* =========================================================
   TOGGLE
   ========================================================= */

function SettingToggle({
    icon,
    title,
    description,
    checked,
    onChange
}) {
    return (
        <div className="setting-toggle-row">

            <div className="toggle-icon">
                {icon}
            </div>

            <div className="toggle-content">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>

            <button
                type="button"
                className={`toggle-switch ${
                    checked ? "checked" : ""
                }`}
                onClick={onChange}
                aria-label={`Toggle ${title}`}
                aria-pressed={checked}
            >
                <span />
            </button>

        </div>
    );
}

export default RecruiterSettings;