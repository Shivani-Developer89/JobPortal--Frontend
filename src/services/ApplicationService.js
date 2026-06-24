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