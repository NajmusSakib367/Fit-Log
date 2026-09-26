"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import WorkoutCard from "../components/WorkoutCard";
import SortDropdown from "../components/SortDropdown";
import Loading from "../components/Loading";
import { PlusIcon } from "../components/icons";
import { getWorkouts } from "../lib/api";

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("duration");

  useEffect(() => {
    let active = true;
    getWorkouts().then((data) => {
      if (active) {
        setWorkouts(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const sorted = useMemo(() => {
    const copy = [...workouts];
    copy.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "calories") return b.calories - a.calories;
      return a.duration - b.duration;
    });
    return copy;
  }, [workouts, sortBy]);
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-line bg-ink">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Workout Library
            </p>
            <h1 className="font-display text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Train with intent.
              <br />
              Log every set.
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted sm:text-base">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock
              it into today&apos;s plan, and watch the week&apos;s work add
              up.
            </p>
            <a
              href="#library"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink transition-transform hover:scale-105"
            >
              <PlusIcon /> Browse Workouts
            </a>
          </div>
          <div className="relative mx-auto h-72 w-72 sm:h-96 sm:w-96">
            <Image
              src="/banner.png"
              alt="Workout illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>
      );
}