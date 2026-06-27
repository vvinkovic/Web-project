import React from "react";

const Register = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "300px" }}>
        <h3 className="text-center mb-3">Register</h3>

        <input className="form-control mb-2" placeholder="Name" />
        <input className="form-control mb-2" placeholder="Email" />
        <input className="form-control mb-3" placeholder="Password" type="password" />

        <button className="btn btn-success w-100">Register</button>
      </div>
    </div>
  );
};

export default Register;