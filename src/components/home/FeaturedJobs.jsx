import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedJobs } from "../../services/jobService";
import JobCard from "./JobCard";

function FeaturedJobs() {

    const [jobs, setJobs] =useState([]);

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {

        try {

            const response = await getFeaturedJobs();

            setJobs(response.data.content);

        } catch (error) {

            console.error(error);

            setJobs([]);
        }
    };

    return (

        <section className="featured-jobs">

            <div className="container">

                <div className="featured-header">

                    <h2>Featured Opportunities</h2>

                    <p>
                        Explore some of the latest openings from top recruiters.
                    </p>

                </div>

                <div className="row g-4">

                    {jobs.map(job => (

                        <div
                            className="col-lg-4 col-md-6"
                            key={job.id}
                        >

                            <JobCard job={job}/>

                        </div>

                    ))}

                </div>

                <div className="text-center mt-5">

                    <Link
                        to="/jobs"
                        className="browse-jobs-btn"
                    >
                        Browse All Jobs →
                    </Link>

                </div>

            </div>

        </section>

    );
}

export default FeaturedJobs;