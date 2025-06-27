// lib/workoutUtils.ts
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { v4 as uuid } from "uuid";

dayjs.extend(isoWeek);
dayjs.extend(advancedFormat);


export const weekKey = (date: dayjs.Dayjs | string) =>
      dayjs(date).startOf("isoWeek").format("YYYY-MM-DD");


export interface Metric {
  id: string;
  name: string;
  value: number;
  goal: number;
  unit: string;
  category: string;
  direction?: "gain" | "loss";
}

export interface LoggedSet {
  id: string;
  setNumber: number;
  reps: number;
  weight: number;          // kg
}

export interface Exercise {
  id: string;
  name: string;
  durationMinutes: number;
  caloriesBurned: number;
  sets?: LoggedSet[];
}

export interface WorkoutDay {
  date: string;            // YYYY-MM-DD
  dayLabel: string;        // Mon, Tue …
  workouts: Exercise[];
}

export interface WeeklyWorkoutState {
  totalDaysWithWorkouts: number;
  goalDays: number;
  week: WorkoutDay[];
}

/*  Week helpers  */
export function makeWeek(date: dayjs.Dayjs | string = dayjs()): WorkoutDay[] {
  const start = dayjs(date).startOf("isoWeek");  
  return Array.from({ length: 7 }, (_, i) => {
    const d = start.add(i, "day");
    return {
      date: d.format("YYYY-MM-DD"),
      dayLabel: d.format("ddd"),
      workouts: [],
    };
  });
}


export function hydrateWeeklyState(
  base: WeeklyWorkoutState,
  backendDays: { date: string; workouts: Exercise[] }[]
): WeeklyWorkoutState {
  if (!Array.isArray(backendDays)) {
    console.warn("hydrateWeeklyState: expected array, got", backendDays);
    return base;
  }

  const map = new Map(backendDays.map(d => [d.date, d.workouts]));

  const hydrated = base.week.map((d) => ({
    ...d,
    workouts: map.get(d.date) ?? [],
  }));

  return {
    ...base,
    week: hydrated,
    totalDaysWithWorkouts: hydrated.filter((d) => d.workouts.length > 0).length,
  };
}


/* ---------- Safe browser-only persistence ---------- */
export const isBrowser = typeof window !== "undefined";

export function persistWeek(state: WeeklyWorkoutState) {
  if (!isBrowser || !Array.isArray(state.week)) return;

  const safeState = {
    ...state,
    totalDaysWithWorkouts: state.week.filter((d) => Array.isArray(d.workouts) && d.workouts.length > 0).length,
  };

  localStorage.setItem(`workouts-week-${state.week[0].date}`, JSON.stringify(safeState));
}

export function fetchPersistedWeek(startDate: string): WeeklyWorkoutState | null {
  if (!isBrowser) return null;
  try {
    const raw = localStorage.getItem(`workouts-week-${startDate}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed?.week)) return null;
    return parsed as WeeklyWorkoutState;
  } catch {
    return null;
  }
}

export { uuid }; 