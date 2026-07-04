function EducationSection({
    education,
    handleEducationChange
}) {

    return (

        <>

            {/* 10th Details */}

            <div className="card shadow-sm mb-4">

                <div className="card-header">
                    <h5 className="mb-0">10th Details</h5>
                </div>

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                School Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="tenthSchool"
                                value={education.tenthSchool}
                                onChange={handleEducationChange}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Board
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="tenthBoard"
                                value={education.tenthBoard}
                                onChange={handleEducationChange}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Passing Year
                            </label>

                            <input
                                type="number"
                                className="form-control"
                                name="tenthYear"
                                value={education.tenthYear}
                                onChange={handleEducationChange}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Percentage / CGPA
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="tenthPercentage"
                                value={education.tenthPercentage}
                                onChange={handleEducationChange}
                            />

                        </div>

                    </div>

                </div>

            </div>
            {/* 12th Details */}

<div className="card shadow-sm mb-4">

    <div className="card-header">
        <h5 className="mb-0">12th Details</h5>
    </div>

    <div className="card-body">

        <div className="row">

            <div className="col-md-6 mb-3">

                <label className="form-label">
                    School Name
                </label>

                <input
                    type="text"
                    className="form-control"
                    name="twelfthSchool"
                    value={education.twelfthSchool}
                    onChange={handleEducationChange}
                />

            </div>

            <div className="col-md-6 mb-3">

                <label className="form-label">
                    Board
                </label>

                <select
                    className="form-select"
                    name="twelfthBoard"
                    value={education.twelfthBoard}
                    onChange={handleEducationChange}
                >
                    <option value="">Select Board</option>
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE">ICSE</option>
                    <option value="State Board">State Board</option>
                    <option value="NIOS">NIOS</option>
                    <option value="Other">Other</option>
                </select>

            </div>

            <div className="col-md-6 mb-3">

                <label className="form-label">
                    Stream
                </label>

                <select
                    className="form-select"
                    name="twelfthStream"
                    value={education.twelfthStream}
                    onChange={handleEducationChange}
                >
                    <option value="">Select Stream</option>
                    <option value="Science">Science</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Arts">Arts</option>
                    <option value="Other">Other</option>
                </select>

            </div>

            <div className="col-md-6 mb-3">

                <label className="form-label">
                    Passing Year
                </label>

                <input
                    type="number"
                    className="form-control"
                    name="twelfthYear"
                    value={education.twelfthYear}
                    onChange={handleEducationChange}
                />

            </div>

            <div className="col-md-6 mb-3">

                <label className="form-label">
                    Percentage / CGPA
                </label>

                <input
                    type="text"
                    className="form-control"
                    name="twelfthPercentage"
                    value={education.twelfthPercentage}
                    onChange={handleEducationChange}
                />

            </div>

        </div>

    </div>

</div>

        </>

    );

}

export default EducationSection;