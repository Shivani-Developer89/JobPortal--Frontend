import { useEffect, useState } from "react";
import { getMyProfile, saveProfile } from "../services/CandidateProfileService";
import EducationSection from "../components/EducationSection";
import SkillsSection from "../components/SkillsSection";

function CandidateProfile() {

    const [profile, setProfile] = useState({
        phone: "",
        location: "",
        education: "",
        skills: "",
        experience: "",
        github: "",
        linkedin: ""
    });
    const [education, setEducation] = useState({
    tenthSchool: "",
    tenthBoard: "",
    tenthYear: "",
    tenthPercentage: "",

    twelfthSchool: "",
    twelfthBoard: "",
    twelfthStream: "",
    twelfthYear: "",
    twelfthPercentage: "",

    graduationDegree: "",
    graduationBranch: "",
    graduationCollege: "",
    graduationUniversity: "",
    graduationYear: "",
    graduationCgpa: "",

    postDegree: "",
    postBranch: "",
    postCollege: "",
    postUniversity: "",
    postYear: "",
    postCgpa: ""
});
const [skills, setSkills] = useState([]);

    useEffect(() => {
        loadProfile();
    }, []);


    const loadProfile = async () => {

        try {

            const response = await getMyProfile();

            setProfile(response.data);

        } catch (error) {

            console.log("No profile yet.");

        }

    };

    const handleChange = (e) => {

        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

           const educationText = `
========== 10th ==========
School: ${education.tenthSchool}
Board: ${education.tenthBoard}
Passing Year: ${education.tenthYear}
${education.tenthGradingType}: ${education.tenthScore}

========== 12th ==========
School: ${education.twelfthSchool}
Board: ${education.twelfthBoard}
Stream: ${education.twelfthStream}
Passing Year: ${education.twelfthYear}
${education.twelfthGradingType}: ${education.twelfthScore}

========== Graduation ==========
Degree: ${education.graduationDegree}
Branch: ${education.graduationBranch}
College: ${education.graduationCollege}
University: ${education.graduationUniversity}
Passing Year: ${education.graduationYear}
${education.graduationGradingType}: ${education.graduationScore}

========== Post Graduation ==========
Degree: ${education.postDegree}
Branch: ${education.postBranch}
College: ${education.postCollege}
University: ${education.postUniversity}
Passing Year: ${education.postYear}
${education.postGradingType}: ${education.postScore}
`;
await saveProfile({

    ...profile,

    education: educationText,

    skills: skills.join("|")

});

            alert("Profile saved successfully.");

        } catch (error) {

            console.error(error);

        }

    };
    const handleEducationChange = (e) => {
    setEducation({
        ...education,
        [e.target.name]: e.target.value
    });
};

return (
    <div className="container py-5">

        <div className="row justify-content-center">

            <div className="col-lg-8">

                <div className="card shadow">

                    <div className="card-body p-5">

                        <h2 className="text-center mb-4">
                            Candidate Profile
                        </h2>

                        <form onSubmit={handleSubmit}>

                            {/* Personal Information */}

                            <h5 className="mb-3 border-bottom pb-2">
                                Personal Information
                            </h5>

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Phone
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phone"
                                        value={profile.phone}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Location
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="location"
                                        value={profile.location}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                            {/* Education */}

                            <h5 className="mt-4 mb-3 border-bottom pb-2">
                                Education
                            </h5>

                            <div className="mb-3">

                       <EducationSection
                            education={education}
                            handleEducationChange={handleEducationChange}
                        />

                            </div>

                            {/* Professional Details */}

                            <h5 className="mt-4 mb-3 border-bottom pb-2">
                                Professional Details
                            </h5>

                            <div className="mb-3">

                                <label className="form-label">
                                    Skills
                                </label>
                                    <SkillsSection
                                        skills={skills}
                                        setSkills={setSkills}
                                    />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Experience
                                </label>

                                <textarea
                                    className="form-control"
                                    rows="4"
                                    name="experience"
                                    value={profile.experience}
                                    onChange={handleChange}
                                />

                            </div>

                            {/* Social Links */}

                            <h5 className="mt-4 mb-3 border-bottom pb-2">
                                Social Links
                            </h5>

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        GitHub
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="github"
                                        value={profile.github}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        LinkedIn
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="linkedin"
                                        value={profile.linkedin}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                            <div className="text-center mt-4">

                                <button
                                    className="btn btn-primary px-5"
                                    type="submit"
                                >
                                    Save Profile
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    </div>
);

}

export default CandidateProfile;