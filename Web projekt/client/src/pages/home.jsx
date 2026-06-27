import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>

      {/* HERO SECTION */}
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
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        ></div>

        {/* content */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 className="fw-bold">Student Tracker</h1>
          <p className="lead">Organize your study life easily</p>

          <div>
            <Link to="/login" className="btn btn-primary me-2">
              Get Started
            </Link>
            <Link to="/register" className="btn btn-outline-light">
              Register
            </Link>
          </div>
        </div>
      </div>

      
      {/* FEATURES SECTION */}
      <div className="container my-5">

        <div className="text-center mb-4">
          <h2>Why use Student Tracker?</h2>
          <p className="text-muted">
            Everything you need to stay organized
          </p>
        </div>

        <div className="row">

          <div className="col-md-4 mb-3">
            <div className="card p-4 shadow-sm h-100 text-center">
              <h5>📚 Manage Tasks</h5>
              <p>Organize all your assignments easily.</p>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card p-4 shadow-sm h-100 text-center">
              <h5>📅 Track Deadlines</h5>
              <p>Never miss important due dates.</p>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card p-4 shadow-sm h-100 text-center">
              <h5>🎯 Stay Organized</h5>
              <p>Keep everything under control.</p>
            </div>
          </div>

        </div>

        </div>
      </div>

    
  );
};

export default Home;