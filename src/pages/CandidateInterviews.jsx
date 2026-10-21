import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaCalendarAlt, FaClock, FaVideo, FaPhone, FaMapMarkerAlt,
    FaBuilding, FaArrowLeft, FaSyncAlt
} from "react-icons/fa";
import { getMyInterviews, respondToInterview } from "../services/InterviewService";
import "../styles/CandidateInterviews.css";

function CandidateInterviews() {
    const navigate = useNavigate();
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [respondingId, setRespondingId] = useState(null);

    const loadInterviews = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await getMyInterviews();
            setInterviews(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error("Failed to load interviews:", err);
            setError(err.response?.data?.message || "Unable to load your interviews. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadInterviews(); }, []);

    const getStatus = (item) => String(item.status || "").toUpperCase();
    const getResponse = (item) => String(item.candidateResponse || "UNKNOWN").toUpperCase();
    const isUpcoming = (item) => {
        const time = new Date(item.scheduledAt).getTime();
        return getStatus(item) === "SCHEDULED" && Number.isFinite(time) && time >= Date.now();
    };
    const hasPendingResponse = (item) => getResponse(item) === "PENDING";

    const filteredInterviews = useMemo(() => {
        const now = Date.now();
        return [...interviews].filter((item) => {
            const status = getStatus(item);
            if (statusFilter === "UPCOMING") return isUpcoming(item);
            if (statusFilter === "COMPLETED") return status === "COMPLETED";
            if (statusFilter === "CANCELLED") return status === "CANCELLED";
            return true;
        }).sort((a, b) => {
            if (statusFilter === "UPCOMING") {
                const priority = Number(hasPendingResponse(b)) - Number(hasPendingResponse(a));
                if (priority) return priority;
            }
            const aTime = new Date(a.scheduledAt).getTime();
            const bTime = new Date(b.scheduledAt).getTime();
            const aDate = Number.isFinite(aTime) ? aTime : Infinity;
            const bDate = Number.isFinite(bTime) ? bTime : Infinity;
            if (statusFilter === "ALL") {
                const aFuture = aDate >= now;
                const bFuture = bDate >= now;
                if (aFuture !== bFuture) return aFuture ? -1 : 1;
                return aFuture ? aDate - bDate : bDate - aDate;
            }
            return aDate - bDate;
        });
    }, [interviews, statusFilter]);

    const handleInterviewResponse = async (interview, response) => {
        if (getStatus(interview) !== "SCHEDULED" || !hasPendingResponse(interview) || !isUpcoming(interview)) return;
        const verb = response === "ACCEPTED" ? "accept" : "decline";
        if (!window.confirm(`Are you sure you want to ${verb} the interview for ${interview.jobTitle || "this position"}?`)) return;
        try {
            setRespondingId(interview.id);
            setError("");
            await respondToInterview(interview.id, response);
            await loadInterviews();
        } catch (err) {
            console.error("Failed to respond to interview:", err);
            setError(err.response?.data?.message || "Unable to update your interview response. Please try again.");
        } finally {
            setRespondingId(null);
        }
    };

    const formatDate = (value) => {
        if (!value) return "—";
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? "Date unavailable" : date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    };
    const formatTime = (value) => {
        if (!value) return "—";
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? "Time unavailable" : date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    };
    const formatStatus = (value) => !value ? "Unknown" : String(value).replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
    const getTypeIcon = (type) => type === "ONLINE" ? <FaVideo /> : type === "PHONE" ? <FaPhone /> : <FaMapMarkerAlt />;
    const getTypeLabel = (type) => type === "ONLINE" ? "Online" : type === "PHONE" ? "Phone" : type === "IN_PERSON" ? "In-person" : formatStatus(type);
    const filters = [
        { value: "ALL", label: "All Interviews" },
        { value: "UPCOMING", label: "Upcoming" },
        { value: "COMPLETED", label: "Completed" },
        { value: "CANCELLED", label: "Cancelled" }
    ];

    if (loading) return <main className="candidate-interviews-page"><div className="candidate-interviews-loading"><div className="spinner-border text-primary" role="status" /><span>Loading interviews...</span></div></main>;

    return (
        <main className="candidate-interviews-page">
            <header className="candidate-interviews-header">
                <button type="button" className="interviews-back-btn" onClick={() => navigate(-1)}><FaArrowLeft /> Back</button>
                <div className="candidate-interviews-heading">
                    <span className="candidate-interviews-eyebrow">YOUR CAREER JOURNEY</span>
                    <h1>My Interviews</h1>
                    <p>View interview details, respond to invitations, and keep track of your schedule.</p>
                </div>
                <button type="button" className="interviews-refresh-btn" onClick={loadInterviews}><FaSyncAlt /> Refresh</button>
            </header>

            {error && <div className="interviews-error" role="alert"><span>{error}</span><button type="button" onClick={() => setError("")}>Dismiss</button></div>}

            <section className="candidate-interviews-toolbar" aria-label="Interview filters">
                <div><h2>Your schedule</h2><p>{filteredInterviews.length} {filteredInterviews.length === 1 ? "interview" : "interviews"}</p></div>
                <div className="interviews-filters">
                    {filters.map((filter) => <button key={filter.value} type="button" aria-pressed={statusFilter === filter.value} className={`interviews-filter-btn ${statusFilter === filter.value ? "active" : ""}`} onClick={() => setStatusFilter(filter.value)}>{filter.label}</button>)}
                </div>
            </section>

            {!error && interviews.length === 0 && <section className="interviews-empty"><div className="interviews-empty-icon"><FaCalendarAlt /></div><h2>No interviews yet</h2><p>Interviews scheduled by recruiters will appear here.</p></section>}
            {!error && interviews.length > 0 && filteredInterviews.length === 0 && <section className="interviews-empty"><div className="interviews-empty-icon"><FaCalendarAlt /></div><h2>No interviews in this category</h2><p>Try another filter to see your other interviews.</p><button type="button" className="interviews-reset-btn" onClick={() => setStatusFilter("ALL")}>View all interviews</button></section>}

            {!error && filteredInterviews.length > 0 && <section className="interviews-list" aria-label="Your interviews">
                {filteredInterviews.map((interview) => {
                    const status = getStatus(interview);
                    const response = getResponse(interview);
                    const pending = status === "SCHEDULED" && response === "PENDING";
                    const canRespond = pending && isUpcoming(interview);
                    const isResponding = respondingId === interview.id;
                    return <article className="interview-card" key={interview.id}>
                        <div className="interview-card-top">
                            <div className="interview-card-title"><span className="interview-label">INTERVIEW</span><h2>{interview.jobTitle || "Interview"}</h2><p className="interview-recruiter"><FaBuilding />{interview.recruiterName || "Recruiter"}</p></div>
                            <span className={`interview-status status-${status.toLowerCase()}`}>{formatStatus(status)}</span>
                        </div>
                        {canRespond && <div className="interview-priority-banner"><span className="interview-priority-dot" />Please respond to this interview invitation.</div>}
                        <div className="interview-details">
                            <div className="interview-detail"><FaCalendarAlt /><div><span>Date</span><strong>{formatDate(interview.scheduledAt)}</strong></div></div>
                            <div className="interview-detail"><FaClock /><div><span>Time</span><strong>{formatTime(interview.scheduledAt)}</strong></div></div>
                            <div className="interview-detail"><FaClock /><div><span>Duration</span><strong>{interview.durationMinutes ? `${interview.durationMinutes} minutes` : "—"}</strong></div></div>
                            <div className="interview-detail">{getTypeIcon(interview.type)}<div><span>Type</span><strong>{getTypeLabel(interview.type)}</strong></div></div>
                        </div>
                        {interview.type === "ONLINE" && interview.meetingLink && <div className="interview-location"><FaVideo /><div><span>Meeting link</span><a href={interview.meetingLink} target="_blank" rel="noopener noreferrer">Join interview</a></div></div>}
                        {interview.type === "IN_PERSON" && interview.location && <div className="interview-location"><FaMapMarkerAlt /><div><span>Location</span><strong>{interview.location}</strong></div></div>}
                        {interview.notes && <div className="interview-notes"><span>Notes from recruiter</span><p>{interview.notes}</p></div>}
                        <div className="interview-response">
                            <div className="interview-response-status"><span>Your response</span><strong className={`response-${response.toLowerCase()}`}>{formatStatus(response)}</strong></div>
                            {canRespond && <div className="interview-response-actions">
                                <button type="button" className="accept-interview-btn" disabled={isResponding} onClick={() => handleInterviewResponse(interview, "ACCEPTED")}>{isResponding ? "Updating..." : "Accept interview"}</button>
                                <button type="button" className="decline-interview-btn" disabled={isResponding} onClick={() => handleInterviewResponse(interview, "DECLINED")}>Decline</button>
                            </div>}
                            {status === "SCHEDULED" && response !== "PENDING" && <p className="interview-response-note">Your response has been recorded. Contact the recruiter if you need to change it.</p>}
                            {status === "CANCELLED" && <p className="interview-response-note">This interview has been cancelled. Response actions are unavailable.</p>}
                        </div>
                    </article>;
                })}
            </section>}
        </main>
    );
}

export default CandidateInterviews;
