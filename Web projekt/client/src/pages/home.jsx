import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Student Tracker</h1>
      <p>Organiziraj svoje zadatke jednostavno i brzo.</p>

      <div style={{ marginTop: "20px" }}>
        <Link to="/login">
          <button>Login proba</button>
        </Link>

        <Link to="/register">
          <button style={{ marginLeft: "10px" }}>Register</button>
        </Link>
      </div>
    </div>
  );
}
