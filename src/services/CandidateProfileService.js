import axios from "axios";

const API_URL = "http://localhost:81/candidate-profile";

export const getMyProfile = () => {

    const token = localStorage.getItem("token");

    return axios.get(
        `${API_URL}/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

export const saveProfile = (profile) => {

    const token = localStorage.getItem("token");

    return axios.post(
        API_URL,
        profile,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};