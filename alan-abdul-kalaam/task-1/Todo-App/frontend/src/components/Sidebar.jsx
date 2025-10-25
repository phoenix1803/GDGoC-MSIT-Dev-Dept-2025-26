import { useState } from "react";

export default function Sidebar({
  lists,
  activeView,
  onViewChange,
  onCreateList,
  onDeleteList,
  onOpenNewTodo,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) {
  const [showListInput, setShowListInput] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [showLists, setShowLists] = useState(true);

  const handleCreateList = () => {
    if (newListName.trim()) {
      onCreateList(newListName.trim());
      setNewListName("");
      setShowListInput(false);
    }
  };

  const sidebarContent = (isDesktop) => (
    <div className="p-3 sm:p-4 flex flex-col flex-1">
      {/* New Todo Button */}
      <button
        onTouchStart={(e) => {
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onOpenNewTodo();
          setIsMobileMenuOpen(false);
        }}
        type="button"
        className={`w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-black uppercase text-xs sm:text-sm px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg mb-4 sm:mb-6 hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/50 flex items-center justify-center gap-2 flex-shrink-0 hover:scale-105 hover:-translate-y-1 ${
          isDesktop ? "animate-scaleIn" : ""
        }`}
      >
        <span className="text-lg sm:text-xl">➕</span>
        New Todo
      </button>

      {/* Quick Views */}
      <div
        className={`mb-4 sm:mb-6 flex-shrink-0 ${
          isDesktop ? "animate-slideInLeft" : ""
        }`}
        style={isDesktop ? { animationDelay: "0.1s" } : undefined}
      >
        <h3 className="text-[10px] sm:text-xs font-black uppercase text-cyan-400 mb-2 sm:mb-3 px-2">
          Quick Access
        </h3>
        <div className="space-y-1">
          <button
            onTouchStart={(e) => {
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onViewChange("all");
              setIsMobileMenuOpen(false);
            }}
            type="button"
            className={`w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded font-bold text-xs sm:text-sm transition-all flex items-center gap-2 sm:gap-3 hover:scale-105 ${
              activeView === "all"
                ? "bg-cyan-500/30 text-cyan-300 border border-cyan-400/50"
                : "text-cyan-100 hover:bg-cyan-500/10"
            }`}
          >
            <span>📋</span>
            All Todos
          </button>
          <button
            onTouchStart={(e) => {
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onViewChange("starred");
              setIsMobileMenuOpen(false);
            }}
            type="button"
            className={`w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded font-bold text-xs sm:text-sm transition-all flex items-center gap-2 sm:gap-3 hover:scale-105 ${
              activeView === "starred"
                ? "bg-yellow-500/30 text-yellow-300 border border-yellow-400/50"
                : "text-cyan-100 hover:bg-yellow-500/10"
            }`}
          >
            <span>⭐</span>
            Starred
          </button>
        </div>
      </div>

      {/* My Lists */}
      <div
        className={`mb-4 sm:mb-6 flex-1 ${
          isDesktop ? "animate-slideInLeft" : ""
        }`}
        style={isDesktop ? { animationDelay: "0.2s" } : undefined}
      >
        <div className="flex items-center justify-between px-2 mb-2 sm:mb-3">
          <h3 className="text-[10px] sm:text-xs font-black uppercase text-cyan-400">
            My Lists
          </h3>
          <button
            onTouchStart={(e) => {
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowLists(!showLists);
            }}
            type="button"
            className="text-cyan-400 hover:text-cyan-300 text-xs transition-all hover:scale-110"
          >
            {showLists ? "▼" : "▶"}
          </button>
        </div>

        {showLists && (
          <div className="space-y-1 mb-2 sm:mb-3">
            {lists.map((list, index) => (
              <div
                key={list._id}
                className={`group flex items-center justify-between px-2 sm:px-3 py-1.5 sm:py-2 rounded transition-all hover:scale-105 ${
                  isDesktop ? "animate-slideInLeft" : ""
                } ${
                  activeView === list._id
                    ? "bg-purple-500/30 text-purple-300 border border-purple-400/50"
                    : "text-cyan-100 hover:bg-purple-500/10"
                }`}
                style={
                  isDesktop
                    ? { animationDelay: `${0.3 + index * 0.05}s` }
                    : undefined
                }
              >
                <button
                  onTouchStart={(e) => {
                    e.stopPropagation();
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onViewChange(list._id);
                    setIsMobileMenuOpen(false);
                  }}
                  type="button"
                  className="flex items-center gap-2 sm:gap-3 flex-1 text-left font-bold text-xs sm:text-sm"
                >
                  <span>📁</span>
                  {list.name}
                </button>
                <button
                  onTouchStart={(e) => {
                    e.stopPropagation();
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDeleteList(list._id);
                  }}
                  type="button"
                  className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 text-xs transition-all hover:scale-125 hover:rotate-12"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Create New List */}
        {showListInput ? (
          <div className={`px-2 ${isDesktop ? "animate-scaleIn" : ""}`}>
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleCreateList()}
              placeholder="List name..."
              autoFocus
              className="w-full bg-black/60 border border-cyan-500/50 rounded px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 mb-2 transition-all focus:scale-105"
            />
            <div className="flex gap-2">
              <button
                onClick={handleCreateList}
                className="flex-1 bg-cyan-500/30 text-cyan-300 text-[10px] sm:text-xs font-bold uppercase px-2 sm:px-3 py-1 rounded hover:bg-cyan-500/40 transition-all hover:scale-105"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowListInput(false);
                  setNewListName("");
                }}
                className="flex-1 bg-red-500/30 text-red-300 text-[10px] sm:text-xs font-bold uppercase px-2 sm:px-3 py-1 rounded hover:bg-red-500/40 transition-all hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowListInput(true)}
            className="w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded font-bold text-xs sm:text-sm text-cyan-400 hover:bg-cyan-500/10 transition-all flex items-center gap-2 sm:gap-3 hover:scale-105"
          >
            <span>➕</span>
            Create New List
          </button>
        )}
      </div>

      {/* Footer Info */}
      <div
        className={`pt-3 sm:pt-4 mt-auto border-t border-cyan-500/30 flex-shrink-0 ${
          isDesktop ? "animate-slideInUp" : ""
        }`}
      >
        <p className="text-[10px] sm:text-xs text-cyan-300/70 text-center font-medium">
          {lists.length} Custom {lists.length === 1 ? "List" : "Lists"}
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar - Sticky with max-height to prevent overlap with footer */}
      <div className="hidden md:flex w-52 lg:w-64 bg-black/60 backdrop-blur-sm border-r-2 border-cyan-500/50 flex-col sticky top-0 max-h-screen overflow-y-auto scrollbar-hide animate-slideInLeft z-30">
        {sidebarContent(true)}
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="md:hidden fixed left-0 top-[57px] bottom-0 w-64 bg-black/95 backdrop-blur-sm border-r-2 border-cyan-500/50 z-40 overflow-y-auto">
            {sidebarContent(false)}
          </div>
        </>
      )}
    </>
  );
}
