import mongoose from "mongoose";

const userStatEventSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    metric: {
      type: String,
      enum: ['xp', 'coins'],
      required: true
    },

    type: {
      type: String,
      enum: ['gain', 'spend'],
      required: true
    },

    source: {
      type: String,
      enum: ['task_completed', 'daily_bonus', 'reward_claimed', 'admin_adjustment'],
      required: true
    },

    value: {
      type: Number,
      required: true,
      min: 0
    },

    meta: {
      type: Object
    },

    note: {
      type: String,
      trim: true
    }

  },
  { timestamps: true }
);

const UserStatEvent = mongoose.model("UserStatEvent", userStatEventSchema);

export default UserStatEvent;
