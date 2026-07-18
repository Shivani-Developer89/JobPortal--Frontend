import { useEffect, useState } from "react";
import { getFeaturedJobs } from "../../services/jobService";
import JobCard from "./JobCard";

function FeaturedJobs() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {

        try {

            const response = await getFeaturedJobs();

            setJobs(response.data.content);

        } catch (error) {

            console.error(error);

        }
    };

    return (

        <section className="featured-jobs">

            <div className="container">

                <h2 className="text-center mb-5">
                    Featured Jobs
                </h2>

                <div className="row">

                    {jobs.map(job => (

                        <JobCard
                            key={job.id}
                            job={job}
                        />

                    ))}

                </div>

            </div>

        </section>

    );
}

export default FeaturedJobs;