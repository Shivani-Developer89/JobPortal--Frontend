import api from "./appConfig";

export const getNotifications = () => {
    return api.get("/notifications");
};

export const getUnreadNotificationCount = () => {
    return api.get("/notifications/unread-count");
};

export const markNotificationAsRead = (notificationId) => {
    return api.put(`/notifications/${notificationId}/read`);
};

export const markAllNotificationsAsRead = () => {
    return api.put("/notifications/read-all");
};