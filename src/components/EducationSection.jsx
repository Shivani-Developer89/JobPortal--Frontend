import { useState } from "react";

function EducationSection({
    profile,
    handleChange
}) {

    const [editing, setEditing] = useState(false);

    return (

        <div className="profile-inner-section">

            {/* HEADER */}

            <div className="section-title-row">

                <h3>
                    Education
                </h3>

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

                    {/* 10th */}

                    <div className="education-item">

                        <h4>10th</h4>

                        <p className="education-institute">
                            {profile.tenthSchool || "Not added"}
                        </p>

                        <p className="education-meta">

                            {profile.tenthBoard || "Board not added"}

                            {" • "}

                            {profile.tenthPassingYear || "Year not added"}

                            {" • "}

                            {profile.tenthScore
                                ? `${profile.tenthScore}%`
                                : "Score not added"}

                        </p>

                    </div>


                    {/* 12th */}

                    <div className="education-item">

                        <h4>12th</h4>

                        <p className="education-institute">
                            {profile.twelfthSchool || "Not added"}
                        </p>

                        <p className="education-meta">

                            {profile.twelfthStream && (
                                <>
                                    {profile.twelfthStream}
                                    {" • "}
                                </>
                            )}

                            {profile.twelfthBoard || "Board not added"}

                            {" • "}

                            {profile.twelfthPassingYear || "Year not added"}

                            {" • "}

                            {profile.twelfthScore
                                ? `${profile.twelfthScore}%`
                                : "Score not added"}

                        </p>

                    </div>


                    {/* Graduation */}

                    <div className="education-item">

                        <h4>
                            {profile.graduationDegree || "Graduation"}
                        </h4>

                        <p className="education-institute">

                            {profile.graduationCollege ||
                                "College not added"}

                        </p>

                        <p className="education-meta">

                            {profile.graduationUniversity ||
                                "University not added"}

                            {" • "}

                            {profile.graduationPassingYear ||
                                "Year not added"}

                            {" • "}

                            {profile.graduationPercentage
                                ? `${profile.graduationPercentage}%`
                                : "Score not added"}

                        </p>

                        {profile.graduationBranch && (

                            <p className="education-specialization">

                                {profile.graduationBranch}

                            </p>

                        )}

                    </div>


                    {/* Post Graduation */}

                    {(profile.postGraduationDegree ||
                        profile.postGraduationCollege) && (

                        <div className="education-item">

                            <h4>

                                {profile.postGraduationDegree ||
                                    "Post Graduation"}

                            </h4>

                            <p className="education-institute">

                                {profile.postGraduationCollege ||
                                    "College not added"}

                            </p>

                            <p className="education-meta">

                                {profile.postGraduationUniversity ||
                                    "University not added"}

                                {" • "}

                                {profile.postGraduationPassingYear ||
                                    "Year not added"}

                                {" • "}

                                {profile.postGraduationPercentage
                                    ? `${profile.postGraduationPercentage}%`
                                    : "Score not added"}

                            </p>

                        </div>

                    )}

                </div>

            )}


            {/* =========================
                EDIT MODE
            ========================= */}

            {editing && (

                <div className="education-edit-form">

                    {/* 10th */}

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
                                    value={profile.tenthSchool || ""}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Board
                                </label>

                                <input
                                    className="form-control"
                                    name="tenthBoard"
                                    value={profile.tenthBoard || ""}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Passing Year
                                </label>

                                <input
                                    className="form-control"
                                    name="tenthPassingYear"
                                    value={profile.tenthPassingYear || ""}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Percentage
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="tenthScore"
                                    value={profile.tenthScore || ""}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                    </div>


                    {/* 12th */}

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
                                    value={profile.twelfthSchool || ""}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Board
                                </label>

                                <input
                                    className="form-control"
                                    name="twelfthBoard"
                                    value={profile.twelfthBoard || ""}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Stream
                                </label>

                                <input
                                    className="form-control"
                                    name="twelfthStream"
                                    value={profile.twelfthStream || ""}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Passing Year
                                </label>

                                <input
                                    className="form-control"
                                    name="twelfthPassingYear"
                                    value={profile.twelfthPassingYear || ""}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Percentage
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="twelfthScore"
                                    value={profile.twelfthScore || ""}
                                    onChange={handleChange}
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
                                    value={profile.graduationDegree || ""}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Branch / Specialization
                                </label>

                                <input
                                    className="form-control"
                                    name="graduationBranch"
                                    value={profile.graduationBranch || ""}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    College Name
                                </label>

                                <input
                                    className="form-control"
                                    name="graduationCollege"
                                    value={profile.graduationCollege || ""}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    University
                                </label>

                                <input
                                    className="form-control"
                                    name="graduationUniversity"
                                    value={profile.graduationUniversity || ""}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Passing Year
                                </label>

                                <input
                                    className="form-control"
                                    name="graduationPassingYear"
                                    value={profile.graduationPassingYear || ""}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Percentage
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="graduationPercentage"
                                    value={profile.graduationPercentage || ""}
                                    onChange={handleChange}
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
                                    name="postGraduationDegree"
                                    value={
                                        profile.postGraduationDegree || ""
                                    }
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Branch / Specialization
                                </label>

                                <input
                                    className="form-control"
                                    name="postGraduationBranch"
                                    value={
                                        profile.postGraduationBranch || ""
                                    }
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    College Name
                                </label>

                                <input
                                    className="form-control"
                                    name="postGraduationCollege"
                                    value={
                                        profile.postGraduationCollege || ""
                                    }
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    University
                                </label>

                                <input
                                    className="form-control"
                                    name="postGraduationUniversity"
                                    value={
                                        profile.postGraduationUniversity || ""
                                    }
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Passing Year
                                </label>

                                <input
                                    className="form-control"
                                    name="postGraduationPassingYear"
                                    value={
                                        profile.postGraduationPassingYear || ""
                                    }
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Percentage
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="postGraduationPercentage"
                                    value={
                                        profile.postGraduationPercentage || ""
                                    }
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                    </div>


                    {/* ACTIONS */}

                    <div className="education-actions">

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                                setEditing(false);
                            }}
                        >
                            Save
                        </button>

                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => {
                                setEditing(false);
                            }}
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