import { Router } from "express";
import authorize from "../middleware/auth.middleware.ts";
import {
  getEvents,
  getEventsByMetric,
  createEvent,
  getEventStats
} from "../controllers/eventLog.controller.ts";

const eventLogRouter = Router();

// Protected event log routes - all require authorization
eventLogRouter.get("/", authorize, getEvents);
eventLogRouter.post("/", authorize, createEvent);
eventLogRouter.get("/stats", authorize, getEventStats);
eventLogRouter.get("/metric/:metric", authorize, getEventsByMetric);

export default eventLogRouter;
