import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";

export default function LoginPage({ onAuth }) {
  usePageTitle("Login - Welcome Back");

  return (
    <div className="min-h-screen flex items-center justify-center py-8 sm:py-12 px-4 animate-fadeIn">
      <div className="max-w-md w-full animate-slideInUp">
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 uppercase animate-bounceIn">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent block">
              WELCOME BACK!
            </span>
          </h2>
          <p
            className="text-cyan-100 text-sm sm:text-base font-bold uppercase tracking-wide animate-slideInUp"
            style={{ animationDelay: "0.2s" }}
          >
            CONTINUE YOUR QUEST • LEVEL UP
          </p>
        </div>

        <div
          className="bg-black/60 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/30 animate-scaleIn hover:border-cyan-400 transition-all"
          style={{ animationDelay: "0.3s" }}
        >
          <LoginForm onAuth={onAuth} />

          <div
            className="mt-6 sm:mt-8 text-center animate-fadeIn"
            style={{ animationDelay: "0.5s" }}
          >
            <p className="text-xs sm:text-sm text-cyan-100 font-medium uppercase">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-cyan-400 font-black hover:text-cyan-300 hover:scale-110 inline-block transition-all"
              >
                ▶ SIGN UP FREE
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
