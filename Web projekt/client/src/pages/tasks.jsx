import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_URL = "https://backed-tty7.onrender.com/api";

export default function Tasks() {
  const [task, setTask] = useState("");
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
        body: JSON.stringify({ title: task }),
      });
      const newTask = await res.json();
      if (!res.ok) throw new Error(newTask.message);

      setTasks([newTask, ...tasks]);
      setTask("");
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

  return (
    <div className="container py-5" style={{ maxWidth: "600px" }}>
      <h1 className="mb-4">My tasks</h1>

      {error && <div className="alert alert-danger py-2">{error}</div>}

      <div className="d-flex mb-4">
        <input
          className="form-control me-2"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Enter task"
        />
        <button className="btn btn-primary" onClick={addTask}>
          Add
        </button>
      </div>

      {loading ? (
        <p className="text-muted">Loading...</p>
      ) : tasks.length === 0 ? (
        <p className="text-muted">You don't have any tasks yet</p>
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