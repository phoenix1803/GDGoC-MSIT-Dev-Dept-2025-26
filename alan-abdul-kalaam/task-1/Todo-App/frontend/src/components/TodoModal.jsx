import { useState, useEffect } from "react";

export default function TodoModal({
  isOpen,
  onClose,
  onSubmit,
  lists,
  defaultListId = "",
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [tags, setTags] = useState("");
  const [listId, setListId] = useState("");
  const [starred, setStarred] = useState(false);

  // Set default due date to today when modal opens
  useEffect(() => {
    if (isOpen) {
      const today = new Date().toISOString().split("T")[0];
      setDueDate(today);
      // Set default list if provided
      setListId(defaultListId);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable body scroll when modal closes
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, defaultListId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tagArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || null,
      priority,
      tags: tagArray,
      listId: listId || null,
      starred,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("medium");
    setTags("");
    setListId("");
    setStarred(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/50 rounded-xl shadow-2xl shadow-cyan-500/30 w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide my-8 animate-scaleIn">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border-b-2 border-cyan-500/50 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-black uppercase tracking-wide flex items-center gap-3 animate-slideInLeft">
            <span className="text-cyan-400 animate-bounceIn">➕</span>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Create New Todo
            </span>
          </h2>
          <button
            onClick={onClose}
            className="text-cyan-400 hover:text-cyan-300 text-2xl font-bold transition-all duration-300 hover:scale-110 hover:rotate-90"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-black uppercase text-cyan-400 mb-2">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter todo title..."
              required
              className="w-full bg-black/60 border-2 border-cyan-500/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/30 focus:scale-[1.01] transition-all duration-300 font-medium"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-black uppercase text-cyan-400 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details..."
              rows="4"
              className="w-full bg-black/60 border-2 border-cyan-500/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/30 focus:scale-[1.01] transition-all duration-300 resize-none font-medium"
            />
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Due Date */}
            <div>
              <label className="block text-sm font-black uppercase text-cyan-400 mb-2">
                📅 Due Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-black/60 border-2 border-cyan-500/50 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-cyan-400 transition-all font-medium cursor-pointer"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400 text-xl pointer-events-none">
                  📆
                </span>
              </div>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-black uppercase text-cyan-400 mb-2">
                🎯 Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-black/60 border-2 border-cyan-500/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-all font-bold cursor-pointer"
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
                <option value="urgent">⚠️ Urgent</option>
              </select>
            </div>
          </div>

          {/* List Selection */}
          <div>
            <label className="block text-sm font-black uppercase text-cyan-400 mb-2">
              📁 Add to List
            </label>
            <select
              value={listId}
              onChange={(e) => setListId(e.target.value)}
              className="w-full bg-black/60 border-2 border-cyan-500/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-all font-bold cursor-pointer"
            >
              <option value="">No List (Default)</option>
              {lists.map((list) => (
                <option key={list._id} value={list._id}>
                  {list.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-black uppercase text-cyan-400 mb-2">
              🏷️ Tags
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="work, urgent, personal (comma-separated)"
              className="w-full bg-black/60 border-2 border-cyan-500/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-all font-medium"
            />
            <p className="text-xs text-cyan-300/60 mt-1 font-medium">
              Separate tags with commas
            </p>
          </div>

          {/* Starred Toggle */}
          <div className="flex items-center justify-between bg-black/40 border-2 border-cyan-500/30 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⭐</span>
              <div>
                <p className="font-black uppercase text-sm text-cyan-300">
                  Mark as Starred
                </p>
                <p className="text-xs text-cyan-400/70 font-medium">
                  Pin this todo to starred section
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setStarred(!starred)}
              className={`relative w-14 h-8 rounded-full transition-all ${
                starred
                  ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                  : "bg-gray-600"
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  starred ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-red-500/20 text-red-400 border-2 border-red-500/50 px-6 py-3 rounded-lg font-black uppercase text-sm hover:bg-red-500/30 hover:scale-105 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-2 border-cyan-400/50 px-6 py-3 rounded-lg font-black uppercase text-sm hover:from-cyan-400 hover:to-blue-400 hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-cyan-500/50"
            >
              Create Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
