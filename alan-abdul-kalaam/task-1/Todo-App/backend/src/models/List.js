import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  color: { type: String, default: "#06b6d4" }, // cyan-500
  icon: { type: String, default: "📁" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("List", listSchema);
