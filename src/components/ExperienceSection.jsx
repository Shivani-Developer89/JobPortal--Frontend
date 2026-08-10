import { useState } from "react";

function ExperienceSection({ experience = {}, setExperience }) {
    const [editing, setEditing] = useState(false);
    const [draftExperience, setDraftExperience] = useState(experience);

    const experiences = Array.isArray(experience?.experiences) ? experience.experiences : [];
    const draftExperiences = Array.isArray(draftExperience?.experiences)
        ? draftExperience.experiences
        : [];

    const isComplete = (exp) =>
        [
            exp.company,
            exp.jobTitle,
            exp.employmentType,
            exp.location,
            exp.yearsOfExperience,
            exp.responsibilities
        ].every(v => v !== undefined && v !== null && String(v).trim() !== "");

    const meaningfulExperiences = experiences.filter(exp =>
        exp &&
        (
            String(exp.company || "").trim() ||
            String(exp.jobTitle || "").trim() ||
            String(exp.responsibilities || "").trim()
        )
    );

    const hasFresherContent =
        String(experience?.about || "").trim() ||
        String(experience?.projects || "").trim() ||
        String(experience?.internships || "").trim() ||
        String(experience?.certifications || "").trim();

    const handleEdit = () => {
        setDraftExperience({
            ...experience,
            experiences: experiences.map(item => ({ ...item }))
        });
        setEditing(true);
    };

    const handleCancel = () => {
        setDraftExperience({
            ...experience,
            experiences: experiences.map(item => ({ ...item }))
        });
        setEditing(false);
    };

    const handleDone = () => {
        setExperience({
            ...draftExperience,
            experiences: draftExperiences.filter(exp =>
                Object.values(exp || {}).some(
                    value => value !== undefined && value !== null && String(value).trim() !== ""
                )
            )
        });
        setEditing(false);
    };

    const handleTypeChange = (e) => {
        setDraftExperience({ ...draftExperience, type: e.target.value });
    };

    const handleFresherChange = (e) => {
        setDraftExperience({
            ...draftExperience,
            [e.target.name]: e.target.value
        });
    };

    const addExperience = () => {
        setDraftExperience({
            ...draftExperience,
            type: "EXPERIENCED",
            experiences: [
                ...draftExperiences,
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
        setDraftExperience({
            ...draftExperience,
            experiences: draftExperiences.filter((_, i) => i !== index)
        });
    };

    const handleExperienceChange = (index, e) => {
        const updated = [...draftExperiences];
        updated[index] = { ...updated[index], [e.target.name]: e.target.value };

        setDraftExperience({
            ...draftExperience,
            experiences: updated
        });
    };

    return (
        <section className="experience-section" id="experience">
            <div className="experience-card">

                <div className="experience-card-header">
                    <div>
                        <h5>Experience</h5>
                        <span>Tell recruiters about your professional background</span>
                    </div>

                    <div className="experience-header-right">
                        {!editing && (
                            <button
                                type="button"
                                className="experience-edit-btn"
                                onClick={handleEdit}
                            >
                                <i className="bi bi-pencil"></i>
                                <span>Edit</span>
                            </button>
                        )}

                        <span className="experience-count">
                            {experience?.type === "FRESHER"
                                ? "Fresher"
                                : `${meaningfulExperiences.length} ${meaningfulExperiences.length === 1 ? "experience" : "experiences"}`}
                        </span>
                    </div>
                </div>

                {!editing ? (
                    <div className="experience-view-body">

                        {experience?.type === "FRESHER" ? (
                            hasFresherContent ? (
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
                                    <div className="experience-empty-icon">
                                        <i className="bi bi-mortarboard"></i>
                                    </div>
                                    <div>
                                        <strong>Fresher profile</strong>
                                        <p>Add your career objective, projects, internships or certifications.</p>
                                    </div>
                                </div>
                            )
                        ) : meaningfulExperiences.length > 0 ? (
                            <div className="experience-summary-list">
                                {meaningfulExperiences.map((exp, index) => (
                                    <div key={index} className="experience-summary-item">
                                        <div className="experience-summary-top">
                                            <div>
                                                <h6>{exp.jobTitle || "Job title not added"}</h6>
                                                <p className="experience-company">
                                                    {exp.company || "Company not added"}
                                                </p>
                                            </div>

                                            <span className={`experience-summary-status ${isComplete(exp) ? "complete" : "incomplete"}`}>
                                                {isComplete(exp) ? "Completed" : "Incomplete"}
                                            </span>
                                        </div>

                                        <div className="experience-summary-meta">
                                            {exp.location && (
                                                <span><i className="bi bi-geo-alt"></i>{exp.location}</span>
                                            )}
                                            {exp.employmentType && (
                                                <span><i className="bi bi-briefcase"></i>{exp.employmentType}</span>
                                            )}
                                            {exp.yearsOfExperience && (
                                                <span><i className="bi bi-clock"></i>{exp.yearsOfExperience}</span>
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
                                <div className="experience-empty-icon">
                                    <i className="bi bi-briefcase"></i>
                                </div>
                                <div>
                                    <strong>No professional experience added</strong>
                                    <p>If you're a fresher, choose Fresher and add projects or internships instead.</p>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="experience-card-body">

                        <div className="experience-status-section">
                            <label className="experience-label">Experience Status</label>

                            <div className="experience-options">
                                <label className="experience-radio">
                                    <input
                                        type="radio"
                                        name="type"
                                        value="FRESHER"
                                        checked={draftExperience.type === "FRESHER"}
                                        onChange={handleTypeChange}
                                    />
                                    <span className="radio-content">
                                        <strong>Fresher</strong>
                                        <small>I don't have professional experience yet</small>
                                    </span>
                                </label>

                                <label className="experience-radio">
                                    <input
                                        type="radio"
                                        name="type"
                                        value="EXPERIENCED"
                                        checked={draftExperience.type === "EXPERIENCED"}
                                        onChange={handleTypeChange}
                                    />
                                    <span className="radio-content">
                                        <strong>Experienced</strong>
                                        <small>I have professional work experience</small>
                                    </span>
                                </label>
                            </div>
                        </div>

                        {draftExperience.type === "FRESHER" ? (
                            <div className="fresher-profile">
                                <div className="fresher-intro">
                                    <div className="fresher-icon">
                                        <i className="bi bi-mortarboard"></i>
                                    </div>
                                    <div>
                                        <h6>Starting your career?</h6>
                                        <p>Add the information that is relevant to your fresher profile.</p>
                                    </div>
                                </div>

                                <div className="row g-3">
                                    <div className="col-12">
                                        <label className="form-label">Career Objective</label>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            name="about"
                                            value={draftExperience.about || ""}
                                            onChange={handleFresherChange}
                                            placeholder="Tell recruiters about your career goals and the kind of role you are looking for..."
                                            maxLength={1000}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Academic Projects</label>
                                        <textarea
                                            className="form-control"
                                            rows="4"
                                            name="projects"
                                            value={draftExperience.projects || ""}
                                            onChange={handleFresherChange}
                                            placeholder="Describe your academic or personal projects, technologies used and your contribution..."
                                            maxLength={1500}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Internships</label>
                                        <textarea
                                            className="form-control"
                                            rows="4"
                                            name="internships"
                                            value={draftExperience.internships || ""}
                                            onChange={handleFresherChange}
                                            placeholder="Mention internships, company, role and responsibilities..."
                                            maxLength={1000}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Certifications</label>
                                        <textarea
                                            className="form-control"
                                            rows="4"
                                            name="certifications"
                                            value={draftExperience.certifications || ""}
                                            onChange={handleFresherChange}
                                            placeholder="AWS, Oracle Java, Google Cloud, etc."
                                            maxLength={1000}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="experienced-profile">

                                {draftExperiences.map((exp, index) => (
                                    <div key={index} className="experience-item">

                                        <div className="experience-item-header">
                                            <div>
                                                <h6>Experience #{index + 1}</h6>
                                                <span>
                                                    {isComplete(exp)
                                                        ? "Details completed"
                                                        : "Complete the required details"}
                                                </span>
                                            </div>

                                            <div className="experience-item-actions">
                                                <span className={`experience-status-badge ${isComplete(exp) ? "completed" : "incomplete"}`}>
                                                    {isComplete(exp) ? "Completed" : "Incomplete"}
                                                </span>

                                                <button
                                                    type="button"
                                                    className="remove-experience-btn"
                                                    onClick={() => removeExperience(index)}
                                                    title="Remove experience"
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label className="form-label">Company Name <span className="required">*</span></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="company"
                                                    value={exp.company || ""}
                                                    onChange={(e) => handleExperienceChange(index, e)}
                                                    placeholder="e.g. TCS"
                                                    maxLength={120}
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label">Job Title <span className="required">*</span></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="jobTitle"
                                                    value={exp.jobTitle || ""}
                                                    onChange={(e) => handleExperienceChange(index, e)}
                                                    placeholder="e.g. Java Developer"
                                                    maxLength={120}
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label">Employment Type <span className="required">*</span></label>
                                                <select
                                                    className="form-select"
                                                    name="employmentType"
                                                    value={exp.employmentType || ""}
                                                    onChange={(e) => handleExperienceChange(index, e)}
                                                >
                                                    <option value="">Select employment type</option>
                                                    <option value="Full Time">Full Time</option>
                                                    <option value="Part Time">Part Time</option>
                                                    <option value="Internship">Internship</option>
                                                    <option value="Contract">Contract</option>
                                                    <option value="Freelance">Freelance</option>
                                                </select>
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label">Years of Experience <span className="required">*</span></label>
                                                <select
                                                    className="form-select"
                                                    name="yearsOfExperience"
                                                    value={exp.yearsOfExperience || ""}
                                                    onChange={(e) => handleExperienceChange(index, e)}
                                                >
                                                    <option value="">Select experience</option>
                                                    <option value="0-1 Years">0-1 Years</option>
                                                    <option value="1-2 Years">1-2 Years</option>
                                                    <option value="2-5 Years">2-5 Years</option>
                                                    <option value="5-10 Years">5-10 Years</option>
                                                    <option value="10+ Years">10+ Years</option>
                                                </select>
                                            </div>

                                            <div className="col-12">
                                                <label className="form-label">Location <span className="required">*</span></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="location"
                                                    value={exp.location || ""}
                                                    onChange={(e) => handleExperienceChange(index, e)}
                                                    placeholder="e.g. Delhi, India"
                                                    maxLength={100}
                                                />
                                            </div>

                                            <div className="col-12">
                                                <label className="form-label">Responsibilities <span className="required">*</span></label>
                                                <textarea
                                                    className="form-control"
                                                    rows="4"
                                                    name="responsibilities"
                                                    value={exp.responsibilities || ""}
                                                    onChange={(e) => handleExperienceChange(index, e)}
                                                    placeholder="Describe your main responsibilities, technologies used and work performed..."
                                                    maxLength={2000}
                                                />
                                            </div>

                                            <div className="col-12">
                                                <label className="form-label">Achievements</label>
                                                <textarea
                                                    className="form-control"
                                                    rows="3"
                                                    name="achievements"
                                                    value={exp.achievements || ""}
                                                    onChange={(e) => handleExperienceChange(index, e)}
                                                    placeholder="Mention measurable achievements or important results..."
                                                    maxLength={1500}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {draftExperiences.length === 0 && (
                                    <div className="experience-empty-edit">
                                        <i className="bi bi-briefcase"></i>
                                        <p>No experience added yet.</p>
                                    </div>
                                )}

                                <button
                                    type="button"
                                    className="add-experience-btn"
                                    onClick={addExperience}
                                >
                                    <i className="bi bi-plus-lg"></i>
                                    Add Experience
                                </button>
                            </div>
                        )}

                        <div className="experience-edit-actions">
                            <button type="button" className="experience-done-btn" onClick={handleDone}>
                                <i className="bi bi-check2"></i>
                                Done
                            </button>

                            <button type="button" className="experience-cancel-btn" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default ExperienceSection;