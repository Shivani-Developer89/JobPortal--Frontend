function ExperienceSection({
    experience,
    setExperience
}) {

    const handleChange = (e) => {

        setExperience({
            ...experience,
            [e.target.name]: e.target.value
        });

    };
    const addExperience = () => {

    setExperience({

        ...experience,

        experiences: [

            ...experience.experiences,

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

        experiences: experience.experiences.filter(
            (_, i) => i !== index
        )

    });

};
const handleExperienceChange = (
    index,
    e
) => {

    const updated = [...experience.experiences];

    updated[index][e.target.name] = e.target.value;

    setExperience({

        ...experience,

        experiences: updated

    });

};

    return (

        <div className="card shadow-sm mb-4">

            <div className="card-header">
                <h5 className="mb-0">
                    Experience
                </h5>
            </div>

            <div className="card-body">

                {/* Experience Status */}

                <div className="mb-4">

                    <label className="form-label fw-bold">
                        Experience Status
                    </label>

                    <div className="d-flex gap-4">

                        <div className="form-check">

                            <input
                                className="form-check-input"
                                type="radio"
                                name="type"
                                value="FRESHER"
                                checked={experience.type === "FRESHER"}
                                onChange={handleChange}
                            />

                            <label className="form-check-label">
                                Fresher
                            </label>

                        </div>

                        <div className="form-check">

                            <input
                                className="form-check-input"
                                type="radio"
                                name="type"
                                value="EXPERIENCED"
                                checked={experience.type === "EXPERIENCED"}
                                onChange={handleChange}
                            />

                            <label className="form-check-label">
                                Experienced
                            </label>

                        </div>

                    </div>

                </div>

                {
                    experience.type === "FRESHER"

                        ?

                        (

                            <>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Career Objective
                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        name="about"
                                        value={experience.about}
                                        onChange={handleChange}
                                        placeholder="Tell recruiters about yourself..."
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Academic Projects
                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        name="projects"
                                        value={experience.projects}
                                        onChange={handleChange}
                                        placeholder="Describe your academic projects..."
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Internships
                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        name="internships"
                                        value={experience.internships}
                                        onChange={handleChange}
                                        placeholder="Mention internships (if any)"
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Certifications
                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        name="certifications"
                                        value={experience.certifications}
                                        onChange={handleChange}
                                        placeholder="AWS, Oracle Java, Google Cloud..."
                                    />

                                </div>

                            </>

                        )

                        :

                       (

    <>

        {
            experience.experiences.map((exp, index) => (

                <div
                    key={index}
                    className="card border p-3 mb-4"
                >

                    <div className="d-flex justify-content-between align-items-center mb-3">

                        <h5 className="mb-0">
                            Experience #{index + 1}
                        </h5>

                        {
                            experience.experiences.length > 1 && (

                            <button
                                type="button"
                                className="btn p-0 border-0 bg-transparent text-danger"
                                onClick={() => removeExperience(index)}
                                title="Remove Experience"
                            >
                                <i className="bi bi-trash fs-5"></i>
                            </button>

                            )
                        }

                    </div>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Company Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="company"
                                value={exp.company}
                                onChange={(e) =>
                                    handleExperienceChange(index, e)
                                }
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Job Title
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="jobTitle"
                                value={exp.jobTitle}
                                onChange={(e) =>
                                    handleExperienceChange(index, e)
                                }
                            />

                        </div>

                    </div>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Employment Type
                            </label>

                            <select
                                className="form-select"
                                name="employmentType"
                                value={exp.employmentType}
                                onChange={(e) =>
                                    handleExperienceChange(index, e)
                                }
                            >

                                <option value="">Select</option>
                                <option>Full Time</option>
                                <option>Part Time</option>
                                <option>Internship</option>
                                <option>Contract</option>
                                <option>Freelance</option>

                            </select>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Years of Experience
                            </label>

                            <select
                                className="form-select"
                                name="yearsOfExperience"
                                value={exp.yearsOfExperience}
                                onChange={(e) =>
                                    handleExperienceChange(index, e)
                                }
                            >

                                <option value="">Select</option>
                                <option>0-1 Years</option>
                                <option>1-2 Years</option>
                                <option>2-5 Years</option>
                                <option>5-10 Years</option>
                                <option>10+ Years</option>

                            </select>

                        </div>

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Location
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="location"
                            value={exp.location}
                            onChange={(e) =>
                                handleExperienceChange(index, e)
                            }
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Responsibilities
                        </label>

                        <textarea
                            className="form-control"
                            rows="3"
                            name="responsibilities"
                            value={exp.responsibilities}
                            onChange={(e) =>
                                handleExperienceChange(index, e)
                            }
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Achievements
                        </label>

                        <textarea
                            className="form-control"
                            rows="3"
                            name="achievements"
                            value={exp.achievements}
                            onChange={(e) =>
                                handleExperienceChange(index, e)
                            }
                        />

                    </div>

                </div>

            ))
        }

        <div className="text-end">

            <button
                type="button"
                className="btn btn-success"
                onClick={addExperience}
            >
                + Add Another  Experience
            </button>

        </div>

    </>

)

                }

            </div>

        </div>

    );

}

export default ExperienceSection;