import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Landing() {
  usePageTitle("Home - Gamify Your Productivity | Level Up Your Life");

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute top-40 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="py-16 sm:py-20 md:py-28 px-4 relative overflow-hidden">
        {/* Grid background effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0891b212_1px,transparent_1px),linear-gradient(to_bottom,#0891b212_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
        <div
          className="absolute top-1/3 right-20 w-2 h-2 bg-blue-400 rounded-full animate-ping"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-6 sm:mb-8 px-5 sm:px-7 py-2 sm:py-2.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest text-cyan-300 shadow-2xl shadow-cyan-500/30 animate-zoomIn backdrop-blur-sm">
            <span className="text-lg animate-bounce">🎮</span>
            GAMIFIED TASK MANAGEMENT
            <span
              className="text-lg animate-bounce"
              style={{ animationDelay: "0.2s" }}
            >
              🏆
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 sm:mb-8 uppercase tracking-tight leading-none">
            <span
              className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-slideInLeft block drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]"
              style={{ animationDelay: "0.2s" }}
            >
              TURN YOUR TASKS
            </span>
            <span
              className="text-white animate-slideInRight block mt-2 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              style={{ animationDelay: "0.4s" }}
            >
              INTO{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                EPIC
              </span>{" "}
              QUESTS
            </span>
          </h1>

          <p
            className="text-lg sm:text-xl md:text-2xl text-cyan-50 mb-10 sm:mb-12 max-w-3xl mx-auto font-bold animate-fadeIn px-4 leading-relaxed"
            style={{ animationDelay: "0.6s" }}
          >
            Level up your productivity with{" "}
            <span className="text-cyan-400">XP rewards</span>, unlock{" "}
            <span className="text-purple-400">achievements</span>, maintain{" "}
            <span className="text-orange-400">streaks</span>, and celebrate
            every victory with{" "}
            <span className="text-pink-400">epic animations</span>! 🎉
          </p>
          <div
            className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 animate-zoomIn px-4 mb-16"
            style={{ animationDelay: "0.8s" }}
          >
            <Link
              to="/signup"
              className="group relative px-10 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white rounded-xl font-black uppercase text-lg sm:text-xl shadow-2xl shadow-cyan-500/50 border-2 border-cyan-300 transform hover:scale-110 hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center gap-3">
                <span className="text-2xl group-hover:animate-bounce">🚀</span>
                START YOUR QUEST
                <span
                  className="text-2xl group-hover:animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                >
                  ⚡
                </span>
              </span>
            </Link>
            <Link
              to="/login"
              className="group px-10 sm:px-12 py-4 sm:py-5 bg-black/60 backdrop-blur-sm border-2 border-cyan-400 text-cyan-300 rounded-xl font-black uppercase text-lg sm:text-xl hover:bg-cyan-500/20 shadow-xl shadow-cyan-500/30 hover:scale-110 hover:-translate-y-2 transition-all duration-300 hover:border-cyan-300"
            >
              <span className="flex items-center justify-center gap-2">
                <span className="text-xl">🔐</span>
                LOGIN
              </span>
            </Link>
          </div>

          {/* Enhanced Stats Preview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto px-4">
            <div
              className="group relative text-center p-6 sm:p-8 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl border-2 border-cyan-400/50 shadow-2xl shadow-cyan-500/20 hover:scale-110 hover:-translate-y-4 hover:rotate-3 transition-all duration-300 animate-bounceIn overflow-hidden"
              style={{ animationDelay: "1s" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent mb-2 animate-pulse-slow">
                  ∞
                </div>
                <div className="text-xs sm:text-sm text-cyan-100 uppercase font-black tracking-wider">
                  XP Rewards
                </div>
              </div>
            </div>

            <div
              className="group relative text-center p-6 sm:p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl border-2 border-purple-400/50 shadow-2xl shadow-purple-500/20 hover:scale-110 hover:-translate-y-4 hover:rotate-3 transition-all duration-300 animate-bounceIn overflow-hidden"
              style={{ animationDelay: "1.1s" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent mb-2 animate-pulse-slow">
                  50+
                </div>
                <div className="text-xs sm:text-sm text-purple-100 uppercase font-black tracking-wider">
                  Achievements
                </div>
              </div>
            </div>

            <div
              className="group relative text-center p-6 sm:p-8 bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm rounded-2xl border-2 border-orange-400/50 shadow-2xl shadow-orange-500/20 hover:scale-110 hover:-translate-y-4 hover:rotate-3 transition-all duration-300 animate-bounceIn overflow-hidden"
              style={{ animationDelay: "1.2s" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-orange-300 to-red-400 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-1">
                  <span className="animate-pulse-slow">🔥</span>
                </div>
                <div className="text-xs sm:text-sm text-orange-100 uppercase font-black tracking-wider">
                  Streak System
                </div>
              </div>
            </div>

            <div
              className="group relative text-center p-6 sm:p-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl border-2 border-green-400/50 shadow-2xl shadow-green-500/20 hover:scale-110 hover:-translate-y-4 hover:rotate-3 transition-all duration-300 animate-bounceIn overflow-hidden"
              style={{ animationDelay: "1.3s" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent mb-2">
                  10+
                </div>
                <div className="text-xs sm:text-sm text-green-100 uppercase font-black tracking-wider">
                  Levels
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-16 sm:py-20 md:py-24 px-4 relative animate-fadeIn"
        style={{ animationDelay: "1.5s" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 uppercase animate-bounceIn"
              style={{ animationDelay: "1.6s" }}
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                WHY TODOQUEST?
              </span>
            </h2>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-1 w-20 bg-gradient-to-r from-transparent to-cyan-500 rounded"></div>
              <p
                className="text-cyan-100 text-base sm:text-lg font-black uppercase tracking-widest animate-slideInUp"
                style={{ animationDelay: "1.7s" }}
              >
                ⚡ MAKE PRODUCTIVITY ADDICTIVE ⚡
              </p>
              <div className="h-1 w-20 bg-gradient-to-l from-transparent to-cyan-500 rounded"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* XP & Levels */}
            <div
              className="group relative p-7 sm:p-8 bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-sm rounded-2xl border-2 border-blue-400/50 shadow-2xl shadow-blue-500/20 hover:border-blue-300 hover:shadow-blue-400/40 hover:scale-105 hover:-translate-y-3 transition-all duration-300 animate-zoomIn overflow-hidden"
              style={{ animationDelay: "1.8s" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-5 shadow-2xl shadow-blue-500/50 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <span className="text-4xl animate-float">⭐</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black mb-4 bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent uppercase tracking-wide">
                  XP & LEVELS
                </h3>
                <p className="text-base text-blue-100 font-medium leading-relaxed">
                  Earn experience points for every task completed. Level up to
                  unlock new themes, badges, and exclusive features! The more
                  you complete, the higher you climb! 🎯
                </p>
              </div>
            </div>

            {/* Streak System */}
            <div
              className="group relative p-7 sm:p-8 bg-gradient-to-br from-orange-500/10 to-orange-600/5 backdrop-blur-sm rounded-2xl border-2 border-orange-400/50 shadow-2xl shadow-orange-500/20 hover:border-orange-300 hover:shadow-orange-400/40 hover:scale-105 hover:-translate-y-3 transition-all duration-300 animate-zoomIn overflow-hidden"
              style={{ animationDelay: "1.9s" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mb-5 shadow-2xl shadow-orange-500/50 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <span
                    className="text-4xl animate-float"
                    style={{ animationDelay: "0.1s" }}
                  >
                    🔥
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black mb-4 bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent uppercase tracking-wide">
                  STREAK POWER
                </h3>
                <p className="text-base text-orange-100 font-medium leading-relaxed">
                  Build daily streaks and get massive bonus XP multipliers! Keep
                  the fire burning every day and watch your productivity
                  skyrocket to new heights! 🚀
                </p>
              </div>
            </div>

            {/* Achievements */}
            <div
              className="group relative p-7 sm:p-8 bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-sm rounded-2xl border-2 border-purple-400/50 shadow-2xl shadow-purple-500/20 hover:border-purple-300 hover:shadow-purple-400/40 hover:scale-105 hover:-translate-y-3 transition-all duration-300 animate-zoomIn overflow-hidden"
              style={{ animationDelay: "2s" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-5 shadow-2xl shadow-purple-500/50 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <span
                    className="text-4xl animate-float"
                    style={{ animationDelay: "0.2s" }}
                  >
                    🏆
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black mb-4 bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent uppercase tracking-wide">
                  ACHIEVEMENTS
                </h3>
                <p className="text-base text-purple-100 font-medium leading-relaxed">
                  Unlock special badges and rare achievements as you progress.
                  Complete epic challenges and build an impressive collection to
                  show off! 💎
                </p>
              </div>
            </div>

            {/* Visual Effects */}
            <div
              className="group relative p-7 sm:p-8 bg-gradient-to-br from-pink-500/10 to-pink-600/5 backdrop-blur-sm rounded-2xl border-2 border-pink-400/50 shadow-2xl shadow-pink-500/20 hover:border-pink-300 hover:shadow-pink-400/40 hover:scale-105 hover:-translate-y-3 transition-all duration-300 animate-zoomIn overflow-hidden"
              style={{ animationDelay: "2.1s" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mb-5 shadow-2xl shadow-pink-500/50 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <span
                    className="text-4xl animate-float"
                    style={{ animationDelay: "0.3s" }}
                  >
                    🎉
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black mb-4 bg-gradient-to-r from-pink-300 to-pink-500 bg-clip-text text-transparent uppercase tracking-wide">
                  CELEBRATIONS
                </h3>
                <p className="text-base text-pink-100 font-medium leading-relaxed">
                  Every completion triggers delightful animations, confetti
                  explosions, and satisfying sound effects. Make every success
                  feel absolutely amazing! ✨
                </p>
              </div>
            </div>

            {/* Double XP */}
            <div
              className="group relative p-7 sm:p-8 bg-gradient-to-br from-green-500/10 to-green-600/5 backdrop-blur-sm rounded-2xl border-2 border-green-400/50 shadow-2xl shadow-green-500/20 hover:border-green-300 hover:shadow-green-400/40 hover:scale-105 hover:-translate-y-3 transition-all duration-300 animate-zoomIn overflow-hidden"
              style={{ animationDelay: "2.2s" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-5 shadow-2xl shadow-green-500/50 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <span
                    className="text-4xl animate-float"
                    style={{ animationDelay: "0.4s" }}
                  >
                    ⚡
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black mb-4 bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent uppercase tracking-wide">
                  POWER-UPS
                </h3>
                <p className="text-base text-green-100 font-medium leading-relaxed">
                  Activate Double XP mode and other powerful boosters to
                  accelerate your progress! Limited time power-ups for maximum
                  gains! ⚡
                </p>
              </div>
            </div>

            {/* Progress Tracking */}
            <div
              className="group relative p-7 sm:p-8 bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 backdrop-blur-sm rounded-2xl border-2 border-cyan-400/50 shadow-2xl shadow-cyan-500/20 hover:border-cyan-300 hover:shadow-cyan-400/40 hover:scale-105 hover:-translate-y-3 transition-all duration-300 animate-zoomIn overflow-hidden"
              style={{ animationDelay: "2.3s" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center mb-5 shadow-2xl shadow-cyan-500/50 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <span
                    className="text-4xl animate-float"
                    style={{ animationDelay: "0.5s" }}
                  >
                    📊
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black mb-4 bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent uppercase tracking-wide">
                  PROGRESS DASHBOARD
                </h3>
                <p className="text-base text-cyan-100 font-medium leading-relaxed">
                  Track your stats with stunning visualizations, view your
                  complete history, and witness your growth over time with
                  beautiful, interactive charts! 📈
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 sm:py-20 md:py-28 px-4 relative animate-bounceIn"
        style={{ animationDelay: "2.5s" }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div
            className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="group p-8 sm:p-12 md:p-16 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-3xl border-2 border-cyan-400/60 shadow-2xl shadow-cyan-500/40 hover:scale-105 hover:border-cyan-300 transition-all duration-500 overflow-hidden">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative">
              {/* Epic badge */}
              <div className="inline-flex items-center gap-2 mb-6 px-6 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-400/50 rounded-full animate-bounce">
                <span className="text-2xl">👑</span>
                <span className="text-sm font-black uppercase tracking-wider text-yellow-300">
                  Join The Elite
                </span>
                <span className="text-2xl">👑</span>
              </div>

              <h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 uppercase leading-tight animate-rotateIn"
                style={{ animationDelay: "2.6s" }}
              >
                <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(34,211,238,0.5)] block">
                  READY TO LEVEL UP
                </span>
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(251,191,36,0.5)] block mt-2">
                  YOUR LIFE?
                </span>
              </h2>

              <p
                className="text-lg sm:text-xl md:text-2xl mb-10 sm:mb-12 font-bold uppercase tracking-wide animate-slideInUp px-4"
                style={{ animationDelay: "2.8s" }}
              >
                <span className="text-cyan-200">
                  Join thousands of questers
                </span>
                <br className="sm:hidden" />
                <span className="text-cyan-400 mx-2">•</span>
                <span className="text-purple-200">Start earning XP today!</span>
                <br className="sm:hidden" />
                <span className="text-cyan-400 mx-2">•</span>
                <span className="text-blue-200">100% Free Forever!</span>
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <Link
                  to="/signup"
                  className="group/btn relative px-12 sm:px-14 py-5 sm:py-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white rounded-2xl font-black uppercase text-xl sm:text-2xl shadow-2xl shadow-cyan-500/60 border-2 border-cyan-300 transform hover:scale-110 hover:-translate-y-3 transition-all duration-300 overflow-hidden animate-zoomIn"
                  style={{ animationDelay: "3s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center gap-3">
                    <span className="text-2xl group-hover/btn:animate-bounce">
                      🚀
                    </span>
                    BEGIN YOUR JOURNEY
                    <span
                      className="text-2xl group-hover/btn:animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    >
                      🎮
                    </span>
                  </span>
                  <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
                </Link>

                <div className="text-center sm:text-left">
                  <p className="text-cyan-300 font-bold text-sm mb-1">
                    Already have an account?
                  </p>
                  <Link
                    to="/login"
                    className="text-cyan-400 hover:text-cyan-300 font-black uppercase text-lg hover:underline transition-colors"
                  >
                    Login Here →
                  </Link>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-cyan-200/80">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-sm font-bold">No Credit Card</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-sm font-bold">Instant Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-sm font-bold">Free Forever</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
