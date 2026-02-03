import fs from "fs/promises";
import path from "path";

const dbDir = path.resolve("data");
const dbFile = path.join(dbDir, "db.json");

async function ensureDb() {
  try {
    await fs.mkdir(dbDir, { recursive: true });
    await fs.access(dbFile);
  } catch (err) {
    // Create the DB file with an empty array if it doesn't exist
    await fs.writeFile(dbFile, JSON.stringify([], null, 2), "utf8");
  }
}

export async function getScores() {
  await ensureDb();
  const content = await fs.readFile(dbFile, "utf8");
  try {
    return JSON.parse(content);
  } catch (e) {
    // If file is corrupted, reset it
    await fs.writeFile(dbFile, JSON.stringify([], null, 2), "utf8");
    return [];
  }
}

export async function addScore(entry) {
  const scores = await getScores();
  scores.push(entry);
  await fs.writeFile(dbFile, JSON.stringify(scores, null, 2), "utf8");
  return entry;
}

export async function clearScores() {
  await fs.writeFile(dbFile, JSON.stringify([], null, 2), "utf8");
}
