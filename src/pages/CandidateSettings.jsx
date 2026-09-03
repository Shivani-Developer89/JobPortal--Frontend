import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaUser,
    FaLock,
    FaExclamationTriangle,
    FaTrash,
    FaPowerOff,
    FaSave,
    FaTimes,
    FaBell,
    FaBriefcase,
    FaMapMarkerAlt,
} from "react-icons/fa";

import {
    getMyAccount,
    updateMyAccount,
    changePassword,
    deactivateAccount,
    requestAccountDeletion,
    getCandidateSettings,
    updateCandidateSettings,
} from "../services/CandidateSettingsService";

import { useAuth } from "../context/AuthContext";

import "../styles/CandidateSettings.css";


function CandidateSettings() {

    const navigate = useNavigate();

    const { logout } = useAuth();


    // =====================================================
    // Account Information
    // =====================================================

    const [account, setAccount] = useState({
        name: "",
        email: "",
    });

    const [loading, setLoading] = useState(true);

    const [savingAccount, setSavingAccount] =
        useState(false);


    // =====================================================
    // Candidate Job Preferences
    // =====================================================

    const [settings, setSettings] = useState({
        jobAlerts: true,
        emailNotifications: true,
        applicationUpdates: true,
        preferredLocation: "",
        employmentType: "Full Time",
        workMode: "Any",
    });

    const [savingSettings, setSavingSettings] =
        useState(false);


    // =====================================================
    // Password
    // =====================================================

    const [currentPassword, setCurrentPassword] =
        useState("");

    const [newPassword, setNewPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [changingPassword, setChangingPassword] =
        useState(false);


    // =====================================================
    // Messages
    // =====================================================

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");


    // =====================================================
    // Confirmation Modals
    // =====================================================

    const [showDeactivateModal, setShowDeactivateModal] =
        useState(false);

    const [showDeleteModal, setShowDeleteModal] =
        useState(false);


    // =====================================================
    // Load Settings
    // =====================================================

    useEffect(() => {

        loadAccount();

        loadCandidateSettings();

    }, []);


    // =====================================================
    // Load Account
    // =====================================================

    const loadAccount = async () => {

        try {

            setLoading(true);

            const response =
                await getMyAccount();

            setAccount({
                name: response.data.name || "",
                email: response.data.email || "",
            });

        } catch (err) {

            console.error(
                "Failed to load account:",
                err
            );

            setError(
                err.response?.data ||
                "Failed to load account information."
            );

        } finally {

            setLoading(false);

        }
    };


    // =====================================================
    // Load Candidate Settings
    // =====================================================

    const loadCandidateSettings = async () => {

        try {

            const response =
                await getCandidateSettings();

            setSettings({

                jobAlerts:
                    response.data.jobAlerts ?? true,

                emailNotifications:
                    response.data.emailNotifications ?? true,

                applicationUpdates:
                    response.data.applicationUpdates ?? true,

                preferredLocation:
                    response.data.preferredLocation || "",

                employmentType:
                    response.data.employmentType ||
                    "Full Time",

                workMode:
                    response.data.workMode ||
                    "Any",

            });

        } catch (err) {

            console.error(
                "Failed to load candidate settings:",
                err
            );

            setError(
                err.response?.data ||
                "Failed to load job preferences."
            );
        }
    };


    // =====================================================
    // Account Input
    // =====================================================

    const handleAccountChange = (e) => {

        const { name, value } = e.target;

        setAccount((prev) => ({
            ...prev,
            [name]: value,
        }));

    };


    // =====================================================
    // Update Account
    // =====================================================

    const handleAccountSubmit = async (e) => {

        e.preventDefault();

        setMessage("");

        setError("");

        if (!account.name.trim()) {

            setError(
                "Name cannot be empty."
            );

            return;
        }

        try {

            setSavingAccount(true);

            const response =
                await updateMyAccount({

                    name: account.name,

                    email: account.email,

                });

            setMessage(
                response.data ||
                "Account information updated successfully."
            );

        } catch (err) {

            console.error(
                "Update account error:",
                err
            );

            setError(
                err.response?.data ||
                "Failed to update account information."
            );

        } finally {

            setSavingAccount(false);

        }
    };


    // =====================================================
    // Candidate Settings Input
    // =====================================================

    const handleSettingsChange = (e) => {

        const {
            name,
            value,
            type,
            checked,
        } = e.target;

        setSettings((prev) => ({

            ...prev,

            [name]:
                type === "checkbox"
                    ? checked
                    : value,

        }));

    };


    // =====================================================
    // Update Candidate Settings
    // =====================================================

    const handleSettingsSubmit = async (e) => {

        e.preventDefault();

        setMessage("");

        setError("");

        try {

            setSavingSettings(true);

            const response =
                await updateCandidateSettings(
                    settings
                );

            setSettings({

                jobAlerts:
                    response.data.jobAlerts ?? true,

                emailNotifications:
                    response.data.emailNotifications ?? true,

                applicationUpdates:
                    response.data.applicationUpdates ?? true,

                preferredLocation:
                    response.data.preferredLocation || "",

                employmentType:
                    response.data.employmentType ||
                    "Full Time",

                workMode:
                    response.data.workMode ||
                    "Any",

            });

            setMessage(
                "Job preferences updated successfully."
            );

        } catch (err) {

            console.error(
                "Update candidate settings error:",
                err
            );

            setError(
                err.response?.data ||
                "Failed to update job preferences."
            );

        } finally {

            setSavingSettings(false);

        }
    };


    // =====================================================
    // Change Password
    // =====================================================

    const handlePasswordSubmit = async (e) => {

        e.preventDefault();

        setMessage("");

        setError("");


        if (
            !currentPassword ||
            !newPassword ||
            !confirmPassword
        ) {

            setError(
                "Please fill in all password fields."
            );

            return;
        }


        if (newPassword.length < 6) {

            setError(
                "New password must contain at least 6 characters."
            );

            return;
        }


        if (
            newPassword !==
            confirmPassword
        ) {

            setError(
                "New password and confirm password do not match."
            );

            return;
        }


        try {

            setChangingPassword(true);

            const response =
                await changePassword(
                    currentPassword,
                    newPassword
                );

            setMessage(
                response.data ||
                "Password changed successfully."
            );

            setCurrentPassword("");

            setNewPassword("");

            setConfirmPassword("");

        } catch (err) {

            console.error(
                "Change password error:",
                err
            );

            setError(
                err.response?.data ||
                "Failed to change password."
            );

        } finally {

            setChangingPassword(false);

        }
    };


    // =====================================================
    // Deactivate Account
    // =====================================================

    const handleDeactivate = async () => {

        try {

            setError("");

            await deactivateAccount();

            setShowDeactivateModal(false);

            logout();

            navigate("/", {
                replace: true,
            });

        } catch (err) {

            console.error(
                "Deactivate account error:",
                err
            );

            setShowDeactivateModal(false);

            setError(
                err.response?.data ||
                "Failed to deactivate account."
            );
        }
    };


    // =====================================================
    // Delete Account
    // =====================================================

    const handleDeleteAccount = async () => {

        try {

            setError("");

            await requestAccountDeletion();

            setShowDeleteModal(false);

            logout();

            navigate("/", {
                replace: true,
            });

        } catch (err) {

            console.error(
                "Delete account error:",
                err
            );

            setShowDeleteModal(false);

            setError(
                err.response?.data ||
                "Failed to request account deletion."
            );
        }
    };


    // =====================================================
    // Loading
    // =====================================================

    if (loading) {

        return (

            <div className="candidate-settings-page">

                <div className="candidate-settings-loading">

                    Loading settings...

                </div>

            </div>
        );
    }


    return (

        <div className="candidate-settings-page">

            <div className="candidate-settings-container">


                {/* ================================================= */}
                {/* Header */}
                {/* ================================================= */}

                <div className="candidate-settings-header">

                    <div>

                        <h1>
                            Settings
                        </h1>

                        <p>
                            Manage your account, security and preferences.
                        </p>

                    </div>

                </div>


                {/* ================================================= */}
                {/* Messages */}
                {/* ================================================= */}

                {message && (

                    <div className="settings-success-message">

                        {message}

                    </div>

                )}


                {error && (

                    <div className="settings-error-message">

                        {error}

                    </div>

                )}


                {/* ================================================= */}
                {/* Account Information */}
                {/* ================================================= */}

                <section className="settings-section">


                    <div className="settings-section-header">

                        <div className="settings-section-icon">

                            <FaUser />

                        </div>


                        <div>

                            <h2>
                                Account Information
                            </h2>

                            <p>
                                Update your basic account information.
                            </p>

                        </div>

                    </div>


                    <form
                        className="settings-form"
                        onSubmit={handleAccountSubmit}
                    >


                        <div className="settings-form-group">

                            <label>
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={account.name}
                                onChange={handleAccountChange}
                                placeholder="Enter your name"
                            />

                        </div>


                        <div className="settings-form-group">

                            <label>
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={account.email}
                                onChange={handleAccountChange}
                                placeholder="Enter your email"
                            />

                        </div>


                        <button
                            type="submit"
                            className="settings-save-btn"
                            disabled={savingAccount}
                        >

                            <FaSave />

                            {savingAccount
                                ? "Saving..."
                                : "Save Changes"}

                        </button>

                    </form>

                </section>


                {/* ================================================= */}
                {/* Job Preferences */}
                {/* ================================================= */}

                <section className="settings-section">


                    <div className="settings-section-header">

                        <div className="settings-section-icon">

                            <FaBriefcase />

                        </div>


                        <div>

                            <h2>
                                Job Preferences
                            </h2>

                            <p>
                                Manage your job alerts, notifications
                                and preferred job criteria.
                            </p>

                        </div>

                    </div>


                    <form
                        className="settings-form"
                        onSubmit={handleSettingsSubmit}
                    >


                        {/* ----------------------------------------- */}
                        {/* Job Alerts */}
                        {/* ----------------------------------------- */}

                        <div className="settings-preference-row">

                            <div className="settings-preference-info">

                                <h3>
                                    <FaBell />
                                    Job Alerts
                                </h3>

                                <p>
                                    Receive notifications about jobs
                                    matching your preferences.
                                </p>

                            </div>


                            <label className="settings-switch">

                                <input
                                    type="checkbox"
                                    name="jobAlerts"
                                    checked={settings.jobAlerts}
                                    onChange={handleSettingsChange}
                                />

                                <span className="settings-slider">
                                </span>

                            </label>

                        </div>


                        {/* ----------------------------------------- */}
                        {/* Email Notifications */}
                        {/* ----------------------------------------- */}

                        <div className="settings-preference-row">

                            <div className="settings-preference-info">

                                <h3>
                                    <FaBell />
                                    Email Notifications
                                </h3>

                                <p>
                                    Receive important job portal
                                    notifications by email.
                                </p>

                            </div>


                            <label className="settings-switch">

                                <input
                                    type="checkbox"
                                    name="emailNotifications"
                                    checked={
                                        settings.emailNotifications
                                    }
                                    onChange={handleSettingsChange}
                                />

                                <span className="settings-slider">
                                </span>

                            </label>

                        </div>


                        {/* ----------------------------------------- */}
                        {/* Application Updates */}
                        {/* ----------------------------------------- */}

                        <div className="settings-preference-row">

                            <div className="settings-preference-info">

                                <h3>
                                    <FaBriefcase />
                                    Application Updates
                                </h3>

                                <p>
                                    Get notified when there is an update
                                    to your job applications.
                                </p>

                            </div>


                            <label className="settings-switch">

                                <input
                                    type="checkbox"
                                    name="applicationUpdates"
                                    checked={
                                        settings.applicationUpdates
                                    }
                                    onChange={handleSettingsChange}
                                />

                                <span className="settings-slider">
                                </span>

                            </label>

                        </div>


                        {/* ----------------------------------------- */}
                        {/* Preferred Location */}
                        {/* ----------------------------------------- */}

                        <div className="settings-form-group">

                            <label>

                                <FaMapMarkerAlt />

                                Preferred Location

                            </label>


                            <input
                                type="text"
                                name="preferredLocation"
                                value={
                                    settings.preferredLocation
                                }
                                onChange={handleSettingsChange}
                                placeholder="e.g. Bangalore, Delhi, Mumbai"
                            />

                        </div>


                        {/* ----------------------------------------- */}
                        {/* Employment Type */}
                        {/* ----------------------------------------- */}

                        <div className="settings-form-group">

                            <label>
                                Employment Type
                            </label>


                            <select
                                name="employmentType"
                                value={
                                    settings.employmentType
                                }
                                onChange={handleSettingsChange}
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

                            </select>

                        </div>


                        {/* ----------------------------------------- */}
                        {/* Work Mode */}
                        {/* ----------------------------------------- */}

                        <div className="settings-form-group">

                            <label>
                                Preferred Work Mode
                            </label>


                            <select
                                name="workMode"
                                value={
                                    settings.workMode
                                }
                                onChange={handleSettingsChange}
                            >

                                <option value="Any">
                                    Any
                                </option>

                                <option value="On-site">
                                    On-site
                                </option>

                                <option value="Remote">
                                    Remote
                                </option>

                                <option value="Hybrid">
                                    Hybrid
                                </option>

                            </select>

                        </div>


                        {/* ----------------------------------------- */}
                        {/* Save Preferences */}
                        {/* ----------------------------------------- */}

                        <button
                            type="submit"
                            className="settings-save-btn"
                            disabled={savingSettings}
                        >

                            <FaSave />

                            {savingSettings
                                ? "Saving..."
                                : "Save Preferences"}

                        </button>

                    </form>

                </section>


                {/* ================================================= */}
                {/* Security */}
                {/* ================================================= */}

                <section className="settings-section">


                    <div className="settings-section-header">

                        <div className="settings-section-icon">

                            <FaLock />

                        </div>


                        <div>

                            <h2>
                                Security
                            </h2>

                            <p>
                                Change your password to keep your
                                account secure.
                            </p>

                        </div>

                    </div>


                    <form
                        className="settings-form"
                        onSubmit={handlePasswordSubmit}
                    >


                        <div className="settings-form-group">

                            <label>
                                Current Password
                            </label>

                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter current password"
                            />

                        </div>


                        <div className="settings-form-group">

                            <label>
                                New Password
                            </label>

                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter new password"
                            />

                        </div>


                        <div className="settings-form-group">

                            <label>
                                Confirm New Password
                            </label>

                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(
                                        e.target.value
                                    )
                                }
                                placeholder="Confirm new password"
                            />

                        </div>


                        <button
                            type="submit"
                            className="settings-save-btn"
                            disabled={changingPassword}
                        >

                            <FaLock />

                            {changingPassword
                                ? "Changing..."
                                : "Change Password"}

                        </button>

                    </form>

                </section>


                {/* ================================================= */}
                {/* Danger Zone */}
                {/* ================================================= */}

                <section className="settings-section danger-zone">


                    <div className="settings-section-header">

                        <div className="settings-section-icon danger-icon">

                            <FaExclamationTriangle />

                        </div>


                        <div>

                            <h2>
                                Danger Zone
                            </h2>

                            <p>
                                These actions affect your account access.
                            </p>

                        </div>

                    </div>


                    {/* ----------------------------------------- */}
                    {/* Deactivate */}
                    {/* ----------------------------------------- */}

                    <div className="danger-action">


                        <div className="danger-action-info">

                            <h3>
                                Deactivate Account
                            </h3>

                            <p>
                                Temporarily deactivate your account.
                                You can reactivate it simply by logging
                                in again.
                            </p>

                        </div>


                        <button
                            className="deactivate-btn"
                            onClick={() =>
                                setShowDeactivateModal(true)
                            }
                        >

                            <FaPowerOff />

                            Deactivate

                        </button>

                    </div>


                    {/* ----------------------------------------- */}
                    {/* Delete */}
                    {/* ----------------------------------------- */}

                    <div className="danger-action delete-action">


                        <div className="danger-action-info">

                            <h3>
                                Delete Account
                            </h3>

                            <p>
                                Request permanent deletion of your
                                account. You have 30 days to log in
                                and cancel the deletion request.
                            </p>

                        </div>


                        <button
                            className="delete-btn"
                            onClick={() =>
                                setShowDeleteModal(true)
                            }
                        >

                            <FaTrash />

                            Delete Account

                        </button>

                    </div>

                </section>

            </div>


            {/* ================================================= */}
            {/* DEACTIVATE MODAL */}
            {/* ================================================= */}

            {showDeactivateModal && (

                <div className="modal-overlay">


                    <div className="confirmation-modal">


                        <div className="modal-icon deactivate-modal-icon">

                            <FaPowerOff />

                        </div>


                        <h2>
                            Deactivate Account?
                        </h2>


                        <p>
                            Your account will be temporarily
                            deactivated.
                        </p>


                        <p>
                            You can reactivate your account at any
                            time by logging in again.
                        </p>


                        <div className="modal-actions">


                            <button
                                className="modal-cancel-btn"
                                onClick={() =>
                                    setShowDeactivateModal(false)
                                }
                            >

                                <FaTimes />

                                Cancel

                            </button>


                            <button
                                className="modal-deactivate-btn"
                                onClick={handleDeactivate}
                            >

                                <FaPowerOff />

                                Deactivate

                            </button>

                        </div>

                    </div>

                </div>

            )}


            {/* ================================================= */}
            {/* DELETE MODAL */}
            {/* ================================================= */}

            {showDeleteModal && (

                <div className="modal-overlay">


                    <div className="confirmation-modal delete-confirmation-modal">


                        <div className="modal-icon delete-modal-icon">

                            <FaTrash />

                        </div>


                        <h2>
                            Delete Account?
                        </h2>


                        <p>
                            This will submit a request to permanently
                            delete your account.
                        </p>


                        <div className="delete-modal-warning">

                            <FaExclamationTriangle />

                            <span>

                                You have a{" "}

                                <strong>
                                    30-day grace period
                                </strong>.

                                If you log in during this period,
                                the deletion request will be cancelled
                                and your account will be reactivated.

                            </span>

                        </div>


                        <div className="modal-actions">


                            <button
                                className="modal-cancel-btn"
                                onClick={() =>
                                    setShowDeleteModal(false)
                                }
                            >

                                <FaTimes />

                                Cancel

                            </button>


                            <button
                                className="modal-delete-btn"
                                onClick={handleDeleteAccount}
                            >

                                <FaTrash />

                                Delete Account

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}


export default CandidateSettings;