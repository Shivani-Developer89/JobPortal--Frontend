import axios from "axios";

const API_URL = "http://localhost:81";


// =====================================================
// Authentication Config
// =====================================================

const getAuthConfig = () => {

    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
};


// =====================================================
// ACCOUNT INFORMATION
// =====================================================

export const getMyAccount = async () => {

    return await axios.get(
        `${API_URL}/user/me`,
        getAuthConfig()
    );
};


export const updateMyAccount = async (account) => {

    return await axios.put(
        `${API_URL}/user/me`,
        account,
        getAuthConfig()
    );
};


// =====================================================
// CANDIDATE JOB SETTINGS
// =====================================================

export const getCandidateSettings = async () => {

    return await axios.get(
        `${API_URL}/candidate/settings`,
        getAuthConfig()
    );
};


export const updateCandidateSettings = async (settings) => {

    return await axios.put(
        `${API_URL}/candidate/settings`,
        settings,
        getAuthConfig()
    );
};


// =====================================================
// CHANGE PASSWORD
// =====================================================

export const changePassword = async (
    currentPassword,
    newPassword
) => {

    return await axios.put(
        `${API_URL}/user/change-password`,
        {
            currentPassword,
            newPassword,
        },
        getAuthConfig()
    );
};


// =====================================================
// DEACTIVATE ACCOUNT
// =====================================================

export const deactivateAccount = async () => {

    return await axios.put(
        `${API_URL}/user/deactivate`,
        {},
        getAuthConfig()
    );
};


// =====================================================
// DELETE ACCOUNT
// =====================================================

export const requestAccountDeletion = async () => {

    return await axios.delete(
        `${API_URL}/user/account`,
        getAuthConfig()
    );
};