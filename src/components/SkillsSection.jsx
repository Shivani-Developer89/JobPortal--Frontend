import { useState } from "react";

function SkillsSection({
    skills,
    setSkills
}) {

    const [skill, setSkill] = useState("");
   
const addSkill = () => {

    const trimmed = skill.trim();

    if (trimmed === "") {
        return;
    }

    if (
        skills.some(
            s => s.toLowerCase() === trimmed.toLowerCase()
        )
    ) {
        return;
    }

    setSkills([
        ...skills,
        trimmed
    ]);

    setSkill("");

};

    return (


    <>
        <div className="card shadow-sm mb-4">

            <div className="card-header">
                <h5 className="mb-0">Skills</h5>
            </div>

            <div className="card-body">

                <div className="input-group mb-3">

                 <input
                        className="form-control"
                        placeholder="e.g. Java, Spring Boot, React"
                        value={skill}
                        onChange={(e) => setSkill(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                addSkill();
                            }
                        }}
                    />

                    <button
                        className="btn btn-success px-4"
                        type="button"
                        onClick={addSkill}
                    >
                        Add
                    </button>

                </div>

                <div>

                    {skills.map((item, index) => (

                        <span
                            key={index}
                            className="badge bg-primary me-2 mb-2 p-2"
                        >

                            {item}

                            <button
                                type="button"
                                className="btn btn-sm text-white ms-2 p-0"
                                onClick={() =>
                                    setSkills(
                                        skills.filter((_, i) => i !== index)
                                    )
                                }
                            >
                                ×
                            </button>

                        </span>

                    ))}

                </div>

            </div>

        </div>
    </>
);



}

export default SkillsSection;