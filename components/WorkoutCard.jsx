import Link from "next/link";
import Image from "next/image";
import { ClockIcon, FlameIcon, StarIcon } from "./icons";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-panel transition-colors hover:border-accent/60"
    >
      <div className="relative h-44 w-full overflow-hidden bg-panel2">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-2">
          {workout.category.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-accent/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white">
          {workout.name}
        </h3>
        <p className="text-xs text-muted">{workout.equipment}</p>
        <div className="mt-auto flex items-center gap-4 pt-2 text-xs text-muted">
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
    </Link>
  );
}
