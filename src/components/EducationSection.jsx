function EducationSection({ education, handleEducationChange }) {
    const currentYear = new Date().getFullYear();

    const years = Array.from({ length: 35 }, (_, i) => currentYear - i);

    const isComplete = (fields) =>
        fields.every(
            (field) =>
                field !== undefined &&
                field !== null &&
                String(field).trim() !== ""
        );

    const scoreLimit = (type) => (type === "CGPA" ? 10 : 100);

    const scorePlaceholder = (type) =>
        type === "CGPA" ? "e.g. 8.75" : "e.g. 84";

    const ScoreInput = ({ type, name, value }) => (
        <input
            type="number"
            className="form-control"
            name={name}
            value={value || ""}
            onChange={handleEducationChange}
            min="0"
            max={scoreLimit(type)}
            step="0.01"
            placeholder={scorePlaceholder(type)}
        />
    );

    const Status = ({ complete, optional = false }) => (
        <span
            className={`education-status ${
                complete
                    ? "completed"
                    : optional
                    ? "optional-status"
                    : "incomplete"
            }`}
        >
            {complete ? "✓ Completed" : optional ? "Optional" : "Incomplete"}
        </span>
    );

    const YearSelect = ({ name, value }) => (
        <select
            className="form-select"
            name={name}
            value={value || ""}
            onChange={handleEducationChange}
        >
            <option value="">Select Year</option>
            {years.map((year) => (
                <option key={year} value={year}>
                    {year}
                </option>
            ))}
        </select>
    );

    return (
        <div className="education-section">

            {/* 10th */}
            <div className="education-card">
                <div className="education-card-header">
                    <div>
                        <h5>10th Details</h5>
                        <span>Secondary school information</span>
                    </div>

                    <Status
                        complete={isComplete([
                            education.tenthSchool,
                            education.tenthBoard,
                            education.tenthYear,
                            education.tenthGradingType,
                            education.tenthScore
                        ])}
                    />
                </div>

                <div className="education-card-body">
                    <div className="row g-3">

                        <div className="col-md-6">
                            <label className="form-label">
                                School Name <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="tenthSchool"
                                value={education.tenthSchool || ""}
                                onChange={handleEducationChange}
                                placeholder="Enter school name"
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">
                                Board <span className="required">*</span>
                            </label>
                            <select
                                className="form-select"
                                name="tenthBoard"
                                value={education.tenthBoard || ""}
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

                        <div className="col-md-6">
                            <label className="form-label">
                                Passing Year <span className="required">*</span>
                            </label>
                            <YearSelect
                                name="tenthYear"
                                value={education.tenthYear}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">
                                Grading Type <span className="required">*</span>
                            </label>
                            <select
                                className="form-select"
                                name="tenthGradingType"
                                value={education.tenthGradingType || ""}
                                onChange={handleEducationChange}
                            >
                                <option value="">Select</option>
                                <option value="Percentage">Percentage</option>
                                <option value="CGPA">CGPA</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">
                                {education.tenthGradingType || "Score"}{" "}
                                <span className="required">*</span>
                            </label>
                            <ScoreInput
                                type={education.tenthGradingType}
                                name="tenthScore"
                                value={education.tenthScore}
                            />
                        </div>

                    </div>
                </div>
            </div>

            {/* 12th */}
            <div className="education-card">
                <div className="education-card-header">
                    <div>
                        <h5>12th Details</h5>
                        <span>Higher secondary education</span>
                    </div>

                    <Status
                        complete={isComplete([
                            education.twelfthSchool,
                            education.twelfthBoard,
                            education.twelfthStream,
                            education.twelfthYear,
                            education.twelfthGradingType,
                            education.twelfthScore
                        ])}
                    />
                </div>

                <div className="education-card-body">
                    <div className="row g-3">

                        <div className="col-md-6">
                            <label className="form-label">
                                School Name <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="twelfthSchool"
                                value={education.twelfthSchool || ""}
                                onChange={handleEducationChange}
                                placeholder="Enter school name"
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">
                                Board <span className="required">*</span>
                            </label>
                            <select
                                className="form-select"
                                name="twelfthBoard"
                                value={education.twelfthBoard || ""}
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

                        <div className="col-md-6">
                            <label className="form-label">
                                Stream <span className="required">*</span>
                            </label>
                            <select
                                className="form-select"
                                name="twelfthStream"
                                value={education.twelfthStream || ""}
                                onChange={handleEducationChange}
                            >
                                <option value="">Select Stream</option>
                                <option value="Science">Science</option>
                                <option value="Commerce">Commerce</option>
                                <option value="Arts">Arts</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">
                                Passing Year <span className="required">*</span>
                            </label>
                            <YearSelect
                                name="twelfthYear"
                                value={education.twelfthYear}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">
                                Grading Type <span className="required">*</span>
                            </label>
                            <select
                                className="form-select"
                                name="twelfthGradingType"
                                value={education.twelfthGradingType || ""}
                                onChange={handleEducationChange}
                            >
                                <option value="">Select</option>
                                <option value="Percentage">Percentage</option>
                                <option value="CGPA">CGPA</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">
                                {education.twelfthGradingType || "Score"}{" "}
                                <span className="required">*</span>
                            </label>
                            <ScoreInput
                                type={education.twelfthGradingType}
                                name="twelfthScore"
                                value={education.twelfthScore}
                            />
                        </div>

                    </div>
                </div>
            </div>

            {/* Graduation */}
            <div className="education-card">
                <div className="education-card-header">
                    <div>
                        <h5>Graduation</h5>
                        <span>Undergraduate degree details</span>
                    </div>

                    <Status
                        complete={isComplete([
                            education.graduationDegree,
                            education.graduationBranch,
                            education.graduationCollege,
                            education.graduationUniversity,
                            education.graduationYear,
                            education.graduationGradingType,
                            education.graduationScore
                        ])}
                    />
                </div>

                <div className="education-card-body">
                    <div className="row g-3">

                        <div className="col-md-6">
                            <label className="form-label">
                                Degree <span className="required">*</span>
                            </label>
                            <select
                                className="form-select"
                                name="graduationDegree"
                                value={education.graduationDegree || ""}
                                onChange={handleEducationChange}
                            >
                                <option value="">Select Degree</option>
                                <option value="B.Tech">B.Tech</option>
                                <option value="B.E.">B.E.</option>
                                <option value="BCA">BCA</option>
                                <option value="B.Sc">B.Sc</option>
                                <option value="B.Com">B.Com</option>
                                <option value="BA">BA</option>
                                <option value="LLB">LLB</option>
                                <option value="BBA">BBA</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">
                                Branch / Specialization{" "}
                                <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="graduationBranch"
                                value={education.graduationBranch || ""}
                                onChange={handleEducationChange}
                                placeholder="e.g. Computer Science"
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">
                                College Name <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="graduationCollege"
                                value={education.graduationCollege || ""}
                                onChange={handleEducationChange}
                                placeholder="Enter college name"
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">
                                University <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="graduationUniversity"
                                value={education.graduationUniversity || ""}
                                onChange={handleEducationChange}
                                placeholder="Enter university"
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">
                                Passing Year <span className="required">*</span>
                            </label>
                            <YearSelect
                                name="graduationYear"
                                value={education.graduationYear}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">
                                Grading Type <span className="required">*</span>
                            </label>
                            <select
                                className="form-select"
                                name="graduationGradingType"
                                value={education.graduationGradingType || ""}
                                onChange={handleEducationChange}
                            >
                                <option value="">Select</option>
                                <option value="CGPA">CGPA</option>
                                <option value="Percentage">Percentage</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">
                                {education.graduationGradingType || "Score"}{" "}
                                <span className="required">*</span>
                            </label>
                            <ScoreInput
                                type={education.graduationGradingType}
                                name="graduationScore"
                                value={education.graduationScore}
                            />
                        </div>

                    </div>
                </div>
            </div>

            {/* Post Graduation */}
            <div className="education-card optional">
                <div className="education-card-header">
                    <div>
                        <h5>
                            Post Graduation <span>(Optional)</span>
                        </h5>
                        <span>Master's or doctoral qualification</span>
                    </div>

                    <Status
                        optional
                        complete={isComplete([
                            education.postDegree,
                            education.postBranch,
                            education.postCollege,
                            education.postUniversity,
                            education.postYear,
                            education.postGradingType,
                            education.postScore
                        ])}
                    />
                </div>

                <div className="education-card-body">
                    <div className="row g-3">

                        <div className="col-md-6">
                            <label className="form-label">Degree</label>
                            <select
                                className="form-select"
                                name="postDegree"
                                value={education.postDegree || ""}
                                onChange={handleEducationChange}
                            >
                                <option value="">Select Degree</option>
                                <option value="MCA">MCA</option>
                                <option value="M.Tech">M.Tech</option>
                                <option value="MBA">MBA</option>
                                <option value="M.Sc">M.Sc</option>
                                <option value="M.Com">M.Com</option>
                                <option value="MA">MA</option>
                                <option value="Ph.D.">Ph.D.</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">
                                Branch / Specialization
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="postBranch"
                                value={education.postBranch || ""}
                                onChange={handleEducationChange}
                                placeholder="e.g. Computer Applications"
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">College Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="postCollege"
                                value={education.postCollege || ""}
                                onChange={handleEducationChange}
                                placeholder="Enter college name"
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">University</label>
                            <input
                                type="text"
                                className="form-control"
                                name="postUniversity"
                                value={education.postUniversity || ""}
                                onChange={handleEducationChange}
                                placeholder="Enter university"
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Passing Year</label>
                            <YearSelect
                                name="postYear"
                                value={education.postYear}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Grading Type</label>
                            <select
                                className="form-select"
                                name="postGradingType"
                                value={education.postGradingType || ""}
                                onChange={handleEducationChange}
                            >
                                <option value="">Select</option>
                                <option value="CGPA">CGPA</option>
                                <option value="Percentage">Percentage</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">
                                {education.postGradingType || "Score"}
                            </label>
                            <ScoreInput
                                type={education.postGradingType}
                                name="postScore"
                                value={education.postScore}
                            />
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default EducationSection;
