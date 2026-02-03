import express from "express";
import authRoutes from "./routes/auth.js";
import scoreRoutes from "./routes/score.js";

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/scores", scoreRoutes);

app.get("/", (req, res) => {
  res.send("Game Score API is running");
});

app.listen(3000, () =>
  console.log("Server running on port 3000")
);
