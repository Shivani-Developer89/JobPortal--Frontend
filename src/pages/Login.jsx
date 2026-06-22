
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/AuthService";
function Login() {
  const[email,setEmail] =useState("");
  const[password,setPassword]= useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
        alert("Email and Password are required");
        return;
    }

    try {

        const response = await loginUser({
            email,
            password
        });

        localStorage.setItem(
            "token",
            response.data.token
        );

        alert("Login Successful");

       navigate("/jobs");

    } catch (error) {

        console.error(error);

        alert(
            error.response?.data ||
            error.response?.data?.message ||
            "Invalid Credentials"
        );
    }
};
  return (
    <form onSubmit={handleSubmit}>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">

          <div className="card shadow">
            <div className="card-body">

              <h2 className="text-center mb-4">
                Login
              </h2>

              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                     value={email}
                   onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                     value={password}
                   onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button className="btn btn-primary w-100">
                Login
              </button>
                      <p className="text-center mt-3">
  Don't have an account?{" "}
  <Link to="/signup">
    Sign Up
  </Link>
</p>
            </div>
          </div>

        </div>
      </div>

    </div>
    </form>
  );
}

export default Login;
