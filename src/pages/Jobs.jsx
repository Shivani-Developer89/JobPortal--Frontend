import { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobService";

function Jobs() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {

        loadJobs();

    }, []);

    const loadJobs = async () => {

        try {

            const response = await getAllJobs();

            setJobs(response.data);

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

                        </div>
                    </div>
                ))
            )}

        </div>
    );
}

export default Jobs;