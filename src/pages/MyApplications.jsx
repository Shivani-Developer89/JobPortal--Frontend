import { useEffect, useState } from "react";
import {getMyApplications,withdrawApplication} from "../services/ApplicationService";

function MyApplications() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        loadApplications();
    }, []);
    const getBadgeClass = (status) => {
    switch (status) {
        case "APPLIED":
            return "bg-primary";

        case "SHORTLISTED":
            return "bg-warning text-dark";

        case "REJECTED":
            return "bg-danger";

        case "SELECTED":
            return "bg-success";

        case "WITHDRAWN":
            return "bg-secondary";

        default:
            return "bg-dark";
    }
};

    const loadApplications = async () => {

        try {

            const response =
                await getMyApplications();

            setApplications(response.data);

        } catch (error) {

            console.error(error);
        }
    };

   const handleWithdraw = async (applicationId) => {

    const confirmWithdraw = window.confirm(
        "Are you sure you want to withdraw this application?"
    );

    if (!confirmWithdraw) return;

    try {

        await withdrawApplication(applicationId);

        alert("Application withdrawn successfully.");

        loadApplications();

    } catch (error) {

        alert(
            error.response?.data ||
            error.message
        );
    }
};

   return (
    <div className="container mt-5">

        <h2 className="mb-4">My Applications</h2>

        {applications.map((app) => (

            <div
                key={app.id}
                className="card mb-3 shadow-sm"
            >
                <div className="card-body d-flex justify-content-between align-items-center">

                    <div>

                        <h5>{app.jobTitle}</h5>

                        <p className="mb-1">
                            <strong>Status:</strong>{" "}
                            <span className={`badge ${getBadgeClass(app.status)}`}>
                                {app.status}
                            </span>
                        </p>

                        <p className="text-muted">
                            Applied on{" "}
                            {new Date(app.appliedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
})}
                        </p>

                    </div>

                    {app.status === "APPLIED" && (

                        <button
                            className="btn btn-outline-danger"
                            onClick={() => handleWithdraw(app.id)}
                        >
                            Withdraw
                        </button>

                    )}

                </div>
            </div>

        ))}

    </div>
);
}

export default MyApplications;