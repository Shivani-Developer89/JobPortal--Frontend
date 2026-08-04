import { Link } from "react-router-dom";

import {
    FaMapMarkerAlt,
    FaBriefcase,
    FaUserTie,
    FaRupeeSign,
    FaClock
} from "react-icons/fa";


import "../../styles/JobCard.css";

function JobCard({ job }) {

    const salary = () => {

        if (
            job.minSalary != null &&
            job.maxSalary != null
        ) {

            return `₹${Number(job.minSalary).toLocaleString("en-IN")} - ₹${Number(job.maxSalary).toLocaleString("en-IN")}`;
        }

        return "Salary not disclosed";
    };

    return (

        <div className="job-card">

            <h3>{job.title}</h3>

            <p className="company-name">

                {job.companyName || "Company"}

            </p>

            <div className="job-meta">

                <span>

                    <FaMapMarkerAlt />

                    {job.location}

                </span>

                <span>

                    <FaBriefcase />

                    {job.jobType?.replaceAll("_"," ")}

                </span>

                <span>

                    <FaUserTie />

                    {job.experienceLevel?.replaceAll("_"," ")}

                </span>

            </div>

            <div className="job-salary">

                <FaRupeeSign />

                {salary()}

            </div>

          

            <div className="job-footer">

                <span>

                    <FaClock />

                    {" "}
                    Posted{" "}
                    {new Date(job.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                            day:"2-digit",
                            month:"short",
                            year:"numeric"
                        }
                    )}

                </span>

           <Link
    to={`/jobs?selected=${job.id}`}
    className="view-details"
>
    View Details →
</Link>

            </div>

        </div>

    );
}

export default JobCard;