"use client";

import styles from "./WorkoutToday.module.css";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import { IoAdd, IoSearch, IoTrash } from "react-icons/io5";
import { fetchWithAutoRefresh } from "@/lib/fetchWithAutoRefresh";

/* -------------------------------------------------------------------------- */
/*  Type definitions                                                           */
/* -------------------------------------------------------------------------- */
interface Exercise {
  id: number;
  exercise: string;
  difficulty_level: string;
  short_youtube_demo?: { url?: string };
  in_depth_youtube_explanation?: any;
  target_muscle_group?: string;
  prime_mover_muscle?: string;
  secondary_muscle?: string;
  posture?: string;
  primary_equipment?: string;
}

interface UserExercise {
  id: number;
  name: string;
  sets: { setNumber: number; reps: number; weight: number }[];
}
interface NewWorkoutPayload {
  title: string;
  description: string;
  duration: number;
  type: string;
  imageUrl: string;
  exercises: {
    exerciseId: number;
    sets: { reps: number; weight: number }[];
  }[];
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */
export default function CreateWorkoutPage() {
  const router = useRouter();

  /* ---------------------- Workout-level state ---------------------- */
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [duration, setDur] = useState<number | "">(""); // minutes
  const [type, setType] = useState<string | null>(null);
  const [imageUrl, setImg] = useState("");

  /* ---------------------- Exercise bank + search ------------------- */
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  /* ---------------------- Chosen exercises ------------------------ */
  const [selected, setSelected] = useState<UserExercise[]>([]);

  /* ---------------------------------------------------------------- */
  /*  Fetch full exercise list once                                   */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetchWithAutoRefresh("http://localhost:8080/api/exercises");
        const data = await res.json();
        if (alive && Array.isArray(data)) setAllExercises(data);
      } catch (err) {
        console.error("Failed to fetch exercises:", err);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Helpers                                                         */
  /* ---------------------------------------------------------------- */
  const addExercise = (ex: Exercise) => {
    if (selected.some((x) => x.id === ex.id)) return; // already chosen
    setSelected((sel) => [
      ...sel,
      { id: ex.id, name: ex.exercise, sets: [] },
    ]);
  };

  const removeExercise = (id: number) =>
    setSelected((sel) => sel.filter((x) => x.id !== id));

  const addSet = (id: number) => {
    const repsStr = prompt("Reps?");
    const weightStr = prompt("Weight (kg)?");
    const reps = parseInt(repsStr ?? "0", 10);
    const weight = parseFloat(weightStr ?? "0");
    if (!reps || !weight) return;
    setSelected((sel) =>
      sel.map((ex) =>
        ex.id === id
          ? {
              ...ex,
              sets: [
                ...ex.sets,
                { setNumber: ex.sets.length + 1, reps, weight },
              ],
            }
          : ex
      )
    );
  };

  const totalVolume = useMemo(
    () =>
      selected.reduce(
        (sum, ex) =>
          sum + ex.sets.reduce((s, set) => s + set.reps * set.weight, 0),
        0
      ),
    [selected]
  );

  /* ---------------------------------------------------------------- */
  /*  Submit workout                                                  */
  /* ---------------------------------------------------------------- */
  const saveWorkout = async () => {
    const payload: NewWorkoutPayload = {
      title,
      description,
      duration: typeof duration === "number" ? duration : 0,
      type: type ?? "other",
      imageUrl,
      exercises: selected.map((e) => ({
        exerciseId: e.id,
        sets: e.sets.map(({ reps, weight }) => ({ reps, weight })),
      })),
    };

    try {
      const res = await fetchWithAutoRefresh("http://localhost:8080/api/user-workouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      alert("Workout created! 🎉");
      router.push("/dashboard");
    } catch {
      alert("Something went wrong – please try again.");
    }
  };

  /* ---------------------------------------------------------------- */
  /*  Derived filtered list                                           */
  /* ---------------------------------------------------------------- */
  const filteredExercises = allExercises.filter((ex) =>
    ex.exercise.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ---------------------------------------------------------------- */
  /*  Render                                                          */
  /* ---------------------------------------------------------------- */
  return (
    <Box className={styles.page}>
      {/* ---------------- Workout meta ---------------- */}
      <Stack className={styles.meta} spacing={2}>
        <Input
          placeholder="Workout title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          minRows={3}
          placeholder="Description"
          value={description}
          onChange={(e) => setDesc(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Duration (min)"
          value={duration}
          onChange={(e) => setDur(e.target.value ? Number(e.target.value) : "")}
        />
        <Select
          placeholder="Type"
          value={type}
          onChange={(_, v) => setType(v ?? null)}
        >
          {workoutTypes.map((t) => (
            <Option key={t} value={t}>
              {cap(t)}
            </Option>
          ))}
        </Select>
        <Input
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImg(e.target.value)}
        />
      </Stack>

      {/* ---------------- Search bar ---------------- */}
      <Input
        className={styles.search}
        startDecorator={<IoSearch />}
        placeholder="Search exercises…"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* ---------------- Suggestions list ---------------- */}
      {searchTerm && filteredExercises.length > 0 && (
        <List className={styles.suggestions} size="sm">
          {filteredExercises.slice(0, 15).map((ex) => (
            <ListItem
              key={ex.id}
              sx={{ cursor: "pointer", flexDirection: "column", gap: 0.5 }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
                onClick={() => setExpandedId(expandedId === ex.id ? null : ex.id)}
              >
                <Typography>
                  {ex.exercise} – {ex.difficulty_level}
                </Typography>
                <Button
                  size="sm"
                  variant="soft"
                  onClick={(e) => {
                    e.stopPropagation();
                    addExercise(ex);
                  }}
                  disabled={selected.some((s) => s.id === ex.id)}
                >
                  {selected.some((s) => s.id === ex.id) ? "✓ Added" : "Add"}
                </Button>
              </Box>
              {expandedId === ex.id && (
                <Box sx={{ py: 0.5, pl: 1 }}>
                  {ex.target_muscle_group && (
                    <Typography level="body-sm">
                      <strong>Target Muscle:</strong> {ex.target_muscle_group}
                    </Typography>
                  )}
                  {ex.primary_equipment && (
                    <Typography level="body-sm">
                      <strong>Equipment:</strong> {ex.primary_equipment}
                    </Typography>
                  )}
                  {ex.prime_mover_muscle && (
                    <Typography level="body-sm">
                      <strong>Prime mover:</strong> {ex.prime_mover_muscle}
                    </Typography>
                  )}
                  {ex.secondary_muscle && (
                    <Typography level="body-sm">
                      <strong>Secondary muscle:</strong> {ex.secondary_muscle}
                    </Typography>
                  )}
                </Box>
              )}
            </ListItem>
          ))}
        </List>
      )}

      {/* ---------------- Selected exercises ---------------- */}
      <Stack className={styles.selected} spacing={2}>
        {selected.map((ex) => (
          <Card key={ex.id} className={styles.exerciseCard}>
            <CardContent>
              <Box className={styles.exerciseHead}>
                <Typography level="title-md">{ex.name}</Typography>
                <Box className={styles.exerciseBtns}>
                  <Button
                    size="sm"
                    variant="soft"
                    onClick={() => addSet(ex.id)}
                    startDecorator={<IoAdd />}
                  >
                    Add set
                  </Button>
                  <IconButton
                    size="sm"
                    variant="plain"
                    color="danger"
                    onClick={() => removeExercise(ex.id)}
                  >
                    <IoTrash />
                  </IconButton>
                </Box>
              </Box>

              {ex.sets.length > 0 && (
                <List className={styles.setList} size="sm">
                  {ex.sets.map((s) => (
                    <ListItem key={s.setNumber}>
                      Set {s.setNumber}: {s.weight} kg × {s.reps}
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* ---------------- Summary & actions ---------------- */}
      <Stack direction="row" spacing={2} className={styles.actions}>
        <Typography sx={{ flexGrow: 1 }}>
          Total volume: {totalVolume} kg·reps
        </Typography>
        <Button
          onClick={saveWorkout}
          variant="solid"
          disabled={!title || !selected.length}
        >
          Save workout
        </Button>
      </Stack>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* ------------------------- Utilities ------------------------------ */
const workoutTypes = [
  "strength",
  "hypertrophy",
  "cardio",
  "mobility",
  "skill",
  "other",
] as const;

const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
