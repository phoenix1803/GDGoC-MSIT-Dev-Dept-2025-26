import { useEffect } from "react";

function spawnConfetti(root) {
  if (!root) return () => {};
  // create some confetti pieces
  const colors = [
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#10b981",
    "#3b82f6",
    "#8b5cf6",
  ];
  const pieces = [];
  for (let i = 0; i < 18; i++) {
    const el = document.createElement("div");
    el.className = "confetti-piece absolute w-2 h-3 rounded-sm";
    const left = Math.random() * 100;
    el.style.left = left + "%";
    el.style.top = "-10vh";
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.transform = `rotate(${Math.random() * 360}deg)`;
    el.style.opacity = "0.95";
    el.style.pointerEvents = "none";
    el.style.zIndex = "9999";
    // random animation duration
    el.style.animationDuration = `${1200 + Math.random() * 800}ms`;
    root.appendChild(el);
    pieces.push(el);
  }

  // cleanup after animation
  const timeout = setTimeout(() => {
    pieces.forEach((p) => p.remove());
  }, 2000);

  return () => {
    clearTimeout(timeout);
    pieces.forEach((p) => p.remove());
  };
}

export default function TwistsPanel({ enabled, onToggle }) {
  useEffect(() => {}, []);

  return (
    <div>
      <h3 className="text-xl font-black mb-5 uppercase tracking-wide flex items-center gap-2">
        <span>🎮</span>
        <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          POWER-UPS
        </span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label
          className={`flex items-center gap-3 p-4 rounded border-2 cursor-pointer transition-all ${
            enabled.confetti
              ? "bg-gradient-to-br from-pink-500/20 to-rose-500/20 border-pink-500/50 shadow-lg shadow-pink-500/30"
              : "bg-black/40 border-pink-500/30 hover:border-pink-500/50"
          }`}
        >
          <input
            type="checkbox"
            checked={enabled.confetti}
            onChange={(e) =>
              onToggle({ ...enabled, confetti: e.target.checked })
            }
            className="w-5 h-5 accent-pink-500"
          />
          <div className="flex-1">
            <div className="font-black text-sm flex items-center gap-2 text-pink-400 uppercase">
              <span>🎉</span> CONFETTI
            </div>
            <div className="text-xs text-pink-100 font-medium uppercase mt-1">
              Visual celebrations • Task completion
            </div>
          </div>
        </label>

        <label
          className={`flex items-center gap-3 p-4 rounded border-2 cursor-pointer transition-all ${
            enabled.doubleXP
              ? "bg-gradient-to-br from-purple-500/20 to-violet-500/20 border-purple-500/50 shadow-lg shadow-purple-500/30"
              : "bg-black/40 border-purple-500/30 hover:border-purple-500/50"
          }`}
        >
          <input
            type="checkbox"
            checked={enabled.doubleXP}
            onChange={(e) =>
              onToggle({ ...enabled, doubleXP: e.target.checked })
            }
            className="w-5 h-5 accent-purple-500"
          />
          <div className="flex-1">
            <div className="font-black text-sm flex items-center gap-2 text-purple-400 uppercase">
              <span>⚡</span> DOUBLE XP
            </div>
            <div className="text-xs text-purple-100 font-medium uppercase mt-1">
              Earn 2x experience points
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
