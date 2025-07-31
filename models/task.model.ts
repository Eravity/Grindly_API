import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },

    description: {
      type: String,
      trim: true,
    },

    dueDate: {
      type: Date,
      default: null,
    },

    frequency: {
      type: String,
      enum: ['once', 'daily', 'weekly', 'monthly'],
      default: 'once'
    },

    completed: {
      type: Boolean,
      default: false,
    },

    xpReward: {
      type: Number,
      default: 5,
      min: 0,
      max: 100
    },

    coinReward: {
      type: Number,
      default: 1,
      min: 0,
      max: 50
    },

    completedAt: {
      type: Date,
      default: null,
    },

    // 🧠 AI fields
    aiXpReward: {
      type: Number,
      default: null,
      min: 0,
      max: 100
    },

    aiCoinReward: {
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

const Task = mongoose.model("Task", taskSchema);
export default Task;
