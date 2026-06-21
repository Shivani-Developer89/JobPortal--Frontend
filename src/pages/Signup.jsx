import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../services/authService";

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("CANDIDATE");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {

      const userData = {
        name,
        email,
        password,
        role
      };

      const response = await registerUser(userData);

      console.log(response.data);

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data ||
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">

          <div className="card shadow">
            <div className="card-body">

              <h2 className="text-center mb-4">
                Sign Up
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    Choose Role
                  </label>

                  <select
                    id="role"
                    className="form-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="CANDIDATE">
                      Candidate
                    </option>

                    <option value="RECRUITER">
                      Recruiter
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Create Account
                </button>

              </form>

              <p className="text-center mt-3">
                Already have an account?{" "}
                <Link to="/login">
                  Login
                </Link>
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Signup;