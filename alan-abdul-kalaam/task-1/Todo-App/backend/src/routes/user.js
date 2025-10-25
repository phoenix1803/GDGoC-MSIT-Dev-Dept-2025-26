import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Get user profile
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-passwordHash");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user._id,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar,
      settings: user.settings,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update user profile
router.put("/profile", protect, async (req, res) => {
  try {
    const { firstName, middleName, lastName } = req.body;

    // Validation
    if (!firstName || !lastName) {
      return res
        .status(400)
        .json({ message: "First name and last name are required" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    user.firstName = firstName.trim();
    user.middleName = middleName ? middleName.trim() : "";
    user.lastName = lastName.trim();

    await user.save();

    // Generate new token with updated info
    const token = jwt.sign(
      {
        id: user._id,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        email: user.email,
      },
      process.env.JWT_SECRET || "devsecret",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Profile updated successfully",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update avatar
router.put("/avatar", protect, async (req, res) => {
  try {
    const { avatarId, emoji, name, color } = req.body;

    if (!avatarId || !emoji || !name || !color) {
      return res.status(400).json({ message: "Avatar data is required" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.avatar = { avatarId, emoji, name, color };
    await user.save();

    res.json({
      message: "Avatar updated successfully",
      avatar: user.avatar,
    });
  } catch (error) {
    console.error("Update avatar error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get settings
router.get("/settings", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.settings || {});
  } catch (error) {
    console.error("Get settings error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update settings
router.put("/settings", protect, async (req, res) => {
  try {
    const settings = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.settings = settings;
    await user.save();

    res.json({
      message: "Settings updated successfully",
      settings: user.settings,
    });
  } catch (error) {
    console.error("Update settings error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user stats
router.get("/stats", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get task stats from tasks collection
    const Task = (await import("../models/Task.js")).default;
    const tasks = await Task.find({ userId: req.user._id });

    const completedTasks = tasks.filter((t) => t.completed).length;
    const totalTasks = tasks.length;

    // Calculate streak (simplified - you can enhance this)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let streak = 0;
    let checkDate = new Date(today);

    while (true) {
      const dayStart = new Date(checkDate);
      const dayEnd = new Date(checkDate);
      dayEnd.setHours(23, 59, 59, 999);

      const completedOnDay = tasks.some(
        (t) =>
          t.completed &&
          t.completedAt &&
          new Date(t.completedAt) >= dayStart &&
          new Date(t.completedAt) <= dayEnd
      );

      if (!completedOnDay) break;

      streak++;
      checkDate.setDate(checkDate.getDate() - 1);

      // Limit to reasonable streak calculation
      if (streak > 365) break;
    }

    res.json({
      memberSince: user.createdAt,
      tasksCompleted: completedTasks,
      totalTasks: totalTasks,
      currentStreak: streak,
    });
  } catch (error) {
    console.error("Get stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
