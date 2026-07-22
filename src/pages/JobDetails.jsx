import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobById } from "../services/JobService";
import { applyJob } from "../services/ApplicationService";

function JobDetails() {

    const { id } = useParams();

    const [job, setJob] = useState(null);
    const [applied, setApplied] = useState(false);
      

    useEffect(() => {
        loadJob();
    }, []);
const handleApply = async () => {

    try {

        await applyJob(id);

        setApplied(true);

        alert("Application Submitted Successfully");

        
    } catch (error) {

    if (
        error.response?.status === 401 ||
        error.response?.status === 403
    ) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        window.location.href = "/login";
        return;
    }

    if (
        error.response?.status === 400 &&
        error.response?.data?.message === "Already applied"
    ) {
        setApplied(true);
        alert("You have already applied for this job.");
        return;
    }

    alert(
        error.response?.data?.message ||
        "Failed to Apply"
    );
}
};

   const loadJob = async () => {

    try {

        const response = await getJobById(id);

        setJob(response.data);
        setApplied(response.data.applied);

    } 
    catch (error) {

    if (
        error.response?.status === 401 ||
        error.response?.status === 403
    ) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        window.location.href = "/login";
        return;
    }

    console.error(error);
}
};

    if (!job) {

        return <h3>Loading...</h3>;
    }

    return (
        <div className="container mt-5">

        <h2>{job.title}</h2>

<p className="text-muted">
    👤 {job.recruiterName}
</p>

<p>
    📍 {job.location}
</p>

<p>
    💼 {job.jobType}
</p>

<p>
    ⭐ {job.experienceLevel}
</p>

<p>
    💰 ₹ {job.salary}
</p>

<p>
    📅 {new Date(job.createdAt).toLocaleDateString()}
</p>

<hr />

<h4>Job Description</h4>

<p>{job.description}</p>

<button
    onClick={handleApply}
    disabled={applied}
    className="btn btn-success"
>
    {applied ? "Applied" : "Apply Now"}
</button>

        </div>
    );
}

export default JobDetails;