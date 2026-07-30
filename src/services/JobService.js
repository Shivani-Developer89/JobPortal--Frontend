import api from "./appConfig";


export const createJob = (job) => {
    return api.post("/job", job);
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

export const deleteJob = (jobId) => {
    return api.delete(`/job/${jobId}`);
};

export const updateJob = (jobId, jobData) => {
    return api.put(`/job/${jobId}`, jobData);
};
export const closeJob = (jobId) => {
    return api.put(`/job/${jobId}/close`);
};

export const reopenJob = (jobId) => {
    return api.put(`/job/${jobId}/reopen`);
};