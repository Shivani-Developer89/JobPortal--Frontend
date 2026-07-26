import { useEffect, useState } from "react";
import { getMyJobs } from "../services/jobService";
import { useNavigate } from "react-router-dom";

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

    return (
    <div className="container mt-5">

        <h2 className="mb-4">My Jobs</h2>
   

        <div className="row g-4">

            {jobs.map(job => (

                <div className="col-lg-6" key={job.id}>

                    <div className="card shadow-sm h-100">

                        <div className="card-body">

                            <h4>{job.title}</h4>

                            <p className="text-muted mb-2">
                                📍 {job.location}
                            </p>

                            <h5 className="text-success">
                                ₹ {job.salary}
                            </h5>

                            <p className="text-muted">
                                Posted on {new Date(job.createdAt).toLocaleDateString()}
                            </p>
                            

                            <div className="d-flex gap-2">
                               

                         <button
                        className="btn btn-primary btn-sm"
                        onClick={() => navigate(`/recruiter/jobs/${job.id}/applicants`)}
                          >
                        View Applicants
                    </button>

                                <button className="btn btn-warning btn-sm">
                                    Edit
                                </button>

                                <button className="btn btn-danger btn-sm">
                                    Delete
                                </button>

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