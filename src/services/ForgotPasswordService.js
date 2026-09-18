import api from "./appConfig";

export const forgotPassword = (email) => {
    return api.post("/auth/forgot-password", null, {
        params: {
            email: email
        }
    });
};

export const resetPassword = (token, newPassword) => {
    return api.post("/auth/reset-password", null, {
        params: {
            token: token,
            newPassword: newPassword
        }
    });
};