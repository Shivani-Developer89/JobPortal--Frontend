import { useState } from "react";

function SkillsSection({
    skills,
    setSkills
}) {

    const [editing, setEditing] = useState(false);
    const [skill, setSkill] = useState("");
    const [error, setError] = useState("");

    const addSkill = () => {

        const trimmed = skill.trim();

        if (!trimmed) {
            setError("Please enter a skill.");
            return;
        }

        if (trimmed.length > 40) {
            setError(
                "Skill name cannot exceed 40 characters."
            );
            return;
        }

        const alreadyExists = skills.some(
            existingSkill =>
                existingSkill.toLowerCase() ===
                trimmed.toLowerCase()
        );

        if (alreadyExists) {
            setError(
                "This skill has already been added."
            );
            return;
        }

        setSkills([
            ...skills,
            trimmed
        ]);

        setSkill("");
        setError("");
    };

    const removeSkill = (indexToRemove) => {

        setSkills(
            skills.filter(
                (_, index) =>
                    index !== indexToRemove
            )
        );
    };

    const handleKeyDown = (e) => {

        if (e.key === "Enter") {

            e.preventDefault();

            addSkill();
        }
    };

    const handleEdit = () => {

        setEditing(true);
        setError("");
    };

    const handleDone = () => {

        setEditing(false);
        setSkill("");
        setError("");
    };

    const handleCancel = () => {

        /*
         * Since skills are currently updated immediately
         * through setSkills(), Cancel cannot restore the
         * previous list.
         *
         * For now it simply exits edit mode.
         */

        setEditing(false);
        setSkill("");
        setError("");
    };

    return (

        <div className="skills-section">

            <div className="skills-card">

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="skills-card-header">

                    <div>

                        <h5>
                            Skills
                        </h5>

                        <span>
                            Technical and professional skills
                        </span>

                    </div>


                    <div className="skills-header-right">

                        {!editing && (

                            <button
                                type="button"
                                className="skills-edit-btn"
                                onClick={handleEdit}
                            >
                                <i className="bi bi-pencil me-1"></i>
                                Edit
                            </button>

                        )}

                        <span className="skills-count">

                            {skills.length}{" "}

                            {skills.length === 1
                                ? "skill"
                                : "skills"}

                        </span>

                    </div>

                </div>


                {/* =================================================
                    VIEW MODE
                ================================================= */}

                {!editing && (

                    <div className="skills-view-body">

                        {skills.length === 0 ? (

                            <div className="skills-empty-view">

                                <i className="bi bi-tools"></i>

                                <div>

                                    <strong>
                                        No skills added yet
                                    </strong>

                                    <p>
                                        Add your technical and
                                        professional skills to
                                        improve your profile.
                                    </p>

                                </div>

                            </div>

                        ) : (

                            <div className="skill-tags">

                                {skills.map(
                                    (item, index) => (

                                        <span
                                            key={`${item}-${index}`}
                                            className="skill-tag"
                                        >
                                            {item}
                                        </span>

                                    )
                                )}

                            </div>

                        )}

                    </div>

                )}


                {/* =================================================
                    EDIT MODE
                ================================================= */}

                {editing && (

                    <div className="skills-card-body">

                        <div className="skills-input-row">

                            <input
                                type="text"
                                className={`form-control ${
                                    error
                                        ? "is-invalid"
                                        : ""
                                }`}
                                placeholder="e.g. Java, Spring Boot, React"
                                value={skill}
                                maxLength={40}
                                onChange={(e) => {

                                    setSkill(
                                        e.target.value
                                    );

                                    setError("");

                                }}
                                onKeyDown={handleKeyDown}
                            />

                            <button
                                type="button"
                                className="skills-add-btn"
                                onClick={addSkill}
                            >
                                + Add
                            </button>

                        </div>


                        {/* VALIDATION */}

                        {error && (

                            <div className="skills-error">
                                {error}
                            </div>

                        )}


                        {/* EXISTING SKILLS */}

                        <div className="skills-list">

                            {skills.length === 0 ? (

                                <div className="skills-empty">

                                    <div className="skills-empty-icon">
                                        +
                                    </div>

                                    <p>
                                        No skills added yet
                                    </p>

                                    <small>
                                        Add skills that represent
                                        your technical and
                                        professional abilities.
                                    </small>

                                </div>

                            ) : (

                                <>

                                    <div className="skills-list-title">
                                        Your Skills
                                    </div>

                                    <div className="skill-tags">

                                        {skills.map(
                                            (item, index) => (

                                                <span
                                                    key={`${item}-${index}`}
                                                    className="skill-tag"
                                                >

                                                    <span>
                                                        {item}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        aria-label={`Remove ${item}`}
                                                        onClick={() =>
                                                            removeSkill(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        ×
                                                    </button>

                                                </span>

                                            )
                                        )}

                                    </div>

                                </>

                            )}

                        </div>


                        {/* ACTIONS */}

                        <div className="skills-edit-actions">

                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleDone}
                            >
                                <i className="bi bi-check2 me-1"></i>
                                Done
                            </button>

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={handleCancel}
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

export default SkillsSection;