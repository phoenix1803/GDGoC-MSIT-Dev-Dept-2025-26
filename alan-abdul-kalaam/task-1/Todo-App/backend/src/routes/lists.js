import express from "express";
import List from "../models/List.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Get all lists for user
router.get("/", protect, async (req, res) => {
  try {
    const lists = await List.find({ userId: req.user._id }).sort({
      createdAt: 1,
    });
    res.json(lists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new list
router.post("/", protect, async (req, res) => {
  try {
    const { name, color, icon } = req.body;
    const list = new List({
      userId: req.user._id,
      name,
      color,
      icon,
    });
    await list.save();
    res.status(201).json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update list
router.put("/:id", protect, async (req, res) => {
  try {
    const { name, color, icon } = req.body;
    const list = await List.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { name, color, icon },
      { new: true }
    );
    if (!list) return res.status(404).json({ error: "List not found" });
    res.json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete list
router.delete("/:id", protect, async (req, res) => {
  try {
    const list = await List.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!list) return res.status(404).json({ error: "List not found" });
    res.json({ message: "List deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
