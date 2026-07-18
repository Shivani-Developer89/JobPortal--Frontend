import { useNavigate } from "react-router-dom";

function JobCard({ job }) {

    const navigate = useNavigate();

    return (

        <div className="col-lg-4 col-md-6 mb-4">

            <div className="card h-100 shadow-sm">

                <div className="card-body">

                    <h5>{job.title}</h5>

                    <p className="text-muted">

                        {job.recruiterName}

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

                    <h5 className="text-success">

                        ₹ {job.salary}

                    </h5>

                    <button
                        className="btn btn-primary w-100"
                        onClick={() => navigate(`/jobs/${job.id}`)}
                    >
                        View Details
                    </button>

                </div>

            </div>

        </div>

    );
}

export default JobCard;