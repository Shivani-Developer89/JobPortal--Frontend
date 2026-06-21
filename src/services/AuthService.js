import axios from "axios";

const API_URL = "http://localhost:81/auth";

export const registerUser = async (userData) => {
    return axios.post(`${API_URL}/register`, userData);
};
export const loginUser = (credentials) => {
    return axios.post(`${API_URL}/login`, credentials);
};