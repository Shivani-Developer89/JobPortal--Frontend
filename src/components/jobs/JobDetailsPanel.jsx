import "../../styles/JobDetailsPanel.css";

import { useState, useEffect } from "react";

import {
    FaMapMarkerAlt,
    FaBriefcase,
    FaRupeeSign,
    FaUserTie
} from "react-icons/fa";

import {
    FaBookmark,
    FaRegBookmark,
    FaShareAlt
} from "react-icons/fa";

import { applyJob } from "../../services/ApplicationService";

import {
    saveJob,
    unsaveJob,
    getSavedJobs
} from "../../services/jobService";


function JobDetailsPanel({ job }) {

    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);

    const [applying, setApplying] = useState(false);
    const [applied, setApplied] = useState(false);


    // =========================================================
    // CHECK WHETHER CURRENT JOB IS SAVED
    // =========================================================

    useEffect(() => {

        const checkSaved = async () => {

            if (!job) {
                setSaved(false);
                return;
            }

            try {

                const response = await getSavedJobs();

                const savedJobs = response.data;

                const isSaved = savedJobs.some(
                    savedJob => savedJob.id === job.id
                );

                setSaved(isSaved);

            } catch (error) {

                console.error(
                    "Failed to check saved job:",
                    error
                );

                setSaved(false);
            }
        };

        checkSaved();

    }, [job]);


    // =========================================================
    // APPLICATION STATUS
    // =========================================================

    useEffect(() => {

        if (job) {
            setApplied(job.applied || false);
        }

    }, [job]);


    // =========================================================
    // SAVE / UNSAVE
    // =========================================================

    const handleSaveToggle = async () => {

        if (!job || saving) {
            return;
        }

        try {

            setSaving(true);

            if (saved) {

                await unsaveJob(job.id);

                setSaved(false);

            } else {

                await saveJob(job.id);

                setSaved(true);
            }

        } catch (error) {

            console.error(
                "Failed to update saved job:",
                error
            );

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
                "Failed to update saved job."
            );

        } finally {

            setSaving(false);
        }
    };


    // =========================================================
    // APPLY
    // =========================================================

    const handleApply = async () => {

        try {

            setApplying(true);

            await applyJob(job.id);

            setApplied(true);

            alert(
                "Application submitted successfully."
            );

        } catch (error) {

            if (
                error.response?.status === 400 &&
                error.response?.data?.message === "Already applied"
            ) {

                setApplied(true);

                alert(
                    "You have already applied."
                );

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


    // =========================================================
    // EMPTY STATE
    // =========================================================

    if (!job) {

        return (
            <div className="job-details-panel empty-panel">

                <h2>Select a job</h2>

                <p>
                    Choose a job from the left panel to view its details.
                </p>

            </div>
        );
    }


    // =========================================================
    // SALARY
    // =========================================================

    const salary = () => {

        if (
            job.minSalary != null &&
            job.maxSalary != null
        ) {

            return `₹${Number(job.minSalary).toLocaleString("en-IN")} - ₹${Number(job.maxSalary).toLocaleString("en-IN")}`;
        }

        return "Salary not disclosed";
    };


    // =========================================================
    // DESCRIPTION
    // =========================================================

    const cleanDescription = job.description
        ?.replace(/#+/g, "")
        .replace(/\*\*\*/g, "")
        .replace(/\*\*/g, "")
        .trim();


    return (

        <div className="job-details-panel">


            {/* =========================
                HEADER
            ========================= */}

            <div className="details-header-top">

                <span className="status-badge">
                    {job.status}
                </span>


                <div className="details-actions">

                    {/* SAVE BUTTON */}

                    <button
                        className="icon-btn"
                        onClick={handleSaveToggle}
                        disabled={saving}
                        title={
                            saved
                                ? "Remove from saved jobs"
                                : "Save job"
                        }
                    >

                        {saved
                            ? <FaBookmark />
                            : <FaRegBookmark />
                        }

                    </button>


                    {/* SHARE BUTTON */}

                    <button
                        className="icon-btn"
                        onClick={() =>
                            navigator.share
                                ? navigator.share({
                                    title: job.title,
                                    text: job.title,
                                    url: window.location.href
                                })
                                : navigator.clipboard.writeText(
                                    window.location.href
                                )
                        }
                    >

                        <FaShareAlt />

                    </button>

                </div>

            </div>


            {/* =========================
                JOB TITLE
            ========================= */}

            <h1>
                {job.title}
            </h1>

            <h3>
                {job.companyName}
            </h3>


            {/* =========================
                META
            ========================= */}

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


            {/* =========================
                SALARY
            ========================= */}

            <div className="salary">

                <FaRupeeSign />

                {salary()}

            </div>


            {/* =========================
                APPLY
            ========================= */}

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
                            : "Apply Now"
                }

            </button>


            <hr />


            {/* =========================
                OVERVIEW
            ========================= */}

            <section>

                <h2 className="section-title">
                    Job Overview
                </h2>


                <div className="overview-grid">

                    <div>

                        <small>
                            Experience
                        </small>

                        <strong>
                            {job.minExperience} - {job.maxExperience} Years
                        </strong>

                    </div>


                    <div>

                        <small>
                            Work Mode
                        </small>

                        <strong>
                            {job.workMode?.replaceAll("_", " ")}
                        </strong>

                    </div>


                    <div>

                        <small>
                            Posted
                        </small>

                        <strong>

                            {new Date(
                                job.createdAt
                            ).toLocaleDateString(
                                "en-IN",
                                {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric"
                                }
                            )}

                        </strong>

                    </div>


                    <div>

                        <small>
                            Status
                        </small>

                        <strong>
                            {job.status}
                        </strong>

                    </div>

                </div>

            </section>


            {/* =========================
                SKILLS
            ========================= */}

            {job.skills?.length > 0 && (

                <section>

                    <h2 className="section-title">
                        Skills Required
                    </h2>


                    <div className="skills">

                        {job.skills.map(
                            (skill, index) => (

                                <span
                                    key={index}
                                    className="skill-chip"
                                >
                                    {skill}
                                </span>

                            )
                        )}

                    </div>

                </section>

            )}


            {/* =========================
                DESCRIPTION
            ========================= */}

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