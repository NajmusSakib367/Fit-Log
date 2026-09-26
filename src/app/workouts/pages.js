"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Loading from "../../../components/Loading";
import { usePlan } from "../../../components/PlanContext";
import { getWorkoutById } from "../../../lib/api";
import { PlusIcon, BookmarkIcon } from "../../../components/icons";

const SPEC_ROWS = [
  ["EQUIPMENT", "equipment"],
  ["DIFFICULTY", "difficulty"],
  ["SETS", "sets"],
  ["REPS", "reps"],
  ["DURATION", "duration"],
  ["CALORIES", "calories"],
  ["RATING", "rating"],
];

export default function WorkoutDetailPage() {
  const params = useParams();
  const { addToPlan, addToSaved } = usePlan();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    let active = true;
    getWorkoutById(params.id).then((data) => {
      if (!active) return;
      if (!data) {
        setNotFoundState(true);
      } else {
        setWorkout(data);
      }
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [params.id]);

  if (loading) return <Loading label="Loading workout…" />;
  if (notFoundState) return notFound();
  if (!workout) return null;

  const specValues = {
    equipment: workout.equipment,
    difficulty: workout.difficulty,
    sets: workout.sets,
    reps: workout.reps,
    duration: `${workout.duration} min`,
    calories: `${workout.calories} kcal`,
    rating: workout.rating,
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="relative h-80 w-full overflow-hidden rounded-2xl border border-line bg-panel sm:h-[28rem]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            {workout.category.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-accent/40 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-accent"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {workout.description}
          </p>

          <div className="mt-8 overflow-hidden rounded-xl border border-line">
            {SPEC_ROWS.map(([label, key], i) => (
              <div
                key={key}
                className={`flex items-center justify-between px-4 py-3 text-sm ${
                  i % 2 === 0 ? "bg-panel" : "bg-panel2"
                }`}
              >
                <span className="font-semibold uppercase tracking-wide text-muted">
                  {label}
                </span>
                <span className="font-semibold text-white">
                  {specValues[key]}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="mb-3 font-display text-lg font-bold uppercase tracking-wide text-white">
              Instructions
            </h2>
            <ol className="space-y-3">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-ink">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => addToPlan(workout)}
              className="flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink transition-transform hover:scale-105"
            >
              <PlusIcon /> Add to today&apos;s plan
            </button>
            <button
              onClick={() => addToSaved(workout)}
              className="flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-accent"
            >
              <BookmarkIcon /> Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}