import mongoose from "mongoose";

const userStatsSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    totalQuestions: {
      type: Number,
      default: 0,
    },
    correctAnswers: {
      type: Number,
      default: 0,
    },
    incorrectAnswers: {
      type: Number,
      default: 0,
    },
    quizHistory: [
      {
        category: String,
        score: Number,
        totalQuestions: Number,
        correctAnswers: Number,
        incorrectAnswers: Number,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("UserStats", userStatsSchema);
