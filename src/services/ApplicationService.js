import api from "./appConfig";

export const applyJob = (jobId) => {
    return api.post(`/applications/apply/${jobId}`, {});
};

export const getMyApplications = () => {
    return api.get("/applications/my");
};

export const withdrawApplication = (applicationId) => {
    return api.put(`/applications/${applicationId}/withdraw`, {});
};

export const getRecruiterDashboard = () => {
    return api.get("/applications/recruiterDashboard");
};

export const getRecentApplications = () => {
    return api.get("/applications/recruiter/recent");
};

export const downloadResume = (applicationId) => {
    return api.get(
        `/applications/${applicationId}/resume`,
        {
            responseType: "blob",
        }
    );
};
export const getCandidateProfileImage = (candidateId) => {
    return api.get(
        `/candidate-profile/candidate/${candidateId}/profile-image`,
        {
            responseType: "blob",
        }
    );
};
export const getCandidateDashboard = () => {
    return api.get("/applications/candidateDashboard");
};
export const updateApplicationStatus = (applicationId, status) => {
    return api.put(
        `/applications/${applicationId}/status`,
        { status }
    );
};