import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://localhost:5000/api";

export default function Profile() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const res = await fetch(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setProfile(data);
      setUsername(data.username);
      setEmail(data.email);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  async function handleUploadPicture() {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("picture", selectedFile);

    try {
      const res = await fetch(`${API_URL}/profile/picture`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setProfile({ ...profile, profilePicture: data.profilePicture });
      setSelectedFile(null);
      setPreviewUrl(null);
      setMessage("Profilna slika ažurirana.");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleUpdateProfile(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setProfile(data);
      setMessage("Profil ažuriran.");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteAccount() {
    const confirmed = window.confirm(
      "Jesi li sigurna da želiš trajno obrisati svoj račun? Ova radnja se ne može poništiti."
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_URL}/profile`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }

      logout();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <p className="text-center py-5">Učitavanje...</p>;

  return (
    <div className="container py-5" style={{ maxWidth: "500px" }}>
      <h1 className="mb-4">Moj profil</h1>

      {error && <div className="alert alert-danger py-2">{error}</div>}
      {message && <div className="alert alert-success py-2">{message}</div>}

      <div className="text-center mb-4">
        <img
          src={
            previewUrl ||
            (profile?.profilePicture
              ? `http://localhost:5000${profile.profilePicture}`
              : "https://via.placeholder.com/150?text=Bez+slike")
          }
          alt="Profilna slika"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid #495057",
          }}
        />

        <div className="mt-3">
          <input type="file" accept="image/*" onChange={handleFileChange} className="form-control mb-2" />
          {selectedFile && (
            <button className="btn btn-primary btn-sm" onClick={handleUploadPicture}>
              Spremi novu sliku
            </button>
          )}
        </div>
      </div>

      <form onSubmit={handleUpdateProfile} className="mb-5">
        <div className="mb-3">
          <label className="form-label">Korisničko ime</label>
          <input
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100" type="submit">
          Spremi izmjene
        </button>
      </form>

      <div className="border-top pt-4">
        <h5 className="text-danger">Opasna zona</h5>
        <p className="text-muted">Brisanje računa je trajno i ne može se poništiti.</p>
        <button className="btn btn-outline-danger" onClick={handleDeleteAccount}>
          Obriši račun
        </button>
      </div>
    </div>
  );
}