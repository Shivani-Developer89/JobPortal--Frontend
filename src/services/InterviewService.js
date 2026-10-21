import api from "./appConfig";

// ==========================================
// SCHEDULE INTERVIEW
// ==========================================

export const scheduleInterview = (data) => {
    return api.post("/interviews", data);
};

// ==========================================
// GET MY INTERVIEWS
// ==========================================

export const getMyInterviews = () => {
    return api.get("/interviews/my");
};

// ==========================================
// GET INTERVIEWS FOR APPLICATION
// ==========================================

export const getInterviewsByApplication = (applicationId) => {
    return api.get(`/interviews/application/${applicationId}`);
};

// ==========================================
// UPDATE / RESCHEDULE INTERVIEW
// ==========================================

export const updateInterview = (interviewId, data) => {
    return api.put(`/interviews/${interviewId}`, data);
};

// ==========================================
// CANCEL INTERVIEW
// ==========================================

export const cancelInterview = (interviewId) => {
    return api.put(`/interviews/${interviewId}/cancel`);
};

// ==========================================
// ACCEPT / DECLINE INTERVIEW
// ==========================================

export const respondToInterview = (
    interviewId,
    response
) => {
    return api.put(
        `/interviews/${interviewId}/respond`,
        null,
        {
            params: {
                response,
            },
        }
    );
};
// ==========================================
// COMPLETE INTERVIEW
// ==========================================

export const completeInterview = (interviewId) => {
    return api.put(`/interviews/${interviewId}/complete`);
};