import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  title: { type: String },
  description: { type: String },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date },
  starred: { type: Boolean, default: false },
  priority: {
    type: String,
    enum: ["low", "medium", "high", "urgent"],
    default: "medium",
  },
  dueDate: { type: Date },
  tags: [{ type: String }],
  listId: { type: mongoose.Schema.Types.ObjectId, ref: "List" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Task", taskSchema);
