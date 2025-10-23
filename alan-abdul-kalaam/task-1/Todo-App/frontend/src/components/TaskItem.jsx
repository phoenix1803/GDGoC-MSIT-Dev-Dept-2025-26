import { useState } from "react";

export default function TaskItem({
  task,
  onDelete,
  onToggle,
  onToggleStar,
  onClick,
}) {
  const getPriorityStyles = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500/20 text-red-300 border-red-500/50";
      case "high":
        return "bg-orange-500/20 text-orange-300 border-orange-500/50";
      case "medium":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/50";
      case "low":
        return "bg-green-500/20 text-green-300 border-green-500/50";
      default:
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/50";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "urgent":
        return "🔥";
      case "high":
        return "⚡";
      case "medium":
        return "📌";
      case "low":
        return "✓";
      default:
        return "📋";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    return date.toLocaleDateString();
  };

  return (
    <div
      onClick={onClick}
      className={`group bg-linear-to-br from-black/70 to-black/50 backdrop-blur-sm rounded-lg border-2 shadow-lg transition-all duration-300 cursor-pointer ${
        task.completed
          ? "border-green-500/40 shadow-green-500/10 opacity-70 hover:opacity-85"
          : "border-cyan-500/40 shadow-cyan-500/20 hover:border-cyan-400/60 hover:shadow-cyan-500/40 hover:scale-[1.01] hover:-translate-y-0.5"
      }`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!task.completed) onToggle();
            }}
            disabled={task.completed}
            className={`shrink-0 w-5 h-5 rounded-md flex items-center justify-center border-2 transition-all duration-300 ${
              task.completed
                ? "bg-linear-to-br from-green-500 to-emerald-600 border-green-400 shadow-md shadow-green-500/30 cursor-not-allowed"
                : "bg-black/60 border-cyan-500/50 hover:border-cyan-400 hover:scale-110 active:scale-125 cursor-pointer"
            }`}
          >
            {task.completed && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>

          <div className="flex-1 min-w-0">
            <h4
              className={`font-bold text-sm sm:text-base leading-tight mb-1.5 ${
                task.completed ? "text-green-300/90 line-through" : "text-white"
              }`}
            >
              {task.title || task.text.split("\n")[0] || "Untitled Task"}
            </h4>

            {task.description && (
              <p
                className={`text-xs sm:text-sm mb-2 leading-relaxed line-clamp-2 ${
                  task.completed
                    ? "text-green-300/70 line-through"
                    : "text-cyan-100/70"
                }`}
              >
                {task.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-1.5">
              {task.priority && (
                <span
                  className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded border ${getPriorityStyles(
                    task.priority
                  )}`}
                >
                  {getPriorityIcon(task.priority)}
                </span>
              )}

              {task.dueDate && (
                <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded border bg-blue-500/20 text-blue-300 border-blue-500/50">
                  📅 {formatDate(task.dueDate)}
                </span>
              )}

              {task.tags && task.tags.length > 0 && (
                <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded border bg-purple-500/20 text-purple-300 border-purple-500/50">
                  🏷️ {task.tags.length}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleStar(task._id);
              }}
              className={`text-lg transition-all duration-300 hover:scale-125 hover:rotate-12 active:scale-150 ${
                task.starred ? "animate-pulse" : ""
              }`}
              title={task.starred ? "Unstar" : "Star"}
            >
              {task.starred ? "⭐" : "☆"}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="text-sm px-2 py-1 bg-red-500/20 text-red-400 border border-red-500/50 rounded hover:bg-red-500/40 hover:border-red-400 hover:scale-110 active:scale-125 transition-all duration-300"
              title="Delete Task"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
