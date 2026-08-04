import { Link } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";

function NavLogo() {
    return (
        <Link to="/" className="nav-logo">

            <FaBriefcase className="logo-icon" />

            <span>JobPortal</span>

        </Link>
    );
}

export default NavLogo;