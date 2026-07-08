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

                               <select
    className="form-select"
    name="graduationYear"
    value={education.graduationYear}
    onChange={handleEducationChange}
>
    <option value="">Select Year</option>

    {Array.from({ length: 35 }, (_, i) => {
        const year = new Date().getFullYear() - i;

        return (
            <option key={year} value={year}>
                {year}
            </option>
        );
    })}
</select>

                        </div>

                       <div className="col-md-6 mb-3">

    <label className="form-label">
        Grading Type
    </label>

    <select
        className="form-select"
        name="tenthGradingType"
        value={education.tenthGradingType}
        onChange={handleEducationChange}
    >
        <option value="">Select</option>
        <option value="Percentage">Percentage</option>
        <option value="CGPA">CGPA</option>
    </select>

</div>

<div className="col-md-6 mb-3">

    <label className="form-label">
        {education.tenthGradingType || "Score"}
    </label>

    <input
        type="text"
        className="form-control"
        name="tenthScore"
        value={education.tenthScore}
        onChange={handleEducationChange}
        placeholder={
            education.tenthGradingType === "CGPA"
                ? "Enter CGPA"
                : "Enter Percentage"
        }
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

           <select
    className="form-select"
    name="graduationYear"
    value={education.graduationYear}
    onChange={handleEducationChange}
>
    <option value="">Select Year</option>

    {Array.from({ length: 35 }, (_, i) => {
        const year = new Date().getFullYear() - i;

        return (
            <option key={year} value={year}>
                {year}
            </option>
        );
    })}
</select>

            </div>

       <div className="col-md-6 mb-3">

    <label className="form-label">
        Grading Type
    </label>

    <select
        className="form-select"
        name="twelfthGradingType"
        value={education.twelfthGradingType}
        onChange={handleEducationChange}
    >
        <option value="">Select</option>
        <option value="Percentage">Percentage</option>
        <option value="CGPA">CGPA</option>
    </select>

</div>

<div className="col-md-6 mb-3">

    <label className="form-label">
        {education.twelfthGradingType || "Score"}
    </label>

    <input
        type="text"
        className="form-control"
        name="twelfthScore"
        value={education.twelfthScore}
        onChange={handleEducationChange}
        placeholder={
            education.twelfthGradingType === "CGPA"
                ? "Enter CGPA"
                : "Enter Percentage"
        }
    />

</div>

        </div>

    </div>

</div>
{/* Graduation Details */}

<div className="card shadow-sm mb-4">

    <div className="card-header">
        <h5 className="mb-0">Graduation</h5>
    </div>

    <div className="card-body">

        <div className="row">

            <div className="col-md-6 mb-3">

                <label className="form-label">
                    Degree
                </label>

                <select
                    className="form-select"
                    name="graduationDegree"
                    value={education.graduationDegree}
                    onChange={handleEducationChange}
                >
                    <option value="">Select Degree</option>
                    <option>B.Tech</option>
                    <option>B.E.</option>
                    <option>BCA</option>
                    <option>B.Sc</option>
                    <option>B.Com</option>
                    <option>BA</option>
                    <option>LLB</option>
                    <option>BBA</option>
                    <option>Other</option>
                </select>

            </div>

            <div className="col-md-6 mb-3">

                <label className="form-label">
                    Branch / Specialization
                </label>

                <input
                    type="text"
                    className="form-control"
                    name="graduationBranch"
                    value={education.graduationBranch}
                    onChange={handleEducationChange}
                />

            </div>

            <div className="col-md-6 mb-3">

                <label className="form-label">
                    College Name
                </label>

                <input
                    type="text"
                    className="form-control"
                    name="graduationCollege"
                    value={education.graduationCollege}
                    onChange={handleEducationChange}
                />

            </div>

            <div className="col-md-6 mb-3">

                <label className="form-label">
                    University
                </label>

                <input
                    type="text"
                    className="form-control"
                    name="graduationUniversity"
                    value={education.graduationUniversity}
                    onChange={handleEducationChange}
                />

            </div>

            <div className="col-md-6 mb-3">

                <label className="form-label">
                    Passing Year
                </label>

            <select
    className="form-select"
    name="graduationYear"
    value={education.graduationYear}
    onChange={handleEducationChange}
>
    <option value="">Select Year</option>

    {Array.from({ length: 35 }, (_, i) => {
        const year = new Date().getFullYear() - i;

        return (
            <option key={year} value={year}>
                {year}
            </option>
        );
    })}
</select>
          

            </div>

           <div className="col-md-6 mb-3">

    <label className="form-label">
        Grading Type
    </label>

    <select
        className="form-select"
        name="graduationGradingType"
        value={education.graduationGradingType}
        onChange={handleEducationChange}
    >
        <option value="">Select</option>
        <option value="CGPA">CGPA</option>
        <option value="Percentage">Percentage</option>
    </select>

</div>

<div className="col-md-6 mb-3">

    <label className="form-label">
        {
            education.graduationGradingType === "CGPA"
                ? "CGPA"
                : "Percentage"
        }
    </label>

    <input
        type="text"
        className="form-control"
        name="graduationScore"
        value={education.graduationScore}
        onChange={handleEducationChange}
        placeholder={
            education.graduationGradingType === "CGPA"
                ? "e.g. 8.75"
                : "e.g. 84"
        }
    />

</div>

        </div>

    </div>

</div>
{/* Post Graduation Details */}

<div className="card shadow-sm mb-4">

    <div className="card-header">
        <h5 className="mb-0">
            Post Graduation (Optional)
        </h5>
    </div>

    <div className="card-body">

        <div className="row">

            <div className="col-md-6 mb-3">

                <label className="form-label">
                    Degree
                </label>

                <select
                    className="form-select"
                    name="postDegree"
                    value={education.postDegree}
                    onChange={handleEducationChange}
                >
                    <option value="">Select Degree</option>
                    <option>MCA</option>
                    <option>M.Tech</option>
                    <option>MBA</option>
                    <option>M.Sc</option>
                    <option>M.Com</option>
                    <option>MA</option>
                    <option>Ph.D.</option>
                    <option>Other</option>
                </select>

            </div>

            <div className="col-md-6 mb-3">

                <label className="form-label">
                    Branch / Specialization
                </label>

                <input
                    type="text"
                    className="form-control"
                    name="postBranch"
                    value={education.postBranch}
                    onChange={handleEducationChange}
                />

            </div>

            <div className="col-md-6 mb-3">

                <label className="form-label">
                    College Name
                </label>

                <input
                    type="text"
                    className="form-control"
                    name="postCollege"
                    value={education.postCollege}
                    onChange={handleEducationChange}
                />

            </div>

            <div className="col-md-6 mb-3">

                <label className="form-label">
                    University
                </label>

                <input
                    type="text"
                    className="form-control"
                    name="postUniversity"
                    value={education.postUniversity}
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
                    name="postYear"
                    value={education.postYear}
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
                    value={education.postGradingType}
                    onChange={handleEducationChange}
                >
                    <option value="">Select</option>
                    <option value="CGPA">CGPA</option>
                    <option value="Percentage">Percentage</option>
                </select>

            </div>

            <div className="col-md-6 mb-3">

                <label className="form-label">
                    {education.postGradingType || "Percentage"}
                </label>

                <input
                    type="text"
                    className="form-control"
                    name="Percentage"
                    value={education.Percentage}
                    onChange={handleEducationChange}
                    placeholder={
                        education.postGradingType === "CGPA"
                            ? "Enter CGPA"
                            : "Enter Percentage"
                    }
                />

            </div>

        </div>

    </div>

</div>

        </>

    );

}

export default EducationSection;