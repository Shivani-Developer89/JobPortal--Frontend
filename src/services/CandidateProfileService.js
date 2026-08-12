import api from "./appConfig";

export const getMyProfile = () => {
    return api.get("/candidate-profile/me");
};

export const saveProfile = (profile) => {
    return api.post("/candidate-profile", profile);
};
export const uploadProfileImage = (file) => {

    const formData = new FormData();

    formData.append("image", file);

    return api.post(
        "/candidate-profile/profile-image",
        formData
    );
};