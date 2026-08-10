import { useState } from "react";

function EducationSection({
    education,
    handleEducationChange
}) {
    const [editing, setEditing] = useState(false);

    const data = education || {};

    const formatScore = (score, gradingType) => {
        if (
            score === undefined ||
            score === null ||
            String(score).trim() === ""
        ) {
            return "Score not added";
        }

        return gradingType === "CGPA"
            ? `${score} CGPA`
            : `${score}%`;
    };

    return (
        <div className="profile-inner-section" >

            {/* HEADER */}
            <div className="section-title-row">
                <h3>Education</h3>

                <button
                    type="button"
                    onClick={() => setEditing(true)}
                >
                    <i className="bi bi-pencil me-1"></i>
                    Edit
                </button>
            </div>

            {/* =========================
                DISPLAY MODE
            ========================= */}
            {!editing && (
                <div className="education-list">

                    {/* 10TH */}
                    <div className="education-item">
                        <h4>10th</h4>

                        <p className="education-institute">
                            {data.tenthSchool || "Not added"}
                        </p>

                        <p className="education-meta">
                            {data.tenthBoard || "Board not added"}
                            {" • "}
                            {data.tenthYear || "Year not added"}
                            {" • "}
                            {formatScore(
                                data.tenthScore,
                                data.tenthGradingType
                            )}
                        </p>
                    </div>

                    {/* 12TH */}
                    <div className="education-item">
                        <h4>12th</h4>

                        <p className="education-institute">
                            {data.twelfthSchool || "Not added"}
                        </p>

                        <p className="education-meta">
                            {data.twelfthStream && (
                                <>
                                    {data.twelfthStream}
                                    {" • "}
                                </>
                            )}

                            {data.twelfthBoard || "Board not added"}
                            {" • "}
                            {data.twelfthYear || "Year not added"}
                            {" • "}
                            {formatScore(
                                data.twelfthScore,
                                data.twelfthGradingType
                            )}
                        </p>
                    </div>

                    {/* GRADUATION */}
                    <div className="education-item">
                        <h4>
                            {data.graduationDegree || "Graduation"}
                        </h4>

                        <p className="education-institute">
                            {data.graduationCollege || "College not added"}
                        </p>

                        <p className="education-meta">
                            {data.graduationUniversity ||
                                "University not added"}
                            {" • "}
                            {data.graduationYear || "Year not added"}
                            {" • "}
                            {formatScore(
                                data.graduationScore,
                                data.graduationGradingType
                            )}
                        </p>

                        {data.graduationBranch && (
                            <p className="education-specialization">
                                {data.graduationBranch}
                            </p>
                        )}
                    </div>

                    {/* POST GRADUATION */}
                    {(data.postDegree || data.postCollege) && (
                        <div className="education-item">
                            <h4>
                                {data.postDegree || "Post Graduation"}
                            </h4>

                            <p className="education-institute">
                                {data.postCollege || "College not added"}
                            </p>

                            <p className="education-meta">
                                {data.postUniversity ||
                                    "University not added"}
                                {" • "}
                                {data.postYear || "Year not added"}
                                {" • "}
                                {formatScore(
                                    data.postScore,
                                    data.postGradingType
                                )}
                            </p>

                            {data.postBranch && (
                                <p className="education-specialization">
                                    {data.postBranch}
                                </p>
                            )}
                        </div>
                    )}

                    {!data.tenthSchool &&
                        !data.twelfthSchool &&
                        !data.graduationCollege &&
                        !data.postCollege && (
                            <div className="education-empty">
                                <i className="bi bi-mortarboard"></i>
                                <p>No education details added yet.</p>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => setEditing(true)}
                                >
                                    Add Education
                                </button>
                            </div>
                        )}
                </div>
            )}

            {/* =========================
                EDIT MODE
            ========================= */}
            {editing && (
                <div className="education-edit-form">

                    {/* 10TH */}
                    <div className="education-form-block">
                        <h4>10th Details</h4>

                        <div className="row">

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    School Name
                                </label>
                                <input
                                    className="form-control"
                                    name="tenthSchool"
                                    value={data.tenthSchool || ""}
                                    onChange={handleEducationChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Board
                                </label>
                                <input
                                    className="form-control"
                                    name="tenthBoard"
                                    value={data.tenthBoard || ""}
                                    onChange={handleEducationChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Passing Year
                                </label>
                                <input
                                    className="form-control"
                                    name="tenthYear"
                                    value={data.tenthYear || ""}
                                    onChange={handleEducationChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Grading Type
                                </label>
                                <select
                                    className="form-select"
                                    name="tenthGradingType"
                                    value={data.tenthGradingType || ""}
                                    onChange={handleEducationChange}
                                >
                                    <option value="">
                                        Select grading type
                                    </option>
                                    <option value="PERCENTAGE">
                                        Percentage
                                    </option>
                                    <option value="CGPA">
                                        CGPA
                                    </option>
                                </select>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Score
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    className="form-control"
                                    name="tenthScore"
                                    value={data.tenthScore || ""}
                                    onChange={handleEducationChange}
                                />
                            </div>

                        </div>
                    </div>

                    {/* 12TH */}
                    <div className="education-form-block">
                        <h4>12th Details</h4>

                        <div className="row">

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    School Name
                                </label>
                                <input
                                    className="form-control"
                                    name="twelfthSchool"
                                    value={data.twelfthSchool || ""}
                                    onChange={handleEducationChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Board
                                </label>
                                <input
                                    className="form-control"
                                    name="twelfthBoard"
                                    value={data.twelfthBoard || ""}
                                    onChange={handleEducationChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Stream
                                </label>
                                <input
                                    className="form-control"
                                    name="twelfthStream"
                                    value={data.twelfthStream || ""}
                                    onChange={handleEducationChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Passing Year
                                </label>
                                <input
                                    className="form-control"
                                    name="twelfthYear"
                                    value={data.twelfthYear || ""}
                                    onChange={handleEducationChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Grading Type
                                </label>
                                <select
                                    className="form-select"
                                    name="twelfthGradingType"
                                    value={data.twelfthGradingType || ""}
                                    onChange={handleEducationChange}
                                >
                                    <option value="">
                                        Select grading type
                                    </option>
                                    <option value="PERCENTAGE">
                                        Percentage
                                    </option>
                                    <option value="CGPA">
                                        CGPA
                                    </option>
                                </select>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Score
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    className="form-control"
                                    name="twelfthScore"
                                    value={data.twelfthScore || ""}
                                    onChange={handleEducationChange}
                                />
                            </div>

                        </div>
                    </div>

                    {/* GRADUATION */}
                    <div className="education-form-block">
                        <h4>Graduation</h4>

                        <div className="row">

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Degree
                                </label>
                                <input
                                    className="form-control"
                                    name="graduationDegree"
                                    value={data.graduationDegree || ""}
                                    onChange={handleEducationChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Branch / Specialization
                                </label>
                                <input
                                    className="form-control"
                                    name="graduationBranch"
                                    value={data.graduationBranch || ""}
                                    onChange={handleEducationChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    College Name
                                </label>
                                <input
                                    className="form-control"
                                    name="graduationCollege"
                                    value={data.graduationCollege || ""}
                                    onChange={handleEducationChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    University
                                </label>
                                <input
                                    className="form-control"
                                    name="graduationUniversity"
                                    value={data.graduationUniversity || ""}
                                    onChange={handleEducationChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Passing Year
                                </label>
                                <input
                                    className="form-control"
                                    name="graduationYear"
                                    value={data.graduationYear || ""}
                                    onChange={handleEducationChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Grading Type
                                </label>
                                <select
                                    className="form-select"
                                    name="graduationGradingType"
                                    value={data.graduationGradingType || ""}
                                    onChange={handleEducationChange}
                                >
                                    <option value="">
                                        Select grading type
                                    </option>
                                    <option value="PERCENTAGE">
                                        Percentage
                                    </option>
                                    <option value="CGPA">
                                        CGPA
                                    </option>
                                </select>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Score
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    className="form-control"
                                    name="graduationScore"
                                    value={data.graduationScore || ""}
                                    onChange={handleEducationChange}
                                />
                            </div>

                        </div>
                    </div>

                    {/* POST GRADUATION */}
                    <div className="education-form-block">
                        <h4>
                            Post Graduation
                            <span className="optional-label">
                                Optional
                            </span>
                        </h4>

                        <div className="row">

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Degree
                                </label>
                                <input
                                    className="form-control"
                                    name="postDegree"
                                    value={data.postDegree || ""}
                                    onChange={handleEducationChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Branch / Specialization
                                </label>
                                <input
                                    className="form-control"
                                    name="postBranch"
                                    value={data.postBranch || ""}
                                    onChange={handleEducationChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    College Name
                                </label>
                                <input
                                    className="form-control"
                                    name="postCollege"
                                    value={data.postCollege || ""}
                                    onChange={handleEducationChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    University
                                </label>
                                <input
                                    className="form-control"
                                    name="postUniversity"
                                    value={data.postUniversity || ""}
                                    onChange={handleEducationChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Passing Year
                                </label>
                                <input
                                    className="form-control"
                                    name="postYear"
                                    value={data.postYear || ""}
                                    onChange={handleEducationChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Grading Type
                                </label>
                                <select
                                    className="form-select"
                                    name="postGradingType"
                                    value={data.postGradingType || ""}
                                    onChange={handleEducationChange}
                                >
                                    <option value="">
                                        Select grading type
                                    </option>
                                    <option value="PERCENTAGE">
                                        Percentage
                                    </option>
                                    <option value="CGPA">
                                        CGPA
                                    </option>
                                </select>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Score
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    className="form-control"
                                    name="postScore"
                                    value={data.postScore || ""}
                                    onChange={handleEducationChange}
                                />
                            </div>

                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="education-actions">

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => setEditing(false)}
                        >
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
    );
}

export default EducationSection;