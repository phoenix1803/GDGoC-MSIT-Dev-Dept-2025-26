export default function Footer() {
  return (
    <footer className="border-t-2 border-cyan-500/30 bg-black/70">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <div className="text-center md:text-left">
            <div className="text-base sm:text-xl font-black uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-1">
              TODOQUEST
            </div>
            <div className="text-xs sm:text-sm text-cyan-400/60 uppercase tracking-wide">
              © {new Date().getFullYear()} Level up your productivity
            </div>
          </div>

          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
            <a
              href="#"
              className="text-cyan-400/70 hover:text-cyan-300 uppercase font-bold transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-cyan-400/70 hover:text-cyan-300 uppercase font-bold transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-cyan-400/70 hover:text-cyan-300 uppercase font-bold transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
