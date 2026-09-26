"use client";

import { ChevronDownIcon } from "./icons";

const OPTIONS = [
  { value: "duration", label: "Duration" },
  { value: "calories", label: "Calories" },
  { value: "rating", label: "Rating" },
];

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="relative inline-flex items-center">
      <span className="mr-2 text-xs font-semibold uppercase tracking-wide text-muted">
        Sort By
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none rounded-full border border-line bg-panel2 py-2 pl-4 pr-9 text-sm font-semibold text-white outline-none focus:border-accent"
        >
          {OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
      </div>
    </div>
  );
}
