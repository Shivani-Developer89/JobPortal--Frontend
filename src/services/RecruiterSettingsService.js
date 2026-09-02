import axios from "axios";

const API_URL = "http://localhost:81";

/*
 * Get JWT token from localStorage
 */
const getAuthConfig = () => {
    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
};

/*
 * ================================
 * RECRUITER SETTINGS
 * ================================
 */

/**
 * Get logged-in recruiter's settings
 *
 * GET /recruiter/settings
 */
export const getRecruiterSettings = async () => {
    const response = await axios.get(
        `${API_URL}/recruiter/settings`,
        getAuthConfig()
    );

    return response;
};


/**
 * Update logged-in recruiter's settings
 *
 * PUT /recruiter/settings
 */
export const updateRecruiterSettings = async (settings) => {
    const response = await axios.put(
        `${API_URL}/recruiter/settings`,
        settings,
        getAuthConfig()
    );

    return response;
};


/*
 * ================================
 * CHANGE PASSWORD
 * ================================
 */

/**
 * Change logged-in user's password
 *
 * PUT /user/change-password
 */
export const changePassword = async (currentPassword, newPassword) => {
    const response = await axios.put(
        `${API_URL}/user/change-password`,
        {
            currentPassword,
            newPassword,
        },
        getAuthConfig()
    );

    return response;
};
/*
 * ================================
 * DEACTIVATE ACCOUNT
 * ================================
 */

/**
 * Deactivate logged-in user's account
 *
 * PUT /user/deactivate
 */
export const deactivateAccount = async () => {
    const response = await axios.put(
        `${API_URL}/user/deactivate`,
        {},
        getAuthConfig()
    );

    return response;
};

/*
 * ================================
 * DELETE ACCOUNT
 * ================================
 */

/**
 * Request account deletion
 *
 * DELETE /user/account
 *
 * Account will remain recoverable for 30 days.
 * Logging in during the grace period cancels
 * the deletion request.
 */
export const requestAccountDeletion = async () => {
    const response = await axios.delete(
        `${API_URL}/user/account`,
        getAuthConfig()
    );

    return response;
};