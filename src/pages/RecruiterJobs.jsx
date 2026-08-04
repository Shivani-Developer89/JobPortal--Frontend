import { useEffect, useState } from "react";
import { getMyJobs , closeJob, reopenJob} from "../services/JobService";
import { useNavigate } from "react-router-dom";
import "../styles/recruiterJobs.css";
function RecruiterJobs() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        loadJobs();
    }, []);
    const navigate = useNavigate();

        const loadJobs = async () => {
            try {
                const response = await getMyJobs();
                console.log(response.data);
                setJobs(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        const handleEdit = (jobId) => {
    navigate(`/recruiter/jobs/edit/${jobId}`);
};


const handleCloseJob = async (jobId) => {

    if (!window.confirm("Close this job? Candidates will no longer be able to apply.")) {
        return;
    }

    try {
        await closeJob(jobId);

        setJobs(prevJobs =>
            prevJobs.map(job =>
                job.id === jobId
                    ? { ...job, status: "CLOSED" }
                    : job
            )
        );

    } catch (error) {
        console.error("Failed to close job:", error);
        alert("Failed to close job.");
    }
};

const handleReopenJob = async (jobId) => {

    try {
        await reopenJob(jobId);

        setJobs(prevJobs =>
            prevJobs.map(job =>
                job.id === jobId
                    ? { ...job, status: "ACTIVE" }
                    : job
            )
        );

    } catch (error) {
        console.error("Failed to reopen job:", error);
        alert("Failed to reopen job.");
    }
};

    return (
    <div className="container mt-5">

          {/* HEADER */}
<div className="jobs-header">
    <h2>My Jobs</h2>

    <button
        className="back-dashboard-btn"
        onClick={() => navigate("/recruiterDashboard")}
    >
        ← Back to Dashboard
    </button>
</div>
   

        <div className="row g-4">

            {jobs.map(job => (

                <div className="col-lg-6" key={job.id}>

                    <div className="card shadow-sm h-100">

                        <div className="card-body">

                            <h4>{job.title}</h4>
                               <span
                                className={`badge ${
                                    job.status === "ACTIVE"
                                        ? "bg-success"
                                        : "bg-secondary"
                                }`}
                            >
                                {job.status}
                            </span>

                            <p className="text-muted mb-2">
                                📍 {job.location}
                            </p>

                           <h5 className="text-success">
    {job.minSalary != null && job.maxSalary != null ? (
        <>
            ₹{Number(job.minSalary).toLocaleString("en-IN")}
            {" - "}
            ₹{Number(job.maxSalary).toLocaleString("en-IN")}
        </>
    ) : (
        "Salary not disclosed"
    )}
</h5>
                            <p className="text-muted">
                               Posted on {new Date(job.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
})}
                            </p>
                            
<div className="d-flex gap-2 mt-3">

    <button
        className="btn btn-primary"
        onClick={() =>
            navigate(`/recruiter/jobs/${job.id}/applicants`)
        }
    >
        View Applicants
    </button>

    {job.status === "ACTIVE" && (
        <>
            <button
    className="btn btn-warning"
    onClick={() => handleEdit(job.id)}
>
    Edit
</button>

            <button
                className="btn btn-outline-danger"
                onClick={() => handleCloseJob(job.id)}
            >
                Close Job
            </button>
        </>
    )}

    {job.status === "CLOSED" && (
        <button
            className="btn btn-outline-success"
            onClick={() => handleReopenJob(job.id)}
        >
            Reopen Job
        </button>
    )}

</div>

                        </div>

                    </div>

                </div>

            ))}

        </div>

    </div>
);
}

export default RecruiterJobs;