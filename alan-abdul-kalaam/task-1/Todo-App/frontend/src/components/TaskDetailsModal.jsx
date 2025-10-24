import { useEffect } from "react";

export default function TaskDetailsModal({
  task,
  isOpen,
  onClose,
  onToggleStar,
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !task) return null;

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500/30 text-red-200 border-red-500";
      case "high":
        return "bg-orange-500/30 text-orange-200 border-orange-500";
      case "medium":
        return "bg-yellow-500/30 text-yellow-200 border-yellow-500";
      case "low":
        return "bg-green-500/30 text-green-200 border-green-500";
      default:
        return "bg-cyan-500/30 text-cyan-200 border-cyan-500";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "urgent":
        return "⚠️";
      case "high":
        return "🔴";
      case "medium":
        return "🟡";
      case "low":
        return "🟢";
      default:
        return "⚪";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not Set";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/50 rounded-xl shadow-2xl shadow-cyan-500/30 w-full max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-hide animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border-b-2 border-cyan-500/50 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-black uppercase tracking-wide flex items-center gap-3 animate-slideInLeft">
            <span className="text-cyan-400 animate-bounceIn">📋</span>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Task Details
            </span>
          </h2>
          <button
            onClick={onClose}
            className="text-cyan-400 hover:text-cyan-300 text-2xl font-bold transition-all duration-300 hover:scale-110 hover:rotate-90"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title Section */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-3xl font-black text-white leading-tight flex-1">
                {task.title || task.text.split("\n")[0] || "Untitled Task"}
              </h3>
              <button
                onClick={() => onToggleStar(task._id)}
                className={`text-3xl transition-all duration-300 hover:scale-125 hover:rotate-12 ${
                  task.starred ? "animate-pulse" : ""
                }`}
              >
                {task.starred ? "⭐" : "☆"}
              </button>
            </div>
            {task.completed && (
              <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 border border-green-500/50 px-3 py-1 rounded-full text-sm font-black uppercase animate-bounceIn">
                ✓ Completed
              </div>
            )}
          </div>

          {/* Description */}
          {task.description && (
            <div className="bg-black/40 border border-cyan-500/30 rounded-lg p-4 animate-slideInUp hover:border-cyan-500/50 transition-all duration-300">
              <h4 className="text-sm font-black uppercase text-cyan-400 mb-2">
                Description
              </h4>
              <p className="text-cyan-100 text-base leading-relaxed whitespace-pre-wrap">
                {task.description}
              </p>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger-children">
            {/* Priority */}
            <div className="bg-black/40 border border-cyan-500/30 rounded-lg p-4 animate-scaleIn hover:border-cyan-500/50 hover:scale-105 transition-all duration-300">
              <h4 className="text-sm font-black uppercase text-cyan-400 mb-3">
                Priority
              </h4>
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${getPriorityStyles(
                  task.priority
                )}`}
              >
                <span className="text-2xl">
                  {getPriorityIcon(task.priority)}
                </span>
                <span className="font-black uppercase">
                  {task.priority || "Medium"}
                </span>
              </div>
            </div>

            {/* Due Date */}
            <div className="bg-black/40 border border-cyan-500/30 rounded-lg p-4 animate-scaleIn hover:border-cyan-500/50 hover:scale-105 transition-all duration-300">
              <h4 className="text-sm font-black uppercase text-cyan-400 mb-3">
                Due Date
              </h4>
              <div className="text-white font-bold text-lg">
                📅 {formatDate(task.dueDate)}
              </div>
            </div>

            {/* Created Date */}
            <div className="bg-black/40 border border-cyan-500/30 rounded-lg p-4 animate-scaleIn hover:border-cyan-500/50 hover:scale-105 transition-all duration-300">
              <h4 className="text-sm font-black uppercase text-cyan-400 mb-3">
                Created
              </h4>
              <div className="text-white font-bold">
                {new Date(task.createdAt).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </div>
            </div>

            {/* Status */}
            <div className="bg-black/40 border border-cyan-500/30 rounded-lg p-4 animate-scaleIn hover:border-cyan-500/50 hover:scale-105 transition-all duration-300">
              <h4 className="text-sm font-black uppercase text-cyan-400 mb-3">
                Status
              </h4>
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
                  task.completed
                    ? "bg-green-500/20 text-green-300 border-green-500"
                    : "bg-orange-500/20 text-orange-300 border-orange-500"
                }`}
              >
                <span className="text-xl">{task.completed ? "✓" : "⏳"}</span>
                <span className="font-black uppercase">
                  {task.completed ? "Complete" : "In Progress"}
                </span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <div className="bg-black/40 border border-cyan-500/30 rounded-lg p-4 animate-slideInUp hover:border-cyan-500/50 transition-all duration-300">
              <h4 className="text-sm font-black uppercase text-cyan-400 mb-3">
                Tags
              </h4>
              <div className="flex flex-wrap gap-2 stagger-children">
                {task.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full border bg-purple-500/20 text-purple-300 border-purple-500/50 font-bold text-sm animate-scaleIn hover:scale-110 transition-all duration-300 cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Full Text (if different from title) */}
          {task.text && task.text !== task.title && (
            <div className="bg-black/40 border border-cyan-500/30 rounded-lg p-4 animate-slideInUp hover:border-cyan-500/50 transition-all duration-300">
              <h4 className="text-sm font-black uppercase text-cyan-400 mb-2">
                Original Text
              </h4>
              <p className="text-cyan-100/70 text-sm whitespace-pre-wrap font-mono">
                {task.text}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border-t-2 border-cyan-500/50 p-4 animate-slideInUp">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-black uppercase px-6 py-3 rounded-lg hover:from-cyan-400 hover:to-blue-400 hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-cyan-500/50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
