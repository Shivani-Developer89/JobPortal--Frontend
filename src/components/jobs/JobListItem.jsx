import "../../styles/JobListItem.css";

import {
    FaMapMarkerAlt,
    FaBriefcase,
    FaRupeeSign,
    FaClock
} from "react-icons/fa";


function JobListItem({
    job,
    selected,
    onClick
}) {

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

        <div
            className={`job-list-item ${selected ? "selected" : ""}`}
            onClick={onClick}
        >

            <h3>{job.title}</h3>

            <p className="company">
                {job.companyName || "Company"}
            </p>

            <div className="job-meta">

    <span>
        <FaMapMarkerAlt />
        {job.location}
    </span>

    <span>
        <FaBriefcase />
        {job.jobType?.replaceAll("_", " ")}
    </span>

</div>

            <div className="salary">

                <FaRupeeSign />

                {salary()}

            </div>

           <div className="job-extra">

    <span>
        🏢 {job.workMode?.replaceAll("_", " ")}
    </span>

    <span>
        ⭐ {job.experienceLevel?.replaceAll("_", " ")}
    </span>

</div>

            <div className="posted">

                <FaClock />

                Posted{" "}
                {new Date(job.createdAt).toLocaleDateString(
                    "en-IN",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    }
                )}

            </div>

        </div>

    );
}

export default JobListItem;