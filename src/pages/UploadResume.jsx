import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { uploadResume } from "../services/ResumeService";

function UploadResume() {
       const navigate = useNavigate(); 
    const [file,setFile] = useState(null);

    const handleUpload = async () => {
        if(!file){
            "Please Select a Resume"
            return;
        }
        try{
            const response = await uploadResume(file);
            alert(response.data);
              navigate("/jobs");
        } catch (error) {

    console.log(error);

    alert(
        error.response?.data?.message ||
        error.response?.data ||
        error.message
    );
}
    };
    
  return (
                  <div className="container mt-5">

            <h2>Upload Resume</h2>

            <input
                type="file"
                accept=".pdf"
                className="form-control mb-3"
                onChange={(e) =>
                    setFile(e.target.files[0])
                }
            />

            <button
                className="btn btn-primary"
                onClick={handleUpload}
            >
                Upload Resume
            </button>

        </div>
    );
}



export default UploadResume;