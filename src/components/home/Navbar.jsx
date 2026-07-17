import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    setIsLoggedIn(!!token);
    setRole(userRole);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">

        <Link className="navbar-brand fw-bold fs-3 text-primary" to="/">
          JobPortal
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">

          <ul className="navbar-nav mx-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/jobs">
                Jobs
              </Link>
            </li>

            {!isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
            )}

            {isLoggedIn && role === "CANDIDATE" && (
              <li className="nav-item">
                <Link className="nav-link" to="/my-applications">
                  My Applications
                </Link>
              </li>
            )}

            {isLoggedIn && role === "RECRUITER" && (
              <li className="nav-item">
                <Link className="nav-link" to="/recruiter-dashboard">
                  Dashboard
                </Link>
              </li>
            )}

          </ul>

          <div className="d-flex">

            {!isLoggedIn ? (
              <>
                <Link
                  className="btn btn-outline-primary me-2"
                  to="/login"
                >
                  Login
                </Link>

                <Link
                  className="btn btn-primary"
                  to="/register"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                className="btn btn-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;