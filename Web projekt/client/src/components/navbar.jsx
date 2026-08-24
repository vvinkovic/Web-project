import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">
        Student Tracker
      </Link>

      <div className="navbar-nav ms-auto align-items-lg-center">
        <Link className="nav-link" to="/">
          Home
        </Link>

        {user && (
          <>
            <Link className="nav-link" to="/tasks">
              Tasks
            </Link>
            <Link className="nav-link" to="/profile">
              Profile
            </Link>
          </>
        )}

        {user ? (
          <>
            <span className="nav-link">Bok, {user.username}</span>
            <button className="btn btn-outline-light btn-sm ms-lg-2" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="nav-link" to="/login">
              Login
            </Link>
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}