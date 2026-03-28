export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/[0.05] py-10">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-white" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 3-8 4.5 8 4.5 8-4.5M12 12l8-4.5M12 12v9m-8-4.5v-9l8 4.5" />
            </svg>
          </div>
          <span className="text-white font-semibold tracking-tight">Agentryx</span>
        </div>

        <p className="text-muted-foreground text-sm">© {year} Agentryx. All rights reserved.</p>

        <a
          href="mailto:hello@agentryx.com"
          className="text-sm text-muted-foreground hover:text-white transition-colors duration-200"
        >
          hello@agentryx.com
        </a>
      </div>
    </footer>
  );
}
