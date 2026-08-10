import { useState } from "react";

function SkillsSection({ skills = [], setSkills }) {
    const [editing, setEditing] = useState(false);
    const [draftSkills, setDraftSkills] = useState(skills);
    const [skill, setSkill] = useState("");
    const [error, setError] = useState("");

    const handleEdit = () => {
        setDraftSkills([...skills]);
        setSkill("");
        setError("");
        setEditing(true);
    };

    const addSkill = () => {
        const trimmed = skill.trim();

        if (!trimmed) {
            setError("Please enter a skill.");
            return;
        }

        if (trimmed.length > 40) {
            setError("Skill name cannot exceed 40 characters.");
            return;
        }

        if (draftSkills.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
            setError("This skill has already been added.");
            return;
        }

        setDraftSkills([...draftSkills, trimmed]);
        setSkill("");
        setError("");
    };

    const removeSkill = (index) => {
        setDraftSkills(draftSkills.filter((_, i) => i !== index));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addSkill();
        }
    };

    const handleDone = () => {
        setSkills([...draftSkills]);
        setEditing(false);
        setSkill("");
        setError("");
    };

    const handleCancel = () => {
        setDraftSkills([...skills]);
        setEditing(false);
        setSkill("");
        setError("");
    };

    return (
        <section className="skills-section" id="skills">
            <div className="skills-card">

                <div className="skills-card-header">
                    <div>
                        <h5>Skills</h5>
                        <span>Technical and professional skills</span>
                    </div>

                    <div className="skills-header-right">
                        {!editing && (
                            <button
                                type="button"
                                className="skills-edit-btn"
                                onClick={handleEdit}
                            >
                                <i className="bi bi-pencil"></i>
                                <span>Edit</span>
                            </button>
                        )}

                        <span className="skills-count">
                            {skills.length} {skills.length === 1 ? "skill" : "skills"}
                        </span>
                    </div>
                </div>

                {!editing ? (
                    <div className="skills-view-body">
                        {skills.length === 0 ? (
                            <div className="skills-empty-view">
                                <div className="skills-empty-icon">
                                    <i className="bi bi-tools"></i>
                                </div>
                                <div>
                                    <strong>No skills added yet</strong>
                                    <p>Add skills that represent your technical and professional abilities.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="skill-tags">
                                {skills.map((item, index) => (
                                    <span key={`${item}-${index}`} className="skill-tag">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="skills-card-body">
                        <div className="skills-input-row">
                            <input
                                type="text"
                                className={`skills-add-input ${error ? "has-error" : ""}`}
                                placeholder="e.g. Java, Spring Boot, React"
                                value={skill}
                                maxLength={40}
                                onChange={(e) => {
                                    setSkill(e.target.value);
                                    setError("");
                                }}
                                onKeyDown={handleKeyDown}
                            />

                            <button type="button" className="skills-add-btn" onClick={addSkill}>
                                <i className="bi bi-plus-lg"></i>
                                Add
                            </button>
                        </div>

                        {error && (
                            <div className="skills-error">
                                <i className="bi bi-exclamation-circle"></i>
                                {error}
                            </div>
                        )}

                        <div className="skills-list">
                            <div className="skills-list-title">Your Skills</div>

                            {draftSkills.length === 0 ? (
                                <div className="skills-empty">
                                    <i className="bi bi-tools"></i>
                                    <p>No skills added yet</p>
                                    <small>Add skills that represent your abilities.</small>
                                </div>
                            ) : (
                                <div className="skill-tags">
                                    {draftSkills.map((item, index) => (
                                        <span key={`${item}-${index}`} className="skill-tag skill-tag-editable">
                                            <span>{item}</span>
                                            <button
                                                type="button"
                                                aria-label={`Remove ${item}`}
                                                onClick={() => removeSkill(index)}
                                            >
                                                <i className="bi bi-x"></i>
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="skills-edit-actions">
                            <button type="button" className="skills-done-btn" onClick={handleDone}>
                                <i className="bi bi-check2"></i>
                                Done
                            </button>

                            <button type="button" className="skills-cancel-btn" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default SkillsSection;
