import express from "express";
import { getScores, addScore } from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, score } = req.body;

  if (typeof username !== 'string' || typeof score !== 'number') {
    return res.status(400).json({ message: 'Invalid payload' });
  }

  await addScore({ username, score, createdAt: new Date().toISOString() });
  res.json({ message: "Score saved" });
});

router.get("/", async (req, res) => {
  const scores = await getScores();
  res.json(scores.sort((a,b) => b.score - a.score));
});

export default router;
