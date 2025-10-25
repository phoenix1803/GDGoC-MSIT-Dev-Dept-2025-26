import express from "express";
import UserStats from "../models/UserStats.js";

const router = express.Router();

// Get user statistics
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    let userStats = await UserStats.findOne({ username });

    if (!userStats) {
      // Create new user stats if doesn't exist
      userStats = new UserStats({ username });
      await userStats.save();
    }

    res.json(userStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user statistics after quiz
router.post("/update", async (req, res) => {
  try {
    const {
      username,
      category,
      score,
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
    } = req.body;

    let userStats = await UserStats.findOne({ username });

    if (!userStats) {
      userStats = new UserStats({ username });
    }

    // Update overall stats
    userStats.totalQuestions += totalQuestions;
    userStats.correctAnswers += correctAnswers;
    userStats.incorrectAnswers += incorrectAnswers;

    // Add to quiz history
    userStats.quizHistory.push({
      category,
      score,
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      date: new Date(),
    });

    await userStats.save();
    res.json(userStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check if username exists
router.get("/check/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const userStats = await UserStats.findOne({ username });
    res.json({ exists: !!userStats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
