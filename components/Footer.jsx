import Image from "public/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-panel">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog" width={22} height={22} />
          <span className="font-display text-base font-bold tracking-widest text-white">
            FITLOG
          </span>
        </div>
        <p className="text-center text-sm text-muted">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
