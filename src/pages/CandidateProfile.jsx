import { useEffect, useState } from "react";
import { getMyProfile, saveProfile } from "../services/CandidateProfileService";
import EducationSection from "../components/EducationSection";
import SkillsSection from "../components/SkillsSection";
import ExperienceSection from "../components/ExperienceSection";
import SocialLinksSection from "../components/SocialLinksSection";
import ResumeSection from "../components/ResumeSection";

function CandidateProfile() {

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",

        github: "",
        linkedin: "",
        portfolio: "",
        leetcode: "",
        hackerrank: ""
    });

    const [education, setEducation] = useState({

        tenthSchool: "",
        tenthBoard: "",
        tenthYear: "",
        tenthGradingType: "",
        tenthScore: "",

        twelfthSchool: "",
        twelfthBoard: "",
        twelfthStream: "",
        twelfthYear: "",
        twelfthGradingType: "",
        twelfthScore: "",

        graduationDegree: "",
        graduationBranch: "",
        graduationCollege: "",
        graduationUniversity: "",
        graduationYear: "",
        graduationGradingType: "",
        graduationScore: "",

        postDegree: "",
        postBranch: "",
        postCollege: "",
        postUniversity: "",
        postYear: "",
        postGradingType: "",
        postScore: ""
    });

    const [experience, setExperience] = useState({

        type: "FRESHER",

        about: "",
        projects: "",
        internships: "",
        certifications: "",

        experiences: [
            {
                company: "",
                jobTitle: "",
                employmentType: "",
                location: "",
                yearsOfExperience: "",
                responsibilities: "",
                achievements: ""
            }
        ]

    });

    const [skills, setSkills] = useState([]);

    const [resume, setResume] = useState(null);



   const loadProfile = async () => {
    try {
        const response = await getMyProfile();

        // Personal Details
        setProfile(response.data);

        // Education Mapping
        const tenth = response.data.education.find(
            e => e.level === "10TH"
        );

        const twelfth = response.data.education.find(
            e => e.level === "12TH"
        );

        const graduation = response.data.education.find(
            e => e.level === "GRADUATION"
        );

        const post = response.data.education.find(
            e => e.level === "POST_GRADUATION"
        );

        setEducation({
            tenthSchool: tenth?.school || "",
            tenthBoard: tenth?.board || "",
            tenthYear: tenth?.passingYear || "",
            tenthGradingType: tenth?.gradingType || "",
            tenthScore: tenth?.score || "",

            twelfthSchool: twelfth?.school || "",
            twelfthBoard: twelfth?.board || "",
            twelfthStream: twelfth?.stream || "",
            twelfthYear: twelfth?.passingYear || "",
            twelfthGradingType: twelfth?.gradingType || "",
            twelfthScore: twelfth?.score || "",

            graduationDegree: graduation?.degree || "",
            graduationBranch: graduation?.branch || "",
            graduationCollege: graduation?.college || "",
            graduationUniversity: graduation?.university || "",
            graduationYear: graduation?.passingYear || "",
            graduationGradingType: graduation?.gradingType || "",
            graduationScore: graduation?.score || "",

            postDegree: post?.degree || "",
            postBranch: post?.branch || "",
            postCollege: post?.college || "",
            postUniversity: post?.university || "",
            postYear: post?.passingYear || "",
            postGradingType: post?.gradingType || "",
            postScore: post?.score || ""
        });

        // Skills
        setSkills(
            response.data.skills
                ? response.data.skills.split("|")
                : []
        );

        // Experience
        setExperience(response.data.experience || "");

        // Resume
        setResume(response.data.resumePath || "");

    } catch (err) {
        console.error(err);
    }
};
    useEffect(() => {
        loadProfile();
    }, []);

    const handleChange = (e) => {

        setProfile({

            ...profile,

            [e.target.name]: e.target.value

        });

    };

    const handleEducationChange = (e) => {

        setEducation({

            ...education,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await saveProfile({

                ...profile,

                education: [

                    {
                        level: "10TH",
                        school: education.tenthSchool,
                        board: education.tenthBoard,
                        passingYear: education.tenthYear,
                        gradingType: education.tenthGradingType,
                        score: education.tenthScore
                    },

                    {
                        level: "12TH",
                        school: education.twelfthSchool,
                        board: education.twelfthBoard,
                        stream: education.twelfthStream,
                        passingYear: education.twelfthYear,
                        gradingType: education.twelfthGradingType,
                        score: education.twelfthScore
                    },

                    {
                        level: "GRADUATION",
                        degree: education.graduationDegree,
                        branch: education.graduationBranch,
                        college: education.graduationCollege,
                        university: education.graduationUniversity,
                        passingYear: education.graduationYear,
                        gradingType: education.graduationGradingType,
                        score: education.graduationScore
                    },

                    {
                        level: "POST_GRADUATION",
                        degree: education.postDegree,
                        branch: education.postBranch,
                        college: education.postCollege,
                        university: education.postUniversity,
                        passingYear: education.postYear,
                        gradingType: education.postGradingType,
                        score: education.postScore
                    }

                ],

                skills: skills.join("|")

            });

            alert("Profile saved successfully.");

        } catch (error) {

            console.error(error);

            alert("Failed to save profile.");

        }

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
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control bg-light"
                                        value={profile.name}
                                        readOnly
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control bg-light"
                                        value={profile.email}
                                        readOnly
                                    />

                                </div>

                            </div>

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Phone Number
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phone"
                                        value={profile.phone}
                                        onChange={handleChange}
                                        placeholder="Enter phone number"
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Current Location
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="location"
                                        value={profile.location}
                                        onChange={handleChange}
                                        placeholder="Enter your location"
                                    />

                                </div>

                            </div>

                            {/* Education */}

                            <h5 className="mt-4 mb-3 border-bottom pb-2">
                                Education
                            </h5>

                            <EducationSection
                                education={education}
                                handleEducationChange={handleEducationChange}
                            />

                            {/* Professional Details */}

                            <h5 className="mt-4 mb-3 border-bottom pb-2">
                                Professional Details
                            </h5>

                            <SkillsSection
                                skills={skills}
                                setSkills={setSkills}
                            />

                            <ExperienceSection
                                experience={experience}
                                setExperience={setExperience}
                            />

                            <ResumeSection
                                resume={resume}
                                setResume={setResume}
                            />

                                                        {/* Social Links */}

                            <SocialLinksSection
                                profile={profile}
                                handleChange={handleChange}
                            />

                            <div className="text-center mt-4">

                                <button
                                    type="submit"
                                    className="btn btn-primary px-5"
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