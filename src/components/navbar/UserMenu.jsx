import { FaBell, FaUserCircle } from "react-icons/fa";

function UserMenu() {

    const name =
        localStorage.getItem("name") || "Candidate";

    return (

        <div className="user-menu">

            <button className="notification-btn">

                <FaBell />

            </button>

            <div className="profile-menu">

                <FaUserCircle />

                <span>{name}</span>

            </div>

        </div>

    );

}

export default UserMenu;