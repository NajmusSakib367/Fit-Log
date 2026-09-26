"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

const PlanContext = createContext(null);
const PLAN_CAP = 5;
const STORAGE_KEY = "fitlog-state-v1";

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setPlan(parsed.plan || []);
        setSaved(parsed.saved || []);
      }
    } catch (e) {
      console.error("Failed to read saved plan:", e);
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage whenever plan/saved change
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ plan, saved })
      );
    } catch (e) {
      console.error("Failed to persist plan:", e);
    }
  }, [plan, saved, hydrated]);

  const showToast = useCallback((message) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => {
      setToasts((t) => t.filter((toast) => toast.id !== id));
    }, 2500);
  }, []);

  const addToPlan = useCallback(
    (workout) => {
      let added = false;
      setPlan((prev) => {
        if (prev.some((w) => w.id === workout.id)) {
          showToast("Already in today's plan");
          return prev;
        }
        if (prev.length >= PLAN_CAP) {
          showToast("Today's plan is full (5 lifts max)");
          return prev;
        }
        added = true;
        return [...prev, { ...workout, done: false }];
      });
      if (added) showToast("Added to today's plan");
    },
    [showToast]
  );

  const addToSaved = useCallback(
    (workout) => {
      let added = false;
      setSaved((prev) => {
        if (prev.some((w) => w.id === workout.id)) {
          showToast("Already saved");
          return prev;
        }
        added = true;
        return [...prev, workout];
      });
      if (added) showToast("Saved for later");
    },
    [showToast]
  );

  const removeFromPlan = useCallback(
    (id) => {
      setPlan((prev) => prev.filter((w) => w.id !== id));
      showToast("Removed from plan");
    },
    [showToast]
  );

  const removeFromSaved = useCallback(
    (id) => {
      setSaved((prev) => prev.filter((w) => w.id !== id));
      showToast("Removed from saved");
    },
    [showToast]
  );

  const markAsDone = useCallback(
    (id) => {
      setPlan((prev) =>
        prev.map((w) => (w.id === id ? { ...w, done: !w.done } : w))
      );
      showToast("Marked as done");
    },
    [showToast]
  );

  const value = {
    plan,
    saved,
    hydrated,
    addToPlan,
    addToSaved,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
    toasts,
    PLAN_CAP,
  };

  return (
    <PlanContext.Provider value={value}>
      {children}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="rounded-lg bg-panel2 border border-accent/40 text-white px-4 py-3 text-sm shadow-lg shadow-black/40 animate-[fadein_0.2s_ease]"
          >
            {t.message}
          </div>
        ))}
      </div>
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}
