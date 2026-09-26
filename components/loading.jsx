export default function Loading({ label = "Loading workouts…" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-accent" />
      <p className="text-sm font-semibold uppercase tracking-wide text-muted">
        {label}
      </p>
    </div>
  );
}
