import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    description: String,
    status: {
      type: String,
      enum: ["To Do", "In progress", "Completed"],
      default: "To Do",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    dueDate: Date,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    sharedWith: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("task", taskSchema);
