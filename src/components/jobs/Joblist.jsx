import JobListItem from "./JobListItem";

function JobList({
    jobs,
    selectedJob,
    onSelect
}) {

    return (

        <div className="job-list">

            {jobs.map(job => (

                <JobListItem
                    key={job.id}
                    job={job}
                    selected={selectedJob?.id === job.id}
                    onClick={() => onSelect(job)}
                />

            ))}

        </div>

    );

}

export default JobList;