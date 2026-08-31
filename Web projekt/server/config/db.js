import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("./data.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    passwordHash TEXT NOT NULL,
    profilePicture TEXT,
    createdAt TEXT DEFAULT (datetime('now'))
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    title TEXT NOT NULL,
    done INTEGER DEFAULT 0,
    dueDate TEXT,
    createdAt TEXT DEFAULT (datetime('now')),
    FOREIGN KEY(userId) REFERENCES users(id)
  )
`);

console.log("SQLite baza spremna (data.db)");

export default db;