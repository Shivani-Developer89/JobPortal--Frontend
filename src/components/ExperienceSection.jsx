import { useState } from "react";

function ExperienceSection({ experience, setExperience }) {
    const [editing, setEditing] = useState(false);

    const handleChange = (e) => {
        setExperience({
            ...experience,
            [e.target.name]: e.target.value
        });
    };

    const experiences = experience?.experiences || [];

    const addExperience = () => {
        setExperience({
            ...experience,
            experiences: [
                ...experiences,
                {
                    company: "",
                    jobTitle: "",
                    employmentType: "",
                    location: "",
                    yearsOfExperience: "",
                    responsibilities: "",
                    achievements: ""
                }
            ]
        });
    };

    const removeExperience = (index) => {
        setExperience({
            ...experience,
            experiences: experiences.filter((_, i) => i !== index)
        });
    };

    const handleExperienceChange = (index, e) => {
        const updated = [...experiences];
        updated[index] = {
            ...updated[index],
            [e.target.name]: e.target.value
        };

        setExperience({
            ...experience,
            experiences: updated
        });
    };

    const isComplete = (exp) =>
        [
            exp.company,
            exp.jobTitle,
            exp.employmentType,
            exp.location,
            exp.yearsOfExperience,
            exp.responsibilities
        ].every(
            (v) =>
                v !== undefined &&
                v !== null &&
                String(v).trim() !== ""
        );

    return (
        <div className="experience-section">
            <div className="experience-card">

                <div className="experience-card-header">
                    <div>
                        <h5>Experience</h5>
                        <span>
                            Tell recruiters about your professional background
                        </span>
                    </div>

                    <div className="experience-header-right">
                        {!editing && (
                            <button
                                type="button"
                                className="experience-edit-btn"
                                onClick={() => setEditing(true)}
                            >
                                <i className="bi bi-pencil me-1"></i>
                                Edit
                            </button>
                        )}

                        <span className="experience-count">
                            {experience?.type === "EXPERIENCED"
                                ? `${experiences.length} ${
                                      experiences.length === 1
                                          ? "experience"
                                          : "experiences"
                                  }`
                                : "Fresher"}
                        </span>
                    </div>
                </div>

                {!editing && (
                    <div className="experience-view-body">

                        {experience?.type === "FRESHER" ? (
                            experience?.about ||
                            experience?.projects ||
                            experience?.internships ||
                            experience?.certifications ? (
                                <div className="fresher-summary">
                                    {experience.about && (
                                        <div className="experience-summary-block">
                                            <span>Career Objective</span>
                                            <p>{experience.about}</p>
                                        </div>
                                    )}

                                    {experience.projects && (
                                        <div className="experience-summary-block">
                                            <span>Academic Projects</span>
                                            <p>{experience.projects}</p>
                                        </div>
                                    )}

                                    {experience.internships && (
                                        <div className="experience-summary-block">
                                            <span>Internships</span>
                                            <p>{experience.internships}</p>
                                        </div>
                                    )}

                                    {experience.certifications && (
                                        <div className="experience-summary-block">
                                            <span>Certifications</span>
                                            <p>{experience.certifications}</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="experience-empty-state">
                                    <i className="bi bi-mortarboard"></i>
                                    <div>
                                        <strong>Fresher</strong>
                                        <p>
                                            Add your career objective, projects,
                                            internships and certifications.
                                        </p>
                                    </div>
                                </div>
                            )
                        ) : experiences.length > 0 ? (
                            <div className="experience-summary-list">
                                {experiences.map((exp, index) => (
                                    <div
                                        key={index}
                                        className="experience-summary-item"
                                    >
                                        <div className="experience-summary-top">
                                            <div>
                                                <h6>
                                                    {exp.jobTitle ||
                                                        "Job title not added"}
                                                </h6>
                                                <p className="experience-company">
                                                    {exp.company ||
                                                        "Company not added"}
                                                </p>
                                            </div>

                                            <span
                                                className={`experience-summary-status ${
                                                    isComplete(exp)
                                                        ? "complete"
                                                        : "incomplete"
                                                }`}
                                            >
                                                {isComplete(exp)
                                                    ? "Completed"
                                                    : "Incomplete"}
                                            </span>
                                        </div>

                                        <div className="experience-summary-meta">
                                            {exp.location && (
                                                <span>
                                                    <i className="bi bi-geo-alt me-1"></i>
                                                    {exp.location}
                                                </span>
                                            )}

                                            {exp.employmentType && (
                                                <span>
                                                    <i className="bi bi-briefcase me-1"></i>
                                                    {exp.employmentType}
                                                </span>
                                            )}

                                            {exp.yearsOfExperience && (
                                                <span>
                                                    <i className="bi bi-clock me-1"></i>
                                                    {exp.yearsOfExperience}
                                                </span>
                                            )}
                                        </div>

                                        {exp.responsibilities && (
                                            <div className="experience-summary-block">
                                                <span>Responsibilities</span>
                                                <p>{exp.responsibilities}</p>
                                            </div>
                                        )}

                                        {exp.achievements && (
                                            <div className="experience-summary-block">
                                                <span>Achievements</span>
                                                <p>{exp.achievements}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="experience-empty-state">
                                <i className="bi bi-briefcase"></i>
                                <div>
                                    <strong>No experience added</strong>
                                    <p>
                                        Add your professional experience to
                                        help recruiters understand your
                                        background.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {editing && (
                    <div className="experience-card-body">

                        <div className="experience-status-section">
                            <label className="experience-label">
                                Experience Status
                            </label>

                            <div className="experience-options">
                                <label className="experience-radio">
                                    <input
                                        type="radio"
                                        name="type"
                                        value="FRESHER"
                                        checked={experience.type === "FRESHER"}
                                        onChange={handleChange}
                                    />
                                    <span className="radio-content">
                                        <strong>Fresher</strong>
                                        <small>
                                            I don't have professional
                                            experience yet
                                        </small>
                                    </span>
                                </label>

                                <label className="experience-radio">
                                    <input
                                        type="radio"
                                        name="type"
                                        value="EXPERIENCED"
                                        checked={
                                            experience.type === "EXPERIENCED"
                                        }
                                        onChange={handleChange}
                                    />
                                    <span className="radio-content">
                                        <strong>Experienced</strong>
                                        <small>
                                            I have professional work experience
                                        </small>
                                    </span>
                                </label>
                            </div>
                        </div>

                        {experience.type === "FRESHER" ? (
                            <div className="fresher-profile">
                                <div className="fresher-intro">
                                    <div className="fresher-icon">🎓</div>
                                    <div>
                                        <h6>Starting your career?</h6>
                                        <p>
                                            Add your career objective, projects,
                                            internships and certifications to
                                            strengthen your profile.
                                        </p>
                                    </div>
                                </div>

                                <div className="row g-3">
                                    <div className="col-12">
                                        <label className="form-label">
                                            Career Objective
                                        </label>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            name="about"
                                            value={experience.about || ""}
                                            onChange={handleChange}
                                            placeholder="Tell recruiters about your career goals and what you are looking for..."
                                            maxLength={1000}
                                        />
                                        <small className="field-hint">
                                            Keep it concise and focused on your
                                            career goals.
                                        </small>
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">
                                            Academic Projects
                                        </label>
                                        <textarea
                                            className="form-control"
                                            rows="4"
                                            name="projects"
                                            value={experience.projects || ""}
                                            onChange={handleChange}
                                            placeholder="Describe your academic or personal projects, technologies used and your contribution..."
                                            maxLength={1500}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Internships
                                        </label>
                                        <textarea
                                            className="form-control"
                                            rows="4"
                                            name="internships"
                                            value={experience.internships || ""}
                                            onChange={handleChange}
                                            placeholder="Mention internships, company, role and key responsibilities..."
                                            maxLength={1000}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Certifications
                                        </label>
                                        <textarea
                                            className="form-control"
                                            rows="4"
                                            name="certifications"
                                            value={
                                                experience.certifications || ""
                                            }
                                            onChange={handleChange}
                                            placeholder="AWS, Oracle Java, Google Cloud, etc..."
                                            maxLength={1000}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="experienced-profile">
                                {experiences.map((exp, index) => {
                                    const complete = isComplete(exp);

                                    return (
                                        <div
                                            key={index}
                                            className="experience-item"
                                        >
                                            <div className="experience-item-header">
                                                <div>
                                                    <h6>
                                                        Experience #{index + 1}
                                                    </h6>
                                                    <span>
                                                        {complete
                                                            ? "✓ Details completed"
                                                            : "Add your work details"}
                                                    </span>
                                                </div>

                                                <div className="experience-item-actions">
                                                    <span
                                                        className={`experience-status-badge ${
                                                            complete
                                                                ? "completed"
                                                                : "incomplete"
                                                        }`}
                                                    >
                                                        {complete
                                                            ? "Completed"
                                                            : "Incomplete"}
                                                    </span>

                                                    {experiences.length > 1 && (
                                                        <button
                                                            type="button"
                                                            className="remove-experience-btn"
                                                            onClick={() =>
                                                                removeExperience(
                                                                    index
                                                                )
                                                            }
                                                            title="Remove Experience"
                                                        >
                                                            ×
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">
                                                        Company Name
                                                        <span className="required">
                                                            *
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="company"
                                                        value={exp.company || ""}
                                                        onChange={(e) =>
                                                            handleExperienceChange(
                                                                index,
                                                                e
                                                            )
                                                        }
                                                        placeholder="e.g. TCS"
                                                        maxLength={120}
                                                    />
                                                </div>

                                                <div className="col-md-6">
                                                    <label className="form-label">
                                                        Job Title
                                                        <span className="required">
                                                            *
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="jobTitle"
                                                        value={
                                                            exp.jobTitle || ""
                                                        }
                                                        onChange={(e) =>
                                                            handleExperienceChange(
                                                                index,
                                                                e
                                                            )
                                                        }
                                                        placeholder="e.g. Java Developer"
                                                        maxLength={120}
                                                    />
                                                </div>

                                                <div className="col-md-6">
                                                    <label className="form-label">
                                                        Employment Type
                                                        <span className="required">
                                                            *
                                                        </span>
                                                    </label>
                                                    <select
                                                        className="form-select"
                                                        name="employmentType"
                                                        value={
                                                            exp.employmentType ||
                                                            ""
                                                        }
                                                        onChange={(e) =>
                                                            handleExperienceChange(
                                                                index,
                                                                e
                                                            )
                                                        }
                                                    >
                                                        <option value="">
                                                            Select employment
                                                            type
                                                        </option>
                                                        <option value="Full Time">
                                                            Full Time
                                                        </option>
                                                        <option value="Part Time">
                                                            Part Time
                                                        </option>
                                                        <option value="Internship">
                                                            Internship
                                                        </option>
                                                        <option value="Contract">
                                                            Contract
                                                        </option>
                                                        <option value="Freelance">
                                                            Freelance
                                                        </option>
                                                    </select>
                                                </div>

                                                <div className="col-md-6">
                                                    <label className="form-label">
                                                        Years of Experience
                                                        <span className="required">
                                                            *
                                                        </span>
                                                    </label>
                                                    <select
                                                        className="form-select"
                                                        name="yearsOfExperience"
                                                        value={
                                                            exp.yearsOfExperience ||
                                                            ""
                                                        }
                                                        onChange={(e) =>
                                                            handleExperienceChange(
                                                                index,
                                                                e
                                                            )
                                                        }
                                                    >
                                                        <option value="">
                                                            Select experience
                                                        </option>
                                                        <option value="0-1 Years">
                                                            0-1 Years
                                                        </option>
                                                        <option value="1-2 Years">
                                                            1-2 Years
                                                        </option>
                                                        <option value="2-5 Years">
                                                            2-5 Years
                                                        </option>
                                                        <option value="5-10 Years">
                                                            5-10 Years
                                                        </option>
                                                        <option value="10+ Years">
                                                            10+ Years
                                                        </option>
                                                    </select>
                                                </div>

                                                <div className="col-12">
                                                    <label className="form-label">
                                                        Location
                                                        <span className="required">
                                                            *
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="location"
                                                        value={exp.location || ""}
                                                        onChange={(e) =>
                                                            handleExperienceChange(
                                                                index,
                                                                e
                                                            )
                                                        }
                                                        placeholder="e.g. Delhi, India"
                                                        maxLength={100}
                                                    />
                                                </div>

                                                <div className="col-12">
                                                    <label className="form-label">
                                                        Responsibilities
                                                        <span className="required">
                                                            *
                                                        </span>
                                                    </label>
                                                    <textarea
                                                        className="form-control"
                                                        rows="4"
                                                        name="responsibilities"
                                                        value={
                                                            exp.responsibilities ||
                                                            ""
                                                        }
                                                        onChange={(e) =>
                                                            handleExperienceChange(
                                                                index,
                                                                e
                                                            )
                                                        }
                                                        placeholder="Describe your main responsibilities, technologies used and work performed..."
                                                        maxLength={2000}
                                                    />
                                                    <small className="field-hint">
                                                        Focus on what you actually
                                                        did in the role.
                                                    </small>
                                                </div>

                                                <div className="col-12">
                                                    <label className="form-label">
                                                        Achievements
                                                    </label>
                                                    <textarea
                                                        className="form-control"
                                                        rows="3"
                                                        name="achievements"
                                                        value={
                                                            exp.achievements || ""
                                                        }
                                                        onChange={(e) =>
                                                            handleExperienceChange(
                                                                index,
                                                                e
                                                            )
                                                        }
                                                        placeholder="Mention measurable achievements, improvements or important results..."
                                                        maxLength={1500}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                <button
                                    type="button"
                                    className="add-experience-btn"
                                    onClick={addExperience}
                                >
                                    + Add Another Experience
                                </button>
                            </div>
                        )}

                        <div className="experience-edit-actions">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => setEditing(false)}
                            >
                                <i className="bi bi-check2 me-1"></i>
                                Done
                            </button>

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ExperienceSection;
