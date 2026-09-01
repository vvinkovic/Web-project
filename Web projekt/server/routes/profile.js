import express from "express";
import multer from "multer";
import path from "path";
import bcrypt from "bcryptjs";
import db from "../config/db.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// Konfiguracija za spremanje uploadanih slika
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${req.userId}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
  fileFilter: (req, file, cb) => {
    const allowed = [".jpg", ".jpeg", ".png", ".webp"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) cb(null, true);
    else cb(new Error("Only jpg, png, and webp files are allowed."));
  },
});

router.use(requireAuth);

// GET /api/profile - dohvati podatke o prijavljenom korisniku
router.get("/", (req, res) => {
  const user = db
    .prepare("SELECT id, username, email, profilePicture FROM users WHERE id = ?")
    .get(req.userId);

  if (!user) return res.status(404).json({ message: "User not found." });

  res.json(user);
});

// PUT /api/profile - ažuriraj username/email
router.put("/", (req, res) => {
  try {
    const { username, email } = req.body;
    const existing = db.prepare("SELECT * FROM users WHERE id = ?").get(req.userId);

    if (!existing) return res.status(404).json({ message: "User not found." });

    const newUsername = username || existing.username;
    const newEmail = email || existing.email;

    db.prepare("UPDATE users SET username = ?, email = ? WHERE id = ?").run(
      newUsername,
      newEmail,
      req.userId
    );

    const updated = db
      .prepare("SELECT id, username, email, profilePicture FROM users WHERE id = ?")
      .get(req.userId);

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Greška na serveru.", error: err.message });
  }
});

// POST /api/profile/picture - upload profilne slike
router.post("/picture", upload.single("picture"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Picture is required." });
  }

  const picturePath = `/uploads/${req.file.filename}`;

  db.prepare("UPDATE users SET profilePicture = ? WHERE id = ?").run(picturePath, req.userId);

  res.json({ profilePicture: picturePath });
});

// DELETE /api/profile - obriši korisnički račun
router.delete("/", (req, res) => {
  db.prepare("DELETE FROM tasks WHERE userId = ?").run(req.userId);
  db.prepare("DELETE FROM users WHERE id = ?").run(req.userId);
  res.json({ message: "Account deleted." });
});

export default router;