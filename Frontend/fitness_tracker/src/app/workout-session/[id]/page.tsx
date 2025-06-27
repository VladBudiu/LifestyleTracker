"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/joy";
import { IoAdd, IoTrash } from "react-icons/io5";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import styles from "./WorkoutNow.module.css";
import { fetchWithAutoRefresh } from "@/lib/fetchWithAutoRefresh";


interface SetRow {
  setNumber: number;
  reps: number;
  weightKg: number;
}

interface ExerciseRow {
  id: number;
  name: string;
  sets: SetRow[];
}

interface WorkoutMeta {
  title: string;
  description?: string;
  durationInMin?: number;
  type?: string;
}


export default function WorkoutSessionPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const dateParam = searchParams.get("date");
  const date = dateParam || new Date().toISOString().split("T")[0];

 
  const [meta, setMeta] = useState<WorkoutMeta | null>(null);
  const [exercises, setExercises] = useState<ExerciseRow[]>([]);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        
        let res = await fetchWithAutoRefresh(
          `http://localhost:8080/api/user-workouts/${id}`
        );
        if (res.status === 404) {
          res = await fetchWithAutoRefresh(
            `http://localhost:8080/api/workouts/${id}`
          );
        }
        if (res.ok) {
          const w = await res.json();
          setMeta({
            title: w.title ?? w.type ?? "Workout",
            description: w.description,
            durationInMin: w.durationInMin ?? w.duration,
            type: w.type,
          });
        }

        
        let exRes = await fetchWithAutoRefresh(
          `http://localhost:8080/api/user-workouts/${id}/exercises`
        );
        if (exRes.status === 404) {
          exRes = await fetchWithAutoRefresh(
            `http://localhost:8080/api/workouts/${id}/exercises`
          );
        }

        const exData = await exRes.json();
        const formatted: ExerciseRow[] = exData.map((e: any) => ({
          id: e.id,
          name: e.exercise ?? e.name,
          sets: (e.sets ?? e.userSets ?? []).map((s: any, i: number) => ({
            setNumber: i + 1,
            reps: s.reps,
            
            weightKg: s.weightKg ?? s.weight ?? 0,
          })),
        }));
        setExercises(formatted);
      } catch (err) {
        console.error("Failed to load workout session:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  
  const addSet = (exId: number) => {
    const repsStr = prompt("Reps?");
    const weightStr = prompt("Weight (kg)?");
    const reps = Number.parseInt(repsStr ?? "", 10);
    const weightKg = Number.parseFloat(weightStr ?? "");

    if (!reps || !weightKg) return;

    setExercises(prev =>
      prev.map(ex =>
        ex.id === exId
          ? {
              ...ex,
              sets: [
                ...ex.sets,
                { setNumber: ex.sets.length + 1, reps, weightKg },
              ],
            }
          : ex
      )
    );
  };

  const removeSet = (exId: number, index: number) => {
    setExercises(prev =>
      prev.map(ex =>
        ex.id === exId
          ? {
              ...ex,
              sets: ex.sets
                .filter((_, i) => i !== index)
                .map((s, i) => ({ ...s, setNumber: i + 1 })),
            }
          : ex
      )
    );
  };

  const totalVolume = useMemo(() => {
    return exercises.reduce(
      (sum, ex) =>
        sum + ex.sets.reduce((acc, s) => acc + s.reps * s.weightKg, 0),
      0
    );
  }, [exercises]);

  
  const finishSession = async () => {
    try {
      await fetchWithAutoRefresh(
        "http://localhost:8080/api/user-workouts/sessions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            workoutId: id,
            date,
            exercises: exercises.map(ex => ({
              exerciseId: ex.id,
              sets: ex.sets.map(({ reps, weightKg }) => ({ reps, weightKg })),
            })),
          }),
        }
      );

      alert("Great job! Session saved.");
      router.push("/myhome");
    } catch (e) {
      console.error(e);
      alert("Could not save workout session.");
    }
  };

  
  if (loading) return <Typography sx={{ p: 4 }}>Loading…</Typography>;

  return (
    <Box className={styles.page}>
      <Typography level="h2" sx={{ mb: 1 }}>
        {meta?.title ?? "Workout"} — {date}
      </Typography>

      {meta?.description && (
        <Typography level="body-sm" sx={{ mb: 2, maxWidth: 650 }}>
          {meta.description}
        </Typography>
      )}

      <Stack spacing={2}>
        {exercises.map(ex => (
          <Card key={ex.id} className={styles.exerciseCard}>
            <CardContent>
              <Typography level="title-md" sx={{ mb: 1 }}>
                {ex.name}
              </Typography>

              <List size="sm" className={styles.setList}>
                {ex.sets.map((s, idx) => (
                  <ListItem key={idx} sx={{ alignItems: "center" }}>
                    Set {s.setNumber}: {s.weightKg} kg × {s.reps}
                    <IconButton
                      size="sm"
                      variant="plain"
                      color="danger"
                      onClick={() => removeSet(ex.id, idx)}
                      sx={{ ml: "auto" }}
                    >
                      <IoTrash />
                    </IconButton>
                  </ListItem>
                ))}
              </List>

              <Button
                size="sm"
                variant="soft"
                startDecorator={<IoAdd />}
                onClick={() => addSet(ex.id)}
              >
                Add set
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Box className={styles.actions}>
        <Typography>Total Volume: {totalVolume} kg·reps</Typography>
        <Button variant="solid" onClick={finishSession}>
          Finish Workout
        </Button>
      </Box>
    </Box>
  );
}
