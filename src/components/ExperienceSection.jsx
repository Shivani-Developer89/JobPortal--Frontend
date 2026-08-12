import { useState } from "react";

function ExperienceSection({ experience = {}, setExperience }) {
    const [editing, setEditing] = useState(false);
    const [draftExperience, setDraftExperience] = useState(experience);

    const experiences = Array.isArray(experience?.experiences)
        ? experience.experiences
        : [];

    const draftExperiences = Array.isArray(
        draftExperience?.experiences
    )
        ? draftExperience.experiences
        : [];

    const isFresher =
        draftExperience?.experienceLevel === "FRESHER";

    const isComplete = (exp) =>
        [
            exp.company,
            exp.jobTitle,
            exp.employmentType,
            exp.location,
            exp.yearsOfExperience,
            exp.responsibilities
        ].every(
            (value) =>
                value !== undefined &&
                value !== null &&
                String(value).trim() !== ""
        );

    const meaningfulExperiences = experiences.filter(
        (exp) =>
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

    // ------------------------------------------
    // EDIT
    // ------------------------------------------

    const handleEdit = () => {
        setDraftExperience({
            ...experience,

            // Use backend ExperienceLevel enum
            experienceLevel:
                experience?.experienceLevel ||
                (experience?.type === "FRESHER"
                    ? "FRESHER"
                    : "JUNIOR"),

            experiences: experiences.map((item) => ({
                ...item
            }))
        });

        setEditing(true);
    };

    // ------------------------------------------
    // CANCEL
    // ------------------------------------------

    const handleCancel = () => {
        setDraftExperience({
            ...experience,
            experiences: experiences.map((item) => ({
                ...item
            }))
        });

        setEditing(false);
    };

    // ------------------------------------------
    // DONE
    // ------------------------------------------

    const handleDone = () => {
        const cleanedExperiences = draftExperiences.filter(
            (exp) =>
                Object.values(exp || {}).some(
                    (value) =>
                        value !== undefined &&
                        value !== null &&
                        String(value).trim() !== ""
                )
        );

        setExperience({
            ...draftExperience,

            // Remove old frontend-only field
            type: undefined,

            experienceLevel:
                draftExperience.experienceLevel || "FRESHER",

            experiences: cleanedExperiences
        });

        setEditing(false);
    };

    // ------------------------------------------
    // EXPERIENCE LEVEL
    // ------------------------------------------

    const handleExperienceLevelChange = (e) => {
        const level = e.target.value;

        setDraftExperience({
            ...draftExperience,
            experienceLevel: level,

            // When switching to fresher,
            // don't keep old professional experiences visible.
            ...(level === "FRESHER"
                ? {}
                : {})
        });
    };

    // ------------------------------------------
    // FRESHER FIELDS
    // ------------------------------------------

    const handleFresherChange = (e) => {
        setDraftExperience({
            ...draftExperience,
            [e.target.name]: e.target.value
        });
    };

    // ------------------------------------------
    // ADD EXPERIENCE
    // ------------------------------------------

    const addExperience = () => {
        setDraftExperience({
            ...draftExperience,

            // Selecting Add Experience automatically
            // makes candidate experienced.
            experienceLevel: "JUNIOR",

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

    // ------------------------------------------
    // REMOVE EXPERIENCE
    // ------------------------------------------

    const removeExperience = (index) => {
        setDraftExperience({
            ...draftExperience,
            experiences: draftExperiences.filter(
                (_, i) => i !== index
            )
        });
    };

    // ------------------------------------------
    // EXPERIENCE FIELD CHANGE
    // ------------------------------------------

    const handleExperienceChange = (index, e) => {
        const updated = [...draftExperiences];

        updated[index] = {
            ...updated[index],
            [e.target.name]: e.target.value
        };

        setDraftExperience({
            ...draftExperience,
            experiences: updated
        });
    };

    // ------------------------------------------
    // DISPLAY EXPERIENCE LEVEL
    // ------------------------------------------

    const getExperienceLevelLabel = (level) => {
        switch (level) {
            case "FRESHER":
                return "Fresher";

            case "JUNIOR":
                return "Junior";

            case "MID_LEVEL":
                return "Mid Level";

            case "SENIOR":
                return "Senior";

            case "LEAD":
                return "Lead";

            default:
                return "Not specified";
        }
    };

    return (
        <section
            className="experience-section"
            id="experience"
        >
            <div className="experience-card">

                {/* =====================================
                    HEADER
                ====================================== */}

                <div className="experience-card-header">

                    <div className="experience-header-content">

                        <h5>
                            <i className="bi bi-briefcase me-2"></i>
                            Experience
                        </h5>

                        <span>
                            Tell recruiters about your professional
                            background
                        </span>

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

                        {!editing && (
                            <span className="experience-count">
                                {getExperienceLevelLabel(
                                    experience?.experienceLevel
                                )}
                            </span>
                        )}

                    </div>

                </div>


                {/* =====================================
                    VIEW MODE
                ====================================== */}

                {!editing ? (

                    <div className="experience-view-body">

                        {/* FRESHER */}

                        {experience?.experienceLevel === "FRESHER" ? (

                            hasFresherContent ? (

                                <div className="fresher-summary">

                                    {experience.about && (
                                        <div className="experience-summary-block">

                                            <span>
                                                Career Objective
                                            </span>

                                            <p>
                                                {experience.about}
                                            </p>

                                        </div>
                                    )}

                                    {experience.projects && (
                                        <div className="experience-summary-block">

                                            <span>
                                                Academic Projects
                                            </span>

                                            <p>
                                                {experience.projects}
                                            </p>

                                        </div>
                                    )}

                                    {experience.internships && (
                                        <div className="experience-summary-block">

                                            <span>
                                                Internships
                                            </span>

                                            <p>
                                                {experience.internships}
                                            </p>

                                        </div>
                                    )}

                                    {experience.certifications && (
                                        <div className="experience-summary-block">

                                            <span>
                                                Certifications
                                            </span>

                                            <p>
                                                {experience.certifications}
                                            </p>

                                        </div>
                                    )}

                                </div>

                            ) : (

                                <div className="experience-empty-state">

                                    <div className="experience-empty-icon">
                                        <i className="bi bi-mortarboard"></i>
                                    </div>

                                    <div>
                                        <strong>
                                            Fresher profile
                                        </strong>

                                        <p>
                                            Add your career objective,
                                            projects, internships or
                                            certifications.
                                        </p>
                                    </div>

                                </div>

                            )

                        ) : meaningfulExperiences.length > 0 ? (

                            /* EXPERIENCED */

                            <div className="experience-summary-list">

                                {meaningfulExperiences.map(
                                    (exp, index) => (

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


                                            {/* META */}

                                            <div className="experience-summary-meta">

                                                {exp.location && (
                                                    <span>
                                                        <i className="bi bi-geo-alt"></i>
                                                        {exp.location}
                                                    </span>
                                                )}

                                                {exp.employmentType && (
                                                    <span>
                                                        <i className="bi bi-briefcase"></i>
                                                        {exp.employmentType}
                                                    </span>
                                                )}

                                                {exp.yearsOfExperience && (
                                                    <span>
                                                        <i className="bi bi-clock"></i>
                                                        {exp.yearsOfExperience}
                                                    </span>
                                                )}

                                            </div>


                                            {/* RESPONSIBILITIES */}

                                            {exp.responsibilities && (
                                                <div className="experience-summary-block">

                                                    <span>
                                                        Responsibilities
                                                    </span>

                                                    <p>
                                                        {exp.responsibilities}
                                                    </p>

                                                </div>
                                            )}


                                            {/* ACHIEVEMENTS */}

                                            {exp.achievements && (
                                                <div className="experience-summary-block">

                                                    <span>
                                                        Achievements
                                                    </span>

                                                    <p>
                                                        {exp.achievements}
                                                    </p>

                                                </div>
                                            )}

                                        </div>

                                    )
                                )}

                            </div>

                        ) : (

                            <div className="experience-empty-state">

                                <div className="experience-empty-icon">
                                    <i className="bi bi-briefcase"></i>
                                </div>

                                <div>

                                    <strong>
                                        No professional experience added
                                    </strong>

                                    <p>
                                        Select your experience level and
                                        add your professional experience.
                                    </p>

                                </div>

                            </div>

                        )}

                    </div>

                ) : (

                    /* =====================================
                       EDIT MODE
                    ====================================== */

                    <div className="experience-card-body">


                        {/* =================================
                            EXPERIENCE LEVEL
                        ================================== */}

                        <div className="experience-status-section">

                            <div className="experience-level-heading">

                                <div>
                                    <label className="experience-label">
                                        Experience Level
                                    </label>

                                    <p>
                                        Select the level that best
                                        represents your current career
                                        stage.
                                    </p>
                                </div>

                                <i className="bi bi-bar-chart-line"></i>

                            </div>


                            <div className="experience-level-grid">


                                {/* FRESHER */}

                                <label
                                    className={`experience-level-option ${
                                        draftExperience.experienceLevel ===
                                        "FRESHER"
                                            ? "active"
                                            : ""
                                    }`}
                                >

                                    <input
                                        type="radio"
                                        name="experienceLevel"
                                        value="FRESHER"
                                        checked={
                                            draftExperience.experienceLevel ===
                                            "FRESHER"
                                        }
                                        onChange={
                                            handleExperienceLevelChange
                                        }
                                    />

                                    <div className="experience-level-icon">
                                        <i className="bi bi-mortarboard"></i>
                                    </div>

                                    <div className="experience-level-content">

                                        <strong>
                                            Fresher
                                        </strong>

                                        <small>
                                            No professional experience yet
                                        </small>

                                    </div>

                                    <i className="bi bi-check-circle-fill experience-level-check"></i>

                                </label>


                                {/* JUNIOR */}

                                <label
                                    className={`experience-level-option ${
                                        draftExperience.experienceLevel ===
                                        "JUNIOR"
                                            ? "active"
                                            : ""
                                    }`}
                                >

                                    <input
                                        type="radio"
                                        name="experienceLevel"
                                        value="JUNIOR"
                                        checked={
                                            draftExperience.experienceLevel ===
                                            "JUNIOR"
                                        }
                                        onChange={
                                            handleExperienceLevelChange
                                        }
                                    />

                                    <div className="experience-level-icon">
                                        <i className="bi bi-person"></i>
                                    </div>

                                    <div className="experience-level-content">

                                        <strong>
                                            Junior
                                        </strong>

                                        <small>
                                            Early career professional
                                        </small>

                                    </div>

                                    <i className="bi bi-check-circle-fill experience-level-check"></i>

                                </label>


                                {/* MID LEVEL */}

                                <label
                                    className={`experience-level-option ${
                                        draftExperience.experienceLevel ===
                                        "MID_LEVEL"
                                            ? "active"
                                            : ""
                                    }`}
                                >

                                    <input
                                        type="radio"
                                        name="experienceLevel"
                                        value="MID_LEVEL"
                                        checked={
                                            draftExperience.experienceLevel ===
                                            "MID_LEVEL"
                                        }
                                        onChange={
                                            handleExperienceLevelChange
                                        }
                                    />

                                    <div className="experience-level-icon">
                                        <i className="bi bi-person-workspace"></i>
                                    </div>

                                    <div className="experience-level-content">

                                        <strong>
                                            Mid Level
                                        </strong>

                                        <small>
                                            Experienced professional
                                        </small>

                                    </div>

                                    <i className="bi bi-check-circle-fill experience-level-check"></i>

                                </label>


                                {/* SENIOR */}

                                <label
                                    className={`experience-level-option ${
                                        draftExperience.experienceLevel ===
                                        "SENIOR"
                                            ? "active"
                                            : ""
                                    }`}
                                >

                                    <input
                                        type="radio"
                                        name="experienceLevel"
                                        value="SENIOR"
                                        checked={
                                            draftExperience.experienceLevel ===
                                            "SENIOR"
                                        }
                                        onChange={
                                            handleExperienceLevelChange
                                        }
                                    />

                                    <div className="experience-level-icon">
                                        <i className="bi bi-award"></i>
                                    </div>

                                    <div className="experience-level-content">

                                        <strong>
                                            Senior
                                        </strong>

                                        <small>
                                            Advanced professional experience
                                        </small>

                                    </div>

                                    <i className="bi bi-check-circle-fill experience-level-check"></i>

                                </label>


                                {/* LEAD */}

                                <label
                                    className={`experience-level-option ${
                                        draftExperience.experienceLevel ===
                                        "LEAD"
                                            ? "active"
                                            : ""
                                    }`}
                                >

                                    <input
                                        type="radio"
                                        name="experienceLevel"
                                        value="LEAD"
                                        checked={
                                            draftExperience.experienceLevel ===
                                            "LEAD"
                                        }
                                        onChange={
                                            handleExperienceLevelChange
                                        }
                                    />

                                    <div className="experience-level-icon">
                                        <i className="bi bi-people"></i>
                                    </div>

                                    <div className="experience-level-content">

                                        <strong>
                                            Lead
                                        </strong>

                                        <small>
                                            Leadership and ownership
                                        </small>

                                    </div>

                                    <i className="bi bi-check-circle-fill experience-level-check"></i>

                                </label>

                            </div>

                        </div>


                        {/* =================================
                            FRESHER FORM
                        ================================== */}

                        {isFresher ? (

                            <div className="fresher-profile">

                                <div className="fresher-intro">

                                    <div className="fresher-icon">
                                        <i className="bi bi-mortarboard"></i>
                                    </div>

                                    <div>

                                        <h6>
                                            Starting your career?
                                        </h6>

                                        <p>
                                            Add your career objective,
                                            projects, internships and
                                            certifications.
                                        </p>

                                    </div>

                                </div>


                                <div className="row g-4">

                                    <div className="col-12">

                                        <label className="form-label">
                                            Career Objective
                                        </label>

                                        <textarea
                                            className="form-control experience-textarea"
                                            rows="4"
                                            name="about"
                                            value={
                                                draftExperience.about || ""
                                            }
                                            onChange={
                                                handleFresherChange
                                            }
                                            placeholder="Tell recruiters about your career goals and the kind of role you are looking for..."
                                            maxLength={1000}
                                        />

                                        <small className="experience-helper">
                                            Keep it concise and focused on
                                            your career goals.
                                        </small>

                                    </div>


                                    <div className="col-12">

                                        <label className="form-label">
                                            Academic Projects
                                        </label>

                                        <textarea
                                            className="form-control experience-textarea"
                                            rows="4"
                                            name="projects"
                                            value={
                                                draftExperience.projects ||
                                                ""
                                            }
                                            onChange={
                                                handleFresherChange
                                            }
                                            placeholder="Describe your academic or personal projects, technologies used and your contribution..."
                                            maxLength={1500}
                                        />

                                    </div>


                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Internships
                                        </label>

                                        <textarea
                                            className="form-control experience-textarea"
                                            rows="4"
                                            name="internships"
                                            value={
                                                draftExperience.internships ||
                                                ""
                                            }
                                            onChange={
                                                handleFresherChange
                                            }
                                            placeholder="Mention internships, company, role and key responsibilities..."
                                            maxLength={1000}
                                        />

                                    </div>


                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Certifications
                                        </label>

                                        <textarea
                                            className="form-control experience-textarea"
                                            rows="4"
                                            name="certifications"
                                            value={
                                                draftExperience.certifications ||
                                                ""
                                            }
                                            onChange={
                                                handleFresherChange
                                            }
                                            placeholder="AWS, Oracle Java, Google Cloud, etc."
                                            maxLength={1000}
                                        />

                                    </div>

                                </div>

                            </div>

                        ) : (

                            /* =================================
                               EXPERIENCED FORM
                            ================================== */

                            <div className="experienced-profile">

                                {draftExperiences.map(
                                    (exp, index) => (

                                        <div
                                            key={index}
                                            className="experience-item"
                                        >

                                            <div className="experience-item-header">

                                                <div>

                                                    <h6>
                                                        Experience #
                                                        {index + 1}
                                                    </h6>

                                                    <span>
                                                        {isComplete(exp)
                                                            ? "Details completed"
                                                            : "Complete the required details"}
                                                    </span>

                                                </div>


                                                <div className="experience-item-actions">

                                                    <span
                                                        className={`experience-status-badge ${
                                                            isComplete(exp)
                                                                ? "completed"
                                                                : "incomplete"
                                                        }`}
                                                    >
                                                        {isComplete(exp)
                                                            ? "Completed"
                                                            : "Incomplete"}
                                                    </span>


                                                    <button
                                                        type="button"
                                                        className="remove-experience-btn"
                                                        onClick={() =>
                                                            removeExperience(
                                                                index
                                                            )
                                                        }
                                                        title="Remove experience"
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>

                                                </div>

                                            </div>


                                            <div className="row g-4">

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
                                                        value={
                                                            exp.company ||
                                                            ""
                                                        }
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
                                                            exp.jobTitle ||
                                                            ""
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
                                                            Select employment type
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
                                                        value={
                                                            exp.location ||
                                                            ""
                                                        }
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
                                                        className="form-control experience-textarea"
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

                                                    <small className="experience-helper">
                                                        Focus on what you
                                                        actually did in the
                                                        role.
                                                    </small>

                                                </div>


                                                <div className="col-12">

                                                    <label className="form-label">
                                                        Achievements
                                                    </label>

                                                    <textarea
                                                        className="form-control experience-textarea"
                                                        rows="3"
                                                        name="achievements"
                                                        value={
                                                            exp.achievements ||
                                                            ""
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
                                    )
                                )}


                                {draftExperiences.length === 0 && (

                                    <div className="experience-empty-edit">

                                        <i className="bi bi-briefcase"></i>

                                        <p>
                                            No experience added yet.
                                        </p>

                                    </div>

                                )}


                                <button
                                    type="button"
                                    className="add-experience-btn"
                                    onClick={addExperience}
                                >
                                    <i className="bi bi-plus-lg"></i>
                                    Add Another Experience
                                </button>

                            </div>

                        )}


                        {/* =================================
                            ACTIONS
                        ================================== */}

                        <div className="experience-edit-actions">

                            <button
                                type="button"
                                className="experience-done-btn"
                                onClick={handleDone}
                            >
                                <i className="bi bi-check2"></i>
                                Done
                            </button>

                            <button
                                type="button"
                                className="experience-cancel-btn"
                                onClick={handleCancel}
                            >
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