import { useRef, useState } from "react";
import {
    uploadResume,
    downloadResume
} from "../services/ResumeService";

import { toast } from "react-toastify";

function ResumeSection({
    resume,
    setResume
}) {

    const fileInputRef = useRef(null);

    const [uploading, setUploading] = useState(false);
    const [dragging, setDragging] = useState(false);

    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    /* =====================================================
       FORMAT FILE SIZE
    ===================================================== */

    const formatFileSize = (bytes) => {

        if (!bytes) {
            return "0 KB";
        }

        const mb = bytes / (1024 * 1024);

        if (mb < 1) {
            return `${(bytes / 1024).toFixed(0)} KB`;
        }

        return `${mb.toFixed(2)} MB`;
    };

    /* =====================================================
       FORMAT DATE
    ===================================================== */

    const formatDate = (date) => {

        if (!date) {
            return "Recently";
        }

        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    /* =====================================================
       VALIDATE FILE
    ===================================================== */

    const validateFile = (file) => {

        if (!file) {
            return false;
        }

        const isPdf =
            file.type === "application/pdf" ||
            file.name.toLowerCase().endsWith(".pdf");

        if (!isPdf) {

            toast.error(
                "Only PDF files are allowed."
            );

            return false;
        }

        if (file.size > MAX_FILE_SIZE) {

            toast.error(
                "Resume size must be less than 5 MB."
            );

            return false;
        }

        return true;
    };

    /* =====================================================
       UPLOAD RESUME
    ===================================================== */

    const processResume = async (file) => {

        if (!validateFile(file)) {
            return;
        }

        try {

            setUploading(true);

            await uploadResume(file);

            setResume({
                file: file,
                fileName: file.name,
                fileSize: file.size,
                uploadedAt: new Date().toISOString()
            });

            toast.success(
                resume
                    ? "Resume replaced successfully."
                    : "Resume uploaded successfully."
            );

        } catch (error) {

            console.error(
                "Resume upload error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Resume upload failed. Please try again."
            );

        } finally {

            setUploading(false);

        }
    };

    /* =====================================================
       FILE INPUT
    ===================================================== */

    const handleResumeChange = (e) => {

        const file = e.target.files?.[0];

        if (file) {
            processResume(file);
        }

        // Allows selecting the same file again
        e.target.value = "";
    };

    /* =====================================================
       DRAG & DROP
    ===================================================== */

    const handleDragOver = (e) => {

        e.preventDefault();

        setDragging(true);
    };

    const handleDragLeave = (e) => {

        e.preventDefault();

        setDragging(false);
    };

    const handleDrop = (e) => {

        e.preventDefault();

        setDragging(false);

        const file = e.dataTransfer.files?.[0];

        if (file) {
            processResume(file);
        }
    };

    /* =====================================================
       VIEW RESUME
    ===================================================== */

    const handleViewResume = async () => {

        try {

            // Newly uploaded file exists in browser memory
            if (resume?.file) {

                const url =
                    URL.createObjectURL(resume.file);

                window.open(url, "_blank");

                // Release object URL later
                setTimeout(() => {
                    URL.revokeObjectURL(url);
                }, 60000);

                return;
            }

            // Existing resume from backend
            const response =
                await downloadResume();

            const blob =
                new Blob(
                    [response.data],
                    {
                        type: "application/pdf"
                    }
                );

            const url =
                URL.createObjectURL(blob);

            window.open(url, "_blank");

            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 60000);

        } catch (error) {

            console.error(
                "Resume view error:",
                error
            );

            toast.error(
                "Unable to open resume."
            );
        }
    };

    /* =====================================================
       REMOVE FROM CURRENT FORM
       
       IMPORTANT:
       This does NOT delete from backend because your
       current ResumeService has no delete API.
    ===================================================== */

    const handleRemove = () => {

        setResume(null);

        toast.info(
            "Resume removed from the current profile form."
        );
    };

    /* =====================================================
       UI
    ===================================================== */

    return (

        <div className="resume-section">

            <div className="resume-card">

                {/* HEADER */}

                <div className="resume-card-header">

                    <div>

                        <h5>
                            Resume
                        </h5>

                        <p>
                            Upload your latest resume to help recruiters
                            understand your experience.
                        </p>

                    </div>

                    <div className="resume-header-icon">

                        <i className="bi bi-file-earmark-pdf-fill"></i>

                    </div>

                </div>


                {/* BODY */}

                <div className="resume-card-body">

                    {!resume ? (

                        /* =================================================
                           EMPTY STATE
                        ================================================= */

                        <div
                            className={`resume-upload-area ${
                                dragging
                                    ? "dragging"
                                    : ""
                            }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >

                            <div className="resume-upload-icon">

                                <i className="bi bi-cloud-arrow-up"></i>

                            </div>

                            <h6>
                                Upload your resume
                            </h6>

                            <p>
                                Drag and drop your PDF here
                                or choose a file from your computer.
                            </p>

                            <label className="resume-upload-btn">

                                {uploading ? (

                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                        ></span>

                                        Uploading...
                                    </>

                                ) : (

                                    <>
                                        <i className="bi bi-upload me-2"></i>
                                        Choose Resume
                                    </>

                                )}

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="application/pdf,.pdf"
                                    hidden
                                    disabled={uploading}
                                    onChange={handleResumeChange}
                                />

                            </label>

                            <div className="resume-upload-info">

                                <span>
                                    <i className="bi bi-file-earmark-pdf me-1"></i>
                                    PDF only
                                </span>

                                <span>
                                    <i className="bi bi-hdd me-1"></i>
                                    Maximum 5 MB
                                </span>

                            </div>

                        </div>

                    ) : (

                        /* =================================================
                           RESUME EXISTS
                        ================================================= */

                        <div className="resume-file-container">

                            <div className="resume-file-info">

                                <div className="resume-file-icon">

                                    <i className="bi bi-file-earmark-pdf-fill"></i>

                                </div>

                                <div className="resume-file-details">

                                    <h6
                                        title={
                                            resume.file?.name ||
                                            resume.fileName
                                        }
                                    >
                                        {
                                            resume.file?.name ||
                                            resume.fileName ||
                                            "Resume.pdf"
                                        }
                                    </h6>

                                    <div className="resume-meta">

                                        <span>
                                            PDF
                                        </span>

                                        <span>
                                            •
                                        </span>

                                        <span>
                                            {
                                                resume.file
                                                    ? formatFileSize(
                                                        resume.file.size
                                                    )
                                                    : "Uploaded"
                                            }
                                        </span>

                                    </div>

                                    <small>

                                        Uploaded{" "}

                                        {formatDate(
                                            resume.uploadedAt
                                        )}

                                    </small>

                                </div>

                            </div>


                            {/* ACTIONS */}

                            <div className="resume-actions">

                                <button
                                    type="button"
                                    className="resume-view-btn"
                                    onClick={handleViewResume}
                                >

                                    <i className="bi bi-eye me-2"></i>

                                    View

                                </button>


                                <label
                                    className={`resume-replace-btn ${
                                        uploading
                                            ? "disabled"
                                            : ""
                                    }`}
                                >

                                    {uploading ? (

                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                            ></span>

                                            Replacing...
                                        </>

                                    ) : (

                                        <>
                                            <i className="bi bi-arrow-repeat me-2"></i>

                                            Replace
                                        </>

                                    )}

                                    <input
                                        type="file"
                                        accept="application/pdf,.pdf"
                                        hidden
                                        disabled={uploading}
                                        onChange={handleResumeChange}
                                    />

                                </label>


                                <button
                                    type="button"
                                    className="resume-delete-btn"
                                    onClick={handleRemove}
                                    title="Remove resume"
                                >

                                    <i className="bi bi-trash"></i>

                                </button>

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default ResumeSection;