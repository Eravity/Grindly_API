import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    coinCost: {
      type: Number,
      required: true,
      min: 0
    },

    claimed: {
      type: Boolean,
      default: false
    },

    claimedAt: {
      type: Date,
      default: null
    },

    isActive: {
      type: Boolean,
      default: true
    },

    aiRewardEstimation: {
      type: Number,
      default: null,
      min: 0,
      max: 50
    },

    aiSuggested: {
      type: Boolean,
      default: false
    },

    aiScoringStatus: {
      type: String,
      enum: ['pending', 'done', 'failed'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

const Reward = mongoose.model("Reward", rewardSchema);

export default Reward;
