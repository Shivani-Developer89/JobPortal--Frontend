import api from "./appConfig";

export const getMyProfile = () => {
    return api.get("/candidate-profile/me");
};

export const saveProfile = (profile) => {
    return api.post("/candidate-profile", profile);
};