import express from "express";
import QuizSet from "../models/QuizSet.js";

const router = express.Router();

// Get available categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await QuizSet.distinct("category");
    // Add Randomize as a special category
    const allCategories = [...categories, "Randomize"];
    res.json({ categories: allCategories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a random quiz set by category
router.get("/random/:category", async (req, res) => {
  try {
    const { category } = req.params;
    let quizSet;

    if (category === "Randomize") {
      // Get random questions from all categories
      const allSets = await QuizSet.find({});
      if (allSets.length === 0) {
        return res.status(404).json({ error: "No quiz sets found" });
      }

      // Randomly select a set
      const randomIndex = Math.floor(Math.random() * allSets.length);
      quizSet = allSets[randomIndex];
    } else {
      // Get random set from specific category
      const count = await QuizSet.countDocuments({ category });
      if (count === 0) {
        return res
          .status(404)
          .json({ error: "No quiz sets found for this category" });
      }

      const random = Math.floor(Math.random() * count);
      quizSet = await QuizSet.findOne({ category }).skip(random);
    }

    // Remove correct answers before sending to frontend
    const questionsWithoutAnswers = quizSet.questions.map((q) => ({
      _id: q._id,
      questionText: q.questionText,
      questionType: q.questionType,
      options: q.options,
      points: q.points,
    }));

    res.json({
      _id: quizSet._id,
      category: quizSet.category,
      setNumber: quizSet.setNumber,
      difficulty: quizSet.difficulty,
      questions: questionsWithoutAnswers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit quiz and get score
router.post("/submit", async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    const quizSet = await QuizSet.findById(quizId);
    if (!quizSet) {
      return res.status(404).json({ error: "Quiz set not found" });
    }

    let score = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    const results = [];

    quizSet.questions.forEach((question, index) => {
      const userAnswer = answers[index];
      let isCorrect = false;

      if (question.questionType === "select-all") {
        // For select-all, compare arrays
        const correctAnswers = Array.isArray(question.correctAnswer)
          ? question.correctAnswer.sort()
          : [question.correctAnswer].sort();
        const userAnswers = Array.isArray(userAnswer)
          ? userAnswer.sort()
          : [userAnswer].sort();

        isCorrect =
          JSON.stringify(correctAnswers) === JSON.stringify(userAnswers);
      } else {
        // For other types, simple comparison
        isCorrect =
          String(userAnswer).toLowerCase() ===
          String(question.correctAnswer).toLowerCase();
      }

      if (isCorrect) {
        score += question.points;
        correctCount++;
      } else {
        incorrectCount++;
      }

      results.push({
        questionId: question._id,
        questionText: question.questionText,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        points: isCorrect ? question.points : 0,
      });
    });

    res.json({
      score,
      totalPoints: quizSet.questions.reduce((sum, q) => sum + q.points, 0),
      correctCount,
      incorrectCount,
      totalQuestions: quizSet.questions.length,
      results,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
