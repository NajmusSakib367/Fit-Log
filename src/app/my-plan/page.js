"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePlan } from "../../components/PlanContext";
import Loading from "../../components/Loading";
import {
  ClockIcon,
  FlameIcon,
  StarIcon,
  CheckIcon,
  XIcon,
} from "../../components/icons";

function Metric({ label, value }) {
  return (
    <div className="flex-1 rounded-2xl border border-line bg-panel px-6 py-5 text-center">
      <p className="font-display text-3xl font-bold text-accent">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </p>
    </div>
  );
}

function PlanCard({ workout, onRemove, onDone, showDone }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-panel p-4 sm:flex-row sm:items-center">
      <div className="relative h-24 w-full flex-shrink-0 overflow-hidden rounded-xl bg-panel2 sm:h-20 sm:w-28">
        <Image src={workout.image} alt={workout.name} fill className="object-cover" />
      </div>
      <div className="flex-1">
        <h3
          className={`font-display text-base font-bold uppercase tracking-wide ${
            workout.done ? "text-muted line-through" : "text-white"
          }`}
        >
          {workout.name}
        </h3>
        <p className="text-xs text-muted">{workout.equipment}</p>
        <div className="mt-2 flex items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1">
            <ClockIcon /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <FlameIcon /> {workout.calories} kcal
          </span>
          <span className="flex items-center gap-1 text-accent">
            <StarIcon /> {workout.rating}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-full border border-line px-3 py-2 text-xs font-bold uppercase tracking-wide text-white hover:border-accent"
        >
          View Details
        </Link>
        {showDone && (
          <button
            onClick={() => onDone(workout.id)}
            title="Mark as Done"
            className={`flex h-9 w-9 items-center justify-center rounded-full border ${
              workout.done
                ? "border-accent bg-accent text-ink"
                : "border-line text-white hover:border-accent"
            }`}
          >
            <CheckIcon />
          </button>
        )}
        <button
          onClick={() => onRemove(workout.id)}
          title="Remove"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-white hover:border-red-400 hover:text-red-400"
        >
          <XIcon />
        </button>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-line py-20 text-center">
      <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white">
        Nothing Here Yet
      </h3>
      <p className="max-w-xs text-sm text-muted">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink"
      >
        Go to workouts
      </Link>
    </div>
  );
}

export default function MyPlanPage() {
  const { plan, saved, hydrated, removeFromPlan, removeFromSaved, markAsDone } =
    usePlan();
  const [tab, setTab] = useState("plan");

  const list = tab === "plan" ? plan : saved;

  const metrics = useMemo(() => {
    return {
      exercises: plan.length,
      minutes: plan.reduce((sum, w) => sum + (w.duration || 0), 0),
      calories: plan.reduce((sum, w) => sum + (w.calories || 0), 0),
    };
  }, [plan]);

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-2 text-sm text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Metric label="Exercises" value={metrics.exercises} />
        <Metric label="Minutes" value={metrics.minutes} />
        <Metric label="Calories" value={metrics.calories} />
      </div>

      <div className="mt-10 flex gap-2 border-b border-line">
        {[
          { key: "plan", label: "Today's Plan" },
          { key: "saved", label: "Saved" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-3 text-sm font-bold uppercase tracking-wide transition-colors ${
              tab === t.key
                ? "border-b-2 border-accent text-accent"
                : "text-muted hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {!hydrated ? (
          <Loading />
        ) : list.length === 0 ? (
          <EmptyState />
        ) : (
          list.map((w) => (
            <PlanCard
              key={w.id}
              workout={w}
              showDone={tab === "plan"}
              onRemove={tab === "plan" ? removeFromPlan : removeFromSaved}
              onDone={markAsDone}
            />
          ))
        )}
      </div>
    </div>
  );
}
