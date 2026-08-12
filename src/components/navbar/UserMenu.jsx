import { useEffect, useState } from "react";
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
import { getMyProfile } from "../../services/candidateProfileService";

function UserMenu() {

    const { name, role, logout } = useAuth();

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {

        if (role !== "CANDIDATE") {
            return;
        }

        const loadProfileImage = async () => {

            try {

                const response = await getMyProfile();

                const imagePath = response.data?.profileImagePath;

                if (imagePath) {

                    const normalizedPath =
                        imagePath.replace(/\\/g, "/");

                    setProfileImage(
                        `http://localhost:81/${normalizedPath}`
                    );

                }

            } catch (error) {

                console.error(
                    "Failed to load profile image",
                    error
                );

            }

        };

        loadProfileImage();

    }, [role]);


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

                    <div className="navbar-profile-avatar">

                        {profileImage ? (

                            <img
                                src={profileImage}
                                alt="Profile"
                            />

                        ) : (

                            <FaUserCircle className="profile-icon" />

                        )}

                    </div>


                    <div className="profile-info">

                        <span className="profile-name">
                            {name}
                        </span>

                        <span className="profile-role">
                            {role === "CANDIDATE"
                                ? "Candidate"
                                : "Recruiter"}
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