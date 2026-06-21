
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
function Login() {
  const[email,setEmail] =useState("");
  const[password,setPassword]= useState("");
  const navigate = useNavigate();
  return (
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
                />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
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
    
  );
}

export default Login;
