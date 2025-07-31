import { Router } from "express";
import authorize from "../middleware/auth.middleware.ts";
import {
  getRewards,
  getReward,
  createReward,
  updateReward,
  deleteReward,
  claimReward,
  getAvailableRewards,
  getClaimedRewards
} from "../controllers/reward.controller.ts";

const rewardRouter = Router();

// Protected reward routes - all require authorization
rewardRouter.get("/", authorize, getRewards);
rewardRouter.post("/", authorize, createReward);
rewardRouter.get("/available", authorize, getAvailableRewards);
rewardRouter.get("/claimed", authorize, getClaimedRewards);
rewardRouter.get("/:id", authorize, getReward);
rewardRouter.patch("/:id", authorize, updateReward);
rewardRouter.delete("/:id", authorize, deleteReward);
rewardRouter.patch("/:id/claim", authorize, claimReward);

export default rewardRouter;
