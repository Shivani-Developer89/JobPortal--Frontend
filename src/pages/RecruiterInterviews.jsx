
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaCalendarAlt,
    FaClock,
    FaVideo,
    FaMapMarkerAlt,
    FaPhone,
    FaEdit,
    FaTimes,
    FaArrowLeft
} from "react-icons/fa";

import {
    getMyInterviews,
    updateInterview,
    cancelInterview
} from "../services/InterviewService";

import "../styles/RecruiterInterviews.css";

function RecruiterInterviews() {
    const navigate = useNavigate();

    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingInterview, setEditingInterview] = useState(null);
    const [saving, setSaving] = useState(false);
    const [actionId, setActionId] = useState(null);
    const [statusFilter, setStatusFilter] = useState("ALL");

    const loadInterviews = async () => {
        try {
            setError("");
            const response = await getMyInterviews();
            setInterviews(response.data || []);
        } catch (err) {
            console.error("Failed to load interviews:", err);
            setError("Unable to load interviews. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadInterviews();
    }, []);

    const formatDate = (value) => {
        if (!value) return "—";

        return new Date(value).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const formatTime = (value) => {
        if (!value) return "—";

        return new Date(value).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const formatStatus = (value) => {
        if (!value) return "Unknown";

        return value
            .replaceAll("_", " ")
            .toLowerCase()
            .replace(/\b\w/g, char => char.toUpperCase());
    };

    const getInterviewStatus = (interview) =>
        String(interview.status || "").toUpperCase();

    const isUpcoming = (interview) => {
        const date = new Date(interview.scheduledAt);
        return (
            getInterviewStatus(interview) === "SCHEDULED" &&
            !Number.isNaN(date.getTime()) &&
            date.getTime() >= Date.now()
        );
    };

    const hasPendingResponse = (interview) =>
        String(interview.candidateResponse || "").toUpperCase() === "PENDING";

    const filteredInterviews = [...interviews]
        .filter((interview) => {
            const status = getInterviewStatus(interview);
            switch (statusFilter) {
                case "UPCOMING":
                    return isUpcoming(interview);
                case "COMPLETED":
                    return status === "COMPLETED";
                case "CANCELLED":
                    return status === "CANCELLED";
                default:
                    return true;
            }
        })
        .sort((a, b) => {
            const dateA = new Date(a.scheduledAt).getTime();
            const dateB = new Date(b.scheduledAt).getTime();
            const validA = Number.isNaN(dateA) ? Infinity : dateA;
            const validB = Number.isNaN(dateB) ? Infinity : dateB;

            // Upcoming interviews appear before past/cancelled interviews in All.
            if (statusFilter === "ALL") {
                const upcomingDifference = Number(isUpcoming(b)) - Number(isUpcoming(a));
                if (upcomingDifference !== 0) return upcomingDifference;
            }

            // Pending responses are prioritized in the Upcoming view.
            if (statusFilter === "UPCOMING") {
                const priorityDifference =
                    Number(hasPendingResponse(b)) - Number(hasPendingResponse(a));
                if (priorityDifference !== 0) return priorityDifference;
            }

            // Upcoming interviews: nearest first. Historical interviews: newest first.
            if (isUpcoming(a) && isUpcoming(b)) return validA - validB;
            if (!isUpcoming(a) && !isUpcoming(b)) return validB - validA;
            return validA - validB;
        });

    const handleCancel = async (interview) => {
        const confirmed = window.confirm(
            `Cancel the interview for ${interview.candidateName}?`
        );

        if (!confirmed) return;

        try {
            setActionId(interview.id);
            setError("");

            await cancelInterview(interview.id);
            await loadInterviews();
        } catch (err) {
            console.error("Failed to cancel interview:", err);

            setError(
                err.response?.data?.message ||
                "Unable to cancel this interview."
            );
        } finally {
            setActionId(null);
        }
    };

    const openEditForm = (interview) => {
        setEditingInterview({
            ...interview,
            scheduledAt: interview.scheduledAt?.slice(0, 16) || "",
            durationMinutes: interview.durationMinutes || 30,
            type: interview.type || "ONLINE",
            meetingLink: interview.meetingLink || "",
            location: interview.location || "",
            notes: interview.notes || ""
        });
    };

    const handleEditChange = (event) => {
        const { name, value } = event.target;

        setEditingInterview(previous => ({
            ...previous,
            [name]: value
        }));
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        if (!editingInterview) return;

        try {
            setSaving(true);
            setError("");

            const payload = {
                scheduledAt: editingInterview.scheduledAt,
                durationMinutes: Number(editingInterview.durationMinutes),
                type: editingInterview.type,
                meetingLink:
                    editingInterview.type === "ONLINE"
                        ? editingInterview.meetingLink || null
                        : null,
                location:
                    editingInterview.type === "IN_PERSON"
                        ? editingInterview.location || null
                        : null,
                notes: editingInterview.notes || null
            };

            await updateInterview(editingInterview.id, payload);

            setEditingInterview(null);
            setLoading(true);
            await loadInterviews();
        } catch (err) {
            console.error("Failed to update interview:", err);

            setError(
                err.response?.data?.message ||
                "Unable to update the interview. Please check the details."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <main className="recruiter-interviews-page">
                <div className="ri-loading">
                    <div
                        className="spinner-border text-primary"
                        role="status"
                    />
                    <span>Loading interviews...</span>
                </div>
            </main>
        );
    }
    const handleNotificationClick = async () => {
    const willOpen = !notificationOpen;

    setNotificationOpen(willOpen);
    setProfileOpen(false);

    if (!willOpen) return;

    try {
        const response = await getNotifications();
        setNotifications(response.data || []);
    } catch (error) {
        console.error("Failed to load notifications:", error);
    }
};

    return (
        <main className="recruiter-interviews-page">
            <header className="recruiter-interviews-header">
                <button
                    type="button"
                    className="ri-back-button"
                    onClick={() => navigate(-1)}
                >
                    <FaArrowLeft /> Back
                </button>

                <div>
                    <h1>Interview Management</h1>
                    <p>
                        Manage interviews, review candidate responses,
                        and update schedules.
                    </p>
                </div>

                <button
                    type="button"
                    className="ri-refresh-button"
                    onClick={() => {
                        setLoading(true);
                        loadInterviews();
                    }}
                >
                    Refresh
                </button>
            </header>

            {error && (
                <div className="ri-error" role="alert">
                    <span>{error}</span>
                    <button
                        type="button"
                        onClick={() => setError("")}
                    >
                        Dismiss
                    </button>
                </div>
            )}

            <div className="ri-filters" role="group" aria-label="Filter interviews">
                {[
                    { value: "ALL", label: "All Interviews" },
                    { value: "UPCOMING", label: "Upcoming" },
                    { value: "COMPLETED", label: "Completed" },
                    { value: "CANCELLED", label: "Cancelled" }
                ].map((filter) => (
                    <button
                        key={filter.value}
                        type="button"
                        className={statusFilter === filter.value ? "ri-filter-button active" : "ri-filter-button"}
                        aria-pressed={statusFilter === filter.value}
                        onClick={() => setStatusFilter(filter.value)}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            {!error && filteredInterviews.length === 0 ? (
                <section className="ri-empty">
                    <FaCalendarAlt />
                    <h2>No interviews yet</h2>
                    <p>
                        Interviews you schedule for candidates will
                        appear here.
                    </p>
                </section>
            ) : (
                <section className="ri-list">
                    {filteredInterviews.map(interview => (
                        <article
                            className="ri-card"
                            key={interview.id}
                        >
                            <div className="ri-card-header">
                                <div>
                                    <span className="ri-eyebrow">
                                        INTERVIEW
                                    </span>

                                    <h2>{interview.jobTitle}</h2>

                                    <p className="ri-candidate">
                                        Candidate:{" "}
                                        <strong>
                                            {interview.candidateName}
                                        </strong>
                                    </p>
                                </div>

                                <span
                                    className={`ri-status ri-status-${interview.status?.toLowerCase()}`}
                                >
                                    {formatStatus(interview.status)}
                                </span>
                            </div>

                            <div className="ri-details">
                                <div>
                                    <FaCalendarAlt />
                                    <span>
                                        <small>Date</small>
                                        <strong>
                                            {formatDate(interview.scheduledAt)}
                                        </strong>
                                    </span>
                                </div>

                                <div>
                                    <FaClock />
                                    <span>
                                        <small>Time</small>
                                        <strong>
                                            {formatTime(interview.scheduledAt)}
                                        </strong>
                                    </span>
                                </div>

                                <div>
                                    <FaClock />
                                    <span>
                                        <small>Duration</small>
                                        <strong>
                                            {interview.durationMinutes} minutes
                                        </strong>
                                    </span>
                                </div>

                                <div>
                                    {interview.type === "ONLINE"
                                        ? <FaVideo />
                                        : interview.type === "PHONE"
                                            ? <FaPhone />
                                            : <FaMapMarkerAlt />}

                                    <span>
                                        <small>Type</small>
                                        <strong>
                                            {formatStatus(interview.type)}
                                        </strong>
                                    </span>
                                </div>
                            </div>

                            <div className="ri-response">
                                <span>Candidate response</span>
                                <strong
                                    className={`ri-response-${String(interview.candidateResponse || "unknown").toLowerCase()}`}
                                >
                                    {formatStatus(interview.candidateResponse)}
                                </strong>
                                {isUpcoming(interview) && hasPendingResponse(interview) && (
                                    <span className="ri-priority-label">Action needed</span>
                                )}
                            </div>

                            {interview.type === "ONLINE" &&
                                interview.meetingLink && (
                                    <p className="ri-extra">
                                        <FaVideo />
                                        <a
                                            href={interview.meetingLink}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Open meeting link
                                        </a>
                                    </p>
                                )}

                            {interview.type === "IN_PERSON" &&
                                interview.location && (
                                    <p className="ri-extra">
                                        <FaMapMarkerAlt />
                                        {interview.location}
                                    </p>
                                )}

                            {interview.notes && (
                                <div className="ri-notes">
                                    <small>Notes</small>
                                    <p>{interview.notes}</p>
                                </div>
                            )}

                            {interview.status === "SCHEDULED" && (
                                <div className="ri-actions">
                                    <button
                                        type="button"
                                        className="ri-edit-button"
                                        disabled={actionId === interview.id}
                                        onClick={() => openEditForm(interview)}
                                    >
                                        <FaEdit /> Reschedule / Edit
                                    </button>

                                    <button
                                        type="button"
                                        className="ri-cancel-button"
                                        disabled={actionId === interview.id}
                                        onClick={() => handleCancel(interview)}
                                    >
                                        <FaTimes />
                                        {actionId === interview.id
                                            ? "Cancelling..."
                                            : "Cancel Interview"}
                                    </button>
                                </div>
                            )}
                        </article>
                    ))}
                </section>
            )}

            {editingInterview && (
                <div className="ri-modal-overlay">
                    <form
                        className="ri-modal"
                        onSubmit={handleUpdate}
                    >
                        <div className="ri-modal-header">
                            <div>
                                <h2>Edit Interview</h2>
                                <p>
                                    {editingInterview.candidateName} ·{" "}
                                    {editingInterview.jobTitle}
                                </p>
                            </div>

                            <button
                                type="button"
                                className="ri-close-button"
                                onClick={() => setEditingInterview(null)}
                                disabled={saving}
                                aria-label="Close"
                            >
                                ×
                            </button>
                        </div>

                        <label>
                            Date and time
                            <input
                                type="datetime-local"
                                name="scheduledAt"
                                value={editingInterview.scheduledAt}
                                onChange={handleEditChange}
                                required
                            />
                        </label>

                        <label>
                            Duration (minutes)
                            <input
                                type="number"
                                name="durationMinutes"
                                min="5"
                                max="480"
                                value={editingInterview.durationMinutes}
                                onChange={handleEditChange}
                                required
                            />
                        </label>

                        <label>
                            Interview type
                            <select
                                name="type"
                                value={editingInterview.type}
                                onChange={handleEditChange}
                                required
                            >
                                <option value="ONLINE">Online</option>
                                <option value="PHONE">Phone</option>
                                <option value="IN_PERSON">In-person</option>
                            </select>
                        </label>

                        {editingInterview.type === "ONLINE" && (
                            <label>
                                Meeting link
                                <input
                                    type="url"
                                    name="meetingLink"
                                    value={editingInterview.meetingLink}
                                    onChange={handleEditChange}
                                    placeholder="https://meet.google.com/..."
                                />
                            </label>
                        )}

                        {editingInterview.type === "PHONE" && (
                            <p className="ri-form-hint">
                                Contact the candidate using the phone
                                details available in their application.
                            </p>
                        )}

                        {editingInterview.type === "IN_PERSON" && (
                            <label>
                                Location
                                <input
                                    type="text"
                                    name="location"
                                    value={editingInterview.location}
                                    onChange={handleEditChange}
                                    placeholder="Office address"
                                />
                            </label>
                        )}

                        <label>
                            Notes
                            <textarea
                                name="notes"
                                value={editingInterview.notes}
                                onChange={handleEditChange}
                                rows="3"
                            />
                        </label>

                        <div className="ri-modal-actions">
                            <button
                                type="button"
                                className="ri-secondary-button"
                                onClick={() => setEditingInterview(null)}
                                disabled={saving}
                            >
                                Close
                            </button>

                            <button
                                type="submit"
                                className="ri-save-button"
                                disabled={saving}
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </main>
    );
}

export default RecruiterInterviews;
