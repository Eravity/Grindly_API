import express from "express";
import type { Request, Response } from "express";
import connectDB from "./database/mongodb.ts";
import { PORT } from "./config/env.ts";

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Grindly API!");
});

const port = PORT || 3000;

server.listen(port, async () => {
  console.log(`Subscription Tracker API is running on http://localhost:${port}`);
  try {
    await connectDB();
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
});