import { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobService";
import { useNavigate } from "react-router-dom";

function Jobs() {

    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        loadJobs();

    }, []);

  const loadJobs = async () => {

    try {

        const response = await getAllJobs();

        console.log(response.data);

        setJobs(response.data.content);

    } catch (error) {

        console.error(error);

    }
};

    return (
        <div className="container mt-5">

            <h2 className="mb-4">Available Jobs</h2>

            {jobs.length === 0 ? (
                <p>No Jobs Available</p>
            ) : (
                jobs.map((job) => (
                    <div
                        key={job.id}
                        className="card mb-3"
                    >
                        <div className="card-body">

                            <h5>{job.title}</h5>

                            <p>{job.description}</p>

                            <p>
                                <strong>Location:</strong>{" "}
                                {job.location}
                            </p>

                            <p>
                                <strong>Salary:</strong>{" "}
                                ₹{job.salary}
                            </p>
                            <button
                         className="btn btn-primary"
                        onClick={() => navigate(`/jobs/${job.id}`)}
                            >
                          View Details
                             </button>

                        </div>
                    </div>
                ))
            )}

        </div>
    );
}

export default Jobs;