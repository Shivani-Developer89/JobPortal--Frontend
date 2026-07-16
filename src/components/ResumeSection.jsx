import {
    uploadResume,
    downloadResume
} from "../services/ResumeService";

function ResumeSection({
    resume,
    setResume
}) {
     console.log("Resume selected");
   const handleResumeChange = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
        alert("Only PDF files are allowed.");
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        alert("Maximum file size is 5 MB.");
        return;
    }

    try {

        await uploadResume(file);

        setResume({
            file,
            uploadedAt: new Date().toLocaleDateString("en-GB")
        });

        alert("Resume uploaded successfully.");

    } catch (error) {

        console.error(error);

        alert("Resume upload failed.");

    }
};

    return (

        <div className="card shadow-sm mb-4">

            <div className="card-header">
                <h5 className="mb-0">
                    Resume
                </h5>
            </div>

            <div className="card-body">

                {

                    resume === null ?

                    (

                        <div className="text-center py-4">

                            <i className="bi bi-file-earmark-pdf-fill text-danger display-4"></i>

                            <h5 className="mt-3">
                                No Resume Uploaded
                            </h5>

                            <p className="text-muted">
                                Upload your latest resume (PDF only).
                            </p>

                            <label className="btn btn-primary">

                                <i className="bi bi-upload me-2"></i>

                                Upload Resume

                                <input
                                    type="file"
                                    accept=".pdf"
                                    hidden
                                    onChange={handleResumeChange}
                                />

                            </label>

                            <p className="text-muted small mt-3 mb-0">
                                Maximum File Size : 5 MB
                            </p>

                        </div>

                    )

                    :

                    (

                        <>

                            <div className="d-flex align-items-center">

                                <i className="bi bi-file-earmark-pdf-fill text-danger display-6 me-3"></i>

                                <div>

                                    <h5 className="mb-1">
                                      {resume.file?.name || resume.fileName}
                                    </h5>

                                    <small className="text-muted d-block">
                                        {
                                        resume.file
                                            ? `PDF • ${(resume.file.size / 1024 / 1024).toFixed(2)} MB`
                                            : "PDF"
                                    }
                                    </small>

                                    <small className="text-muted">
                                        Uploaded :{" "}
                                        {resume.uploadedAt}
                                    </small>

                                </div>

                            </div>

                            <hr />

                            <div className="d-flex gap-2">

                                <button
                                    className="btn btn-outline-primary"
                                    type="button"
                                    onClick={async () => {

                                        if (resume.file) {

                                            window.open(
                                                URL.createObjectURL(resume.file),
                                                "_blank"
                                            );

                                        } else {

                                       const response = await downloadResume();

const blob = new Blob([response.data], {
    type: "application/pdf"
});

const url = URL.createObjectURL(blob);

window.open(url, "_blank");

                                        }

                                    }}
                                >
                                    <i className="bi bi-eye me-2"></i>
                                    View
                                </button>

                                <label className="btn btn-secondary mb-0">

                                    <i className="bi bi-upload me-2"></i>

                                    Replace

                                    <input
                                        type="file"
                                        accept=".pdf"
                                        hidden
                                        onChange={handleResumeChange}
                                    />

                                </label>

                                <button
                                    className="btn btn-outline-danger"
                                    type="button"
                                    onClick={() => setResume(null)}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>

                            </div>

                        </>

                    )

                }

            </div>

        </div>

    );

}

export default ResumeSection;