import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  completeTask,
  getTasksByFrequency,
  getTaskStats
} from "../controllers/task.controller.js";

const taskRouter = Router();

// Protected task routes - all require authorization
taskRouter.get("/", authorize, getTasks);
taskRouter.post("/", authorize, createTask);
taskRouter.get("/stats", authorize, getTaskStats);
taskRouter.get("/frequency/:frequency", authorize, getTasksByFrequency);
taskRouter.get("/:id", authorize, getTask);
taskRouter.patch("/:id", authorize, updateTask);
taskRouter.delete("/:id", authorize, deleteTask);
taskRouter.patch("/:id/complete", authorize, completeTask);

export default taskRouter;