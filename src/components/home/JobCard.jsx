import { useNavigate } from "react-router-dom";
import "../../styles/JobCard.css";
import {
  FaRegStar,
  FaMapMarkerAlt,
  FaClock
} from "react-icons/fa";

import { FaShareNodes } from "react-icons/fa6";

//import ShareIcon from "@mui/icons-material/Share";
function JobCard({ job }) {

    const navigate = useNavigate();

return (
<div className="job-card">

    {/* Header */}
   <div className="job-card-header">

    <div className="job-info">

        <div className="job-title-row">
            <h5 className="job-title">{job.title}</h5>

            <div className="job-actions">
                <button className="icon-btn">
                    <FaRegStar />
                </button>

                <button className="icon-btn">
                    <FaShareNodes />
                </button>
            </div>
        </div>

        <p className="company-name">{job.companyName}</p>

        <div className="job-location">
            <FaMapMarkerAlt className="location-icon" />
            <span>{job.location}</span>
        </div>

    </div>

</div>

    {/* Chips */}
  <div className="job-chips">
    <span className="chip">{job.jobType}</span>
    <span className="chip">{job.experience}</span>
    <span className="chip">{job.salary}</span>
</div>

    {/* Description */}
  <div className="job-description">
    <p>{job.description}</p>
</div>


    {/* Footer */}
<div className="job-footer">

    <div className="posted-date">
        <FaClock />
        <span>Posted 2 days ago</span>
    </div>

    <button
        className="view-details-btn"
        onClick={() => navigate(`/jobs/${job.id}`)}
    >
        View Details →
    </button>

</div>

</div>
);
}

export default JobCard;