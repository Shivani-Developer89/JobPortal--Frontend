import axios from "axios";
  
const API_URL = "http://localhost:81/applications"

export const applyJob = (jobId) => {
    const token =localStorage.getItem("token");

    return axios.post(
        `${API_URL}/apply/${jobId}`,
     {},
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

};

export const getMyApplications = () => {

    const token = localStorage.getItem("token");

    return axios.get(
        `${API_URL}/my`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

export const withdrawApplication = (applicationId) => {

    const token = localStorage.getItem("token");

    return axios.put(
        `${API_URL}/${applicationId}/withdraw`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

};
export const getRecruiterDashboard = () => {

    const token = localStorage.getItem("token");

    return axios.get(
        `${API_URL}/recruiterDashboard`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};
export const getRecentApplications = () => {

    const token = localStorage.getItem("token");

    return axios.get(
        `${API_URL}/recruiter/recent`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};
export const downloadResume = (applicationId) => {
    const token = localStorage.getItem("token");

    return axios.get(
        `http://localhost:81/applications/${applicationId}/resume`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            responseType: "blob"
        }
    );
};