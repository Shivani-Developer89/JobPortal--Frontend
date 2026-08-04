import "../../styles/JobDetailsPanel.css";
import { useState, useEffect } from "react";

import {
    FaMapMarkerAlt,
    FaBriefcase,
    FaRupeeSign,
    FaClock,
    FaUserTie
} from "react-icons/fa";
import {
    FaBookmark,
    FaRegBookmark,
    FaShareAlt
} from "react-icons/fa";
import { applyJob } from "../../services/ApplicationService";

function JobDetailsPanel({ job }) {
    const [saved, setSaved] = useState(false);
    const [applying, setApplying] = useState(false);
const [applied, setApplied] = useState(false);
useEffect(() => {
    if (job) {
        setApplied(job.applied || false);
    }
}, [job]);

    if (!job) {
        return (
            <div className="job-details-panel empty-panel">
                <h2>Select a job</h2>
                <p>Choose a job from the left panel to view its details.</p>
            </div>
        );
    }

    const salary = () => {
        if (job.minSalary != null && job.maxSalary != null) {
            return `₹${Number(job.minSalary).toLocaleString("en-IN")} - ₹${Number(job.maxSalary).toLocaleString("en-IN")}`;
        }

        return "Salary not disclosed";
    };

    const cleanDescription = job.description
        ?.replace(/#+/g, "")
        .replace(/\*\*/g, "")
        .replace(/\*/g, "")
        .trim();

  const handleApply = async () => {

    try {

        setApplying(true);

        await applyJob(job.id);

        setApplied(true);

        alert("Application submitted successfully.");

    } catch (error) {

        if (
            error.response?.status === 400 &&
            error.response?.data?.message === "Already applied"
        ) {

            setApplied(true);
            alert("You have already applied.");
            return;
        }

        if (
            error.response?.status === 401 ||
            error.response?.status === 403
        ) {

            localStorage.removeItem("token");
            localStorage.removeItem("role");

            window.location.href = "/login";
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

    return (

        <div className="job-details-panel">

            {/* Header */}

   <div className="details-header-top">

            <span className="status-badge">
                {job.status}
            </span>

            <div className="details-actions">

                <button
                    className="icon-btn"
                    onClick={() => setSaved(!saved)}
                >
                    {saved ? <FaBookmark /> : <FaRegBookmark />}
                </button>

                <button
                    className="icon-btn"
                    onClick={() =>
                        navigator.share
                            ? navigator.share({
                                  title: job.title,
                                  text: job.title,
                                  url: window.location.href
                              })
                            : navigator.clipboard.writeText(window.location.href)
                    }
                >
                    <FaShareAlt />
                </button>

            </div>

        </div>

        <h1>{job.title}</h1>

        <h3>{job.companyName}</h3>

        <div className="details-meta">

            <span>
                <FaMapMarkerAlt />
                {job.location}
            </span>

            <span>
                <FaBriefcase />
                {job.jobType?.replaceAll("_", " ")}
            </span>

            <span>
                <FaUserTie />
                {job.experienceLevel?.replaceAll("_", " ")}
            </span>

        </div>

        <div className="salary">
            <FaRupeeSign />
            {salary()}
        </div>

<button
    className="apply-btn"
    onClick={handleApply}
    disabled={
        applied ||
        applying ||
        job.status === "CLOSED"
    }
>

    {job.status === "CLOSED"
        ? "Applications Closed"
        : applying
        ? "Applying..."
        : applied
        ? "✓ Applied"
        : "Apply Now"}

</button>

        <hr />

            {/* Overview */}

            <section>

                <h2 className="section-title">
                    Job Overview
                </h2>

                <div className="overview-grid">

                    <div>
                        <small>Experience</small>

                        <strong>
                            {job.minExperience} - {job.maxExperience} Years
                        </strong>
                    </div>

                    <div>
                        <small>Work Mode</small>

                        <strong>
                            {job.workMode?.replaceAll("_"," ")}
                        </strong>
                    </div>

                    <div>
                        <small>Posted</small>

                        <strong>
                            {new Date(job.createdAt).toLocaleDateString(
                                "en-IN",
                                {
                                    day:"2-digit",
                                    month:"short",
                                    year:"numeric"
                                }
                            )}
                        </strong>
                    </div>

                    <div>
                        <small>Status</small>

                        <strong>{job.status}</strong>
                    </div>

                </div>

            </section>

            {/* Skills */}

            {job.skills?.length > 0 && (

                <section>

                    <h2 className="section-title">
                        Skills Required
                    </h2>

                    <div className="skills">

                        {job.skills.map((skill,index)=>(

                            <span
                                key={index}
                                className="skill-chip"
                            >
                                {skill}
                            </span>

                        ))}

                    </div>

                </section>

            )}

            {/* Description */}

            <section>

                <h2 className="section-title">
                    Job Description
                </h2>

                <div className="description">
                    {cleanDescription}
                </div>

            </section>

        </div>

    );
}

export default JobDetailsPanel;