import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
    getRecruiterSettings,
    updateRecruiterSettings,
    changePassword,
    deactivateAccount,
    requestAccountDeletion
} from "../services/RecruiterSettingsService";

import "../styles/RecruiterSettings.css";

const RecruiterSettings = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    // ================================
    // SETTINGS
    // ================================

    const [settings, setSettings] = useState({
        defaultLocation: "",
        employmentType: "Full Time",
        salaryVisibility: "Disclose",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // ================================
    // PASSWORD
    // ================================

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [changingPassword, setChangingPassword] = useState(false);

    // ================================
    // DEACTIVATION
    // ================================

    const [showDeactivateModal, setShowDeactivateModal] = useState(false);
    const [deactivating, setDeactivating] = useState(false);

    // ================================
// ACCOUNT DELETION
// ================================

const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deleting, setDeleting] = useState(false);

    // ================================
    // LOAD SETTINGS
    // ================================

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            setLoading(true);

            const response = await getRecruiterSettings();

            if (response?.data) {
                setSettings({
                    defaultLocation:
                        response.data.defaultLocation || "",

                    employmentType:
                        response.data.employmentType || "Full Time",

                    salaryVisibility:
                        response.data.salaryVisibility || "Disclose",
                });
            }
        } catch (error) {
            console.error(
                "Failed to load recruiter settings:",
                error
            );

            setErrorMessage(
                error?.response?.data?.message ||
                "Failed to load settings."
            );
        } finally {
            setLoading(false);
        }
    };

    // ================================
    // SETTINGS CHANGE
    // ================================

    const handleSettingChange = (e) => {
        const { name, value } = e.target;

        setSettings((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    // ================================
    // SAVE SETTINGS
    // ================================

    const handleSaveSettings = async () => {
        try {
            setSaving(true);
            setSuccessMessage("");
            setErrorMessage("");

            await updateRecruiterSettings(settings);

            setSuccessMessage(
                "Preferences saved successfully."
            );
        } catch (error) {
            console.error(
                "Failed to save settings:",
                error
            );

            setErrorMessage(
                error?.response?.data?.message ||
                "Failed to save preferences."
            );
        } finally {
            setSaving(false);
        }
    };

    // ================================
    // CHANGE PASSWORD
    // ================================

    const handleChangePassword = async (e) => {
        e.preventDefault();

        setPasswordMessage("");
        setPasswordError("");

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

        try {
            setChangingPassword(true);

            await changePassword(
                currentPassword,
                newPassword
            );

            setPasswordMessage(
                "Password changed successfully."
            );

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

        } catch (error) {
            console.error(
                "Password change failed:",
                error
            );

            setPasswordError(
                error?.response?.data?.message ||
                "Failed to change password."
            );
        } finally {
            setChangingPassword(false);
        }
    };

    // ================================
    // DEACTIVATE ACCOUNT
    // ================================

    const handleDeactivateAccount = async () => {

        try {
            setDeactivating(true);

            /*
             * Call backend:
             *
             * PUT /user/deactivate
             */
            const response = await deactivateAccount();

            console.log(
                "Account deactivation response:",
                response?.data
            );

            /*
             * IMPORTANT:
             *
             * Clear authentication using AuthContext.
             *
             * This changes:
             *
             * token -> null
             * role -> null
             * name -> null
             *
             * Therefore:
             *
             * isAuthenticated -> false
             *
             * Navbar will automatically render GuestNav.
             */
            logout();

            /*
             * Close confirmation modal.
             */
            setShowDeactivateModal(false);

            /*
             * Redirect to public home page.
             */
            navigate("/", {
                replace: true,
            });

        } catch (error) {

            console.error(
                "Account deactivation failed:",
                error
            );

            setDeactivating(false);

            setShowDeactivateModal(false);

            setErrorMessage(
                error?.response?.data?.message ||
                error?.response?.data ||
                "Failed to deactivate your account."
            );
        }
    };

    // ================================
    // DELETE ACCOUNT
    // ================================

  const handleDeleteAccount = async () => {
    try {
        setDeleting(true);

        const response = await requestAccountDeletion();

        console.log(
            "Account deletion response:",
            response?.data
        );

        // Clear authentication
        logout();

        // Close modal
        setShowDeleteModal(false);

        // Redirect to public home page
        navigate("/", {
            replace: true,
        });

    } catch (error) {

        console.error(
            "Account deletion request failed:",
            error
        );

        setDeleting(false);

        setShowDeleteModal(false);

        setErrorMessage(
            error?.response?.data?.message ||
            error?.response?.data ||
            "Failed to request account deletion."
        );
    }
};

    // ================================
    // BACK TO DASHBOARD
    // ================================

    const handleBackToDashboard = () => {
        navigate("/recruiterDashboard");
    };

    // ================================
    // LOADING
    // ================================

    if (loading) {
        return (
            <div className="settings-page">
                <div className="settings-loading">
                    Loading settings...
                </div>
            </div>
        );
    }

    // ================================
    // UI
    // ================================

    return (
        <div className="settings-page">

            {/* ================================
                HEADER
            ================================= */}

            <div className="settings-header">

                <div>
                    <h1>Settings</h1>

                    <p>
                        Manage your recruiter account and preferences.
                    </p>
                </div>

                <button
                    className="back-dashboard-btn"
                    onClick={handleBackToDashboard}
                >
                    ← Back to Dashboard
                </button>

            </div>


            {/* ================================
                ACCOUNT
            ================================= */}

            <section className="settings-section">

                <div className="section-heading account-heading">

                    <div className="section-icon">
                        👤
                    </div>

                    <div>
                        <h2>Account</h2>

                        <p>
                            Manage your recruiter account information.
                        </p>
                    </div>

                </div>


                <div className="settings-card">

                    <div className="settings-row">

                        <div className="row-icon">
                            👤
                        </div>

                        <div className="row-content">

                            <h3>
                                My Profile
                            </h3>

                            <p>
                                Update your name, designation,
                                profile photo and other information.
                            </p>

                        </div>

                        <button
                            className="row-action"
                            onClick={() =>
                                navigate("/recruiter/profile")
                            }
                        >
                            Open →
                        </button>

                    </div>


                    <div className="settings-divider"></div>


                    <div className="settings-row">

                        <div className="row-icon">
                            ✉
                        </div>

                        <div className="row-content">

                            <h3>
                                Account Information
                            </h3>

                            <p>
                                Name: Recruiter

                                <span className="row-separator">
                                    |
                                </span>

                                Role: RECRUITER
                            </p>

                        </div>

                        <span className="readonly-badge">
                            Read only
                        </span>

                    </div>

                </div>

            </section>


            {/* ================================
                NOTIFICATIONS
            ================================= */}

            <section className="settings-section">

                <div className="section-heading notification-heading">

                    <div className="section-icon">
                        🔔
                    </div>

                    <div>

                        <h2>
                            Notifications
                        </h2>

                        <p>
                            Choose which recruiter notifications
                            you want to receive.
                        </p>

                    </div>

                </div>


                <div className="settings-card">

                    <div className="notification-row">

                        <div className="row-icon">
                            👥
                        </div>

                        <div className="row-content">

                            <h3>
                                New Applicant Alerts
                            </h3>

                            <p>
                                Get notified when a candidate
                                applies to your job.
                            </p>

                        </div>

                        <input
                            type="checkbox"
                            defaultChecked
                        />

                    </div>


                    <div className="notification-row">

                        <div className="row-icon">
                            ✉
                        </div>

                        <div className="row-content">

                            <h3>
                                Email Notifications
                            </h3>

                            <p>
                                Receive important recruiter
                                updates through email.
                            </p>

                        </div>

                        <input type="checkbox" />

                    </div>


                    <div className="notification-row">

                        <div className="row-icon">
                            ◷
                        </div>

                        <div className="row-content">

                            <h3>
                                Job Expiry Reminders
                            </h3>

                            <p>
                                Get reminded when your job postings
                                are approaching expiry.
                            </p>

                        </div>

                        <input
                            type="checkbox"
                            defaultChecked
                        />

                    </div>


                    <p className="saved-note">
                        Notification preferences are currently
                        saved on this account.
                    </p>

                </div>

            </section>


            {/* ================================
                JOB PREFERENCES
            ================================= */}

            <section className="settings-section">

                <div className="section-heading preference-heading">

                    <div className="section-icon">
                        💼
                    </div>

                    <div>

                        <h2>
                            Job Preferences
                        </h2>

                        <p>
                            Configure your default job posting preferences.
                        </p>

                    </div>

                </div>


                <div className="settings-card preferences-card">

                    <div className="preference-grid">

                        <div className="form-group">

                            <label>
                                📍 Default Location
                            </label>

                            <input
                                type="text"
                                name="defaultLocation"
                                value={settings.defaultLocation}
                                onChange={handleSettingChange}
                                placeholder="e.g. Mumbai"
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                🏢 Employment Type
                            </label>

                            <select
                                name="employmentType"
                                value={settings.employmentType}
                                onChange={handleSettingChange}
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

                                <option value="Remote">
                                    Remote
                                </option>

                            </select>

                        </div>


                        <div className="form-group">

                            <label>
                                Salary Visibility
                            </label>

                            <select
                                name="salaryVisibility"
                                value={settings.salaryVisibility}
                                onChange={handleSettingChange}
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


                    {successMessage && (
                        <div className="success-message">
                            ✓ {successMessage}
                        </div>
                    )}


                    {errorMessage && (
                        <div className="error-message">
                            {errorMessage}
                        </div>
                    )}


                    <div className="preferences-footer">

                        <button
                            className="primary-btn"
                            onClick={handleSaveSettings}
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : "Save Preferences"}
                        </button>

                    </div>

                </div>

            </section>


            {/* ================================
                SECURITY
            ================================= */}

            <section className="settings-section">

                <div className="section-heading security-heading">

                    <div className="section-icon">
                        🛡
                    </div>

                    <div>

                        <h2>
                            Security
                        </h2>

                        <p>
                            Protect your recruiter account.
                        </p>

                    </div>

                </div>


                <div className="settings-card password-card">

                    <div className="password-title">

                        <div className="row-icon purple-icon">
                            🔒
                        </div>

                        <div>

                            <h3>
                                Change Password
                            </h3>

                            <p>
                                Use a strong password that you
                                don't use elsewhere.
                            </p>

                        </div>

                    </div>


                    <form onSubmit={handleChangePassword}>

                        <div className="password-field">

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
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowCurrentPassword(
                                            !showCurrentPassword
                                        )
                                    }
                                >
                                    {showCurrentPassword
                                        ? "🙈"
                                        : "👁"}
                                </button>

                            </div>

                        </div>


                        <div className="password-field">

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
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowNewPassword(
                                            !showNewPassword
                                        )
                                    }
                                >
                                    {showNewPassword
                                        ? "🙈"
                                        : "👁"}
                                </button>

                            </div>

                        </div>


                        <div className="password-field">

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
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                >
                                    {showConfirmPassword
                                        ? "🙈"
                                        : "👁"}
                                </button>

                            </div>

                        </div>


                        {passwordMessage && (
                            <div className="success-message">
                                ✓ {passwordMessage}
                            </div>
                        )}


                        {passwordError && (
                            <div className="error-message">
                                {passwordError}
                            </div>
                        )}


                        <button
                            type="submit"
                            className="change-password-btn"
                            disabled={changingPassword}
                        >
                            🔒{" "}
                            {changingPassword
                                ? "Changing..."
                                : "Change Password"}
                        </button>

                    </form>

                </div>

            </section>


            {/* ================================
                DANGER ZONE
            ================================= */}

            <section className="settings-section danger-section">

                <div className="section-heading danger-heading">

                    <div className="section-icon">
                        ⚠
                    </div>

                    <div>

                        <h2>
                            Danger Zone
                        </h2>

                        <p>
                            Actions that can affect your account.
                        </p>

                    </div>

                </div>


                <div className="danger-card">

                    {/* DEACTIVATE */}

                    <div className="danger-row">

                        <div className="danger-content">

                            <h3>
                                Deactivate Account
                            </h3>

                            <p>
                                Temporarily disable your recruiter
                                account. You can activate it again
                                simply by logging in.
                            </p>

                        </div>


                        <button
                            className="deactivate-btn"
                            onClick={() =>
                                setShowDeactivateModal(true)
                            }
                        >
                            ⏻ Deactivate
                        </button>

                    </div>


                    <div className="danger-divider"></div>


                    {/* DELETE */}

                    <div className="danger-row">

                        <div className="danger-content">

                            <h3>
                                Delete Account
                            </h3>

                            <p>
                                Permanently delete your recruiter
                                account and associated data.
                            </p>

                        </div>


                    <button
    className="delete-btn"
    onClick={() => setShowDeleteModal(true)}
>
    🗑 Delete Account
</button>

                    </div>


                   <div className="delete-warning">

    Account deletion starts a 30-day grace period.
    You can recover your account by logging in during
    this period. After 30 days, the account will be
    permanently deleted.

</div>

                </div>

            </section>


            {/* ================================
                DEACTIVATION CONFIRMATION MODAL
            ================================= */}

            {showDeactivateModal && (

                <div className="modal-overlay">

                    <div className="confirmation-modal">

                        <div className="modal-icon">
                            ⚠
                        </div>


                        <h2>
                            Deactivate Account?
                        </h2>


                        <p>
                            Your recruiter account will be
                            deactivated immediately.
                        </p>


                        <p>
                            You will be logged out and won't be able
                            to use your account until you log in again.
                        </p>


                        <div className="modal-actions">

                            <button
                                className="modal-cancel-btn"
                                onClick={() =>
                                    setShowDeactivateModal(false)
                                }
                                disabled={deactivating}
                            >
                                Cancel
                            </button>


                            <button
                                className="modal-confirm-btn"
                                onClick={handleDeactivateAccount}
                                disabled={deactivating}
                            >
                                {deactivating
                                    ? "Deactivating..."
                                    : "Yes, Deactivate"}
                            </button>

                        </div>

                    </div>

                </div>

            )}

            {/* ================================
            DELETE ACCOUNT CONFIRMATION MODAL
            ================================= */}

{showDeleteModal && (

    <div className="modal-overlay">

        <div className="confirmation-modal delete-confirmation-modal">

            <div className="modal-icon delete-modal-icon">
                ⚠
            </div>

            <h2>
                Delete Account?
            </h2>

            <p>
                Your account will be scheduled for permanent deletion.
            </p>

            <p>
                You will have <strong>30 days</strong> to recover
                your account by logging in.
            </p>

            <p className="delete-modal-warning">
                After the 30-day grace period, your account and
                associated data will be permanently deleted.
                This action cannot be undone.
            </p>

            <div className="modal-actions">

                <button
                    className="modal-cancel-btn"
                    onClick={() =>
                        setShowDeleteModal(false)
                    }
                    disabled={deleting}
                >
                    Cancel
                </button>

                <button
                    className="modal-delete-btn"
                    onClick={handleDeleteAccount}
                    disabled={deleting}
                >
                    {deleting
                        ? "Processing..."
                        : "Yes, Delete Account"}
                </button>

            </div>

        </div>

    </div>

)}

        </div>
        
    );
};

export default RecruiterSettings;