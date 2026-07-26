import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getRecruiterDashboard,
    getRecentApplications,
    downloadResume
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

function RecruiterDashboard() {

    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);
    const [recentApplications, setRecentApplications] = useState([]);
    

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
            setRecentApplications(response.data);
        } catch (error) {
            console.error(error);
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

    return (
        <main className="recruiter-dashboard">

            {/* Header */}

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
                                    <th>Applied Date</th>
                                    <th>Status</th>
                                    <th>Resume</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>

                                {recentApplications.map(app => (

                                    <tr key={app.applicationId}>

                                        <td>

                                            <div className="candidate-info">

                                                <div className="candidate-avatar">
                                                    {getInitials(app.candidateName)}
                                                </div>

                                                <div>
                                                    <h4>
                                                        {app.candidateName}
                                                    </h4>

                                                    <span>
                                                        {app.candidateEmail}
                                                    </span>
                                                </div>

                                            </div>

                                        </td>

                                        <td className="applied-date">

                                            {new Date(
                                                app.appliedAt
                                            ).toLocaleDateString(
                                                "en-IN",
                                                {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric"
                                                }
                                            )}

                                        </td>

                                        <td>
                                            <span
                                                className={`application-status status-${app.status?.toLowerCase()}`}
                                            >
                                                {formatStatus(app.status)}
                                            </span>
                                        </td>

                                        <td>
                                            <button
                                                className="resume-btn"
                                                onClick={() =>
                                                    handleViewResume(
                                                        app.applicationId
                                                    )
                                                }
                                            >
                                                <FaFileAlt />
                                                View Resume
                                            </button>
                                        </td>

                                        <td className="manage-column">
                                            <button
    className="manage-btn"
    onClick={() =>
        navigate(`/recruiter/jobs/${app.jobId}/applicants`)
    }
>
    Manage
    <FaArrowRight />
</button>
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </section>

        </main>
    );
}

export default RecruiterDashboard;