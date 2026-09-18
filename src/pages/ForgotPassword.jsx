import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { forgotPassword } from "../services/ForgotPasswordService";
import "../styles/ForgotPassword.css";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!email.trim()) {
            setError("Please enter your email address.");
            return;
        }

        try {
            setLoading(true);

            const response = await forgotPassword(email.trim());

            setMessage(
                response.data ||
                "Password reset link has been sent to your email."
            );

            setEmail("");
        } catch (err) {
            console.error("Forgot password error:", err);

            setError(
                err.response?.data ||
                "Unable to process your request. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-page">
            <div className="forgot-password-card">

                <div className="forgot-password-icon">
                    <FaEnvelope />
                </div>

                <h2>Forgot Password?</h2>

                <p className="forgot-password-description">
                    Enter the email address associated with your account.
                    We'll send you a link to reset your password.
                </p>

                {message && (
                    <div className="forgot-success">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="forgot-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <label htmlFor="email">
                        Email Address
                    </label>

                    <div className="forgot-input-wrapper">
                        <FaEnvelope />

                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="forgot-submit-btn"
                        disabled={loading}
                    >
                        {loading
                            ? "Sending..."
                            : "Send Reset Link"}
                    </button>

                </form>

                <Link to="/login" className="back-to-login">
                    <FaArrowLeft />
                    Back to Login
                </Link>

            </div>
        </div>
    );
}

export default ForgotPassword;