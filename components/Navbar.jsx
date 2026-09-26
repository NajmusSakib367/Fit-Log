"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "./PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const linkClass = (href) =>
    `text-sm font-semibold tracking-wide transition-colors ${
      pathname === href
        ? "text-accent"
        : "text-muted hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog" width={28} height={28} />
          <span className="font-display text-lg font-bold tracking-widest text-white">
            FITLOG
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/#library" className={linkClass("/")}>
            WORKOUT
          </Link>
          <Link href="/my-plan" className={linkClass("/my-plan")}>
            MY PLAN
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-ink"
          >
            Plan {plan.length}
          </Link>
          <Link
            href="/my-plan"
            className="rounded-full border border-line px-3 py-1 text-xs font-bold text-white"
          >
            Saved {saved.length}
          </Link>
        </div>
      </div>
    </header>
  );
}
