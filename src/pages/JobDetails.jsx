import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getJobById } from "../services/jobService";
import { applyJob } from "../services/ApplicationService";

import {
    FaMapMarkerAlt,
    FaBriefcase,
    FaRupeeSign,
    FaCalendarAlt,
    FaUserTie
} from "react-icons/fa";

import "../styles/JobDetails.css";

function JobDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [applied, setApplied] = useState(false);
    const [applying, setApplying] = useState(false);

    useEffect(() => {
        if (id) {
            loadJob();
        }
    }, [id]);

    const loadJob = async () => {

        try {

            const response = await getJobById(id);

            setJob(response.data);
            setApplied(response.data.applied || false);

        } catch (error) {

            console.error(error);

            if (
                error.response?.status === 401 ||
                error.response?.status === 403
            ) {

                localStorage.removeItem("token");
                localStorage.removeItem("role");

                window.location.href = "/login";
            }
        }
    };

    const handleApply = async () => {

        try {

            setApplying(true);

            await applyJob(id);

            setApplied(true);

            alert("Application submitted successfully.");

        } catch (error) {

            if (
                error.response?.status === 401 ||
                error.response?.status === 403
            ) {

                localStorage.removeItem("token");
                localStorage.removeItem("role");

                window.location.href = "/login";

                return;
            }

            if (
                error.response?.status === 400 &&
                error.response?.data?.message === "Already applied"
            ) {

                setApplied(true);

                alert("You have already applied.");

                return;
            }

            alert(
                error.response?.data?.message ||
                "Failed to apply."
            );

        } finally {

            setApplying(false);

        }
    };

    const getSalary = () => {

        if (
            job.minSalary != null &&
            job.maxSalary != null
        ) {

            return `₹${Number(job.minSalary).toLocaleString("en-IN")} - ₹${Number(job.maxSalary).toLocaleString("en-IN")}`;
        }

        return "Salary not disclosed";
    };

    if (!job) {

        return (
            <div className="container mt-5 text-center">
                <h4>Loading Job...</h4>
            </div>
        );
    }

    return (

        <div className="job-details-page">

            <div className="job-details-container">

                <button
                    className="details-back-btn"
                    onClick={() => navigate("/jobs")}
                >
                    ← Back to Jobs
                </button>

                <div className="job-details-card">

                    <div className="details-header">

                        <div>

                            <span
                                className={`details-status ${
                                    job.status === "ACTIVE"
                                        ? "active"
                                        : "closed"
                                }`}
                            >
                                {job.status}
                            </span>

                            <h1>{job.title}</h1>

                            <p className="details-company">
                                {job.companyName || "Company Name"}
                            </p>

                        </div>

                    </div>

                    <div className="details-meta">

                        <div>
                            <FaUserTie />
                            <span>{job.recruiterName || "Recruiter"}</span>
                        </div>

                        <div>
                            <FaMapMarkerAlt />
                            <span>{job.location || "Location not specified"}</span>
                        </div>

                        <div>
                            <FaBriefcase />
                            <span>
                                {job.jobType
                                    ? job.jobType.replaceAll("_", " ")
                                    : "Not specified"}
                            </span>
                        </div>

                        <div>
                            <FaRupeeSign />
                            <span>{getSalary()}</span>
                        </div>

                        <div>
                            <FaCalendarAlt />
                            <span>
                                Posted{" "}
                                {job.createdAt
                                    ? new Date(job.createdAt).toLocaleDateString(
                                          "en-IN",
                                          {
                                              day: "2-digit",
                                              month: "short",
                                              year: "numeric"
                                          }
                                      )
                                    : "-"}
                            </span>
                        </div>

                    </div>

                    <hr />

                    <section className="details-section">

                        <h3>Job Description</h3>

                        <p>
                            {job.description || "No description available."}
                        </p>

                    </section>

                    {job.skills?.length > 0 && (

                        <section className="details-section">

                            <h3>Skills Required</h3>

                            <div className="details-skills">

                                {job.skills.map((skill, index) => (

                                    <span key={index}>
                                        {skill}
                                    </span>

                                ))}

                            </div>

                        </section>

                    )}

                    <section className="details-section">

                        <h3>Job Information</h3>

                        <div className="details-info-grid">

                            <div>
                                <small>Work Mode</small>
                                <strong>
                                    {job.workMode
                                        ? job.workMode.replaceAll("_", " ")
                                        : "Not specified"}
                                </strong>
                            </div>

                            <div>
                                <small>Experience Level</small>
                                <strong>
                                    {job.experienceLevel
                                        ? job.experienceLevel.replaceAll("_", " ")
                                        : "Not specified"}
                                </strong>
                            </div>

                            <div>
                                <small>Experience</small>
                                <strong>
                                    {job.minExperience != null &&
                                    job.maxExperience != null
                                        ? `${job.minExperience} - ${job.maxExperience} Years`
                                        : "Not specified"}
                                </strong>
                            </div>

                            <div>
                                <small>Vacancies</small>
                                <strong>
                                    {job.vacancies ?? "Not specified"}
                                </strong>
                            </div>

                        </div>

                    </section>

                    <div className="details-apply-area">

                        {job.status === "CLOSED" ? (

                            <button
                                className="apply-btn closed"
                                disabled
                            >
                                Applications Closed
                            </button>

                        ) : (

                            <button
                                className="apply-btn"
                                onClick={handleApply}
                                disabled={applied || applying}
                            >
                                {applying
                                    ? "Applying..."
                                    : applied
                                    ? "✓ Applied"
                                    : "Apply Now"}
                            </button>

                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default JobDetails;