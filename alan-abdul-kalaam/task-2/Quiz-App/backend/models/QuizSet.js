import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  questionType: {
    type: String,
    enum: ["mcq", "true-false", "fill-blank", "select-all"],
    required: true,
  },
  options: [
    {
      type: String,
    },
  ],
  correctAnswer: {
    type: mongoose.Schema.Types.Mixed, // Can be string or array
    required: true,
  },
  points: {
    type: Number,
    default: 10,
  },
});

const quizSetSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: [
        "Movies",
        "Music",
        "Technology",
        "Medicine",
        "History",
        "Science",
        "Sports",
        "Geography",
        "Literature",
        "General Knowledge",
      ],
    },
    setNumber: {
      type: Number,
      required: true,
    },
    questions: [questionSchema],
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for category and setNumber
quizSetSchema.index({ category: 1, setNumber: 1 }, { unique: true });

export default mongoose.model("QuizSet", quizSetSchema);
