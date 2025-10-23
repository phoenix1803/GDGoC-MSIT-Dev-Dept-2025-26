import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function Navbar({
  user,
  onLogout,
  onToggleSidebar,
  isSidebarOpen,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Debug: Log user object
  useEffect(() => {
    console.log("Navbar received user:", user);
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    onLogout();
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-black/90 backdrop-blur-sm border-b border-cyan-500/50 shadow-lg shadow-cyan-500/20 md:relative sticky top-0 z-50 animate-slideInDown">
      <div className="w-full px-3 sm:px-4 lg:px-8 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          {/* Left side: Hamburger (mobile only) + Logo */}
          <div className="flex items-center gap-2 sm:gap-3 animate-slideInLeft">
            {/* Mobile Hamburger Button - only show on dashboard/achievements */}
            {user &&
              (location.pathname === "/dashboard" ||
                location.pathname === "/achievements") && (
                <button
                  onClick={onToggleSidebar}
                  className="md:hidden bg-cyan-500/20 border-2 border-cyan-500/50 text-cyan-400 p-2 rounded-lg hover:bg-cyan-500/30 transition-all shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        isSidebarOpen
                          ? "M6 18L18 6M6 6l12 12"
                          : "M4 6h16M4 12h16M4 18h16"
                      }
                    />
                  </svg>
                </button>
              )}

            {/* Logo - Remove link to home, make it functional */}
            <div className="flex items-center gap-2 sm:gap-3 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center border-2 border-cyan-400 shadow-lg shadow-cyan-500/50 transition-all duration-300 flex-shrink-0">
                <span className="text-xl sm:text-2xl">🎮</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-base sm:text-xl font-black uppercase tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  TodoQuest
                </h1>
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-cyan-400/70 -mt-1">
                  Level Up Your Life
                </p>
              </div>
            </div>
          </div>

          {/* Center Navigation Buttons */}
          {user ? (
            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-2 lg:gap-4 animate-scaleIn">
              <Link
                to="/dashboard"
                className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/50 text-cyan-300 hover:border-cyan-400 hover:text-cyan-200 font-black uppercase text-xs lg:text-sm px-3 lg:px-6 py-2 lg:py-2.5 rounded-lg transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/40 hover:scale-105 hover:-translate-y-0.5"
              >
                <span className="hidden lg:inline">📋 Dashboard</span>
                <span className="lg:hidden">📋</span>
              </Link>
              <Link
                to="/achievements"
                className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50 text-purple-300 hover:border-purple-400 hover:text-purple-200 font-black uppercase text-xs lg:text-sm px-3 lg:px-6 py-2 lg:py-2.5 rounded-lg transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-400/40 hover:scale-105 hover:-translate-y-0.5"
              >
                <span className="hidden lg:inline">🏆 Achievements</span>
                <span className="lg:hidden">🏆</span>
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4 lg:gap-6 absolute left-1/2 transform -translate-x-1/2 animate-scaleIn">
              <button
                onClick={() => {
                  const featuresSection = document.getElementById("features");
                  if (featuresSection) {
                    featuresSection.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  } else {
                    navigate("/#features");
                  }
                }}
                className="text-cyan-300 hover:text-cyan-400 font-bold uppercase text-xs lg:text-sm transition-all hover:scale-105 relative group"
              >
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </button>
            </div>
          )}

          <div className="flex items-center gap-2 sm:gap-3 animate-slideInRight">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                {/* Profile Button */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1.5 sm:gap-2.5 px-2 sm:px-3 py-1.5 sm:py-2 bg-cyan-500/10 rounded border border-cyan-500/50 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all group hover:scale-105"
                >
                  {/* Name */}
                  <span className="text-xs sm:text-sm font-black text-cyan-400 uppercase tracking-wide max-w-[80px] sm:max-w-none truncate">
                    {user?.firstName || user?.email?.split("@")[0] || "User"}
                  </span>
                  {/* Profile Icon */}
                  {user?.avatar ? (
                    <div
                      className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br ${user.avatar.color} flex items-center justify-center border border-cyan-400 shadow-lg shadow-cyan-500/50 group-hover:scale-110 transition-transform flex-shrink-0 text-base sm:text-lg`}
                    >
                      {user.avatar.emoji}
                    </div>
                  ) : (
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center border border-cyan-400 shadow-lg shadow-cyan-500/50 group-hover:scale-110 transition-transform flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 sm:h-4 sm:w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-black/95 backdrop-blur-sm border-2 border-cyan-500/50 rounded-lg shadow-2xl shadow-cyan-500/30 py-2 z-[100] animate-fadeIn">
                    {/* User Info Section */}
                    <div className="px-3 sm:px-4 py-2 sm:py-2.5 border-b border-cyan-500/30 animate-slideInDown">
                      <p className="text-xs sm:text-sm font-black text-cyan-400 uppercase truncate">
                        {user.firstName && user.lastName
                          ? `${user.firstName} ${
                              user.middleName ? user.middleName + " " : ""
                            }${user.lastName}`
                          : user.email}
                      </p>
                      <p className="text-[10px] sm:text-xs text-cyan-300/70 mt-0.5 truncate">
                        {user.email}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      {/* Mobile-only Navigation Links */}
                      <div className="md:hidden border-b border-cyan-500/30 mb-1 pb-1">
                        <button
                          onClick={() => {
                            setIsDropdownOpen(false);
                            navigate("/dashboard");
                          }}
                          className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-cyan-500/20 text-cyan-100 hover:text-cyan-400 transition-all group hover:translate-x-1"
                        >
                          <span className="text-lg">📋</span>
                          <span className="font-bold uppercase text-xs tracking-wide">
                            Dashboard
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            setIsDropdownOpen(false);
                            navigate("/achievements");
                          }}
                          className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-purple-500/20 text-purple-100 hover:text-purple-400 transition-all group hover:translate-x-1"
                        >
                          <span className="text-lg">🏆</span>
                          <span className="font-bold uppercase text-xs tracking-wide">
                            Achievements
                          </span>
                        </button>
                      </div>

                      {/* Profile */}
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          navigate("/profile");
                        }}
                        className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-cyan-500/20 text-cyan-100 hover:text-cyan-400 transition-all group hover:translate-x-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-cyan-400 group-hover:scale-110 group-hover:rotate-12 transition-all"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <span className="font-bold uppercase text-xs tracking-wide">
                          View Profile
                        </span>
                      </button>

                      {/* Change Profile Image */}
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          navigate("/avatar");
                        }}
                        className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-cyan-500/20 text-cyan-100 hover:text-cyan-400 transition-all group hover:translate-x-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-cyan-400 group-hover:scale-110 group-hover:rotate-12 transition-all"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="font-bold uppercase text-xs tracking-wide">
                          Change Avatar
                        </span>
                      </button>

                      {/* Settings */}
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          navigate("/settings");
                        }}
                        className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-cyan-500/20 text-cyan-100 hover:text-cyan-400 transition-all group hover:translate-x-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-cyan-400 group-hover:scale-110 group-hover:rotate-90 transition-all"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="font-bold uppercase text-xs tracking-wide">
                          Settings
                        </span>
                      </button>

                      {/* Divider */}
                      <div className="border-t border-cyan-500/30 my-1"></div>

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-red-500/20 text-red-100 hover:text-red-400 transition-all group hover:translate-x-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-red-400 group-hover:scale-110 group-hover:translate-x-1 transition-all"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <span className="font-black uppercase text-xs tracking-wide">
                          Logout
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  to="/login"
                  className="px-3 sm:px-5 py-2 sm:py-2.5 text-cyan-400 font-black uppercase text-xs sm:text-sm hover:text-cyan-300 transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-cyan-500/30 rounded-lg"
                >
                  <span className="hidden sm:inline">Login</span>
                  <span className="sm:hidden">🔐</span>
                </Link>
                <Link
                  to="/signup"
                  className="px-3 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-black uppercase text-xs sm:text-sm hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/50 border-2 border-cyan-400/50 transition-all duration-300 hover:scale-110 hover:-translate-y-1 animate-pulse-slow relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                    <span className="hidden md:inline">▶ Start Quest</span>
                    <span className="md:hidden">▶ Join</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
