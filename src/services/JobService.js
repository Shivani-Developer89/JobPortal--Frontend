import api from "./appConfig";

const API_URL = "http://localhost:81/job";

export const createJob = (job) => {
    return api.post("/jobs", job);
};

export const getAllJobs = () => {
    return api.get("/job/all");
};
export const getJobById = (id) => {
    return api.get(`/job/${id}`);
};
export const getMyJobs = () => {
    return api.get("/job/my");
};

export const viewApplicants = (jobId) => {
    return api.get(`/applications/job/${jobId}/applicants`);
};
export const updateApplicationStatus = (applicationId, status) => {
    return api.put(
        `/applications/${applicationId}/status`,
        { status }
    );
};

export const getFeaturedJobs = () => {
    return api.get("/job/all?page=0&size=6&sort=createdAt");
};