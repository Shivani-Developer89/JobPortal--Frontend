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