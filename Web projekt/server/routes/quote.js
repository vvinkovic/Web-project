import express from "express";

const router = express.Router();

// GET /api/quote - dohvati citat dana s vanjskog API-ja
router.get("/", async (req, res) => {
  try {
    const response = await fetch("https://zenquotes.io/api/today");
    const data = await response.json();

    const quote = data[0];

    res.json({
      text: quote.q,
      author: quote.a,
    });
  } catch (err) {
    res.status(500).json({ message: "Nije moguće dohvatiti citat.", error: err.message });
  }
});

export default router;