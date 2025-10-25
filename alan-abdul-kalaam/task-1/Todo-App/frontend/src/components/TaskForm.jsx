import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("general");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
    };

    // For now, combine title and description for the text field
    const fullText = description.trim()
      ? `${title.trim()}\n${description.trim()}`
      : title.trim();

    onAdd(fullText);

    // Reset form
    setTitle("");
    setDescription("");
    setPriority("medium");
    setCategory("general");
    setShowAdvanced(false);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {/* Title Input */}
      <div>
        <label className="block text-xs font-black uppercase text-cyan-400 mb-2">
          Quest Title *
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded border-2 border-cyan-500/50 bg-black/40 px-4 py-3 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/30 text-white placeholder-cyan-300/50 font-bold transition-all"
          placeholder="Enter quest title..."
          maxLength={100}
        />
      </div>

      {/* Description Textarea */}
      <div>
        <label className="block text-xs font-black uppercase text-cyan-400 mb-2">
          Description (Optional)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded border-2 border-cyan-500/50 bg-black/40 px-4 py-3 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/30 text-white placeholder-cyan-300/50 font-medium transition-all resize-none"
          placeholder="Add detailed description, notes, or steps..."
          rows={4}
          maxLength={500}
        />
        <div className="text-right text-xs text-cyan-300/50 mt-1 font-bold">
          {description.length}/500
        </div>
      </div>

      {/* Advanced Options Toggle */}
      <button
        type="button"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="text-sm font-black uppercase text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2"
      >
        <span>{showAdvanced ? "▼" : "▶"}</span>
        Advanced Options
      </button>

      {/* Advanced Options */}
      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-black/40 rounded border border-cyan-500/30">
          {/* Priority */}
          <div>
            <label className="block text-xs font-black uppercase text-cyan-400 mb-2">
              Priority Level
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full rounded border-2 border-cyan-500/50 bg-black/60 px-4 py-2 focus:outline-none focus:border-cyan-400 text-white font-bold transition-all cursor-pointer"
            >
              <option value="low">🟢 Low Priority</option>
              <option value="medium">🟡 Medium Priority</option>
              <option value="high">🔴 High Priority</option>
              <option value="urgent">⚠️ Urgent</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-black uppercase text-cyan-400 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded border-2 border-cyan-500/50 bg-black/60 px-4 py-2 focus:outline-none focus:border-cyan-400 text-white font-bold transition-all cursor-pointer"
            >
              <option value="general">📋 General</option>
              <option value="work">💼 Work</option>
              <option value="personal">🏠 Personal</option>
              <option value="health">💪 Health & Fitness</option>
              <option value="learning">📚 Learning</option>
              <option value="shopping">🛒 Shopping</option>
              <option value="finance">💰 Finance</option>
              <option value="creative">🎨 Creative</option>
            </select>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-4 rounded font-black uppercase hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/40 border-2 border-cyan-400 transform hover:scale-[1.02] transition-all text-lg"
      >
        <span className="flex items-center justify-center gap-2">
          <span>⚔️</span>
          ADD QUEST
        </span>
      </button>
    </form>
  );
}
