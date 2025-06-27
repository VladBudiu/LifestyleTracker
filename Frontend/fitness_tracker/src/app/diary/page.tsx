/* app/diary/DiaryPage.tsx */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

import NavBar       from "@/components/Navbar/Navbar";
import MetricGrid   from "@/components/MetricGrid/MetricGrid";
import CaloriePanel from "@/components/CaloriePanel/CaloriePanel";
import WorkoutPanel from "@/components/WorkoutPanel";

import {
  makeWeek,
  hydrateWeeklyState,
  persistWeek,
  fetchPersistedWeek,
  WeeklyWorkoutState,
  uuid,
} from "@/lib/workoutUtils";
import type { Metric } from "@/lib/workoutUtils";

import { fetchWithAutoRefresh } from "@/lib/fetchWithAutoRefresh";
import styles from "./Diary.module.css";

export default function DiaryPage() {
  const router = useRouter();
  const [date, setDate] = useState(dayjs());                 
  const dateStr = date.format("YYYY-MM-DD");


  const [hydrated, setHydrated] = useState(false);
  const [workoutData, setWorkoutData] = useState<WeeklyWorkoutState | null>(null);

  
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loadingMetrics, setLoadingMetrics] = useState(true);

  
  const loadMetrics = async () => {
    setLoadingMetrics(true);
    try {
      const userId = JSON.parse(localStorage.getItem("user") || "{}").userId;
      if (!userId) throw new Error("Missing user");

      const res = await fetchWithAutoRefresh(
        `http://localhost:8080/api/metrics/${userId}`,
        { credentials: "include" },
      );
      if (!res.ok) throw new Error(await res.text());

      const all: Metric[] = await res.json();
      setMetrics(all.filter(m => ["Steps", "Sleep", "Workout"].includes(m.name)));
    } catch (err) {
      console.error("Could not load metrics:", err);
    } finally {
      setLoadingMetrics(false);
    }
  };

  
  useEffect(() => {
    const base: WeeklyWorkoutState = { goalDays: 5, totalDaysWithWorkouts: 0, week: makeWeek() };
    const persisted = fetchPersistedWeek(base.week[0].date);
    setWorkoutData(hydrateWeeklyState(base, persisted));
    setHydrated(true);
  }, []);

  
  useEffect(() => { loadMetrics(); }, [dateStr]);

  
  useEffect(() => {
    if (workoutData) persistWeek(workoutData);
  }, [workoutData]);


  useEffect(() => {
    if (!workoutData) return;
    const refresh = () => {
      const persisted = fetchPersistedWeek(workoutData.week[0].date);
      if (persisted) setWorkoutData(hydrateWeeklyState(workoutData, persisted));
    };
    window.addEventListener("focus", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [workoutData]);

  
  const addWorkout = (d: string, exerciseName: string) => {
    if (!workoutData) return;

    const week = workoutData.week.map(day =>
      day.date === d
        ? {
            ...day,
            workouts: [
              ...day.workouts,
              { id: uuid(), name: exerciseName, durationMinutes: 30, caloriesBurned: 200 },
            ],
          }
        : day,
    );

    setWorkoutData({
      ...workoutData,
      week,
      totalDaysWithWorkouts: week.filter(x => x.workouts.length).length,
    });

    loadMetrics();
    router.refresh();                         
  };

  
  const [editing, setEditing] =
    useState<{ id: string; name: string; value: string } | null>(null);

  const saveMetric = async () => {
    if (!editing) return;
    const value = Number.parseFloat(editing.value);
    if (!Number.isFinite(value)) return;

    try {
      const userId = JSON.parse(localStorage.getItem("user") || "{}").userId;

      await fetchWithAutoRefresh(
        `http://localhost:8080/api/metrics/${userId}`,
        {
          method      : "PUT",
          credentials : "include",
          headers     : { "Content-Type": "application/json" },
          body        : JSON.stringify({
            name : editing.name,
            value: Math.round(value * 10) / 10,
          }),
        },
      );

      await loadMetrics();
      router.refresh();                       // ← refresh after metric update
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setEditing(null);
    }
  };

  if (!hydrated || !workoutData) return null;

  return (
    <div className={styles.page}>
      <NavBar />

      <main className={styles.centerArea}>
        {/* ---- date header ---- */}
        <header className={styles.dateBar}>
          <button onClick={() => setDate(d => d.subtract(1, "day"))}>‹</button>
          <h1 suppressHydrationWarning>{date.format("dddd, D MMMM")}</h1>
          <button onClick={() => setDate(d => d.add(1, "day"))}>›</button>
        </header>

        {/* ---- calories & water ---- */}
        <CaloriePanel
          date={dateStr}
          goalCalories={2400}
          waterGoalMl={2500}
          onUpdated={() => { loadMetrics(); router.refresh(); }}  
        />

        
        <WorkoutPanel  />

        
        <MetricGrid
          metrics={metrics}
          onClick={m => setEditing({ id: m.id, name: m.name, value: String(m.value) })}
        />
      </main>

  
      {editing && (
        <div className={styles.modalBackdrop} onClick={() => setEditing(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h2>Update</h2>
            <input
              type="number"
              value={editing.value}
              onChange={e => setEditing({ ...editing, value: e.target.value })}
            />
            <button onClick={saveMetric}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
}
