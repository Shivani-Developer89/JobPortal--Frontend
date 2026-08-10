import { useEffect, useState } from "react";
import { getMyProfile, saveProfile } from "../services/CandidateProfileService";
import EducationSection from "../components/EducationSection";
import SkillsSection from "../components/SkillsSection";
import ExperienceSection from "../components/ExperienceSection";
import SocialLinksSection from "../components/SocialLinksSection";
import ResumeSection from "../components/ResumeSection";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import "../styles/CandidateProfile.css";
import ProfileSidebar from "../components/ProfileSidebar";



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
    const [profileImage, setProfileImage] = useState(null);

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

        setProfile(response.data);
        if (response.data.resumePath) {

    setResume({
        fileName: response.data.resumePath
    .split(/[/\\]/)
    .pop()
    .split("_")
    .slice(1)
    .join("_"),
    uploadedAt: response.data.resumeUploadedAt
    ? new Date(response.data.resumeUploadedAt).toLocaleDateString("en-GB")
    : ""
    });

}

        // -------------------------
        // Education
        // -------------------------

        const educationList = response.data.education || [];

        const tenth = educationList.find(
            e => e.level === "10TH"
        );

        const twelfth = educationList.find(
            e => e.level === "12TH"
        );

        const graduation = educationList.find(
            e => e.level === "GRADUATION"
        );

        const post = educationList.find(
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

        // -------------------------
        // Experience
        // -------------------------

        const experienceList = response.data.experience || [];

        if (experienceList.length > 0) {

            setExperience({

                type: "EXPERIENCED",

                about: "",
                projects: "",
                internships: "",
                certifications: "",

                experiences: experienceList

            });

        } else {

            setExperience({

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

        }

        // -------------------------
        // Skills
        // -------------------------

        setSkills(
            response.data.skills
                ? response.data.skills.split("|")
                : []
        );

    } catch (error) {

        console.error("Failed to load profile", error);

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

const handleProfileImageChange = (e) => {

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image.");
        return;
    }

    if (file.size > 2 * 1024 * 1024) {
        toast.error("Profile image must be less than 2 MB.");
        return;
    }

    setProfileImage(URL.createObjectURL(file));
};

const handleEducationChange = (e) => {

    setEducation({

        ...education,

        [e.target.name]: e.target.value

    });

};

const validateEducation = () => {

    const requiredFields = [
        ["10th school", education.tenthSchool],
        ["10th board", education.tenthBoard],
        ["10th passing year", education.tenthYear],
        ["10th grading type", education.tenthGradingType],
        ["10th score", education.tenthScore],

        ["12th school", education.twelfthSchool],
        ["12th board", education.twelfthBoard],
        ["12th stream", education.twelfthStream],
        ["12th passing year", education.twelfthYear],
        ["12th grading type", education.twelfthGradingType],
        ["12th score", education.twelfthScore],

        ["graduation degree", education.graduationDegree],
        ["graduation branch", education.graduationBranch],
        ["graduation college", education.graduationCollege],
        ["graduation university", education.graduationUniversity],
        ["graduation passing year", education.graduationYear],
        ["graduation grading type", education.graduationGradingType],
        ["graduation score", education.graduationScore]
    ];

    const missingField = requiredFields.find(
        ([, value]) =>
            value === undefined ||
            value === null ||
            String(value).trim() === ""
    );

    if (missingField) {
        toast.error(`Please complete ${missingField[0]}.`);
        return false;
    }

    const validateScore = (label, value, gradingType) => {

        const score = Number(value);

        if (!Number.isFinite(score)) {
            toast.error(`${label} must be a valid number.`);
            return false;
        }

        const max = gradingType === "CGPA" ? 10 : 100;

        if (score < 0 || score > max) {
            toast.error(
                gradingType === "CGPA"
                    ? `${label} must be between 0 and 10.`
                    : `${label} must be between 0 and 100.`
            );
            return false;
        }

        return true;
    };

    if (
        !validateScore(
            "10th score",
            education.tenthScore,
            education.tenthGradingType
        ) ||
        !validateScore(
            "12th score",
            education.twelfthScore,
            education.twelfthGradingType
        ) ||
        !validateScore(
            "graduation score",
            education.graduationScore,
            education.graduationGradingType
        )
    ) {
        return false;
    }

    const tenthYear = Number(education.tenthYear);
    const twelfthYear = Number(education.twelfthYear);
    const graduationYear = Number(education.graduationYear);
    const currentYear = new Date().getFullYear();

    if (
        tenthYear > currentYear ||
        twelfthYear > currentYear ||
        graduationYear > currentYear
    ) {
        toast.error("Passing year cannot be in the future.");
        return false;
    }

    if (twelfthYear < tenthYear) {
        toast.error(
            "12th passing year cannot be earlier than 10th passing year."
        );
        return false;
    }

    if (graduationYear < twelfthYear) {
        toast.error(
            "Graduation passing year cannot be earlier than 12th passing year."
        );
        return false;
    }

    // Post Graduation is optional.
    // But once the user starts filling it, require all fields.
    const postStarted = [
        education.postDegree,
        education.postBranch,
        education.postCollege,
        education.postUniversity,
        education.postYear,
        education.postGradingType,
        education.postScore
    ].some(
        (field) =>
            field !== undefined &&
            field !== null &&
            String(field).trim() !== ""
    );

    if (postStarted) {

        const postFields = [
            ["post graduation degree", education.postDegree],
            ["post graduation branch", education.postBranch],
            ["post graduation college", education.postCollege],
            ["post graduation university", education.postUniversity],
            ["post graduation passing year", education.postYear],
            ["post graduation grading type", education.postGradingType],
            ["post graduation score", education.postScore]
        ];

        const missingPostField = postFields.find(
            ([, value]) =>
                value === undefined ||
                value === null ||
                String(value).trim() === ""
        );

        if (missingPostField) {
            toast.error(
                `Please complete ${missingPostField[0]} or clear the Post Graduation section.`
            );
            return false;
        }

        if (
            !validateScore(
                "post graduation score",
                education.postScore,
                education.postGradingType
            )
        ) {
            return false;
        }

        const postYear = Number(education.postYear);

        if (postYear > currentYear) {
            toast.error(
                "Post graduation passing year cannot be in the future."
            );
            return false;
        }

        if (postYear < graduationYear) {
            toast.error(
                "Post graduation passing year cannot be earlier than graduation year."
            );
            return false;
        }
    }

    return true;
};

const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateEducation()) {
        return;
    }

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

                ...(education.postDegree ||
                education.postBranch ||
                education.postCollege ||
                education.postUniversity ||
                education.postYear ||
                education.postGradingType ||
                education.postScore
                    ? [{
                        level: "POST_GRADUATION",
                        degree: education.postDegree,
                        branch: education.postBranch,
                        college: education.postCollege,
                        university: education.postUniversity,
                        passingYear: education.postYear,
                        gradingType: education.postGradingType,
                        score: education.postScore
                    }]
                    : [])

            ],

            experience:
                experience.type === "EXPERIENCED"
                    ? experience.experiences
                    : [],

            skills: skills.join("|")

        });

        toast.success("Profile saved successfully!");

        await loadProfile();

    } catch (error) {

        console.error(error);

        toast.error(
            error.response?.data?.message ||
            error.response?.data ||
            "Failed to save profile."
        );

    }

};

const profileCompletionFields = [
    profile.phone,
    profile.location,

    education.tenthSchool,
    education.tenthBoard,
    education.tenthYear,

    education.twelfthSchool,
    education.twelfthBoard,
    education.twelfthYear,

    education.graduationDegree,
    education.graduationCollege,
    education.graduationYear,

    skills.length > 0 ? skills.join("") : "",

    experience.type === "EXPERIENCED"
        ? experience.experiences.length > 0
            ? experience.experiences[0].company
            : ""
        : "FRESHER",

    resume ? "uploaded" : ""
];

const completedFields =
    profileCompletionFields.filter(
        field => field !== null &&
                 field !== undefined &&
                 String(field).trim() !== ""
    ).length;

const profileCompletion = Math.round(
    (completedFields / profileCompletionFields.length) * 100
);
const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
};
return (
    <div className="profile-page">

        {/* =====================================================
            PROFILE HEADER
        ===================================================== */}

        <section className="profile-header-card">

            <div className="profile-header-left">

                <div className="profile-header-avatar">

                    {profileImage ? (
                        <img
                            src={profileImage}
                            alt="Profile"
                        />
                    ) : (
                        <i className="bi bi-person-fill"></i>
                    )}

                    <label
                        htmlFor="profile-image-input"
                        className="profile-avatar-edit"
                        title="Change profile picture"
                    >
                        <i className="bi bi-camera"></i>
                    </label>

                    <input
                        id="profile-image-input"
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleProfileImageChange}
                    />

                </div>


                <div className="profile-header-info">

                    <h2>
                        {profile.name || "Candidate"}
                    </h2>

                    <p className="profile-header-role">
                        Candidate
                    </p>

                    <p className="profile-header-location">
                        <i className="bi bi-geo-alt"></i>

                        {profile.location || "Location not added"}
                    </p>

                    <p className="profile-header-email">
                        <i className="bi bi-envelope"></i>

                        {profile.email || ""}
                    </p>

                </div>

            </div>


            {/* Profile Completion */}

            <div className="profile-header-completion">

                <div className="profile-completion-row">

                    <span>
                        Profile Completion
                    </span>

                    <strong>
                        {profileCompletion}%
                    </strong>

                </div>


                <div className="profile-completion-bar">

                    <div
                        className="profile-completion-fill"
                        style={{
                            width: `${profileCompletion}%`
                        }}
                    />

                </div>

            </div>

        </section>


        {/* =====================================================
            MAIN PROFILE LAYOUT
        ===================================================== */}

        <div className="profile-layout">

            {/* LEFT SIDEBAR */}

            <ProfileSidebar
                name={profile.name}
                role="Candidate"
                completion={profileCompletion}
                onSave={handleSubmit}
                onNavigate={scrollToSection}
            />


            {/* RIGHT CONTENT */}

            <main className="profile-main-content">


                {/* =================================================
                    PERSONAL INFORMATION
                ================================================= */}

                <section
                    id="personal"
                    className="profile-section"
                >

                    <div className="profile-section-header">

                        <div>

                            <h3>
                                Personal Information
                            </h3>

                            <p>
                                Keep your basic contact information
                                up to date.
                            </p>

                        </div>

                    </div>


                    <div className="profile-form-body">

                        <div className="row g-3">

                            <div className="col-md-6">

                                <label className="form-label">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={profile.name || ""}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6">

                                <label className="form-label">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={profile.email || ""}
                                    disabled
                                />

                                <small className="text-muted">
                                    Email cannot be changed here.
                                </small>

                            </div>


                            <div className="col-md-6">

                                <label className="form-label">
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    className="form-control"
                                    name="phone"
                                    value={profile.phone || ""}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6">

                                <label className="form-label">
                                    Current Location
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="location"
                                    value={profile.location || ""}
                                    onChange={handleChange}
                                    placeholder="e.g. Meerut, Uttar Pradesh"
                                />

                            </div>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    EDUCATION
                ================================================= */}

                <section
                    id="education"
                    className="profile-section"
                >

                    <EducationSection
                        education={education}
                        handleEducationChange={
                            handleEducationChange
                        }
                    />

                </section>


                {/* =================================================
                    SKILLS
                ================================================= */}

                <section
                    id="skills"
                    className="profile-section"
                >

                    <SkillsSection
                        skills={skills}
                        setSkills={setSkills}
                    />

                </section>


                {/* =================================================
                    EXPERIENCE
                ================================================= */}

                <section
                    id="experience"
                    className="profile-section"
                >

                    <ExperienceSection
                        experience={experience}
                        setExperience={setExperience}
                    />

                </section>


                {/* =================================================
                    RESUME
                ================================================= */}

                <section
                    id="resume"
                    className="profile-section"
                >

                    <ResumeSection
                        resume={resume}
                        setResume={setResume}
                    />

                </section>


                {/* =================================================
                    SOCIAL PROFILES
                ================================================= */}

                <section
                    id="social"
                    className="profile-section"
                >

                    <SocialLinksSection
                        profile={profile}
                        handleChange={handleChange}
                    />

                </section>


            </main>

        </div>

    </div>
);

}

export default CandidateProfile;