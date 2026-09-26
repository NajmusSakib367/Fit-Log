const BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

// The public API's exact field names aren't guaranteed, so every workout is
// normalized here into one consistent shape the rest of the app can rely on.
function pick(obj, keys, fallback) {
  for (const k of keys) {
    if (obj[k] !== undefined && obj[k] !== null && obj[k] !== "") return obj[k];
  }
  return fallback;
}

function toArray(val) {
  if (Array.isArray(val)) return val;
  if (typeof val === "string" && val.trim()) {
    return val.split(",").map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

export function normalizeWorkout(raw, index = 0) {
  const id = pick(raw, ["id", "_id", "workoutId"], String(index + 1));
  const name = pick(raw, ["name", "title", "workoutName"], "Untitled Workout");
  const image = pick(
    raw,
    ["image", "img", "thumbnail", "photo", "picture", "illustration"],
    "/logo.png"
  );
  const category = toArray(
    pick(raw, ["category", "categories", "tags", "muscleGroup", "tag"], [])
  );
  const equipment = pick(raw, ["equipment", "equipments", "gear"], "Bodyweight");
  const duration = Number(
    pick(raw, ["duration", "durationMinutes", "time", "minutes"], 20)
  );
  const calories = Number(
    pick(raw, ["calories", "kcal", "calorie"], 150)
  );
  const rating = Number(pick(raw, ["rating", "rate", "stars"], 4.5));
  const difficulty = pick(raw, ["difficulty", "level"], "Beginner");
  const sets = pick(raw, ["sets", "set"], 3);
  const reps = pick(raw, ["reps", "rep", "repetitions"], "8-12");
  const description = pick(
    raw,
    ["description", "desc", "subtitle", "summary"],
    "A focused, effective movement to add to your plan."
  );
  const instructions = toArray(
    pick(raw, ["instructions", "steps", "howTo", "instruction"], [])
  );

  return {
    id: String(id),
    name,
    image,
    category: category.length ? category : ["GENERAL"],
    equipment,
    duration: Number.isFinite(duration) ? duration : 20,
    calories: Number.isFinite(calories) ? calories : 150,
    rating: Number.isFinite(rating) ? rating : 4.5,
    difficulty,
    sets,
    reps,
    description,
    instructions: instructions.length
      ? instructions
      : [
          "Set up in a stable, controlled starting position.",
          "Engage your core and move with control through the full range.",
          "Focus on the target muscle group at the peak of the movement.",
          "Return to the start position with control and repeat.",
        ],
  };
}

export async function getWorkouts() {
  try {
    const res = await fetch(BASE_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch workouts");
    const json = await res.json();
    const list = Array.isArray(json) ? json : json.data || json.workouts || [];
    return list.map((item, i) => normalizeWorkout(item, i));
  } catch (err) {
    console.error("getWorkouts error:", err);
    return [];
  }
}

export async function getWorkoutById(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch workout");
    const json = await res.json();
    const raw = json.data || json;
    return normalizeWorkout(raw);
  } catch (err) {
    console.error("getWorkoutById error:", err);
    // Fall back to searching the full list, in case the :id endpoint
    // behaves differently than expected.
    const all = await getWorkouts();
    return all.find((w) => w.id === String(id)) || null;
  }
}
