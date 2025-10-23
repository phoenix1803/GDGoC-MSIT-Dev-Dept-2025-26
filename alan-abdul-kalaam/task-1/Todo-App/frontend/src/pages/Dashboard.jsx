import Sidebar from "../components/Sidebar";
import TodoModal from "../components/TodoModal";
import TaskItem from "../components/TaskItem";
import TaskDetailsModal from "../components/TaskDetailsModal";
import { useState } from "react";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Dashboard({
  tasks,
  lists,
  onAdd,
  onEdit,
  onDelete,
  onToggle,
  onToggleStar,
  onCreateList,
  onDeleteList,
  isSidebarOpen,
  setIsSidebarOpen,
}) {
  usePageTitle("Dashboard - Manage Your Quests");

  const [showModal, setShowModal] = useState(false);
  const [activeView, setActiveView] = useState("all");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const completedTasks = tasks.filter((t) => t.completed).length;
  const activeTasks = tasks.length - completedTasks;
  const totalTasks = tasks.length;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleModalSubmit = (todoData) => {
    const taskText =
      todoData.title +
      (todoData.description ? `\n${todoData.description}` : "");
    onAdd(taskText, todoData);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowDetailsModal(true);
  };

  const getFilteredTasks = () => {
    let filtered = tasks;

    if (activeView === "starred") {
      filtered = tasks.filter((t) => t.starred);
    } else if (activeView !== "all") {
      filtered = tasks.filter((t) => t.listId === activeView);
    }

    return filtered;
  };

  const getTasksByList = () => {
    const filtered = getFilteredTasks();
    const grouped = {};

    filtered.forEach((task) => {
      const key = task.listId || "default";
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(task);
    });

    return grouped;
  };

  const tasksByList = getTasksByList();
  const filteredTasks = getFilteredTasks();

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar
        lists={lists}
        activeView={activeView}
        onViewChange={setActiveView}
        onCreateList={onCreateList}
        onDeleteList={onDeleteList}
        onOpenNewTodo={() => setShowModal(true)}
        isMobileMenuOpen={isSidebarOpen}
        setIsMobileMenuOpen={setIsSidebarOpen}
      />

      <div className="flex-1 p-4 sm:p-6 md:p-8 pb-24 md:pb-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Stats Grid - 4 column responsive grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="bg-black/60 backdrop-blur-sm px-4 py-3 sm:py-4 rounded-lg border-2 border-cyan-500/50 shadow-lg transition-all duration-300 hover:border-cyan-400 hover:shadow-cyan-500/30">
              <div className="text-center">
                <span className="block text-[10px] sm:text-xs font-black uppercase text-cyan-400 mb-1">
                  Total
                </span>
                <span className="block text-2xl sm:text-3xl font-black text-white">
                  {totalTasks}
                </span>
              </div>
            </div>
            <div className="bg-black/60 backdrop-blur-sm px-4 py-3 sm:py-4 rounded-lg border-2 border-orange-500/50 shadow-lg transition-all duration-300 hover:border-orange-400 hover:shadow-orange-500/30">
              <div className="text-center">
                <span className="block text-[10px] sm:text-xs font-black uppercase text-orange-400 mb-1">
                  Active
                </span>
                <span className="block text-2xl sm:text-3xl font-black text-white">
                  {activeTasks}
                </span>
              </div>
            </div>
            <div className="bg-black/60 backdrop-blur-sm px-4 py-3 sm:py-4 rounded-lg border-2 border-green-500/50 shadow-lg transition-all duration-300 hover:border-green-400 hover:shadow-green-500/30">
              <div className="text-center">
                <span className="block text-[10px] sm:text-xs font-black uppercase text-green-400 mb-1">
                  Done
                </span>
                <span className="block text-2xl sm:text-3xl font-black text-white">
                  {completedTasks}
                </span>
              </div>
            </div>
            <div className="bg-black/60 backdrop-blur-sm px-4 py-3 sm:py-4 rounded-lg border-2 border-purple-500/50 shadow-lg transition-all duration-300 hover:border-purple-400 hover:shadow-purple-500/30">
              <div className="text-center">
                <span className="block text-[10px] sm:text-xs font-black uppercase text-purple-400 mb-1">
                  Rate
                </span>
                <span className="block text-2xl sm:text-3xl font-black text-white">
                  {completionRate}%
                </span>
              </div>
            </div>
          </div>

          {/* Title Section */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-wider mb-2">
              <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {activeView === "all" && "All Todos"}
                {activeView === "starred" && "⭐ Starred Todos"}
                {activeView !== "all" &&
                  activeView !== "starred" &&
                  (lists.find((l) => l._id === activeView)?.name || "List")}
              </span>
            </h2>
            <p className="text-sm sm:text-base text-cyan-300/70 font-medium">
              {filteredTasks.length}{" "}
              {filteredTasks.length === 1 ? "task" : "tasks"} found
            </p>
          </div>

          {/* Empty State or Task Grid */}
          {filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 sm:py-28 md:py-32 min-h-[400px]">
              <div className="text-7xl sm:text-8xl md:text-9xl mb-6 sm:mb-8 opacity-80">
                {activeView === "starred" ? "⭐" : "📋"}
              </div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-cyan-100 mb-3 sm:mb-4 text-center">
                No Todos Yet!
              </p>
              <p className="text-sm sm:text-base text-cyan-300/70 mb-6 sm:mb-8 font-medium px-4 text-center max-w-md">
                {activeView === "starred"
                  ? "Star some todos to see them here"
                  : "Create your first todo to get started on your quest"}
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="bg-linear-to-r from-cyan-500 to-blue-500 text-white font-black uppercase text-sm sm:text-base px-8 sm:px-10 py-3 sm:py-4 rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-cyan-500/50 hover:scale-105 hover:-translate-y-1"
              >
                ➕ Create Todo
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {activeView === "all" ? (
                <>
                  {tasksByList.default && tasksByList.default.length > 0 && (
                    <div className="bg-black/60 backdrop-blur-sm rounded-xl border-2 border-cyan-500/50 shadow-lg p-5 sm:p-6 hover:border-cyan-400 hover:shadow-cyan-500/30 transition-all duration-300">
                      <div className="flex items-center justify-between mb-5">
                        <h3 className="text-lg sm:text-xl font-black uppercase flex items-center gap-3">
                          <span className="text-2xl">📋</span>
                          <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            General Todos
                          </span>
                        </h3>
                        <span className="text-xs sm:text-sm font-black uppercase px-3 py-1.5 bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/50">
                          {tasksByList.default.length}
                        </span>
                      </div>
                      <div className="space-y-3">
                        {tasksByList.default.map((task) => (
                          <TaskItem
                            key={task._id}
                            task={task}
                            onDelete={() => onDelete(task._id)}
                            onToggle={() => onToggle(task._id)}
                            onToggleStar={onToggleStar}
                            onClick={() => handleTaskClick(task)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {lists.map((list) => {
                    const listTasks = tasksByList[list._id];
                    if (!listTasks || listTasks.length === 0) return null;

                    return (
                      <div
                        key={list._id}
                        className="bg-black/60 backdrop-blur-sm rounded-xl border-2 border-purple-500/50 shadow-lg p-5 sm:p-6 hover:border-purple-400 hover:shadow-purple-500/30 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-5">
                          <h3 className="text-lg sm:text-xl font-black uppercase flex items-center gap-3">
                            <span className="text-2xl">{list.icon}</span>
                            <span className="bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                              {list.name}
                            </span>
                          </h3>
                          <span className="text-xs sm:text-sm font-black uppercase px-3 py-1.5 bg-purple-500/20 text-purple-400 rounded-full border border-purple-500/50">
                            {listTasks.length}
                          </span>
                        </div>
                        <div className="space-y-3">
                          {listTasks.map((task) => (
                            <TaskItem
                              key={task._id}
                              task={task}
                              onDelete={() => onDelete(task._id)}
                              onToggle={() => onToggle(task._id)}
                              onToggleStar={onToggleStar}
                              onClick={() => handleTaskClick(task)}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <div className="lg:col-span-2">
                  <div className="bg-black/60 backdrop-blur-sm rounded-xl border-2 border-cyan-500/50 shadow-lg p-5 sm:p-6 hover:border-cyan-400 hover:shadow-cyan-500/30 transition-all duration-300">
                    <div className="space-y-3">
                      {filteredTasks.map((task) => (
                        <TaskItem
                          key={task._id}
                          task={task}
                          onDelete={() => onDelete(task._id)}
                          onToggle={() => onToggle(task._id)}
                          onToggleStar={onToggleStar}
                          onClick={() => handleTaskClick(task)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <TodoModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleModalSubmit}
        lists={lists}
        defaultListId={
          activeView !== "all" &&
          activeView !== "starred" &&
          activeView !== "today"
            ? activeView
            : ""
        }
      />

      <TaskDetailsModal
        task={selectedTask}
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedTask(null);
        }}
        onToggleStar={onToggleStar}
      />
    </div>
  );
}
