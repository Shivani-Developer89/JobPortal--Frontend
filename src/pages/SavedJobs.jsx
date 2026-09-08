import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    FaBookmark,
    FaMapMarkerAlt,
    FaBriefcase,
    FaBuilding,
    FaRupeeSign,
    FaClock,
    FaEye
} from "react-icons/fa";

import {
    getSavedJobs,
    unsaveJob
} from "../services/jobService";

import "../styles/SavedJobs.css";


function SavedJobs() {

    const [savedJobs, setSavedJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    // =========================================================
    // LOAD SAVED JOBS
    // =========================================================

    useEffect(() => {

        loadSavedJobs();

    }, []);


    const loadSavedJobs = async () => {

        try {

            setLoading(true);

            const response = await getSavedJobs();

            setSavedJobs(response.data);

        } catch (error) {

            console.error(
                "Failed to load saved jobs:",
                error
            );

            if (
                error.response?.status === 401 ||
                error.response?.status === 403
            ) {

                localStorage.removeItem("token");
                localStorage.removeItem("role");

                navigate("/login");

            }

        } finally {

            setLoading(false);
        }
    };


    // =========================================================
    // REMOVE SAVED JOB
    // =========================================================

    const handleRemove = async (jobId) => {

        try {

            await unsaveJob(jobId);

            setSavedJobs(
                previous =>
                    previous.filter(
                        job => job.id !== jobId
                    )
            );

        } catch (error) {

            console.error(
                "Failed to remove saved job:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to remove saved job."
            );
        }
    };


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (

            <div className="saved-jobs-page">

                <div className="saved-jobs-loading">

                    Loading saved jobs...

                </div>

            </div>
        );
    }


    return (

        <div className="saved-jobs-page">


            {/* =========================
                HEADER
            ========================= */}

            <header className="saved-jobs-header">

                <Link
                    to="/"
                    className="saved-home-btn"
                >
                    ← Home
                </Link>


                <div>

                    <h1>
                        Saved Jobs
                    </h1>

                    <p>
                        Jobs you've saved for later
                    </p>

                </div>


                <div className="saved-count">

                    <FaBookmark />

                    {savedJobs.length}

                    {savedJobs.length === 1
                        ? " Job"
                        : " Jobs"
                    }

                </div>

            </header>


            {/* =========================
                EMPTY STATE
            ========================= */}

            {savedJobs.length === 0 ? (

                <div className="empty-saved-jobs">

                    <FaBookmark />

                    <h2>
                        No saved jobs yet
                    </h2>

                    <p>
                        Save jobs you're interested in
                        and find them here later.
                    </p>


                    <Link
                        to="/jobs"
                        className="browse-jobs-btn"
                    >
                        Browse Jobs
                    </Link>

                </div>

            ) : (


                /* =========================
                   JOB GRID
                ========================= */

                <div className="saved-jobs-grid">

                    {savedJobs.map(job => (

                        <div
                            className="saved-job-card"
                            key={job.id}
                        >


                            {/* CARD TOP */}

                            <div className="saved-card-top">

                                <div className="company-icon">

                                    <FaBuilding />

                                </div>


                                <button
                                    className="saved-icon-btn"
                                    onClick={() =>
                                        handleRemove(job.id)
                                    }
                                    title="Remove saved job"
                                >

                                    <FaBookmark />

                                </button>

                            </div>


                            {/* TITLE */}

                            <h2>
                                {job.title}
                            </h2>


                            <p className="saved-company">
                                {job.companyName}
                            </p>


                            {/* DETAILS */}

                            <div className="saved-job-details">

                                <span>

                                    <FaMapMarkerAlt />

                                    {job.location ||
                                        "Location not specified"
                                    }

                                </span>


                                <span>

                                    <FaBriefcase />

                                    {job.jobType
                                        ?.replaceAll("_", " ") ||
                                        "Not specified"
                                    }

                                </span>


                                <span>

                                    <FaBuilding />

                                    {job.workMode
                                        ?.replaceAll("_", " ") ||
                                        "Not specified"
                                    }

                                </span>

                            </div>


                            {/* SALARY */}

                            <div className="saved-salary">

                                <FaRupeeSign />

                                {job.minSalary != null &&
                                job.maxSalary != null
                                    ? `₹${Number(
                                        job.minSalary
                                    ).toLocaleString("en-IN")}
                                    - ₹${Number(
                                        job.maxSalary
                                    ).toLocaleString("en-IN")}`
                                    : "Salary not disclosed"
                                }

                            </div>


                            {/* EXPERIENCE */}

                            <div className="saved-experience">

                                Experience:

                                <strong>
                                    {" "}
                                    {job.experienceLevel
                                        ?.replaceAll("_", " ")
                                    }
                                </strong>

                            </div>


                            {/* POSTED */}

                            <div className="saved-posted">

                                <FaClock />

                                Posted{" "}

                                {job.createdAt
                                    ? new Date(
                                        job.createdAt
                                    ).toLocaleDateString(
                                        "en-IN",
                                        {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric"
                                        }
                                    )
                                    : "Recently"
                                }

                            </div>


                            {/* ACTIONS */}

                            <div className="saved-card-actions">

                                <button
                                    className="view-job-btn"
                                    onClick={() =>
                                        navigate(
                                            `/jobs?selected=${job.id}`
                                        )
                                    }
                                >

                                    <FaEye />

                                    View Job

                                </button>


                                <button
                                    className="remove-job-btn"
                                    onClick={() =>
                                        handleRemove(job.id)
                                    }
                                >
                                    Remove
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default SavedJobs;