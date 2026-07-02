import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { viewApplicants,updateApplicationStatus } from "../services/JobService";
import { downloadResume } from "../services/ApplicationService";


function ViewApplicants() {
    const { jobId } = useParams();

const [applicants, setApplicants] = useState([]);

useEffect(() => {
    loadApplicants();
}, []);
useEffect(() => {
    console.log(applicants);
}, [applicants]);

const loadApplicants = async () => {
    try {
        const response = await viewApplicants(jobId);
       console.log(response.data);
       setApplicants(response.data);
        console.log(applicants);
    } catch (error) {
        console.error(error);
    }
};
const handleStatusChange = async (applicationId, status) => {

    try {

        await updateApplicationStatus(applicationId, status);

        loadApplicants();

    } catch (error) {

        console.error(error);

    }

};
const handleViewResume = async (applicationId) => {
    try {
        const response = await downloadResume(applicationId);

        const file = new Blob([response.data], {
            type: "application/pdf",
        });

        const fileURL = URL.createObjectURL(file);

        window.open(fileURL, "_blank");
    } catch (error) {
        console.error(error);
    }
};

return (
    <div className="container mt-5">

        <h2 className="mb-4">Applicants</h2>

        <div className="row g-3">

            {applicants.map(app => (

                <div className="col-md-6" key={app.applicationId}>

                    <div className="card shadow-sm">

                        <div className="card-body">

                            <h5>{app.candidateName}</h5>

                            <p>{app.candidateEmail}</p>

                         <select
                            className="form-select mt-2"
                            value={app.status}
                            onChange={(e) =>
                                handleStatusChange(
                                    app.applicationId,
                                    e.target.value
                                )
                            }
                        >

                            <option value="APPLIED">Applied</option>
                            <option value="SHORTLISTED">Shortlisted</option>
                            <option value="HIRED">Hired</option>
                            <option value="REJECTED">Rejected</option>

                        </select>

                        </div>
                          <div className="mt-6 d-flex gap-2 p-3">

                        <button
                            className="btn btn-success"
                            onClick={() => handleViewResume(app.applicationId)}
                        >
                            View Resume
                        </button>

                    </div>

                    </div>
           
 </div>
                

            ))}

        </div>

    </div>
);

}
 export default ViewApplicants;

