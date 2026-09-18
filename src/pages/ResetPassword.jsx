import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
    FaLock,
    FaEye,
    FaEyeSlash,
    FaArrowLeft
} from "react-icons/fa";
import { resetPassword } from "../services/ForgotPasswordService";
import "../styles/ResetPassword.css";

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!token) {
            setError("Invalid or missing password reset link.");
            return;
        }

        if (!password || !confirmPassword) {
            setError("Please enter and confirm your new password.");
            return;
        }

        if (password.length < 8) {
            setError("Password must contain at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            const response = await resetPassword(token, password);

            setMessage(
                response.data || "Password has been reset successfully."
            );

            setPassword("");
            setConfirmPassword("");

            // Give the user time to see the success message
            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (err) {
            console.error("Reset password error:", err);

            setError(
                err.response?.data ||
                "Unable to reset your password. The link may be invalid or expired."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-password-page">

            <div className="reset-password-card">

                <div className="reset-password-icon">
                    <FaLock />
                </div>

                <h2>Create New Password</h2>

                <p className="reset-password-description">
                    Enter a new password for your Job Portal account.
                </p>

                {message && (
                    <div className="reset-success">
                        {message}
                        <br />
                        Redirecting you to login...
                    </div>
                )}

                {error && (
                    <div className="reset-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    {/* New Password */}

                    <label htmlFor="password">
                        New Password
                    </label>

                    <div className="reset-input-wrapper">

                        <FaLock />

                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            disabled={loading}
                        />

                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                        >
                            {showPassword
                                ? <FaEyeSlash />
                                : <FaEye />
                            }
                        </button>

                    </div>

                    <div className="password-hint">
                        Password must contain at least 8 characters.
                    </div>

                    {/* Confirm Password */}

                    <label htmlFor="confirmPassword">
                        Confirm New Password
                    </label>

                    <div className="reset-input-wrapper">

                        <FaLock />

                        <input
                            id="confirmPassword"
                            type={
                                showConfirmPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            disabled={loading}
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
                                ? <FaEyeSlash />
                                : <FaEye />
                            }
                        </button>

                    </div>

                    <button
                        type="submit"
                        className="reset-submit-btn"
                        disabled={loading || !!message}
                    >
                        {loading
                            ? "Resetting Password..."
                            : "Reset Password"}
                    </button>

                </form>

                <Link
                    to="/login"
                    className="back-to-login"
                >
                    <FaArrowLeft />
                    Back to Login
                </Link>

            </div>

        </div>
    );
}

export default ResetPassword;