import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getRecruiterDashboard,
    getRecentApplications,
    downloadResume,
     updateApplicationStatus
} from "../services/ApplicationService";

import {
    FaBriefcase,
    FaUsers,
    FaUserCheck,
    FaUserTie,
    FaUserTimes,
    FaPlus,
    FaArrowRight,
    FaFileAlt
} from "react-icons/fa";

import "../styles/RecruiterDashboard.css";
import {
    scheduleInterview
} from "../services/InterviewService";


function RecruiterDashboard() {

    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);
    const [recentApplications, setRecentApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
const [schedulingInterview, setSchedulingInterview] = useState(false);
const [scheduleError, setScheduleError] = useState("");

const [scheduleData, setScheduleData] = useState({
    scheduledDate: "",
    scheduledTime: "",
    durationMinutes: 30,
    type: "ONLINE",
    meetingLink: "",
    location: "",
    notes: ""
});


    useEffect(() => {
        loadDashboard();
        loadRecentApplications();
    }, []);

    const loadDashboard = async () => {
        try {
            const response = await getRecruiterDashboard();
            setDashboard(response.data);
        } catch (error) {
            console.error(error);
        }
    };

const loadRecentApplications = async () => {
    try {
        const response = await getRecentApplications();

        console.log("RECENT APPLICATIONS:", response.data);

        const activeApplications = response.data
            .filter(app => app.status !== "WITHDRAWN")
            .slice(0, 6);

        setRecentApplications(activeApplications);

    } catch (error) {
        console.error("Failed to load recent applications:", error);
    }
};

    const handleViewResume = async (applicationId) => {
        try {
            const response = await downloadResume(applicationId);

            const file = new Blob([response.data], {
                type: "application/pdf"
            });

            const fileURL = URL.createObjectURL(file);

            window.open(fileURL, "_blank");

        } catch (error) {
            console.error(error);
        }
    };

    const getInitials = (name) => {
        if (!name) return "?";

        return name
            .trim()
            .split(/\s+/)
            .map(part => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    };

    const formatStatus = (status) => {
        if (!status) return "Unknown";

        return status
            .replaceAll("_", " ")
            .toLowerCase()
            .replace(/\b\w/g, char => char.toUpperCase());
    };

    if (!dashboard) {
        return (
            <div className="recruiter-loading">
                <div className="spinner-border text-primary" role="status" />
                <span>Loading dashboard...</span>
            </div>
        );
    }

    const stats = [
        {
            title: "Total Jobs",
            value: dashboard.totalJobs,
            icon: <FaBriefcase />
        },
        {
            title: "Applications",
            value: dashboard.totalApplications,
            icon: <FaUsers />
        },
        {
            title: "Shortlisted",
            value: dashboard.shortlisted,
            icon: <FaUserCheck />
        },
        {
            title: "Hired",
            value: dashboard.hired,
            icon: <FaUserTie />
        },
        {
            title: "Rejected",
            value: dashboard.rejected,
            icon: <FaUserTimes />
        }
    ];
const handleStatusUpdate = async (status) => {

    if (!selectedApplication || updatingStatus) {
        return;
    }

    try {
        setUpdatingStatus(true);

        await updateApplicationStatus(
            selectedApplication.applicationId,
            status
        );

        setSelectedApplication(null);

        await Promise.all([
            loadDashboard(),
            loadRecentApplications()
        ]);

    } catch (error) {
        console.error("Status update failed:", error);
    } finally {
        setUpdatingStatus(false);
    }
};
const handleScheduleInterview = async () => {

    if (!selectedApplication) {
        return;
    }

    setScheduleError("");

    if (
        !scheduleData.scheduledDate ||
        !scheduleData.scheduledTime
    ) {
        setScheduleError(
            "Please select an interview date and time."
        );
        return;
    }

    if (
        scheduleData.type === "ONLINE" &&
        !scheduleData.meetingLink.trim()
    ) {
        setScheduleError(
            "Please enter the meeting link."
        );
        return;
    }

    if (
        scheduleData.type === "IN_PERSON" &&
        !scheduleData.location.trim()
    ) {
        setScheduleError(
            "Please enter the interview location."
        );
        return;
    }

    try {

        setSchedulingInterview(true);

        const scheduledAt =
            `${scheduleData.scheduledDate}T${scheduleData.scheduledTime}`;

        const requestData = {
            applicationId:
                selectedApplication.applicationId,

            scheduledAt,

            durationMinutes:
                Number(scheduleData.durationMinutes),

            type:
                scheduleData.type,

            meetingLink:
                scheduleData.type === "ONLINE"
                    ? scheduleData.meetingLink.trim()
                    : null,

            location:
                scheduleData.type === "IN_PERSON"
                    ? scheduleData.location.trim()
                    : null,

            notes:
                scheduleData.notes.trim() || null
        };

        await scheduleInterview(requestData);

        setShowScheduleModal(false);
        setSelectedApplication(null);

        setScheduleData({
            scheduledDate: "",
            scheduledTime: "",
            durationMinutes: 30,
            type: "ONLINE",
            meetingLink: "",
            location: "",
            notes: ""
        });

        alert("Interview scheduled successfully.");

    } catch (error) {

        console.error(
            "Failed to schedule interview:",
            error
        );

        setScheduleError(
            error?.response?.data?.message ||
            "Failed to schedule interview."
        );

    } finally {

        setSchedulingInterview(false);

    }
};


    return (
        <main className="recruiter-dashboard">

            {/* Header */}'
                  <button
    className="back-home-btn"
    onClick={() => navigate("/")}
>
    ← Home
</button>


            <div className="dashboard-header">
            

                <div>
                    <h1>Recruiter Dashboard</h1>

                    <p>
                        Manage your job postings and candidate applications.
                    </p>
                </div>

                 

                <button
                    className="post-job-btn"
                    onClick={() => navigate("/recruiter/create-job")}
                >
                    <FaPlus />
                    Post New Job
                </button>

            </div>

            {/* Statistics */}

            <section className="dashboard-stats">

                {stats.map(stat => (

                    <div
                        className="stat-card"
                        key={stat.title}
                    >

                        <div className="stat-icon">
                            {stat.icon}
                        </div>

                        <div>
                            <span className="stat-title">
                                {stat.title}
                            </span>

                            <h2>{stat.value ?? 0}</h2>
                        </div>

                    </div>

                ))}

            </section>

            {/* Recent Applications */}

            <section className="applications-section">

                <div className="section-header">

                    <div>
                        <h2>Recent Applications</h2>

                        <p>
                            Review candidates who recently applied to your jobs.
                        </p>
                    </div>

                    <button
                        className="view-jobs-btn"
                        onClick={() => navigate("/recruiter/jobs")}
                    >
                        My Jobs
                        <FaArrowRight />
                    </button>

                </div>

                {recentApplications.length === 0 ? (

                    <div className="empty-applications">
                        <FaUsers />

                        <h3>No recent applications</h3>

                        <p>
                            New candidate applications will appear here.
                        </p>
                    </div>

                ) : (

                    <div className="applications-table-wrapper">

                        <table className="applications-table">

                            <thead>
                                <tr>
                            <th>Candidate</th>
                            <th>Job</th>
                            <th>Applied Date</th>
                            <th>Status</th>
                            <th>Resume</th>
                            <th></th>
                        </tr>
                            </thead>

                           <tbody>
    {recentApplications.map(app => (
        <tr key={app.applicationId}>

            {/* Candidate */}
            <td>
                <div className="candidate-info">

                    <div className="candidate-avatar">
                        {getInitials(app.candidateName)}
                    </div>

                    <div>
                        <h4>{app.candidateName}</h4>
                        <span>{app.candidateEmail}</span>
                    </div>

                </div>
            </td>

            {/* Job */}
            <td className="job-title-cell">
                {app.jobTitle || "—"}
            </td>

            {/* Applied Date */}
            <td className="applied-date">
                {new Date(app.appliedAt).toLocaleDateString(
                    "en-IN",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    }
                )}
            </td>

            {/* Status */}
            <td>
                <span
                    className={`application-status status-${app.status?.toLowerCase()}`}
                >
                    {formatStatus(app.status)}
                </span>
            </td>

            {/* Resume */}
            <td>
                <button
                    className="resume-btn"
                    onClick={() =>
                        handleViewResume(app.applicationId)
                    }
                >
                    <FaFileAlt />
                    View Resume
                </button>
            </td>

            {/* Action */}
            <td className="manage-column">
                {["HIRED", "REJECTED","WITHDRAWN"].includes(app.status) ? (
                    <span className="no-action">
                        Completed
                    </span>
                ) : (
                    <button
                        className="manage-btn"
                        onClick={() =>
                            setSelectedApplication(app)
                        }
                    >
                        Manage
                        <FaArrowRight />
                    </button>
                )}
            </td>

        </tr>
    ))}
</tbody>

                        </table>

                    </div>

                )}

            </section>
            {selectedApplication && (

    <div
        className="application-modal-overlay"
        onMouseDown={() => setSelectedApplication(null)}
    >

        <div
            className="application-modal"
            onMouseDown={(e) => e.stopPropagation()}
        >

            <div className="application-modal-header">

                <div>
                    <span className="modal-label">
                        Manage Application
                    </span>

                    <h2>
                        {selectedApplication.candidateName}
                    </h2>
                </div>

                <button
                    className="modal-close-btn"
                    onClick={() => setSelectedApplication(null)}
                    aria-label="Close"
                >
                    ×
                </button>

            </div>

            <div className="application-modal-candidate">

                <div className="modal-avatar">
                    {getInitials(selectedApplication.candidateName)}
                </div>

                <div>
                    <h3>
                        {selectedApplication.candidateName}
                    </h3>

                    <p>
                        {selectedApplication.candidateEmail}
                    </p>
                </div>

            </div>

            <div className="application-modal-info">

                {selectedApplication.jobTitle && (
                    <div>
                        <span>Applied For</span>
                        <strong>
                            {selectedApplication.jobTitle}
                        </strong>
                    </div>
                )}

                <div>
                    <span>Applied On</span>

                    <strong>
                        {new Date(
                            selectedApplication.appliedAt
                        ).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        })}
                    </strong>
                </div>
                    <div>
        <span>Location</span>
        <strong>
            {selectedApplication.candidateLocation || "Not provided"}
        </strong>
    </div>

                <div>
                    <span>Current Status</span>

                    <strong>
                        {formatStatus(selectedApplication.status)}
                    </strong>
                </div>

            </div>
            <div className="candidate-experience">
    <h6>Experience</h6>

    {selectedApplication.candidateExperience?.length > 0 ? (
        selectedApplication.candidateExperience.map((exp, index) => (
            <div className="experience-item" key={index}>

                <div className="experience-header">
                    <strong>
                        {exp.jobTitle || "Experience"}
                    </strong>

                    {exp.yearsOfExperience && (
                        <span>{exp.yearsOfExperience}</span>
                    )}
                </div>

                {exp.company && (
                    <p>{exp.company}</p>
                )}

                <div className="experience-details">
                    {exp.employmentType && (
                        <span>{exp.employmentType}</span>
                    )}

                    {exp.location && (
                        <span>{exp.location}</span>
                    )}
                </div>

            </div>
        ))
    ) : (
        <p className="text-muted mb-0">
            No experience added
        </p>
    )}
</div>

     <button
    className="modal-resume-btn"
    onClick={() =>
        handleViewResume(
            selectedApplication.applicationId
        )
    }
>
    <FaFileAlt />
    View Resume
</button>

<button
    type="button"
    className="schedule-interview-btn"
    onClick={() => {

        setScheduleError("");

        setScheduleData({
            scheduledDate: "",
            scheduledTime: "",
            durationMinutes: 30,
            type: "ONLINE",
            meetingLink: "",
            location: "",
            notes: ""
        });

        setShowScheduleModal(true);
    }}
>
    📅 Schedule Interview
</button>

<div className="modal-divider" />

            <div className="modal-actions">

                <span>Update application</span>

                <div className="modal-action-buttons">

                    <button
                        className="shortlist-btn"
                      disabled={
                        updatingStatus ||
                        selectedApplication.status !== "APPLIED"
                    }
                        onClick={() =>
                            handleStatusUpdate("SHORTLISTED")
                        }
                    >
                        Shortlist
                    </button>

                    <button
                        className="hire-btn"
                        disabled={
                            updatingStatus ||
                            selectedApplication.status !== "SHORTLISTED"
                        }
                        onClick={() =>
                            handleStatusUpdate("HIRED")
                        }
                    >
                        Hire
                    </button>

                 <button
    className="reject-btn"
    disabled={
        updatingStatus ||
        !["APPLIED", "SHORTLISTED"].includes(
            selectedApplication.status
        )
    }
    onClick={() => handleStatusUpdate("REJECTED")}
>
    Reject
</button>

                </div>

            </div>

        </div>

    </div>

)}
{showScheduleModal && selectedApplication && (

    <div
        className="schedule-modal-overlay"
        onMouseDown={() => setShowScheduleModal(false)}
    >

        <div
            className="schedule-modal"
            onMouseDown={(e) => e.stopPropagation()}
        >

            {/* HEADER */}

            <div className="schedule-modal-header">

                <div>
                    <span className="modal-label">
                        INTERVIEW
                    </span>

                    <h2>Schedule Interview</h2>

                    <p>
                        {selectedApplication.candidateName}
                        {" • "}
                        {selectedApplication.jobTitle}
                    </p>
                </div>

                <button
                    type="button"
                    className="modal-close-btn"
                    onClick={() =>
                        setShowScheduleModal(false)
                    }
                >
                    ×
                </button>

            </div>

            {/* BODY */}

            <div className="schedule-modal-body">

                {scheduleError && (
                    <div className="schedule-error">
                        {scheduleError}
                    </div>
                )}

                {/* DATE + TIME */}

                <div className="schedule-row">

                    <div className="schedule-field">

                        <label>
                            Interview Date
                        </label>

                        <input
                            type="date"
                            value={
                                scheduleData.scheduledDate
                            }
                            min={
                                new Date()
                                    .toISOString()
                                    .split("T")[0]
                            }
                            onChange={(e) =>
                                setScheduleData(
                                    previous => ({
                                        ...previous,
                                        scheduledDate:
                                            e.target.value
                                    })
                                )
                            }
                        />

                    </div>

                    <div className="schedule-field">

                        <label>
                            Interview Time
                        </label>

                        <input
                            type="time"
                            value={
                                scheduleData.scheduledTime
                            }
                            onChange={(e) =>
                                setScheduleData(
                                    previous => ({
                                        ...previous,
                                        scheduledTime:
                                            e.target.value
                                    })
                                )
                            }
                        />

                    </div>

                </div>

                {/* DURATION */}

                <div className="schedule-field">

                    <label>
                        Duration
                    </label>

                    <select
                        value={
                            scheduleData.durationMinutes
                        }
                        onChange={(e) =>
                            setScheduleData(
                                previous => ({
                                    ...previous,
                                    durationMinutes:
                                        e.target.value
                                })
                            )
                        }
                    >

                        <option value="15">
                            15 minutes
                        </option>

                        <option value="30">
                            30 minutes
                        </option>

                        <option value="45">
                            45 minutes
                        </option>

                        <option value="60">
                            1 hour
                        </option>

                        <option value="90">
                            1 hour 30 minutes
                        </option>

                    </select>

                </div>

                {/* TYPE */}

                <div className="schedule-field">

                    <label>
                        Interview Type
                    </label>

                    <select
                        value={scheduleData.type}
                        onChange={(e) =>
                            setScheduleData(
                                previous => ({
                                    ...previous,
                                    type: e.target.value,
                                    meetingLink: "",
                                    location: ""
                                })
                            )
                        }
                    >

                        <option value="ONLINE">
                            Online
                        </option>

                        <option value="PHONE">
                            Phone
                        </option>

                        <option value="IN_PERSON">
                            In-person
                        </option>

                    </select>

                </div>

                {/* ONLINE */}

                {scheduleData.type === "ONLINE" && (

                    <div className="schedule-field">

                        <label>
                            Meeting Link
                        </label>

                        <input
                            type="url"
                            placeholder="https://meet.google.com/..."
                            value={
                                scheduleData.meetingLink
                            }
                            onChange={(e) =>
                                setScheduleData(
                                    previous => ({
                                        ...previous,
                                        meetingLink:
                                            e.target.value
                                    })
                                )
                            }
                        />

                    </div>

                )}

                {/* PHONE */}

                {scheduleData.type === "PHONE" && (

                    <div className="schedule-info">
                        Candidate will be contacted by phone
                        using their registered contact information.
                    </div>

                )}

                {/* IN PERSON */}

                {scheduleData.type === "IN_PERSON" && (

                    <div className="schedule-field">

                        <label>
                            Interview Location
                        </label>

                        <input
                            type="text"
                            placeholder="Office address / location"
                            value={
                                scheduleData.location
                            }
                            onChange={(e) =>
                                setScheduleData(
                                    previous => ({
                                        ...previous,
                                        location:
                                            e.target.value
                                    })
                                )
                            }
                        />

                    </div>

                )}

                {/* NOTES */}

                <div className="schedule-field">

                    <label>
                        Notes
                    </label>

                    <textarea
                        rows="3"
                        placeholder="Add interview instructions or notes..."
                        value={
                            scheduleData.notes
                        }
                        onChange={(e) =>
                            setScheduleData(
                                previous => ({
                                    ...previous,
                                    notes:
                                        e.target.value
                                })
                            )
                        }
                    />

                </div>

            </div>

            {/* FOOTER */}

            <div className="schedule-modal-footer">

                <button
                    type="button"
                    className="schedule-cancel-btn"
                    disabled={schedulingInterview}
                    onClick={() =>
                        setShowScheduleModal(false)
                    }
                >
                    Cancel
                </button>

                <button
                    type="button"
                    className="schedule-confirm-btn"
                    disabled={schedulingInterview}
                    onClick={handleScheduleInterview}
                >

                    {schedulingInterview ? (
                        <>
                            <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                            />

                            Scheduling...
                        </>
                    ) : (
                        <>
                            📅 Schedule Interview
                        </>
                    )}

                </button>

            </div>

        </div>

    </div>

)}

        </main>
    );
}

export default RecruiterDashboard;