import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_URL = "https://backed-tty7.onrender.com/api";

export default function Tasks() {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { token } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function addTask() {
    if (task.trim() === "") return;

    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: task, dueDate: dueDate || null }),
      });
      const newTask = await res.json();
      if (!res.ok) throw new Error(newTask.message);

      setTasks([newTask, ...tasks]);
      setTask("");
      setDueDate("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function toggleDone(t) {
    try {
      const res = await fetch(`${API_URL}/tasks/${t.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ done: !t.done }),
      });
      const updated = await res.json();
      if (!res.ok) throw new Error(updated.message);

      setTasks(tasks.map((x) => (x.id === updated.id ? updated : x)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteTask(id) {
    try {
      const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }

      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  function isOverdue(t) {
    if (!t.dueDate || t.done) return false;
    return new Date(t.dueDate) < new Date(new Date().toDateString());
  }

  const totalCount = tasks.length;
  const doneCount = tasks.filter((t) => t.done).length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);

  return (
    <div className="container py-5" style={{ maxWidth: "600px" }}>
      <h1 className="mb-4">Moji zadaci</h1>

      {error && <div className="alert alert-danger py-2">{error}</div>}

      {totalCount > 0 && (
        <div className="mb-4">
          <div className="d-flex justify-content-between mb-1">
            <span className="text-muted">Napredak</span>
            <span className="text-muted">
              {doneCount}/{totalCount} riješeno ({progressPercent}%)
            </span>
          </div>
          <div className="progress" style={{ height: "10px" }}>
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      <div className="row g-2 mb-4">
        <div className="col-12 col-sm-6">
          <input
            className="form-control"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Unesi zadatak"
          />
        </div>
        <div className="col-8 col-sm-4">
          <input
            type="date"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="col-4 col-sm-2">
          <button className="btn btn-primary w-100" onClick={addTask}>
            Dodaj
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-muted">Učitavanje...</p>
      ) : tasks.length === 0 ? (
        <p className="text-muted">Nemaš još niti jedan zadatak.</p>
      ) : (
        <ul className="list-group">
          {tasks.map((t) => (
            <li
              key={t.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={!!t.done}
                  onChange={() => toggleDone(t)}
                />
                <span
                  className="form-check-label"
                  style={{ textDecoration: t.done ? "line-through" : "none" }}
                >
                  {t.title}
                </span>
                {t.dueDate && (
                  <span
                    className={`badge ms-2 ${isOverdue(t) ? "bg-danger" : "bg-secondary"}`}
                  >
                    {isOverdue(t) ? "Kasni: " : "Rok: "}
                    {t.dueDate}
                  </span>
                )}
              </div>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => deleteTask(t.id)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}