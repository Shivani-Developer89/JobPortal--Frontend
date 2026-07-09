
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

                {/* 👇 Put your conditional rendering HERE */}

                {
                 experience.type === "FRESHER"

                        ?

                        (
                            <div>

                                <h6 className="mb-3">
                                    Fresher Details
                                </h6>

                            </div>
                        )

                        :

                        (
                            <div>

                                <h6 className="mb-3">
                                    Work Experience
                                </h6>

                            </div>
                        )
                }

            </div>

        </div>

    );

}

export default ExperienceSection;