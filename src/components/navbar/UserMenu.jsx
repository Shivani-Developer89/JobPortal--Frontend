import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    FaBell,
    FaUserCircle,
    FaChevronDown,
    FaUser,
    FaFileAlt,
    FaCog,
    FaSignOutAlt,
    FaBriefcase,
    FaHeart
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import { getMyProfile } from "../../services/candidateProfileService";


function UserMenu() {

    const {
        name,
        role,
        logout
    } = useAuth();

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const [profileImage, setProfileImage] = useState(null);


    // -----------------------------------
    // Load candidate profile image
    // -----------------------------------

    useEffect(() => {

        if (role !== "CANDIDATE") {

            setProfileImage(null);

            return;
        }


        const loadProfileImage = async () => {

            try {

                const response =
                    await getMyProfile();


                const imagePath =
                    response.data?.profileImagePath;


                if (imagePath) {

                    const normalizedPath =
                        imagePath.replace(/\\/g, "/");


                    setProfileImage(
                        `http://localhost:81/${normalizedPath}`
                    );

                } else {

                    setProfileImage(null);

                }

            } catch (error) {

                console.error(
                    "Failed to load profile image",
                    error
                );

                setProfileImage(null);

            }

        };


        loadProfileImage();

    }, [role]);


    // -----------------------------------
    // Logout
    // -----------------------------------

    const handleLogout = () => {

        logout();

        setOpen(false);

        navigate("/", {
            replace: true
        });

    };


    return (

        <div className="user-menu">


            {/* ================================
                NOTIFICATION
            ================================= */}

            <button
                type="button"
                className="notification-btn"
            >

                <FaBell />

            </button>


            {/* ================================
                PROFILE
            ================================= */}

            <div
                className="profile-wrapper"
                onClick={() => setOpen(!open)}
            >


                <div className="profile-menu">


                    {/* Profile Image */}

                    <div className="navbar-profile-avatar">

                        {profileImage ? (

                            <img
                                src={profileImage}
                                alt="Profile"
                            />

                        ) : (

                            <FaUserCircle
                                className="profile-icon"
                            />

                        )}

                    </div>


                    {/* Name + Role */}

                    <div className="profile-info">

                        <span className="profile-name">

                            {name || "User"}

                        </span>


                        <span className="profile-role">

                            {role === "CANDIDATE"
                                ? "Candidate"
                                : "Recruiter"}

                        </span>

                    </div>


                    {/* Dropdown Arrow */}

                    <FaChevronDown
                        className="dropdown-icon"
                    />

                </div>


                {/* ================================
                    DROPDOWN
                ================================= */}

                {open && (

                    <div className="profile-dropdown">


                        {/* Dropdown Header */}

                        <div className="dropdown-header">

                            <h4>
                                {name || "User"}
                            </h4>

                            <p>

                                {role === "CANDIDATE"
                                    ? "Candidate"
                                    : "Recruiter"}

                            </p>

                        </div>


                        {/* ============================
                            MY PROFILE
                        ============================= */}

                        <Link
                            to={
                                role === "CANDIDATE"
                                    ? "/candidate/profile"
                                    : "/recruiter/profile"
                            }
                            onClick={() =>
                                setOpen(false)
                            }
                        >

                            <FaUser />

                            My Profile

                        </Link>


                        {/* ============================
                            CANDIDATE OPTIONS
                        ============================= */}

                        {role === "CANDIDATE" && (

                            <>

                                <Link
                                    to="/resume"
                                    onClick={() =>
                                        setOpen(false)
                                    }
                                >

                                    <FaFileAlt />

                                    Resume

                                </Link>


                                <Link
                                    to="/saved-jobs"
                                    onClick={() =>
                                        setOpen(false)
                                    }
                                >

                                    <FaHeart />

                                    Saved Jobs

                                </Link>

                            </>

                        )}


                        {/* ============================
                            RECRUITER OPTIONS
                        ============================= */}

                        {role === "RECRUITER" && (

                            <>

                                <Link
                                    to="/my-jobs"
                                    onClick={() =>
                                        setOpen(false)
                                    }
                                >

                                    <FaBriefcase />

                                    My Jobs

                                </Link>


                                <Link
                                    to="/applicants"
                                    onClick={() =>
                                        setOpen(false)
                                    }
                                >

                                    <FaUser />

                                    Applicants

                                </Link>

                            </>

                        )}


                        {/* ============================
                            SETTINGS
                        ============================= */}

                        <Link
                            to="/settings"
                            onClick={() =>
                                setOpen(false)
                            }
                        >

                            <FaCog />

                            Settings

                        </Link>


                        <hr />


                        {/* ============================
                            LOGOUT
                        ============================= */}

                        <button
                            type="button"
                            onClick={handleLogout}
                        >

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