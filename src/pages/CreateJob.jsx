import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../services/JobService";
import { toast } from "react-toastify";
import "../styles/createJob.css";

function CreateJob() {

    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);

    const [job, setJob] = useState({
        companyName: "",
        companyLogo: "",
        title: "",
        description: "",
        location: "",
        jobType: "",
        workMode: "",
        experienceLevel: "",
        minExperience: "",
        maxExperience: "",
        minSalary: "",
        maxSalary: "",
        skills: "",
        vacancies: "",
        applicationDeadline: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setJob(prev => ({
            ...prev,
            [name]: value
        }));
    };

   const handleSubmit = async (e) => {
    e.preventDefault();

    if (
        !job.companyName.trim() ||
        !job.title.trim() ||
        !job.description.trim() ||
        !job.location.trim() ||
        !job.jobType ||
        !job.workMode ||
        !job.experienceLevel
    ) {
        toast.error("Please fill all required fields.");
        return;
    }

    if (
        job.minExperience !== "" &&
        job.maxExperience !== "" &&
        Number(job.minExperience) > Number(job.maxExperience)
    ) {
        toast.error("Minimum experience cannot exceed maximum experience.");
        return;
    }

    if (
        job.minSalary !== "" &&
        job.maxSalary !== "" &&
        Number(job.minSalary) > Number(job.maxSalary)
    ) {
        toast.error("Minimum salary cannot exceed maximum salary.");
        return;
    }

    if (job.vacancies !== "" && Number(job.vacancies) < 1) {
        toast.error("Vacancies must be at least 1.");
        return;
    }

    if (
        job.applicationDeadline &&
        job.applicationDeadline < new Date().toISOString().split("T")[0]
    ) {
        toast.error("Application deadline cannot be in the past.");
        return;
    }

    const payload = {
        ...job,

        minExperience:
            job.minExperience === "" ? null : Number(job.minExperience),

        maxExperience:
            job.maxExperience === "" ? null : Number(job.maxExperience),

        minSalary:
            job.minSalary === "" ? null : Number(job.minSalary),

        maxSalary:
            job.maxSalary === "" ? null : Number(job.maxSalary),

        vacancies:
            job.vacancies === "" ? null : Number(job.vacancies),

        skills: job.skills
            .split(",")
            .map(skill => skill.trim())
            .filter(Boolean)
    };

    try {
        setSubmitting(true);

        await createJob(payload);

        toast.success("Job posted successfully");

        navigate("/recruiter/jobs");

    } catch (error) {
        console.error("CREATE JOB ERROR:", error);

        toast.error(
            error.response?.data?.message ||
            "Failed to post job."
        );
    } finally {
        setSubmitting(false);
    }
};

  return (
    <div className="create-job-page">

        <div className="create-job-container">

            {/* Header */}
            <div className="create-job-header">

                <div>
                    <button
                        type="button"
                        className="back-jobs-btn"
                        onClick={() => navigate("/recruiter/jobs")}
                    >
                        <i className="bi bi-arrow-left"></i>
                        Back to My Jobs
                    </button>

                    <h1>Post a New Job</h1>

                    <p>
                        Create a job listing and start receiving
                        applications from candidates.
                    </p>
                </div>

            </div>

            <form onSubmit={handleSubmit}>

                {/* ================= JOB INFORMATION ================= */}

                <section className="job-form-section">

                    <div className="section-heading">
                        <div className="section-icon">
                            <i className="bi bi-briefcase"></i>
                        </div>

                        <div>
                            <h2>Job Information</h2>
                            <p>
                                Basic information candidates will see
                                about this position.
                            </p>
                        </div>
                    </div>

                    <div className="row g-4">

                        <div className="col-md-6">
                            <label className="job-form-label">
                                Company Name
                                <span>*</span>
                            </label>

                            <input
                                type="text"
                                className="form-control job-input"
                                name="companyName"
                                value={job.companyName}
                                onChange={handleChange}
                                placeholder="e.g. Infosys"
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="job-form-label">
                                Company Logo URL
                            </label>

                            <input
                                type="text"
                                className="form-control job-input"
                                name="companyLogo"
                                value={job.companyLogo}
                                onChange={handleChange}
                                placeholder="https://..."
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="job-form-label">
                                Job Title
                                <span>*</span>
                            </label>

                            <input
                                type="text"
                                className="form-control job-input"
                                name="title"
                                value={job.title}
                                onChange={handleChange}
                                placeholder="e.g. Backend Developer"
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="job-form-label">
                                Location
                                <span>*</span>
                            </label>

                            <input
                                type="text"
                                className="form-control job-input"
                                name="location"
                                value={job.location}
                                onChange={handleChange}
                                placeholder="e.g. Bengaluru, Karnataka"
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="job-form-label">
                                Job Type
                                <span>*</span>
                            </label>

                            <select
                                className="form-select job-input"
                                name="jobType"
                                value={job.jobType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select job type</option>
                                <option value="FULL_TIME">Full Time</option>
                                <option value="PART_TIME">Part Time</option>
                                <option value="INTERNSHIP">Internship</option>
                                <option value="CONTRACT">Contract</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="job-form-label">
                                Work Mode
                                <span>*</span>
                            </label>

                            <select
                                className="form-select job-input"
                                name="workMode"
                                value={job.workMode}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select work mode</option>
                                <option value="ONSITE">On Site</option>
                                <option value="REMOTE">Remote</option>
                                <option value="HYBRID">Hybrid</option>
                            </select>
                        </div>

                        <div className="col-12">
                            <label className="job-form-label">
                                Job Description
                                <span>*</span>
                            </label>

                            <textarea
                                rows="6"
                                className="form-control job-input job-description-input"
                                name="description"
                                value={job.description}
                                onChange={handleChange}
                                placeholder="Describe the role, responsibilities and what you're looking for..."
                                required
                            />
                        </div>

                    </div>

                </section>

                {/* ================= REQUIREMENTS ================= */}

                <section className="job-form-section">

                    <div className="section-heading">
                        <div className="section-icon">
                            <i className="bi bi-person-check"></i>
                        </div>

                        <div>
                            <h2>Requirements</h2>
                            <p>
                                Define the experience and skills required
                                for this position.
                            </p>
                        </div>
                    </div>

                    <div className="row g-4">

                        <div className="col-md-4">
                            <label className="job-form-label">
                                Experience Level
                                <span>*</span>
                            </label>

                            <select
                                className="form-select job-input"
                                name="experienceLevel"
                                value={job.experienceLevel}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select level</option>
                                <option value="FRESHER">Fresher</option>
                                <option value="JUNIOR">Junior</option>
                                <option value="MID_LEVEL">Mid Level</option>
                                <option value="SENIOR">Senior</option>
                            </select>
                        </div>

                        <div className="col-md-4">
                            <label className="job-form-label">
                                Minimum Experience
                            </label>

                            <div className="input-group">
                                <input
                                    type="number"
                                    min="0"
                                    className="form-control job-input"
                                    name="minExperience"
                                    value={job.minExperience}
                                    onChange={handleChange}
                                    placeholder="0"
                                />

                                <span className="input-group-text">
                                    Years
                                </span>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <label className="job-form-label">
                                Maximum Experience
                            </label>

                            <div className="input-group">
                                <input
                                    type="number"
                                    min="0"
                                    className="form-control job-input"
                                    name="maxExperience"
                                    value={job.maxExperience}
                                    onChange={handleChange}
                                    placeholder="5"
                                />

                                <span className="input-group-text">
                                    Years
                                </span>
                            </div>
                        </div>

                        <div className="col-12">
                            <label className="job-form-label">
                                Required Skills
                            </label>

                            <input
                                type="text"
                                className="form-control job-input"
                                name="skills"
                                value={job.skills}
                                onChange={handleChange}
                                placeholder="Java, Spring Boot, MySQL, React"
                            />

                            <small className="field-help">
                                Separate skills using commas.
                            </small>
                        </div>

                    </div>

                </section>

                {/* ============== COMPENSATION & HIRING ============== */}

                <section className="job-form-section">

                    <div className="section-heading">
                        <div className="section-icon">
                            <i className="bi bi-cash-stack"></i>
                        </div>

                        <div>
                            <h2>Compensation & Hiring</h2>
                            <p>
                                Set the salary range, vacancies and
                                application deadline.
                            </p>
                        </div>
                    </div>

                    <div className="row g-4">

                        <div className="col-md-6">
                            <label className="job-form-label">
                                Minimum Salary
                            </label>

                            <div className="input-group">
                                <span className="input-group-text">₹</span>

                                <input
                                    type="number"
                                    min="0"
                                    className="form-control job-input"
                                    name="minSalary"
                                    value={job.minSalary}
                                    onChange={handleChange}
                                    placeholder="500000"
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <label className="job-form-label">
                                Maximum Salary
                            </label>

                            <div className="input-group">
                                <span className="input-group-text">₹</span>

                                <input
                                    type="number"
                                    min="0"
                                    className="form-control job-input"
                                    name="maxSalary"
                                    value={job.maxSalary}
                                    onChange={handleChange}
                                    placeholder="900000"
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <label className="job-form-label">
                                Number of Vacancies
                            </label>

                            <input
                                type="number"
                                min="1"
                                className="form-control job-input"
                                name="vacancies"
                                value={job.vacancies}
                                onChange={handleChange}
                                placeholder="1"
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="job-form-label">
                                Application Deadline
                            </label>

                            <input
                                type="date"
                                className="form-control job-input"
                                name="applicationDeadline"
                                value={job.applicationDeadline}
                                onChange={handleChange}
                                min={new Date().toISOString().split("T")[0]}
                            />
                        </div>

                    </div>

                </section>

                {/* Actions */}

                <div className="job-form-actions">

                    <button
                        type="button"
                        className="cancel-job-btn"
                        onClick={() => navigate("/recruiter/jobs")}
                        disabled={submitting}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="post-job-btn"
                        disabled={submitting}
                    >
                        {submitting ? (
                            <>
                                <span className="spinner-border spinner-border-sm"></span>
                                Posting...
                            </>
                        ) : (
                            <>
                                <i className="bi bi-plus-lg"></i>
                                Post Job
                            </>
                        )}
                    </button>

                </div>

            </form>

        </div>

    </div>
);
}

export default CreateJob;