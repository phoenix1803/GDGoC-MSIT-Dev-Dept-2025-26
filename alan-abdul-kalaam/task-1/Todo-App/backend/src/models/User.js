import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  middleName: { type: String, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: { type: String, required: true },
  avatar: {
    avatarId: { type: Number },
    emoji: { type: String },
    name: { type: String },
    color: { type: String },
  },
  settings: {
    notifications: { type: Boolean, default: true },
    emailUpdates: { type: Boolean, default: false },
    darkMode: { type: Boolean, default: true },
    soundEffects: { type: Boolean, default: true },
    autoSave: { type: Boolean, default: true },
    dailyReminder: { type: Boolean, default: true },
    showCompletedTasks: { type: Boolean, default: true },
    taskAnimation: { type: Boolean, default: true },
  },
  createdAt: { type: Date, default: Date.now },
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

export default mongoose.model("User", userSchema);
