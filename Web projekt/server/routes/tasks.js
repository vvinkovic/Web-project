import express from "express";
import db from "../config/db.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth);

// GET /api/tasks - svi taskovi prijavljenog korisnika
router.get("/", (req, res) => {
  try {
    const tasks = db
      .prepare("SELECT * FROM tasks WHERE userId = ? ORDER BY createdAt DESC")
      .all(req.userId);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Greška na serveru.", error: err.message });
  }
});

// POST /api/tasks - kreiraj novi task
router.post("/", (req, res) => {
  try {
    const { title } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Naslov taska je obavezan." });
    }

    const result = db
      .prepare("INSERT INTO tasks (userId, title) VALUES (?, ?)")
      .run(req.userId, title);

    const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(result.lastInsertRowid);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Greška na serveru.", error: err.message });
  }
});

// PUT /api/tasks/:id - izmijeni task (npr. done)
router.put("/:id", (req, res) => {
  try {
    const existing = db
      .prepare("SELECT * FROM tasks WHERE id = ? AND userId = ?")
      .get(req.params.id, req.userId);

    if (!existing) {
      return res.status(404).json({ message: "Task nije pronađen." });
    }

    const done = req.body.done !== undefined ? (req.body.done ? 1 : 0) : existing.done;
    const title = req.body.title !== undefined ? req.body.title : existing.title;

    db.prepare("UPDATE tasks SET title = ?, done = ? WHERE id = ?").run(title, done, req.params.id);

    const updated = db.prepare("SELECT * FROM tasks WHERE id = ?").get(req.params.id);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Greška na serveru.", error: err.message });
  }
});

// DELETE /api/tasks/:id
router.delete("/:id", (req, res) => {
  try {
    const existing = db
      .prepare("SELECT * FROM tasks WHERE id = ? AND userId = ?")
      .get(req.params.id, req.userId);

    if (!existing) {
      return res.status(404).json({ message: "Task nije pronađen." });
    }

    db.prepare("DELETE FROM tasks WHERE id = ?").run(req.params.id);
    res.json({ message: "Task obrisan." });
  } catch (err) {
    res.status(500).json({ message: "Greška na serveru.", error: err.message });
  }
});

export default router;