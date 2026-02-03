import express from "express";

const router = express.Router();

let scores = [];

router.post("/", (req, res) => {
  const { username, score } = req.body;
  scores.push({ username, score });
  res.json({ message: "Score saved" });
});

router.get("/", (req, res) => {
  res.json(scores.sort((a,b) => b.score - a.score));
});

export default router;
