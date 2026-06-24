
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">
        Student Tracker
      </Link>

      <div className="navbar-nav ms-auto">
        <Link className="nav-link" to="/">
          Home
        </Link>

        <Link className="nav-link" to="/tasks">
          Tasks
        </Link>

        <Link className="nav-link" to="/login">
          Login
        </Link>

        <Link className="nav-link" to="/register">
          Register
        </Link>
      </div>
    </nav>
  );
}