// components/WorkoutPanel/WorkoutPanel.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import CircularProgress from "@mui/joy/CircularProgress";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import Input from "@mui/joy/Input";
import styles from "./WorkoutPanel.module.css";

import {
  WeeklyWorkoutState,
  makeWeek,
  hydrateWeeklyState,
} from "@/lib/workoutUtils";
import { fetchWithAutoRefresh } from "@/lib/fetchWithAutoRefresh";

export default function WorkoutPanelInner() {
  const router = useRouter();


  const [ready, setReady] = useState(false);
  const [weekState, setWeekState] = useState<WeeklyWorkoutState | null>(null);

  const [modalDate, setModalDate] = useState<string | null>(null);
  const [name, setName]           = useState("");

 
  const userId      = () => JSON.parse(localStorage.getItem("user") || "{}").userId;
  const weekStartIso = () => dayjs().startOf("isoWeek").format("YYYY-MM-DD");

 
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchWithAutoRefresh(
          `http://localhost:8080/api/workout-week?userId=${userId()}&weekStart=${weekStartIso()}`,
        );
        if (!res.ok) throw new Error(await res.text());

        const json = await res.json(); // { goalDays, days:[…] }
        const base = {
          goalDays: json.goalDays,
          totalDaysWithWorkouts: json.days.filter((d:any)=>d.workouts.length).length,
          week: makeWeek(json.weekStart),
        };

        setWeekState(hydrateWeeklyState(base, json.days));
      } catch (err) {
        console.error("Workout-week fetch failed → fallback to empty", err);
        const base = { goalDays: 5, totalDaysWithWorkouts: 0, week: makeWeek() };
        setWeekState(base);
      } finally {
        setReady(true);
      }
    })();
  }, []);

  
  const pushWorkoutMetric = async (value: number) => {
    try {
      await fetchWithAutoRefresh(
        `http://localhost:8080/api/metrics/${userId()}`,
        {
          method : "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            name : "Workout",   
            value,
            unit : "days",
          }),
        },
      );
    } catch (err) {
      console.warn("Couldn’t push workout metric", err);
    }
  };

  
  const prevCountRef = useRef<number | null>(null);

  useEffect(() => {
    if (!weekState) return;
    const cur = weekState.totalDaysWithWorkouts;
    if (prevCountRef.current === cur) return;  

    prevCountRef.current = cur;
    pushWorkoutMetric(cur);                    
  }, [weekState?.totalDaysWithWorkouts]);      


  const add = async () => {
    if (!modalDate || !name.trim() || !weekState) return;

    try {
      const res = await fetchWithAutoRefresh(
        `http://localhost:8080/api/workout-week/log`,
        {
          method : "POST",
          headers: { "Content-Type": "application/json" },
          body   : JSON.stringify({
            userId : userId(),
            date   : modalDate,
            name   : name.trim(),
            durationMinutes: 30,
            caloriesBurned : 200,
          }),
        },
      );
      if (!res.ok) throw new Error(await res.text());

      const json = await res.json(); 
      const base = {
        goalDays: json.goalDays,
        totalDaysWithWorkouts: json.days.filter((d:any)=>d.workouts.length).length,
        week: makeWeek(json.weekStart),
      };
      setWeekState(hydrateWeeklyState(base, json.days));
    } catch (err) {
      console.error("Failed to log workout:", err);
    } finally {
      setModalDate(null);
      setName("");
    }
  };

  
  if (!ready || !weekState) return null;

  const pct   = Math.min(
    100,
    Math.round((weekState.totalDaysWithWorkouts / weekState.goalDays) * 100),
  );
  const today = dayjs().format("YYYY-MM-DD");

  return (
    <section className={styles.panel}>

      {/* summary */}
      <div className={styles.summary}>
        <CircularProgress determinate value={pct} color="success">
          <span className={styles.bigPct}>
            {weekState.totalDaysWithWorkouts}/{weekState.goalDays}
          </span>
        </CircularProgress>

        <div className={styles.totalLabelWithButton}>
          <div className={styles.totalLabel}>
            <h2>Workout Days This Week</h2>
            <span>
              {weekState.totalDaysWithWorkouts} / {weekState.goalDays}
            </span>
          </div>

          {/* <Button
            size="sm"
            onClick={() => router.push(`/workout-today?date=${today}`)}
          >
            Start Today
          </Button> */}
        </div>
      </div>

      {/* days grid */}
      <div className={styles.daysGrid}>
        {weekState.week.map((d) => (
          <div key={d.date} className={styles.dayBlock}>
            <div className={styles.dayHeader}>
              <h3>{d.dayLabel}</h3>
              <Button size="sm" onClick={() => setModalDate(d.date)}>
                + Track
              </Button>
            </div>

            {d.workouts.length ? (
              <ul className={styles.exerciseList}>
                {d.workouts.map((w) => (
                  <li key={w.id}>{w.name}</li>
                ))}
              </ul>
            ) : (
              <p className={styles.emptyText}>No workouts</p>
            )}
          </div>
        ))}
      </div>

      {/* modal */}
      <Modal open={!!modalDate} onClose={() => setModalDate(null)}>
        <Sheet
          sx={{
            p: 3,
            borderRadius: "md",
            width: 300,
            mx: "auto",
            mt: "20vh",
          }}
        >
          <h2>Add Workout</h2>
          <Input
            placeholder="Workout name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ my: 2 }}
          />
          <Button onClick={add}>Add</Button>
        </Sheet>
      </Modal>
    </section>
  );
}
