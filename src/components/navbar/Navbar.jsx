import GuestNav from "./GuestNav";
import CandidateNav from "./CandidateNav";
import RecruiterNav from "./RecruiterNav";

import { useAuth } from "../../context/AuthContext";

function Navbar() {

    const { isAuthenticated, role } = useAuth();

    if (!isAuthenticated) {
        return <GuestNav />;
    }

    switch (role) {

        case "CANDIDATE":
            return <CandidateNav />;

        case "RECRUITER":
            return <RecruiterNav />;

        default:
            return <GuestNav />;
    }
}

export default Navbar;