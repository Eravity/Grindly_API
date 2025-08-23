import mongoose, {type CallbackWithoutResultAndOptionalError, type Document, type Query, Schema, Types, type UpdateQuery} from "mongoose";

interface ITask {
  user: Types.ObjectId;
  title: string;
  description?: string;
  dueDate?: Date | null;
  frequency: "once" | "daily" | "weekly" | "monthly";
  completed: boolean;
  xpReward: number;
  coinReward: number;
  completedAt?: Date | null;
  deadline?: Date | null;
  missedDeadline: boolean;
  priority?: "low" | "medium" | "high";
  additionalComments?: string;
  aiXpReward?: number | null;
  aiCoinReward?: number | null;
  aiSuggested: boolean;
  aiScoringStatus: "pending" | "done" | "failed";
}

type TaskDoc = Document & ITask;

const taskSchema = new Schema<TaskDoc>(
  {
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},
    title: {type: String, required: true, trim: true, maxlength: 100},
    description: {type: String, trim: true},
    dueDate: {type: Date, default: null},
    frequency: {
      type: String,
      enum: ["once", "daily", "weekly", "monthly"],
      default: "once",
    },
    completed: {type: Boolean, default: false},
    xpReward: {type: Number, default: 5, min: 0, max: 100},
    coinReward: {type: Number, default: 1, min: 0, max: 50},
    completedAt: {type: Date, default: null},
    deadline: {type: Date, default: null},
    missedDeadline: {type: Boolean, default: false},
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    additionalComments: [{type: String, trim: true}],
    aiXpReward: {type: Number, default: null, min: 0, max: 100},
    aiCoinReward: {type: Number, default: null, min: 0, max: 50},
    aiSuggested: {type: Boolean, default: false},
    aiScoringStatus: {
      type: String,
      enum: ["pending", "done", "failed"],
      default: "pending",
    },
  },
  {timestamps: true}
);

taskSchema.pre<TaskDoc>("save", function (next) {
  const now = new Date();
  this.missedDeadline =
    !!this.deadline && this.deadline < now && !this.completed;
  next();
});

taskSchema.pre<Query<TaskDoc, TaskDoc>>(
  "findOneAndUpdate",
  async function (next: CallbackWithoutResultAndOptionalError) {
    try {
      const rawUpdate = this.getUpdate();
      if (!rawUpdate || Array.isArray(rawUpdate)) return next();

      const update = rawUpdate as UpdateQuery<ITask>;
      if (!update.$set) update.$set = {};

      const currentDoc = await this.model
        .findOne(this.getQuery() as any)
        .lean<ITask>()
        .exec();
      if (!currentDoc) return next();

      const now = new Date();

      const nextDeadline =
        (update.$set.deadline ??
          (update as any).deadline ??
          currentDoc.deadline) || null;

      const nextCompleted =
        (update.$set.completed ??
          (update as any).completed ??
          currentDoc.completed) ?? false;

      update.$set.missedDeadline =
        !!nextDeadline && nextDeadline < now && nextCompleted !== true;

      this.setUpdate(update);
      next();
    } catch (err) {
      next(err as any);
    }
  }
);

const Task = mongoose.model<TaskDoc>("Task", taskSchema);
export default Task;
