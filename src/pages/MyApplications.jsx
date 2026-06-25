import { useEffect, useState } from "react";
import {
    getMyApplications,
    withdrawApplication
} from "../services/ApplicationService";

function MyApplications() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {

        try {

            const response =
                await getMyApplications();

            setApplications(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    const handleWithdraw = async (id) => {

        try {

            await withdrawApplication(id);

            alert("Application Withdrawn");

            loadApplications();

        } catch (error) {

            alert(
                error.response?.data ||
                "Withdraw Failed"
            );
        }
    };

    return (
        <div className="container mt-5">

            <h2>My Applications</h2>

            {applications.length === 0 ? (

                <p>No Applications Found</p>

            ) : (

                applications.map((app) => (

                    <div
                        key={app.id}
                        className="card mb-3"
                    >
                        <div className="card-body">

                            <h5>
                                {app.jobTitle}
                            </h5>

                            <p>
                                <strong>Status:</strong>{" "}
                                {app.status}
                            </p>

                            {app.status === "PENDING" && (

                                <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                        handleWithdraw(app.id)
                                    }
                                >
                                    Withdraw
                                </button>

                            )}

                        </div>
                    </div>

                ))
            )}

        </div>
    );
}

export default MyApplications;