import axios from "axios";

const API_URL = "http://localhost:81/job";

export const getAllJobs = () => {
  

    const token = localStorage.getItem("token");
     console.log("TOKEN:", token);

      return axios.get(`${API_URL}/all`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
export const getJobById = (id) => {

    const token =
        localStorage.getItem("token");

    return axios.get(
        `${API_URL}/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};
export const getMyJobs = () => {

    const token = localStorage.getItem("token");

    return axios.get(
        "http://localhost:81/job/my",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};
export const viewApplicants = (jobId) => {
    const token = localStorage.getItem("token");

    return axios.get(
        `http://localhost:81/applications/job/${jobId}/applicants`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};
export const updateApplicationStatus = (applicationId, status) => {

    const token = localStorage.getItem("token");

    return axios.put(
        `http://localhost:81/applications/${applicationId}/status`,
        {
            status: status
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

export const getFeaturedJobs = () => {

    const token = localStorage.getItem("token");

    return axios.get(
        `${API_URL}/all?page=0&size=6&sort=createdAt`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};