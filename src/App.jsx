import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import UploadResume from "./pages/UploadResume";
import MyApplications from "./pages/MyApplications";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import RecruiterJobs from "./pages/RecruiterJobs";
import ViewApplicants from "./pages/ViewApplicants";
import CandidateProfile from "./pages/CandidateProfile";
import LandingPage from "./pages/LandingPage";
import CandidateDashboard from "./pages/CandidateDashboard";
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";
import RecruiterProfile from "./pages/RecruiterProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route   path="/jobs/:id" element={<JobDetails />}/>
        <Route path="/resume/upload"element={<UploadResume />}/>
      <Route path="/applications"element={<MyApplications />}/>
      <Route path="/candidateDashboard"element={<CandidateDashboard />}/>
      <Route path="/recruiterDashboard"element={<RecruiterDashboard />}/>
      <Route path="/recruiter/jobs" element={<RecruiterJobs />} />
      <Route path="/recruiter/create-job" element={<CreateJob />} />
    <Route path="/recruiter/jobs/edit/:id" element={<EditJob />}/>
      <Route path="/recruiter/jobs/:jobId/applicants"element={<ViewApplicants />}/>
      <Route path="/candidate/profile"element={<CandidateProfile />}/>
      <Route path="/recruiter/profile" element={<RecruiterProfile />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;



