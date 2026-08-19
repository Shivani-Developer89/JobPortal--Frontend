import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
    getMyProfile,
    saveProfile,
    uploadProfileImage
} from "../services/RecruiterProfileService";
import "../styles/RecruiterProfile.css";

const EMPTY_PROFILE = {
    recruiterId: null,
    name: "",
    email: "",
    role: "RECRUITER",
    phone: "",
    designation: "",
    companyName: "",
    companyWebsite: "",
    companyLocation: "",
    companyDescription: "",
    profileImagePath: null
};

function RecruiterProfile() {
    const [profile, setProfile] = useState(EMPTY_PROFILE);
    const [profileImage, setProfileImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    const getProfileImageUrl = (path) => {
        if (!path) return null;

        const normalizedPath = path.replace(/\\/g, "/");

        return `http://localhost:81/${normalizedPath}`;
    };

    const loadProfile = async () => {
        try {
            setLoading(true);

            const response = await getMyProfile();
            const data = response.data || {};

            setProfile({
                ...EMPTY_PROFILE,
                ...data
            });

            setProfileImage(
                data.profileImagePath
                    ? getProfileImageUrl(data.profileImagePath)
                    : null
            );

        } catch (error) {
            console.error("Failed to load recruiter profile:", error);

            toast.error(
                error.response?.data?.message ||
                "Failed to load recruiter profile."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setProfile((current) => ({
            ...current,
            [name]: value
        }));
    };

    const handleNavigate = (section) => {
        document.getElementById(section)?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    const validateProfile = () => {
        if (!profile.phone?.trim()) {
            toast.error("Please enter your phone number.");
            return false;
        }

        if (!profile.designation?.trim()) {
            toast.error("Please enter your designation.");
            return false;
        }

        if (!profile.companyName?.trim()) {
            toast.error("Please enter your company name.");
            return false;
        }

        if (!profile.companyLocation?.trim()) {
            toast.error("Please enter your company location.");
            return false;
        }

        return true;
    };

    const getSavePayload = () => ({
        phone: profile.phone?.trim() || "",
        designation: profile.designation?.trim() || "",
        companyName: profile.companyName?.trim() || "",
        companyWebsite: profile.companyWebsite?.trim() || "",
        companyLocation: profile.companyLocation?.trim() || "",
        companyDescription: profile.companyDescription?.trim() || ""
    });

    const handleSubmit = async (event) => {
        event?.preventDefault();

        if (!validateProfile()) {
            return false;
        }

        try {
            setSaving(true);

            const response = await saveProfile(getSavePayload());

            const updatedProfile = {
                ...profile,
                ...response.data
            };

            setProfile(updatedProfile);

            if (updatedProfile.profileImagePath) {
                setProfileImage(
                    getProfileImageUrl(
                        updatedProfile.profileImagePath
                    )
                );
            }

            toast.success("Recruiter profile saved successfully.");

            return true;

        } catch (error) {
            console.error("Failed to save recruiter profile:", error);

            toast.error(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to save recruiter profile."
            );

            return false;
        } finally {
            setSaving(false);
        }
    };

    const handleProfileImageChange = async (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select a valid image.");
            event.target.value = "";
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            toast.error("Profile image must be less than 2 MB.");
            event.target.value = "";
            return;
        }

        const previewUrl = URL.createObjectURL(file);
        const previousImage = profileImage;

        setProfileImage(previewUrl);

        try {
            setUploadingImage(true);

            /*
             * The backend requires RecruiterProfile to exist before
             * /profile-image can be called. Saving first guarantees
             * that the profile exists.
             */
            const saved = await saveProfile(getSavePayload());

            setProfile({
                ...profile,
                ...saved.data
            });

            const response = await uploadProfileImage(file);
            const updatedProfile = response.data;

            setProfile(updatedProfile);

            setProfileImage(
                updatedProfile.profileImagePath
                    ? getProfileImageUrl(
                        updatedProfile.profileImagePath
                    )
                    : previousImage
            );

            toast.success(
                "Profile picture updated successfully."
            );

        } catch (error) {
            console.error(
                "Recruiter profile image upload failed:",
                error
            );

            URL.revokeObjectURL(previewUrl);

            setProfileImage(previousImage || null);

            toast.error(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to upload profile picture."
            );

        } finally {
            setUploadingImage(false);
            event.target.value = "";
        }
    };

    const profileCompletion = useMemo(() => {
        const fields = [
            profile.phone,
            profile.designation,
            profile.companyName,
            profile.companyWebsite,
            profile.companyLocation,
            profile.companyDescription,
            profileImage ? "uploaded" : ""
        ];

        const completed = fields.filter(
            (field) =>
                field !== null &&
                field !== undefined &&
                String(field).trim() !== ""
        ).length;

        return Math.round(
            (completed / fields.length) * 100
        );
    }, [profile, profileImage]);

    if (loading) {
        return (
            <div className="recruiter-profile-page">
                <div className="recruiter-profile-loading">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">
                            Loading...
                        </span>
                    </div>
                    <p>Loading recruiter profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="recruiter-profile-page">

            {/* PROFILE HEADER */}
            <section className="recruiter-profile-header-card">

                <div className="recruiter-profile-header-left">

                    <div className="recruiter-profile-header-avatar">

                        {profileImage ? (
                            <img
                                src={profileImage}
                                alt="Recruiter profile"
                                className="recruiter-profile-image"
                                onClick={() =>
                                    window.open(
                                        profileImage,
                                        "_blank"
                                    )
                                }
                            />
                        ) : (
                            <i className="bi bi-person-badge-fill"></i>
                        )}

                        <label
                            htmlFor="recruiter-profile-image-input"
                            className="recruiter-profile-avatar-edit"
                            title={
                                uploadingImage
                                    ? "Uploading..."
                                    : "Change profile picture"
                            }
                        >
                            <i className="bi bi-camera"></i>
                        </label>

                        <input
                            id="recruiter-profile-image-input"
                            type="file"
                            accept="image/*"
                            hidden
                            disabled={uploadingImage}
                            onChange={
                                handleProfileImageChange
                            }
                        />

                    </div>

                    <div className="recruiter-profile-header-info">

                        <h2>
                            {profile.name || "Recruiter"}
                        </h2>

                        <p className="recruiter-profile-header-role">
                            {profile.designation ||
                                "Recruiter"}
                        </p>

                        <p className="recruiter-profile-header-company">
                            <i className="bi bi-building"></i>
                            {profile.companyName ||
                                "Company not added"}
                        </p>

                        <p className="recruiter-profile-header-location">
                            <i className="bi bi-geo-alt"></i>
                            {profile.companyLocation ||
                                "Location not added"}
                        </p>

                        <p className="recruiter-profile-header-email">
                            <i className="bi bi-envelope"></i>
                            {profile.email || ""}
                        </p>

                    </div>

                </div>

                <div className="recruiter-profile-header-completion">

                    <div className="recruiter-profile-completion-row">
                        <span>Profile Completion</span>
                        <strong>
                            {profileCompletion}%
                        </strong>
                    </div>

                    <div className="recruiter-profile-completion-bar">
                        <div
                            className="recruiter-profile-completion-fill"
                            style={{
                                width: `${profileCompletion}%`
                            }}
                        />
                    </div>

                </div>

            </section>

            {/* MAIN LAYOUT */}
            <div className="recruiter-profile-layout">

                {/* SIDEBAR */}
                <aside className="recruiter-profile-sidebar">

                    <div className="recruiter-sidebar-profile">

                        <div className="recruiter-sidebar-avatar">
                            {profileImage ? (
                                <img
                                    src={profileImage}
                                    alt="Recruiter"
                                />
                            ) : (
                                <i className="bi bi-person-badge-fill"></i>
                            )}
                        </div>

                        <div className="recruiter-sidebar-profile-info">
                            <h4>
                                {profile.name || "Recruiter"}
                            </h4>
                            <span>
                                {profile.designation ||
                                    "Recruiter"}
                            </span>
                        </div>

                    </div>

                    <div className="recruiter-sidebar-completion">

                        <div className="recruiter-sidebar-completion-top">
                            <span>Profile Completion</span>
                            <strong>
                                {profileCompletion}%
                            </strong>
                        </div>

                        <div className="recruiter-sidebar-progress">
                            <div
                                className="recruiter-sidebar-progress-value"
                                style={{
                                    width: `${profileCompletion}%`
                                }}
                            />
                        </div>

                    </div>

                    <div className="recruiter-sidebar-title">
                        Quick Links
                    </div>

                    <nav className="recruiter-profile-sidebar-nav">

                        <button
                            type="button"
                            onClick={() =>
                                handleNavigate("personal")
                            }
                        >
                            <i className="bi bi-person"></i>
                            <span>Personal Information</span>
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                handleNavigate("company")
                            }
                        >
                            <i className="bi bi-building"></i>
                            <span>Company Information</span>
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                handleNavigate("about")
                            }
                        >
                            <i className="bi bi-file-text"></i>
                            <span>About Company</span>
                        </button>

                    </nav>

                    <div className="recruiter-sidebar-save">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={saving}
                        >
                            <i className="bi bi-check2-circle"></i>
                            <span>
                                {saving
                                    ? "Saving..."
                                    : "Save Profile"}
                            </span>
                        </button>
                    </div>

                </aside>

                {/* CONTENT */}
                <main className="recruiter-profile-main-content">

                    <form onSubmit={handleSubmit}>

                        {/* PERSONAL INFORMATION */}
                        <section
                            id="personal"
                            className="recruiter-profile-section"
                        >

                            <div className="recruiter-section-header">
                                <div>
                                    <h3>
                                        Personal Information
                                    </h3>
                                    <p>
                                        Keep your recruiter contact
                                        information up to date.
                                    </p>
                                </div>
                            </div>

                            <div className="recruiter-form-body">

                                <div className="row g-3">

                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={
                                                profile.name || ""
                                            }
                                            disabled
                                        />

                                        <small className="text-muted">
                                            Name is managed from your
                                            account.
                                        </small>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Email Address
                                        </label>

                                        <input
                                            type="email"
                                            className="form-control"
                                            value={
                                                profile.email || ""
                                            }
                                            disabled
                                        />

                                        <small className="text-muted">
                                            Email cannot be changed
                                            here.
                                        </small>
                                    </div>

                                    <div className="col-md-6">
                                        <label
                                            htmlFor="phone"
                                            className="form-label"
                                        >
                                            Phone Number
                                        </label>

                                        <input
                                            id="phone"
                                            type="tel"
                                            className="form-control"
                                            name="phone"
                                            value={
                                                profile.phone || ""
                                            }
                                            onChange={handleChange}
                                            placeholder="e.g. 9876543210"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label
                                            htmlFor="designation"
                                            className="form-label"
                                        >
                                            Designation
                                        </label>

                                        <input
                                            id="designation"
                                            type="text"
                                            className="form-control"
                                            name="designation"
                                            value={
                                                profile.designation ||
                                                ""
                                            }
                                            onChange={handleChange}
                                            placeholder="e.g. HR Recruiter"
                                        />
                                    </div>

                                </div>

                            </div>

                        </section>

                        {/* COMPANY INFORMATION */}
                        <section
                            id="company"
                            className="recruiter-profile-section"
                        >

                            <div className="recruiter-section-header">
                                <div>
                                    <h3>
                                        Company Information
                                    </h3>
                                    <p>
                                        Add the information candidates
                                        should know about your company.
                                    </p>
                                </div>
                            </div>

                            <div className="recruiter-form-body">

                                <div className="row g-3">

                                    <div className="col-md-6">
                                        <label
                                            htmlFor="companyName"
                                            className="form-label"
                                        >
                                            Company Name
                                        </label>

                                        <input
                                            id="companyName"
                                            type="text"
                                            className="form-control"
                                            name="companyName"
                                            value={
                                                profile.companyName ||
                                                ""
                                            }
                                            onChange={handleChange}
                                            placeholder="e.g. ABC Technologies"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label
                                            htmlFor="companyWebsite"
                                            className="form-label"
                                        >
                                            Company Website
                                        </label>

                                        <input
                                            id="companyWebsite"
                                            type="url"
                                            className="form-control"
                                            name="companyWebsite"
                                            value={
                                                profile.companyWebsite ||
                                                ""
                                            }
                                            onChange={handleChange}
                                            placeholder="https://example.com"
                                        />
                                    </div>

                                    <div className="col-md-12">
                                        <label
                                            htmlFor="companyLocation"
                                            className="form-label"
                                        >
                                            Company Location
                                        </label>

                                        <input
                                            id="companyLocation"
                                            type="text"
                                            className="form-control"
                                            name="companyLocation"
                                            value={
                                                profile.companyLocation ||
                                                ""
                                            }
                                            onChange={handleChange}
                                            placeholder="e.g. Noida, Uttar Pradesh"
                                        />
                                    </div>

                                </div>

                            </div>

                        </section>

                        {/* ABOUT COMPANY */}
                        <section
                            id="about"
                            className="recruiter-profile-section"
                        >

                            <div className="recruiter-section-header">
                                <div>
                                    <h3>
                                        About Company
                                    </h3>
                                    <p>
                                        Give candidates a short
                                        introduction to your company.
                                    </p>
                                </div>
                            </div>

                            <div className="recruiter-form-body">

                                <label
                                    htmlFor="companyDescription"
                                    className="form-label"
                                >
                                    Company Description
                                </label>

                                <textarea
                                    id="companyDescription"
                                    className="form-control recruiter-description"
                                    name="companyDescription"
                                    rows="7"
                                    value={
                                        profile.companyDescription ||
                                        ""
                                    }
                                    onChange={handleChange}
                                    placeholder="Tell candidates about your company, culture, products, and work environment."
                                />

                                <div className="recruiter-description-footer">
                                    <span>
                                        {(
                                            profile.companyDescription ||
                                            ""
                                        ).length}{" "}
                                        characters
                                    </span>

                                    <button
                                        type="submit"
                                        className="recruiter-main-save-btn"
                                        disabled={saving}
                                    >
                                        <i className="bi bi-check2-circle"></i>
                                        {saving
                                            ? "Saving..."
                                            : "Save Profile"}
                                    </button>
                                </div>

                            </div>

                        </section>

                    </form>

                </main>

            </div>

        </div>
    );
}

export default RecruiterProfile;
