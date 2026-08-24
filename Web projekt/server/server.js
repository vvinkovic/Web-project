import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";
import quoteRoutes from "./routes/quote.js";
import profileRoutes from "./routes/profile.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/quote", quoteRoutes);
app.use("/api/profile", profileRoutes);

app.get("/", (req, res) => {
  res.send("Student Tracker API radi.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server sluša na portu ${PORT}`));