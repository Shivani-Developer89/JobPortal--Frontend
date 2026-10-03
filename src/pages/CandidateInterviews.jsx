import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getMyInterviews,
    respondToInterview
} from "../services/InterviewService";

import {
    FaCalendarAlt,
    FaClock,
    FaVideo,
    FaPhone,
    FaMapMarkerAlt,
    FaBuilding,
    FaArrowLeft
} from "react-icons/fa";

import "../styles/CandidateInterviews.css";

function CandidateInterviews() {

    const navigate = useNavigate();

    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadInterviews();
    }, []);

    const loadInterviews = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await getMyInterviews();

            setInterviews(response.data || []);

        } catch (error) {

            console.error(
                "Failed to load interviews:",
                error
            );

            setError(
                "Unable to load your interviews."
            );

        } finally {

            setLoading(false);

        }
    };
    const handleInterviewResponse = async (
    interviewId,
    response
) => {

    try {

        await respondToInterview(
            interviewId,
            response
        );

        await loadInterviews();

    } catch (error) {

        console.error(
            "Failed to respond to interview:",
            error
        );

        setError(
            "Unable to update your interview response."
        );
    }
};

    const formatDate = (date) => {

        if (!date) return "—";

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    };

    const formatTime = (date) => {

        if (!date) return "—";

        return new Date(date).toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );
    };

    const formatStatus = (status) => {

        if (!status) return "Unknown";

        return status
            .replaceAll("_", " ")
            .toLowerCase()
            .replace(
                /\b\w/g,
                char => char.toUpperCase()
            );
    };

    const getTypeIcon = (type) => {

        if (type === "ONLINE") {
            return <FaVideo />;
        }

        if (type === "PHONE") {
            return <FaPhone />;
        }

        return <FaMapMarkerAlt />;
    };

    const getTypeLabel = (type) => {

        if (type === "ONLINE") {
            return "Online";
        }

        if (type === "PHONE") {
            return "Phone";
        }

        return "In-person";
    };

    if (loading) {

        return (
            <main className="candidate-interviews-page">

                <div className="candidate-interviews-loading">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    />

                    <span>
                        Loading interviews...
                    </span>

                </div>

            </main>
        );
    }

    return (
        <main className="candidate-interviews-page">

            {/* HEADER */}

            <div className="candidate-interviews-header">

                <button
                    className="interviews-back-btn"
                    onClick={() => navigate(-1)}
                >
                    <FaArrowLeft />
                    Back
                </button>

                <div>

                    <h1>
                        My Interviews
                    </h1>

                    <p>
                        View and manage your upcoming interviews.
                    </p>

                </div>

            </div>


            {/* ERROR */}

            {error && (

                <div className="interviews-error">

                    {error}

                    <button
                        onClick={loadInterviews}
                    >
                        Retry
                    </button>

                </div>

            )}


            {/* EMPTY */}

            {!error && interviews.length === 0 && (

                <div className="interviews-empty">

                    <FaCalendarAlt />

                    <h2>
                        No interviews yet
                    </h2>

                    <p>
                        Interviews scheduled by recruiters
                        will appear here.
                    </p>

                </div>

            )}


            {/* INTERVIEWS */}

            {!error && interviews.length > 0 && (

                <div className="interviews-list">

                    {interviews.map(interview => (

                        <article
                            className="interview-card"
                            key={interview.id}
                        >

                            {/* TOP */}

                            <div className="interview-card-top">

                                <div>

                                    <span className="interview-label">
                                        INTERVIEW
                                    </span>

                                    <h2>
                                        {interview.jobTitle}
                                    </h2>

                                    <p className="interview-recruiter">
                                        <FaBuilding />
                                        {interview.recruiterName}
                                    </p>

                                </div>

                                <span
                                    className={`interview-status status-${interview.status?.toLowerCase()}`}
                                >
                                    {formatStatus(
                                        interview.status
                                    )}
                                </span>

                            </div>


                            {/* DETAILS */}

                            <div className="interview-details">

                                <div className="interview-detail">

                                    <FaCalendarAlt />

                                    <div>

                                        <span>
                                            Date
                                        </span>

                                        <strong>
                                            {formatDate(
                                                interview.scheduledAt
                                            )}
                                        </strong>

                                    </div>

                                </div>


                                <div className="interview-detail">

                                    <FaClock />

                                    <div>

                                        <span>
                                            Time
                                        </span>

                                        <strong>
                                            {formatTime(
                                                interview.scheduledAt
                                            )}
                                        </strong>

                                    </div>

                                </div>


                                <div className="interview-detail">

                                    <FaClock />

                                    <div>

                                        <span>
                                            Duration
                                        </span>

                                        <strong>
                                            {interview.durationMinutes}
                                            {" minutes"}
                                        </strong>

                                    </div>

                                </div>


                                <div className="interview-detail">

                                    {getTypeIcon(
                                        interview.type
                                    )}

                                    <div>

                                        <span>
                                            Type
                                        </span>

                                        <strong>
                                            {getTypeLabel(
                                                interview.type
                                            )}
                                        </strong>

                                    </div>

                                </div>

                            </div>


                            {/* ONLINE LINK */}

                            {interview.type === "ONLINE" &&
                                interview.meetingLink && (

                                <div className="interview-location">

                                    <FaVideo />

                                    <div>

                                        <span>
                                            Meeting Link
                                        </span>

                                        <a
                                            href={
                                                interview.meetingLink
                                            }
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Join Interview
                                        </a>

                                    </div>

                                </div>

                            )}


                            {/* LOCATION */}

                            {interview.type === "IN_PERSON" &&
                                interview.location && (

                                <div className="interview-location">

                                    <FaMapMarkerAlt />

                                    <div>

                                        <span>
                                            Location
                                        </span>

                                        <strong>
                                            {interview.location}
                                        </strong>

                                    </div>

                                </div>

                            )}


                            {/* NOTES */}

                            {interview.notes && (

                                <div className="interview-notes">

                                    <span>
                                        Notes
                                    </span>

                                    <p>
                                        {interview.notes}
                                    </p>

                                </div>

                            )}


                            {/* RESPONSE */}

                    <div className="interview-response">

    <div>
        <span>
            Your Response
        </span>

        <strong>
            {formatStatus(
                interview.candidateResponse
            )}
        </strong>
    </div>

    {interview.status === "SCHEDULED" &&
        interview.candidateResponse === "PENDING" && (

        <div className="interview-response-actions">

            <button
                type="button"
                className="accept-interview-btn"
                onClick={() =>
                    handleInterviewResponse(
                        interview.id,
                        "ACCEPTED"
                    )
                }
            >
                Accept Interview
            </button>

            <button
                type="button"
                className="decline-interview-btn"
                onClick={() =>
                    handleInterviewResponse(
                        interview.id,
                        "DECLINED"
                    )
                }
            >
                Decline
            </button>

        </div>

    )}

</div>

                        </article>

                    ))}

                </div>

            )}

        </main>
    );
}

export default CandidateInterviews;