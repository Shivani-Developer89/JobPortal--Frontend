import { useState, useEffect } from "react";
import {getRecruiterDashboard, getRecentApplications, downloadResume} from "../services/ApplicationService";

function RecruiterDashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [recentApplications, setRecentApplications] = useState([]);

    useEffect(() => {
        loadDashboard();
          loadRecentApplications(); 
    }, []);

    const loadDashboard = async () => {
        try {
            const response = await getRecruiterDashboard();
            setDashboard(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const loadRecentApplications = async () => {
    try {
        const response = await getRecentApplications();
        console.log(response.data);

        setRecentApplications(response.data);
    } catch (error) {
        console.error(error);
    }
};

    if (!dashboard) {
        return (
            <div className="container mt-5">
                <h4>Loading...</h4>
            </div>
        );
    }
const handleViewResume = async (applicationId) => {
    try {
        const response = await downloadResume(applicationId);

        const file = new Blob([response.data], {
            type: "application/pdf"
        });

        const fileURL = URL.createObjectURL(file);

        window.open(fileURL, "_blank");
    } catch (error) {
        console.error(error);
    }
};

return (
    <div className="container mt-5">

        <h2 className="mb-2">Recruiter Dashboard</h2>

        <div className="row g-2">

            <div className="col-md-2">
                <div className="card shadow-sm text-center h-100">
                   <div className="card-body py-3">
                       <h6 className="text-muted mb-2">Total Jobs</h6>
                       <h2 className="fw-bold mb-0">{dashboard.totalJobs}</h2>   
                    </div>
                </div>
            </div>

            <div className="col-md-2">
                <div className="card shadow-sm text-center h-100">
                   <div className="card-body py-3">
                       <h6 className="text-muted mb-2">Total Application</h6>
                       <h2 className="fw-bold mb-0">{dashboard.totalApplications}</h2>   
                    </div>
                </div>
            </div>

            <div className="col-md-2">
                <div className="card shadow-sm text-center h-100">
                   <div className="card-body py-3">
                       <h6 className="text-muted mb-2">Shortlisted</h6>
                       <h2 className="fw-bold mb-0">{dashboard.shortlisted}</h2>   
                    </div>
                </div>
            </div>

            <div className="col-md-2">
             <div className="card shadow-sm text-center h-100">
                   <div className="card-body py-3">
                       <h6 className="text-muted mb-2">Hired</h6>
                       <h2 className="fw-bold mb-0">{dashboard.hired}</h2>   
                    </div>
                </div>
            </div>

            <div className="col-md-2">
              <div className="card shadow-sm text-center h-100">
                   <div className="card-body py-3">
                       <h6 className="text-muted mb-2">Rejected</h6>
                       <h2 className="fw-bold mb-0">{dashboard.rejected}</h2>   
                    </div>
                </div>
            </div>

        </div>
        <div className="mt-5">
    <h4 className="mb-3">Recent Applications</h4>

  <div className="row g-3 mt-4">
    

    {recentApplications.map(app => (

        <div className="col-lg-6" key={app.applicationId}>

            <div className="card shadow-sm">

                <div className="card-body py-3">

                    <h5>  💂‍♂️ {app.candidateName}</h5>

                    <p className="text-muted mb-1">
                        {app.candidateEmail}
                    </p>

                    <span className="badge bg-primary">
                        {app.status}
                    </span>

                    <p className="mt-2 mb-2">
                      {new Date(app.appliedAt).toLocaleDateString("en-IN", {
                        day: "numeric",month: "short",year: "numeric"})}
                    </p>
                        <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleViewResume(app.applicationId)}
                        >
                        View Resume
                        </button>

                    <button className="btn btn-outline-primary btn-sm">
                        Manage
                    </button>

                </div>

            </div>

        </div>

    ))}

</div>
</div>

    </div>
    
);
}
export default RecruiterDashboard;