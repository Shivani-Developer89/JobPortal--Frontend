import api from "./appConfig";

export const registerUser = (userData) => {
    return api.post("/auth/register", userData);
};

export const loginUser = (credentials) => {
    return api.post("/auth/login", credentials);
};