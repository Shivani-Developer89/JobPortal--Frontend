import api from "./appConfig";

export const uploadResume = (file) => {

    const formData = new FormData();
    formData.append("file", file);

    return api.post(
        "/user/resume/upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );
};

export const downloadResume = () => {

    return api.get(
        "/user/resume/download",
        {
            responseType: "blob"
        }
    );
};