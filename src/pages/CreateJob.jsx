import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../services/JobService";

function CreateJob() {

    const navigate = useNavigate();

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

        try {

            const payload = {
                ...job,
                skills: job.skills
                    .split(",")
                    .map(skill => skill.trim())
                    .filter(skill => skill !== "")
            };

            await createJob(payload);

            alert("Job posted successfully!");

            navigate("/recruiter/jobs");

        } catch (error) {

            console.error(error);

            alert("Failed to post job.");

        }
    };

    return (
        <div className="container py-5">

            <div className="card shadow">

                <div className="card-body">

                    <h2 className="mb-4">Post a New Job</h2>

                    <form onSubmit={handleSubmit}>

                        <div className="row g-3">

                            <div className="col-md-6">
                                <label className="form-label">Company Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="companyName"
                                    value={job.companyName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Company Logo URL</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="companyLogo"
                                    value={job.companyLogo}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Job Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={job.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Location</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="location"
                                    value={job.location}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label">Description</label>
                                <textarea
                                    rows="5"
                                    className="form-control"
                                    name="description"
                                    value={job.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">Job Type</label>
                                <select
                                    className="form-select"
                                    name="jobType"
                                    value={job.jobType}
                                    onChange={handleChange}
                                >
                                    <option value="">Select</option>
                                    <option value="FULL_TIME">Full Time</option>
                                    <option value="PART_TIME">Part Time</option>
                                    <option value="INTERNSHIP">Internship</option>
                                    <option value="CONTRACT">Contract</option>
                                </select>
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">Work Mode</label>
                                <select
                                    className="form-select"
                                    name="workMode"
                                    value={job.workMode}
                                    onChange={handleChange}
                                >
                                    <option value="">Select</option>
                                    <option value="ONSITE">On Site</option>
                                    <option value="REMOTE">Remote</option>
                                    <option value="HYBRID">Hybrid</option>
                                </select>
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">Experience Level</label>
                                <select
                                    className="form-select"
                                    name="experienceLevel"
                                    value={job.experienceLevel}
                                    onChange={handleChange}
                                >
                                    <option value="">Select</option>
                                    <option value="FRESHER">Fresher</option>
                                    <option value="JUNIOR">Junior</option>
                                    <option value="MID_LEVEL">Mid Level</option>
                                    <option value="SENIOR">Senior</option>
                                </select>
                            </div>

                            <div className="col-md-3">
                                <label className="form-label">Min Experience</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="minExperience"
                                    value={job.minExperience}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-3">
                                <label className="form-label">Max Experience</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="maxExperience"
                                    value={job.maxExperience}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-3">
                                <label className="form-label">Min Salary (₹)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="minSalary"
                                    value={job.minSalary}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-3">
                                <label className="form-label">Max Salary (₹)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="maxSalary"
                                    value={job.maxSalary}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Skills (comma separated)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="skills"
                                    value={job.skills}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-3">
                                <label className="form-label">Vacancies</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="vacancies"
                                    value={job.vacancies}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-3">
                                <label className="form-label">Application Deadline</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="applicationDeadline"
                                    value={job.applicationDeadline}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-12 mt-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Post Job
                                </button>
                            </div>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default CreateJob;