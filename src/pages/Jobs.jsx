import { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobService";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/home/JobCard";

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

    }catch (error) {

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

 return (
    <div className="container mt-5">

        <h2 className="mb-4">Available Jobs</h2>

        {jobs.length === 0 ? (
            <p>No Jobs Available</p>
        ) : (
            jobs.map((job) => (
                <JobCard
                    key={job.id}
                    job={job}
                />
            ))
        )}

    </div>
);
}

export default Jobs;