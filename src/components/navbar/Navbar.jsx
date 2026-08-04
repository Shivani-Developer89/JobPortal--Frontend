import GuestNav from "./GuestNav";
import CandidateNav from "./CandidateNav";
import RecruiterNav from "./RecruiterNav";

function Navbar() {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        return <GuestNav />;
    }

    if (role === "CANDIDATE") {
        return <CandidateNav />;
    }

    if (role === "RECRUITER") {
        return <RecruiterNav />;
    }

    return <GuestNav />;
}

export default Navbar;