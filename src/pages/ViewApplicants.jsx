import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
    viewApplicants,
    updateApplicationStatus,
} from "../services/JobService";
import { downloadResume } from "../services/ApplicationService";

function ViewApplicants() {
    const { jobId } = useParams();

    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    const [selectedApplicant, setSelectedApplicant] = useState(null);

    useEffect(() => {
        loadApplicants();
    }, [jobId]);

    const loadApplicants = async () => {
        try {
            setLoading(true);

            const response = await viewApplicants(jobId);

            setApplicants(response.data || []);
        } catch (error) {
            console.error("Failed to load applicants:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (applicationId, status) => {
        try {
            setUpdatingId(applicationId);

            await updateApplicationStatus(applicationId, status);

            await loadApplicants();
        } catch (error) {
            console.error(
                "Failed to update application status:",
                error
            );
        } finally {
            setUpdatingId(null);
        }
    };

    const handleViewResume = async (applicationId) => {
        try {
            const response = await downloadResume(applicationId);

            const file = new Blob([response.data], {
                type: "application/pdf",
            });

            const fileURL = URL.createObjectURL(file);

            window.open(fileURL, "_blank");

            setTimeout(() => {
                URL.revokeObjectURL(fileURL);
            }, 60000);
        } catch (error) {
            console.error("Failed to open resume:", error);
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "APPLIED":
                return "bg-primary-subtle text-primary";

            case "SHORTLISTED":
                return "bg-warning-subtle text-warning-emphasis";

            case "HIRED":
                return "bg-success-subtle text-success";

            case "REJECTED":
                return "bg-danger-subtle text-danger";

            default:
                return "bg-secondary-subtle text-secondary";
        }
    };

    const getInitials = (name) => {
        if (!name) return "?";

        return name
            .split(" ")
            .map((word) => word.charAt(0))
            .join("")
            .substring(0, 2)
            .toUpperCase();
    };

    if (loading) {
        return (
            <div className="container py-5">
                <div className="text-center py-5">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    >
                        <span className="visually-hidden">
                            Loading...
                        </span>
                    </div>

                    <p className="text-muted mt-3">
                        Loading applicants...
                    </p>

                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">

            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h2 className="fw-bold mb-1">
                        Applicants
                    </h2>

                    <p className="text-muted mb-0">
                        Review and manage candidates who applied
                        for this job.
                    </p>
                </div>

                <button
                    className="btn btn-outline-primary"
                    onClick={() => window.history.back()}
                >
                    ← Back to My Jobs
                </button>

            </div>


            {/* =====================================================
                APPLICANT COUNT
            ===================================================== */}

            <div className="card border-0 shadow-sm mb-4">

                <div className="card-body d-flex justify-content-between align-items-center">

                    <div>
                        <h6 className="text-muted mb-1">
                            Total Applicants
                        </h6>

                        <h3 className="fw-bold mb-0">
                            {applicants.length}
                        </h3>
                    </div>

                    <div
                        className="rounded-circle bg-primary-subtle d-flex align-items-center justify-content-center"
                        style={{
                            width: "55px",
                            height: "55px",
                        }}
                    >
                        <span className="fs-4 text-primary">
                            👥
                        </span>
                    </div>

                </div>

            </div>


            {/* =====================================================
                EMPTY STATE
            ===================================================== */}

            {applicants.length === 0 ? (

                <div className="card border-0 shadow-sm">

                    <div className="card-body text-center py-5">

                        <div className="fs-1 mb-3">
                            📄
                        </div>

                        <h5 className="fw-semibold">
                            No applicants yet
                        </h5>

                        <p className="text-muted mb-0">
                            Candidates who apply for this job
                            will appear here.
                        </p>

                    </div>

                </div>

            ) : (

                /* =================================================
                   APPLICANT CARDS
                   ================================================= */

                <div className="row g-4">

                    {applicants.map((app) => (

                        <div
                            className="col-lg-6"
                            key={app.applicationId}
                        >

                            <div className="card h-100 border-0 shadow-sm">

                                <div className="card-body p-4">


                                    {/* =================================
                                        CANDIDATE
                                    ================================= */}

                                    <div className="d-flex align-items-center">

                                        <div
                                            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold me-3"
                                            style={{
                                                width: "52px",
                                                height: "52px",
                                                minWidth: "52px",
                                            }}
                                        >
                                            {getInitials(
                                                app.candidateName
                                            )}
                                        </div>

                                        <div>

                                            <h5 className="fw-bold mb-1">
                                                {app.candidateName}
                                            </h5>

                                            <p className="text-muted mb-0">
                                                {app.candidateEmail}
                                            </p>

                                        </div>

                                    </div>


                                    <hr className="my-4" />


                                    {/* =================================
                                        JOB POSITION
                                    ================================= */}

                                    {app.jobTitle && (

                                        <div className="mb-3">

                                            <span className="text-muted small">
                                                Applied for
                                            </span>

                                            <div className="fw-semibold">
                                                {app.jobTitle}
                                            </div>

                                        </div>

                                    )}


                                    {/* =================================
                                        STATUS
                                    ================================= */}

                                    <div className="mb-4">

                                        <div className="d-flex justify-content-between align-items-center mb-2">

                                            <label className="fw-semibold">
                                                Application Status
                                            </label>

                                            <span
                                                className={`badge rounded-pill px-3 py-2 ${getStatusClass(
                                                    app.status
                                                )}`}
                                            >
                                                {app.status}
                                            </span>

                                        </div>

                                        <select
                                            className="form-select"
                                            value={app.status}
                                            disabled={
                                                updatingId ===
                                                app.applicationId
                                            }
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    app.applicationId,
                                                    e.target.value
                                                )
                                            }
                                        >

                                            <option value="APPLIED">
                                                Applied
                                            </option>

                                            <option value="SHORTLISTED">
                                                Shortlisted
                                            </option>

                                            <option value="HIRED">
                                                Hired
                                            </option>

                                            <option value="REJECTED">
                                                Rejected
                                            </option>

                                        </select>

                                        {updatingId ===
                                            app.applicationId && (

                                            <small className="text-muted">
                                                Updating status...
                                            </small>

                                        )}

                                    </div>


                                    {/* =================================
                                        ACTIONS
                                    ================================= */}

                                    <div className="d-flex gap-2">

                                        <button
                                            className="btn btn-success flex-grow-1"
                                            onClick={() =>
                                                handleViewResume(
                                                    app.applicationId
                                                )
                                            }
                                        >
                                            📄 View Resume
                                        </button>

                                        <button
                                            className="btn btn-outline-primary"
                                            onClick={() =>
                                                setSelectedApplicant(app)
                                            }
                                        >
                                            View Details
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}


            {/* =====================================================
                VIEW DETAILS MODAL
            ===================================================== */}

            {selectedApplicant && (

                <div
                    className="modal d-block"
                    tabIndex="-1"
                    style={{
                        backgroundColor:
                            "rgba(0, 0, 0, 0.5)",
                    }}
                >

                    <div className="modal-dialog modal-dialog-centered">

                        <div className="modal-content">


                            {/* MODAL HEADER */}

                            <div className="modal-header">

                                <div>

                                    <h5 className="modal-title fw-bold mb-1">
                                        {selectedApplicant.candidateName}
                                    </h5>

                                    <p className="text-muted mb-0">
                                        {
                                            selectedApplicant.candidateEmail
                                        }
                                    </p>

                                </div>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() =>
                                        setSelectedApplicant(null)
                                    }
                                ></button>

                            </div>


                            {/* MODAL BODY */}

                            <div className="modal-body">

                                <div className="mb-3">

                                    <label className="text-muted small">
                                        Candidate Name
                                    </label>

                                    <p className="fw-semibold mb-0">
                                        {
                                            selectedApplicant.candidateName
                                        }
                                    </p>

                                </div>


                                <div className="mb-3">

                                    <label className="text-muted small">
                                        Email
                                    </label>

                                    <p className="fw-semibold mb-0">
                                        {
                                            selectedApplicant.candidateEmail
                                        }
                                    </p>

                                </div>


                                {selectedApplicant.jobTitle && (

                                    <div className="mb-3">

                                        <label className="text-muted small">
                                            Applied For
                                        </label>

                                        <p className="fw-semibold mb-0">
                                            {
                                                selectedApplicant.jobTitle
                                            }
                                        </p>

                                    </div>

                                )}


                                <div>

                                    <label className="text-muted small">
                                        Application Status
                                    </label>

                                    <div>

                                        <span
                                            className={`badge rounded-pill px-3 py-2 ${getStatusClass(
                                                selectedApplicant.status
                                            )}`}
                                        >
                                            {
                                                selectedApplicant.status
                                            }
                                        </span>

                                    </div>

                                </div>

                            </div>


                            {/* MODAL FOOTER */}

                            <div className="modal-footer">

                                <button
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        setSelectedApplicant(null)
                                    }
                                >
                                    Close
                                </button>

                                <button
                                    className="btn btn-success"
                                    onClick={() =>
                                        handleViewResume(
                                            selectedApplicant.applicationId
                                        )
                                    }
                                >
                                    📄 View Resume
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default ViewApplicants;