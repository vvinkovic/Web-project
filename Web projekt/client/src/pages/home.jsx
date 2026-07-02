import React from "react";
import { Link } from "react-router-dom";
import { FaUserPlus, FaTasks, FaChartLine } from "react-icons/fa";

const Home = () => {
  return (
    <div style={{ backgroundColor: "#f5f6f8", minHeight: "100vh" }}>

      {/* HERO */}
      <div
        className="d-flex flex-column justify-content-center align-items-center text-center text-white position-relative"
        style={{
          height: "70vh",
          backgroundImage:
            "url('https://productivity95.com/wp-content/uploads/2023/07/10-Best-Laptops-for-Taking-Notes.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        />

        {/* content */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 className="fw-bold">Student Tracker</h1>
          <p className="lead">Organize your study life easily</p>

          <div className="mt-3">
            <Link to="/login" className="btn btn-primary me-2">
              Get Started
            </Link>
            <Link to="/register" className="btn btn-outline-light">
              Register
            </Link>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="container py-5 text-center">

        <h2 className="fw-bold mb-2">Why Student Tracker?</h2>
        <p className="text-muted mb-5">
          Everything you need to stay productive
        </p>

        <div className="row">

          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm p-4 h-100"
              style={{ borderRadius: "16px" }}
            >
              <FaTasks size={45} color="#495057" className="mb-3" />
              <h5>Manage Tasks</h5>
              <p className="text-muted mb-0">
                Create and organize your assignments easily.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm p-4 h-100"
              style={{ borderRadius: "16px" }}
            >
              <FaUserPlus size={45} color="#495057" className="mb-3" />
              <h5>Create Account</h5>
              <p className="text-muted mb-0">
                Sign up in seconds and start tracking tasks.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm p-4 h-100"
              style={{ borderRadius: "16px" }}
            >
              <FaChartLine size={45} color="#495057" className="mb-3" />
              <h5>Track Progress</h5>
              <p className="text-muted mb-0">
                See your productivity improve over time.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="container py-5 text-center">

        <h2 className="fw-bold mb-2">How it works</h2>
        <p className="text-muted mb-5">Simple steps to get started</p>

        <div className="row">

          <div className="col-md-4 mb-4">
            <div className="p-4">
              <h5>1. Create account</h5>
              <p className="text-muted">
                Sign up in seconds and get started.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="p-4">
              <h5>2. Add tasks</h5>
              <p className="text-muted">
                Create and manage your study tasks.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="p-4">
              <h5>3. Stay organized</h5>
              <p className="text-muted">
                Track everything in one place.
              </p>
            </div>
          </div>

        </div>
      </div>


      {/* STATS */}
      <div style={{ backgroundColor: "#fff" }} className="py-5">

        <div className="container text-center">

          <div className="row">

            <div className="col-md-4 mb-3">
              <h2 className="fw-bold">500+</h2>
              <p className="text-muted">Tasks created</p>
            </div>

            <div className="col-md-4 mb-3">
              <h2 className="fw-bold">120+</h2>
              <p className="text-muted">Active students</p>
            </div>

            <div className="col-md-4 mb-3">
              <h2 className="fw-bold">99%</h2>
              <p className="text-muted">Productivity boost</p>
            </div>

          </div>

        </div>
      </div>





      {/* CTA */}
      <div className="container py-5 text-center">

        <h2 className="fw-bold">Ready to get organized?</h2>
        <p className="text-muted">Start using Student Tracker today</p>

        <Link to="/login" className="btn btn-primary me-2">
          Get Started
        </Link>

        <Link to="/register" className="btn btn-outline-primary">
          Create Account
        </Link>

      </div>

    </div>
  );
};

export default Home;