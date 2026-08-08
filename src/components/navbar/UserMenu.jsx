import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaBell,
    FaUserCircle,
    FaChevronDown,
    FaUser,
    FaFileAlt,
    FaCog,
    FaSignOutAlt
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

function UserMenu() {

    const { name, role, logout } = useAuth();

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const handleLogout = () => {

        logout();

        navigate("/", { replace: true });

    };

    return (

<div className="user-menu">

    <button className="notification-btn">
        <FaBell />
    </button>

    <div
        className="profile-wrapper"
        onClick={() => setOpen(!open)}
    >

        <div className="profile-menu">

            <FaUserCircle className="profile-icon" />

            <div className="profile-info">
                <span className="profile-name">{name}</span>
                <span className="profile-role">
                    {role === "CANDIDATE" ? "Candidate" : "Recruiter"}
                </span>
            </div>

            <FaChevronDown className="dropdown-icon" />

        </div>


            {open && (

                <div className="profile-dropdown">

                    <div className="dropdown-header">

                        <h4>{name}</h4>

                        <p>
                            {role === "CANDIDATE"
                                ? "Candidate"
                                : "Recruiter"}
                        </p>

                    </div>

                    <Link to="/candidate/profile">
                        <FaUser />
                        My Profile
                    </Link>

                    <Link to="/resume">
                        <FaFileAlt />
                        Resume
                    </Link>

                    <Link to="/settings">
                        <FaCog />
                        Settings
                    </Link>

                    <hr />

                    <button onClick={handleLogout}>
                        <FaSignOutAlt />
                        Logout
                    </button>

                </div>

           )}

    </div>

</div>

    );

}

export default UserMenu;