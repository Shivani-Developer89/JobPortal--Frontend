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
    FaEnvelope,
    FaUsers,
    FaClock,
    FaMapMarkerAlt,
    FaBuilding,
    FaTrash,
    FaPowerOff,
} from "react-icons/fa";


import "../styles/RecruiterSettings.css";

import {
    getRecruiterSettings,
    updateRecruiterSettings,
    changePassword,
} from "../services/RecruiterSettingsService";


function RecruiterSettings() {

    const navigate = useNavigate();

    // =========================================================
    // SETTINGS STATE
    // =========================================================

    const [settings, setSettings] = useState({
        defaultLocation: "",
        employmentType: "Full Time",
        salaryVisibility: "Disclose",
        newApplicants: true,
        emailNotifications: true,
        jobExpiryReminders: true,
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    // =========================================================
    // PASSWORD STATE
    // =========================================================

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [changingPassword, setChangingPassword] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordError, setPasswordError] = useState("");


    // =========================================================
    // LOAD SETTINGS
    // =========================================================

    useEffect(() => {

        const loadSettings = async () => {

            try {

                setLoading(true);
                setError("");

                const response = await getRecruiterSettings();

                const data = response.data || {};

                setSettings({
                    defaultLocation: data.defaultLocation || "",
                    employmentType:
                        data.employmentType || "Full Time",
                    salaryVisibility:
                        data.salaryVisibility || "Disclose",
                    newApplicants:
                        data.newApplicants ?? true,
                    emailNotifications:
                        data.emailNotifications ?? true,
                    jobExpiryReminders:
                        data.jobExpiryReminders ?? true,
                });

            } catch (err) {

                console.error(
                    "Failed to load recruiter settings:",
                    err
                );

                setError(
                    err.response?.data?.message ||
                    "Failed to load settings."
                );

            } finally {

                setLoading(false);

            }
        };

        loadSettings();

    }, []);


    // =========================================================
    // SETTINGS CHANGE
    // =========================================================

    const handleSettingChange = (field, value) => {

        setSettings((previous) => ({
            ...previous,
            [field]: value,
        }));

        setMessage("");
        setError("");
    };


    // =========================================================
    // SAVE SETTINGS
    // =========================================================

    const handleSavePreferences = async () => {

        try {

            setSaving(true);
            setMessage("");
            setError("");

            await updateRecruiterSettings(settings);

            setMessage("Preferences saved successfully.");

        } catch (err) {

            console.error(
                "Failed to update recruiter settings:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to save preferences."
            );

        } finally {

            setSaving(false);

        }
    };


    // =========================================================
    // CHANGE PASSWORD
    // =========================================================

    const handleChangePassword = async (event) => {

        event.preventDefault();

        setPasswordMessage("");
        setPasswordError("");

        // Empty fields
        if (
            !currentPassword ||
            !newPassword ||
            !confirmPassword
        ) {
            setPasswordError(
                "Please fill in all password fields."
            );
            return;
        }

        // Password match
        if (newPassword !== confirmPassword) {

            setPasswordError(
                "New password and confirm password do not match."
            );

            return;
        }

        // Basic password validation
        if (newPassword.length < 6) {

            setPasswordError(
                "New password must contain at least 6 characters."
            );

            return;
        }

        // Don't allow same password
        if (currentPassword === newPassword) {

            setPasswordError(
                "New password must be different from your current password."
            );

            return;
        }

        try {

            setChangingPassword(true);

            const response = await changePassword(
                currentPassword,
                newPassword
            );

            setPasswordMessage(
                response.data ||
                "Password changed successfully."
            );

            // Clear fields
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

        } catch (err) {

            console.error(
                "Failed to change password:",
                err
            );

            setPasswordError(
                err.response?.data?.message ||
                err.response?.data ||
                "Failed to change password."
            );

        } finally {

            setChangingPassword(false);

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
    // LOADING
    // =========================================================

    if (loading) {

        return (
            <div className="recruiter-settings-page">

                <div className="settings-loading">
                    Loading settings...
                </div>

            </div>
        );
    }


    // =========================================================
    // UI
    // =========================================================

    return (

        <div className="recruiter-settings-page">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="settings-header">

                <div>

                    <h1>Settings</h1>

                    <p>
                        Manage your recruiter account and preferences.
                    </p>

                </div>

                <button
                    type="button"
                    className="back-dashboard-btn"
                    onClick={() =>
                        navigate("/")
                    }
                >
                    <FaArrowLeft />
                    <span>Home</span>
                </button>

            </div>


            {/* =================================================
                ACCOUNT
            ================================================= */}

            <section className="settings-section">

                <div className="settings-section-title">

                    <div className="settings-section-icon account-icon">
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

                    {/* My Profile */}

                    <div
                        className="settings-row clickable-row"
                        onClick={() =>
                            navigate("/recruiter/profile")
                        }
                    >

                        <div className="settings-row-icon">
                            <FaUser />
                        </div>

                        <div className="settings-row-content">

                            <strong>My Profile</strong>

                            <span>
                                Update your name, designation,
                                profile photo and other information.
                            </span>

                        </div>

                        <div className="settings-row-action">
                            <span>Open</span>
                            <FaArrowLeft className="open-arrow" />
                        </div>

                    </div>


                    <div className="settings-divider" />


                    {/* Account Information */}

                    <div className="settings-row">

                        <div className="settings-row-icon">
                            <FaEnvelope />
                        </div>

                        <div className="settings-row-content">

                            <strong>Account Information</strong>

                            <span>
                                Name:{" "}
                                {localStorage.getItem("userName") ||
                                    "Recruiter"}
                            </span>

                            <span>
                                Role: RECRUITER
                            </span>

                        </div>

                        <span className="readonly-badge">
                            Read only
                        </span>

                    </div>

                </div>

            </section>


            {/* =================================================
                NOTIFICATIONS
            ================================================= */}

            <section className="settings-section">

                <div className="settings-section-title">

                    <div className="settings-section-icon notification-icon">
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

                    {/* New Applicants */}

                    <div className="settings-row">

                        <div className="settings-row-icon">
                            <FaUsers />
                        </div>

                        <div className="settings-row-content">

                            <strong>
                                New Applicant Alerts
                            </strong>

                            <span>
                                Get notified when a candidate
                                applies to your job.
                            </span>

                        </div>

                        <label className="settings-switch">

                            <input
                                type="checkbox"
                                checked={settings.newApplicants}
                                onChange={(e) =>
                                    handleSettingChange(
                                        "newApplicants",
                                        e.target.checked
                                    )
                                }
                            />

                            <span className="settings-slider"></span>

                        </label>

                    </div>


                    <div className="settings-divider" />


                    {/* Email Notifications */}

                    <div className="settings-row">

                        <div className="settings-row-icon">
                            <FaEnvelope />
                        </div>

                        <div className="settings-row-content">

                            <strong>
                                Email Notifications
                            </strong>

                            <span>
                                Receive important recruiter
                                updates through email.
                            </span>

                        </div>

                        <label className="settings-switch">

                            <input
                                type="checkbox"
                                checked={settings.emailNotifications}
                                onChange={(e) =>
                                    handleSettingChange(
                                        "emailNotifications",
                                        e.target.checked
                                    )
                                }
                            />

                            <span className="settings-slider"></span>

                        </label>

                    </div>


                    <div className="settings-divider" />


                    {/* Job Expiry */}

                    <div className="settings-row">

                        <div className="settings-row-icon">
                            <FaClock />
                        </div>

                        <div className="settings-row-content">

                            <strong>
                                Job Expiry Reminders
                            </strong>

                            <span>
                                Get reminded when your job
                                postings are approaching expiry.
                            </span>

                        </div>

                        <label className="settings-switch">

                            <input
                                type="checkbox"
                                checked={settings.jobExpiryReminders}
                                onChange={(e) =>
                                    handleSettingChange(
                                        "jobExpiryReminders",
                                        e.target.checked
                                    )
                                }
                            />

                            <span className="settings-slider"></span>

                        </label>

                    </div>


                    <div className="settings-note">
                        Notification preferences are currently
                        saved on this account.
                    </div>

                </div>

            </section>


            {/* =================================================
                JOB PREFERENCES
            ================================================= */}

            <section className="settings-section">

                <div className="settings-section-title">

                    <div className="settings-section-icon job-icon">
                        <FaBriefcase />
                    </div>

                    <div>
                        <h2>Job Preferences</h2>

                        <p>
                            Configure your default job posting
                            preferences.
                        </p>
                    </div>

                </div>


                <div className="settings-card preferences-card">

                    <div className="preferences-grid">

                        {/* Location */}

                        <div className="settings-field">

                            <label>
                                <FaMapMarkerAlt />
                                Default Location
                            </label>

                            <input
                                type="text"
                                value={settings.defaultLocation}
                                onChange={(e) =>
                                    handleSettingChange(
                                        "defaultLocation",
                                        e.target.value
                                    )
                                }
                                placeholder="e.g. Delhi"
                            />

                        </div>


                        {/* Employment Type */}

                        <div className="settings-field">

                            <label>
                                <FaBuilding />
                                Employment Type
                            </label>

                            <select
                                value={settings.employmentType}
                                onChange={(e) =>
                                    handleSettingChange(
                                        "employmentType",
                                        e.target.value
                                    )
                                }
                            >

                                <option value="Full Time">
                                    Full Time
                                </option>

                                <option value="Part Time">
                                    Part Time
                                </option>

                                <option value="Contract">
                                    Contract
                                </option>

                                <option value="Internship">
                                    Internship
                                </option>

                                <option value="Temporary">
                                    Temporary
                                </option>

                            </select>

                        </div>


                        {/* Salary Visibility */}

                        <div className="settings-field">

                            <label>
                                Salary Visibility
                            </label>

                            <select
                                value={settings.salaryVisibility}
                                onChange={(e) =>
                                    handleSettingChange(
                                        "salaryVisibility",
                                        e.target.value
                                    )
                                }
                            >

                                <option value="Disclose">
                                    Disclose
                                </option>

                                <option value="Hide">
                                    Hide
                                </option>

                            </select>

                        </div>

                    </div>


                    <div className="preferences-actions">

                        {message && (

                            <span className="settings-success">
                                <FaCheckCircle />
                                {message}
                            </span>

                        )}

                        {error && (

                            <span className="settings-error">
                                {error}
                            </span>

                        )}

                        <button
                            type="button"
                            className="save-preferences-btn"
                            onClick={handleSavePreferences}
                            disabled={saving}
                        >

                            {saving
                                ? "Saving..."
                                : "Save Preferences"}

                        </button>

                    </div>

                </div>

            </section>


            {/* =================================================
                SECURITY
            ================================================= */}

            <section className="settings-section">

                <div className="settings-section-title">

                    <div className="settings-section-icon security-icon">
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

                        <div className="settings-row-icon password-icon">
                            <FaLock />
                        </div>

                        <div>

                            <strong>
                                Change Password
                            </strong>

                            <span>
                                Use a strong password that you
                                don't use elsewhere.
                            </span>

                        </div>

                    </div>


                    <div className="settings-divider" />


                    <form onSubmit={handleChangePassword}>

                        {/* Current Password */}

                        <div className="settings-field password-field">

                            <label>
                                Current Password
                            </label>

                            <div className="password-input-wrapper">

                                <input
                                    type={
                                        showCurrentPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={currentPassword}
                                    onChange={(e) =>
                                        setCurrentPassword(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter current password"
                                />

                                <button
                                    type="button"
                                    className="password-eye-btn"
                                    onClick={() =>
                                        setShowCurrentPassword(
                                            !showCurrentPassword
                                        )
                                    }
                                    aria-label={
                                        showCurrentPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >

                                    {showCurrentPassword
                                        ? <FaEyeSlash />
                                        : <FaEye />}

                                </button>

                            </div>

                        </div>


                        {/* New Password */}

                        <div className="settings-field password-field">

                            <label>
                                New Password
                            </label>

                            <div className="password-input-wrapper">

                                <input
                                    type={
                                        showNewPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter new password"
                                />

                                <button
                                    type="button"
                                    className="password-eye-btn"
                                    onClick={() =>
                                        setShowNewPassword(
                                            !showNewPassword
                                        )
                                    }
                                    aria-label={
                                        showNewPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >

                                    {showNewPassword
                                        ? <FaEyeSlash />
                                        : <FaEye />}

                                </button>

                            </div>

                        </div>


                        {/* Confirm Password */}

                        <div className="settings-field password-field">

                            <label>
                                Confirm New Password
                            </label>

                            <div className="password-input-wrapper">

                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Confirm new password"
                                />

                                <button
                                    type="button"
                                    className="password-eye-btn"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    aria-label={
                                        showConfirmPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >

                                    {showConfirmPassword
                                        ? <FaEyeSlash />
                                        : <FaEye />}

                                </button>

                            </div>

                        </div>


                        {/* Password Error */}

                        {passwordError && (

                            <div className="password-error">
                                {passwordError}
                            </div>

                        )}


                        {/* Password Success */}

                        {passwordMessage && (

                            <div className="password-success">
                                <FaCheckCircle />
                                {passwordMessage}
                            </div>

                        )}


                        <button
                            type="submit"
                            className="change-password-btn"
                            disabled={changingPassword}
                        >

                            <FaLock />

                            {changingPassword
                                ? "Changing Password..."
                                : "Change Password"}

                        </button>

                    </form>

                </div>

            </section>


            {/* =================================================
                DANGER ZONE
            ================================================= */}

            <section className="settings-section danger-section">

                <div className="settings-section-title">

                    <div className="settings-section-icon danger-icon">
                        <FaExclamationTriangle />
                    </div>

                    <div>
                        <h2>Danger Zone</h2>

                        <p>
                            Actions that can affect your account.
                        </p>
                    </div>

                </div>


                <div className="settings-card danger-card">

                    {/* Deactivate */}

                    <div className="danger-row">

                        <div>

                            <strong>
                                Deactivate Account
                            </strong>

                            <span>
                                Temporarily disable your recruiter
                                account.
                            </span>

                        </div>

                        <button
                            type="button"
                            className="deactivate-btn"
                            onClick={() =>
                                alert(
                                    "Account deactivation is not connected yet."
                                )
                            }
                        >

                            <FaPowerOff />

                            Deactivate

                        </button>

                    </div>


                    <div className="settings-divider" />


                    {/* Delete */}

                    <div className="danger-row">

                        <div>

                            <strong>
                                Delete Account
                            </strong>

                            <span>
                                Permanently delete your recruiter
                                account and associated data.
                            </span>

                        </div>

                        <button
                            type="button"
                            className="delete-account-btn"
                            onClick={() =>
                                alert(
                                    "Account deletion is not connected yet because the backend does not currently have a dedicated delete-account endpoint."
                                )
                            }
                        >

                            <FaTrash />

                            Delete Account

                        </button>

                    </div>


                    <div className="danger-note">

                        Account deletion is intentionally not
                        connected yet because the backend does not
                        currently have a dedicated delete-account
                        endpoint.

                    </div>

                </div>

            </section>

        </div>
    );
}

export default RecruiterSettings;