import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById, updateJob } from "../services/JobService";
import "../styles/EditJob.css";

function EditJob() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState({
        companyName: "",
        companyLogo: "",
        title: "",
        location: "",
        description: "",
        jobType: "",
        workMode: "",
        experienceLevel: "",
        minExperience: "",
        maxExperience: "",
        minSalary: "",
        maxSalary: "",
        skills: [],
        vacancies: "",
        applicationDeadline: ""
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getJobById(id)
            .then((response) => {
                setJob(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Failed to load job:", error);
                alert("Failed to load job");
                navigate("/recruiter/jobs");
            });
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setJob((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSkillsChange = (e) => {
        const skills = e.target.value
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill !== "");

        setJob((prev) => ({
            ...prev,
            skills
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateJob(id, job);

            alert("Job updated successfully");

            navigate("/recruiter/jobs");

        } catch (error) {
            console.error("Failed to update job:", error);
            alert("Failed to update job");
        }
    };

    if (loading) {
        return <p className="text-center mt-5">Loading job...</p>;
    }

   return (
    <div className="edit-job-page">
        <div className="edit-job-container">

            <div className="edit-job-header">
                <div>
                    <span className="edit-label">JOB MANAGEMENT</span>
                    <h1>Edit Job</h1>
                    <p>
                        Update the job details and keep your listing accurate.
                    </p>
                </div>

                <button
                    type="button"
                    className="edit-back-btn"
                    onClick={() => navigate("/recruiter/jobs")}
                >
                    ← Back to My Jobs
                </button>
            </div>

            <form onSubmit={handleSubmit}>

                {/* BASIC INFORMATION */}
                <section className="edit-section">

                    <div className="section-heading">
                        <div className="section-icon">💼</div>

                        <div>
                            <h3>Basic Information</h3>
                            <p>Company and position details</p>
                        </div>
                    </div>

                    <div className="edit-grid">

                        <div className="edit-field">
                            <label>Company Name</label>
                            <input
                                type="text"
                                name="companyName"
                                value={job.companyName || ""}
                                onChange={handleChange}
                                placeholder="Enter company name"
                            />
                        </div>

                        <div className="edit-field">
                            <label>Company Logo URL</label>
                            <input
                                type="text"
                                name="companyLogo"
                                value={job.companyLogo || ""}
                                onChange={handleChange}
                                placeholder="https://..."
                            />
                        </div>

                        <div className="edit-field">
                            <label>Job Title</label>
                            <input
                                type="text"
                                name="title"
                                value={job.title || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="edit-field">
                            <label>Location</label>
                            <input
                                type="text"
                                name="location"
                                value={job.location || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="edit-field full-width">
                            <label>Description</label>
                            <textarea
                                name="description"
                                rows="6"
                                value={job.description || ""}
                                onChange={handleChange}
                            />
                        </div>

                    </div>
                </section>


                {/* JOB DETAILS */}
                <section className="edit-section">

                    <div className="section-heading">
                        <div className="section-icon">📋</div>

                        <div>
                            <h3>Job Details</h3>
                            <p>Employment and experience requirements</p>
                        </div>
                    </div>

                    <div className="edit-grid three-columns">

                        <div className="edit-field">
                            <label>Job Type</label>

                            <select
                                name="jobType"
                                value={job.jobType || ""}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value="FULL_TIME">Full Time</option>
                                <option value="PART_TIME">Part Time</option>
                                <option value="CONTRACT">Contract</option>
                                <option value="INTERNSHIP">Internship</option>
                            </select>
                        </div>

                        <div className="edit-field">
                            <label>Work Mode</label>

                            <select
                                name="workMode"
                                value={job.workMode || ""}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value="ONSITE">Onsite</option>
                                <option value="REMOTE">Remote</option>
                                <option value="HYBRID">Hybrid</option>
                            </select>
                        </div>

                        <div className="edit-field">
                            <label>Experience Level</label>

                            <select
                                name="experienceLevel"
                                value={job.experienceLevel || ""}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value="FRESHER">Fresher</option>
                                <option value="JUNIOR">Junior</option>
                                <option value="MID_LEVEL">Mid Level</option>
                                <option value="SENIOR">Senior</option>
                            </select>
                        </div>

                    </div>

                    <div className="edit-grid">

                        <div className="edit-field">
                            <label>Minimum Experience</label>
                            <input
                                type="number"
                                name="minExperience"
                                value={job.minExperience ?? ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="edit-field">
                            <label>Maximum Experience</label>
                            <input
                                type="number"
                                name="maxExperience"
                                value={job.maxExperience ?? ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="edit-field full-width">
                            <label>Required Skills</label>

                            <input
                                type="text"
                                value={
                                    Array.isArray(job.skills)
                                        ? job.skills.join(", ")
                                        : ""
                                }
                                onChange={handleSkillsChange}
                                placeholder="Java, Spring Boot, MySQL, React"
                            />

                            <small>Separate skills using commas.</small>
                        </div>

                    </div>

                </section>


                {/* COMPENSATION */}
                <section className="edit-section compensation-section">

                    <div className="section-heading">
                        <div className="section-icon">₹</div>

                        <div>
                            <h3>Compensation & Hiring</h3>
                            <p>Salary, vacancies and application deadline</p>
                        </div>
                    </div>

                    <div className="edit-grid">

                        <div className="edit-field">
                            <label>Minimum Salary</label>
                            <input
                                type="number"
                                name="minSalary"
                                value={job.minSalary ?? ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="edit-field">
                            <label>Maximum Salary</label>
                            <input
                                type="number"
                                name="maxSalary"
                                value={job.maxSalary ?? ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="edit-field">
                            <label>Number of Vacancies</label>
                            <input
                                type="number"
                                name="vacancies"
                                value={job.vacancies ?? ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="edit-field">
                            <label>Application Deadline</label>
                            <input
                                type="date"
                                name="applicationDeadline"
                                value={job.applicationDeadline || ""}
                                onChange={handleChange}
                            />
                        </div>

                    </div>
                </section>


                {/* ACTIONS */}
                <div className="edit-actions">

                    <button
                        type="button"
                        className="cancel-edit-btn"
                        onClick={() => navigate("/recruiter/jobs")}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="update-job-btn"
                    >
                        ✓ Update Job
                    </button>

                </div>

            </form>

        </div>
    </div>
);
}

export default EditJob;