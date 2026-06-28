import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import UploadResume from "./pages/UploadResume";
import MyApplications from "./pages/MyApplications";
import RecruiterDashboard from "./pages/RecruiterDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route   path="/jobs/:id" element={<JobDetails />}/>
        <Route path="/resume/upload"element={<UploadResume />}/>
      <Route path="/applications"element={<MyApplications />}/>
      <Route path="/recruiterDashboard"element={<RecruiterDashboard />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;



