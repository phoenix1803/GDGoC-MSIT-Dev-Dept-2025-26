import express from "express";
import Task from "../models/Task.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// list tasks for user
router.get("/", protect, async (req, res) => {
  const tasks = await Task.find({ userId: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(tasks);
});

router.post("/", protect, async (req, res) => {
  const { text, title, description, priority, dueDate, tags, listId, starred } =
    req.body;
  if (!text) return res.status(400).json({ message: "Missing text" });

  const taskData = {
    userId: req.user._id,
    text,
    title: title || text.split("\n")[0],
    description: description || null,
    priority: priority || "medium",
    dueDate: dueDate || null,
    tags: tags || [],
    listId: listId || null,
    starred: starred || false,
  };

  const t = await Task.create(taskData);
  res.json(t);
});

router.put("/:id", protect, async (req, res) => {
  const { id } = req.params;
  const existing = await Task.findOne({ _id: id, userId: req.user._id });
  if (!existing) return res.status(404).json({ message: "Not found" });

  existing.text = req.body.text ?? existing.text;
  existing.title = req.body.title ?? existing.title;
  existing.description = req.body.description ?? existing.description;
  existing.priority = req.body.priority ?? existing.priority;
  existing.dueDate = req.body.dueDate ?? existing.dueDate;
  existing.tags = req.body.tags ?? existing.tags;
  existing.listId = req.body.listId ?? existing.listId;
  existing.starred = req.body.starred ?? existing.starred;

  // Handle task completion
  if (typeof req.body.completed === "boolean") {
    existing.completed = req.body.completed;
    if (req.body.completed && !existing.completedAt) {
      existing.completedAt = new Date();
    } else if (!req.body.completed) {
      existing.completedAt = null;
    }
  }

  await existing.save();
  res.json(existing);
});

router.delete("/:id", protect, async (req, res) => {
  const { id } = req.params;
  const existing = await Task.findOne({ _id: id, userId: req.user._id });
  if (!existing) return res.status(404).json({ message: "Not found" });
  await Task.deleteOne({ _id: id, userId: req.user._id });
  res.json({ ok: true });
});

export default router;
