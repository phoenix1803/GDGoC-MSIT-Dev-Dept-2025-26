import { Link, useLocation } from "react-router-dom";

export default function MobileBottomNav() {
  const location = useLocation();

  const navItems = [
    {
      path: "/dashboard",
      icon: "📋",
      label: "Dashboard",
      gradient: "from-cyan-500 to-blue-500",
      activeGradient: "from-cyan-400 to-blue-400",
    },
    {
      path: "/achievements",
      icon: "🏆",
      label: "Achievements",
      gradient: "from-purple-500 to-pink-500",
      activeGradient: "from-purple-400 to-pink-400",
    },
    {
      path: "/profile",
      icon: "👤",
      label: "Profile",
      gradient: "from-green-500 to-emerald-500",
      activeGradient: "from-green-400 to-emerald-400",
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-t-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/20 z-50 pb-safe">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? "scale-110 -translate-y-1"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${
                  isActive ? item.activeGradient : item.gradient
                } flex items-center justify-center border-2 ${
                  isActive ? "border-white" : "border-transparent"
                } shadow-lg ${
                  isActive
                    ? `shadow-${item.gradient
                        .split(" ")[0]
                        .replace("from-", "")}/50`
                    : ""
                } transition-all duration-300`}
              >
                <span className="text-xl">{item.icon}</span>
              </div>
              <span
                className={`text-[10px] font-black uppercase tracking-wide ${
                  isActive ? "text-white" : "text-cyan-400/70"
                } transition-colors`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
