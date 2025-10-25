import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";

export default function SignupPage({ onAuth }) {
  usePageTitle("Sign Up - Start Your Quest");

  return (
    <div className="min-h-screen flex items-center justify-center py-8 sm:py-12 px-4 animate-fadeIn">
      <div className="max-w-3xl w-full animate-slideInUp">
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 uppercase animate-bounceIn">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent block">
              START YOUR QUEST
            </span>
          </h2>
          <p
            className="text-cyan-100 text-sm sm:text-base font-bold uppercase tracking-wide animate-slideInUp"
            style={{ animationDelay: "0.2s" }}
          >
            JOIN THOUSANDS • BECOME A QUESTER
          </p>
        </div>

        <div
          className="bg-black/60 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/30 animate-scaleIn hover:border-cyan-400 transition-all"
          style={{ animationDelay: "0.3s" }}
        >
          <LoginForm onAuth={onAuth} initialMode="signup" />

          <div
            className="mt-6 sm:mt-8 text-center animate-fadeIn"
            style={{ animationDelay: "0.5s" }}
          >
            <p className="text-xs sm:text-sm text-cyan-100 font-medium uppercase">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-cyan-400 font-black hover:text-cyan-300 hover:scale-110 inline-block transition-all"
              >
                ▶ SIGN IN
              </Link>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-3 sm:gap-4 text-center stagger-children">
          <div className="p-3 sm:p-4 bg-black/60 backdrop-blur-sm rounded border-2 border-blue-500/50 shadow-lg shadow-blue-500/30 hover:border-blue-400 hover:scale-105 hover:-translate-y-2 transition-all animate-scaleIn">
            <div className="text-2xl sm:text-3xl mb-1 sm:mb-2 animate-float">
              ⭐
            </div>
            <div className="text-[10px] sm:text-xs text-blue-400 font-black uppercase">
              LEVEL UP
            </div>
          </div>
          <div className="p-3 sm:p-4 bg-black/60 backdrop-blur-sm rounded border-2 border-purple-500/50 shadow-lg shadow-purple-500/30 hover:border-purple-400 hover:scale-105 hover:-translate-y-2 transition-all animate-scaleIn">
            <div
              className="text-2xl sm:text-3xl mb-1 sm:mb-2 animate-float"
              style={{ animationDelay: "0.1s" }}
            >
              🏆
            </div>
            <div className="text-[10px] sm:text-xs text-purple-400 font-black uppercase">
              WIN BADGES
            </div>
          </div>
          <div className="p-3 sm:p-4 bg-black/60 backdrop-blur-sm rounded border-2 border-orange-500/50 shadow-lg shadow-orange-500/30 hover:border-orange-400 hover:scale-105 hover:-translate-y-2 transition-all animate-scaleIn">
            <div
              className="text-2xl sm:text-3xl mb-1 sm:mb-2 animate-float"
              style={{ animationDelay: "0.2s" }}
            >
              🔥
            </div>
            <div className="text-[10px] sm:text-xs text-orange-400 font-black uppercase">
              BUILD STREAKS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
