import React from "react";

const Login = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "300px" }}>
        <h3 className="text-center mb-3">Login</h3>

        <input className="form-control mb-2" placeholder="Email" />
        <input className="form-control mb-3" placeholder="Password" type="password" />

        <button className="btn btn-primary w-100">Login</button>
      </div>
    </div>
  );
};

export default Login;