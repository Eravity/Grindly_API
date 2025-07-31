import express from "express";
import type { Request, Response } from "express";
import connectDB from "./database/mongodb.ts";
import { PORT } from "./config/env.ts";
import arcjetMiddleware from "./middleware/arcjet.middleware.ts";
import userRouter from "./routes/user.ts";
import authRouter from "./routes/auth.ts";
import errorMiddleware from "./middleware/error.middleware.ts";

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(arcjetMiddleware);

// server.use("/api/v1/auth", authRouter);
server.use("/api/v1/users", userRouter);
server.use("/api/v1/auth", authRouter);

server.use(errorMiddleware)

server.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Grindly API!");
});

const port = PORT || 3000;

server.listen(port, async () => {
  console.log(`Grindly API is running on http://localhost:${port}`);
  try {
    await connectDB();
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
});