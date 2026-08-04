import { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobService";

import JobList from "../components/jobs/JobList";
import JobDetailsPanel from "../components/jobs/JobDetailsPanel";

import "../styles/Jobs.css";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchParams] = useSearchParams();

useEffect(() => {
    loadJobs();
}, [searchParams]);

  const loadJobs = async () => {
    const response = await getAllJobs();
    const allJobs = response.data.content;

    setJobs(allJobs);

const selectedId = Number(searchParams.get("selected"));

if (selectedId) {

    const selected = allJobs.find(
        job => job.id === selectedId
    );

    if (selected) {
        setSelectedJob(selected);
        return;
    }
}

if (allJobs.length > 0) {
    setSelectedJob(allJobs[0]);
}
  };

  return (
    <>
    <div className="jobs-header">

    <div className="header-left">
        <h1>Find Your Next Opportunity</h1>

        <p>
            Browse available jobs and select one to view complete details.
        </p>
    </div>

    <Link to="/" className="back-home-btn">
        ← Home
    </Link>

</div>
    
<div className="jobs-page">

            <JobList
                jobs={jobs}
                selectedJob={selectedJob}
                onSelect={setSelectedJob}
            />

            <JobDetailsPanel
                job={selectedJob}
            />

        </div>
    </>
);
}

export default Jobs;