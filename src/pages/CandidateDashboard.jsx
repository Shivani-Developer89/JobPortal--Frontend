import { useEffect, useState } from "react";
import { getCandidateDashboard, getMyApplications } from "../services/applicationService";
import { useNavigate } from "react-router-dom";
import { withdrawApplication } from "../services/applicationService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const CandidateDashboard = () => {

    const [dashboard, setDashboard] = useState({});
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        loadDashboard();
    }, []);

    const navigate = useNavigate();

const handleViewJob = (jobId) => {
    navigate(`/jobs/${jobId}`);
};
const handleWithdraw = async (applicationId) => {

const result = await Swal.fire({
    title: "Withdraw Application?",
    text: "Are you sure you want to withdraw this application?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, Withdraw",
    cancelButtonText: "Cancel"
});

if (!result.isConfirmed) {
    return;
}

    try {

        await withdrawApplication(applicationId);

        toast.success("Application withdrawn successfully!");

        loadDashboard();

    } catch (error) {

        
        toast.error(
        error.response?.data?.message ||
        "Failed to withdraw application."
    );
        
    }
};

    const loadDashboard = async () => {

        try {

            const dashboardResponse =
                await getCandidateDashboard();

            const applicationsResponse =
                await getMyApplications();

            setDashboard(dashboardResponse.data);
            setApplications(applicationsResponse.data);

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to load dashboard"
            );
        }
    };

    return (
    <div className="container mt-5">

        <h2 className="text-center mb-4">
            Candidate Dashboard
        </h2>

        <div className="row g-4">

            <div className="col-md-3">
                <div className="card shadow text-center">
                    <div className="card-body">
                        <h6>Total Applications</h6>
                        <h2>{dashboard.totalApplications}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card shadow text-center">
                    <div className="card-body">
                        <h6>Pending</h6>
                        <h2>{dashboard.pendingApplications}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card shadow text-center">
                    <div className="card-body">
                        <h6>Accepted</h6>
                        <h2>{dashboard.acceptedApplications}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card shadow text-center">
                    <div className="card-body">
                        <h6>Rejected</h6>
                        <h2>{dashboard.rejectedApplications}</h2>
                    </div>
                </div>
            </div>

        </div>
        <div className="mt-5">

    <h3 className="mb-4">My Applications</h3>

    {
        applications.length === 0 ? (

            <div className="alert alert-info">
                No applications found.
            </div>

        ) : (

            applications.map((application) => (

                <div
                    key={application.id}
                    className="card shadow-sm mb-3"
                >

                    <div className="card-body">

                        <h5>{application.jobTitle}</h5>

                       <p className="mb-1">
 <span
    className={`ms-2 ${
        application.status === "APPLIED"
            ? "badge bg-primary"
            : application.status === "SHORTLISTED"
            ? "badge bg-warning text-dark"
            : application.status === "HIRED"
            ? "badge bg-success"
            : application.status === "REJECTED"
            ? "badge bg-danger"
            : application.status === "WITHDRAWN"
            ? "badge bg-dark"
            : "badge bg-secondary"
    }`}
>
    {application.status}
</span>
</p>

                        <p className="mb-3">
                            <strong>Applied On:</strong>{" "}
                            {new Date(application.appliedAt).toLocaleDateString()}
                        </p>
                        
                        <button
                            className="btn btn-primary me-2"
                            onClick={() => handleViewJob(application.jobId)}
                        >
                            View Job
                        </button>

                        {
                            application.status === "APPLIED" && (

                            <button
                            className="btn btn-danger"
                            onClick={() => handleWithdraw(application.id)}
                        >
                            Withdraw
                        </button>

                            )
                        }

                    </div>

                </div>

            ))

        )
    }

</div>

    </div>
    
);
};

export default CandidateDashboard;