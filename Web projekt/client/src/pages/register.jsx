import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", background: "#f5f6f8" }}>

      <div className="card p-5 shadow-sm border-0" style={{ width: "400px", borderRadius: "16px" }}>

        <h3 className="text-center mb-4">Register</h3>

        <input className="form-control mb-3" placeholder="Username" />
        <input className="form-control mb-3" placeholder="Email" />
        <input className="form-control mb-3" type="password" placeholder="Password" />

        <button className="btn btn-primary w-100 mb-3">
          Create Account
        </button>

        <p className="text-center mb-0">
          Already have account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>

    </div>
  );
};

export default Register;