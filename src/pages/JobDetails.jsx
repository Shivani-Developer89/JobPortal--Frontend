import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobById } from "../services/JobService";
import { applyJob } from "../services/ApplicationService";

function JobDetails() {

    const { id } = useParams();

    const [job, setJob] = useState(null);

    useEffect(() => {
        loadJob();
    }, []);
    const handleApply = async () => {

    try {

        await applyJob(id);

        alert("Application Submitted Successfully");

    } catch (error) {

    alert(
        error.response?.data?.message ||
        error.response?.data ||
        "Failed to Apply"
    );
}
};

    const loadJob = async () => {

        try {

            const response =
                await getJobById(id);

            setJob(response.data);

        } catch (error) {

            console.error(error);

        }
    };

    if (!job) {

        return <h3>Loading...</h3>;
    }

    return (
        <div className="container mt-5">

            <h2>{job.title}</h2>

            <p>{job.description}</p>

            <p>
                <strong>Location:</strong>
                {job.location}
            </p>

            <p>
                <strong>Salary:</strong>
                ₹{job.salary}
            </p>

          <button
          className="btn btn-success"
            onClick={handleApply}
              >
            Apply Now
         </button>

        </div>
    );
}

export default JobDetails;