import api from "./appConfig";

// Get logged-in recruiter's profile
export const getMyProfile = () => {
    return api.get("/recruiter-profile/me");
};

// Create or update recruiter's profile
export const saveProfile = (profile) => {
    return api.post("/recruiter-profile", profile);
};

// Upload recruiter's profile image
export const uploadProfileImage = (file) => {

    const formData = new FormData();

    formData.append("image", file);

    return api.post(
        "/recruiter-profile/profile-image",
        formData
    );
};