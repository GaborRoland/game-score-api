import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import scoreRoutes from "./routes/score.js";
import dotenv from "dotenv";
import path from 'path';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('public')));

app.use("/api/auth", authRoutes);
app.use("/api/scores", scoreRoutes);

app.get("/", (req, res) => {
  res.send("Game Score API is running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

