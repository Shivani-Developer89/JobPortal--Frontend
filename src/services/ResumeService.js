import axios from "axios";

const API_URL = "http://localhost:81/user";

export const uploadResume = (file) => {

    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("file", file);

    return axios.post(
        `${API_URL}/resume/upload`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        }
    );
};
export const downloadResume = () => {

    const token = localStorage.getItem("token");

    return axios.get(
        "http://localhost:81/user/resume/download",
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            responseType: "blob"
        }
    );
};