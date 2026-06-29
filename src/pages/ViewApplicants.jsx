import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { viewApplicants } from "../services/JobService";


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

                            <span className="badge bg-primary">
                                {app.status}
                            </span>

                        </div>

                    </div>

                </div>

            ))}

        </div>

    </div>
);

}
 export default ViewApplicants;

