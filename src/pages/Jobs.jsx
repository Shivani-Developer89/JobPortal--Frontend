import { useEffect, useState } from "react";

import {
    getAllJobs,
    searchJobs
} from "../services/JobService";

import JobList from "../components/jobs/JobList";
import JobDetailsPanel from "../components/jobs/JobDetailsPanel";

import "../styles/Jobs.css";

import {
    useSearchParams,
    Link
} from "react-router-dom";


function Jobs() {

    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);

    const [searchParams] = useSearchParams();


    /* =========================
       LOAD JOBS
    ========================= */

    useEffect(() => {

        loadJobs();

    }, [searchParams]);


    const loadJobs = async () => {

        try {

            const keyword =
                searchParams.get("keyword") || "";

            const location =
                searchParams.get("location") || "";


            let response;


            /* =========================
               SEARCH
            ========================= */

            if (keyword || location) {

                response = await searchJobs(
                    keyword,
                    location
                );

                const searchedJobs = response.data;

                setJobs(searchedJobs);


                /* =========================
                   SELECTED JOB
                ========================= */

                const selectedId =
                    Number(searchParams.get("selected"));


                if (selectedId) {

                    const selected =
                        searchedJobs.find(
                            job => job.id === selectedId
                        );

                    if (selected) {

                        setSelectedJob(selected);

                        return;
                    }
                }


                if (searchedJobs.length > 0) {

                    setSelectedJob(
                        searchedJobs[0]
                    );

                } else {

                    setSelectedJob(null);

                }

                return;
            }


            /* =========================
               NORMAL JOB LIST
            ========================= */

            response = await getAllJobs();

            const allJobs =
                response.data.content;

            setJobs(allJobs);


            /* =========================
               SELECTED JOB
            ========================= */

            const selectedId =
                Number(searchParams.get("selected"));


            if (selectedId) {

                const selected =
                    allJobs.find(
                        job => job.id === selectedId
                    );

                if (selected) {

                    setSelectedJob(selected);

                    return;
                }
            }


            if (allJobs.length > 0) {

                setSelectedJob(
                    allJobs[0]
                );

            } else {

                setSelectedJob(null);

            }

        } catch (error) {

            console.error(
                "Failed to load jobs:",
                error
            );

            setJobs([]);
            setSelectedJob(null);
        }

    };


    return (

        <>

            <div className="jobs-header">

                <div className="header-left">

                    <h1>
                        Find Your Next Opportunity
                    </h1>

                    <p>
                        Browse available jobs and select one
                        to view complete details.
                    </p>

                </div>


                <Link
                    to="/"
                    className="back-home-btn"
                >
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