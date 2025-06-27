/* app/components/CaloriePanel/CaloriePanel.tsx */
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  Typography,
} from "@mui/joy";
import {
  IoAdd,
  IoCamera,
  IoChevronDown,
  IoChevronForward,
} from "react-icons/io5";
import { useRouter } from "next/navigation";              
import styles from "./CaloriePanel.module.css";

import FoodSearchModal   from "@/components/FoodSearchModal/FoodSearchModal";
import DetectedFoodsModal from "@/components/DetectedFoodsModal/DetectedFoodsModal";
import { fetchWithAutoRefresh } from "@/lib/fetchWithAutoRefresh";

/* ───────── Typings ───────── */
export type MealId = "breakfast" | "lunch" | "dinner" | "snacks";
export interface Food {
  id: string; name: string; kcal: number; prot: number; carbs: number; fat: number; quantity: number;
}
export interface Meal { id: MealId; foods: Food[]; }
export interface MacroGoals { protein: number; carbs: number; fat: number; }
export interface CalorieState {
  totalCalories: number; goalCalories: number;
  macros: { protein: number; carbs: number; fat: number; goals: MacroGoals };
  meals: Meal[]; waterMl: number; waterGoalMl: number;
}

/* ───────── Helpers ───────── */
const recalcTotals = (draft: CalorieState): CalorieState => {
  let kcal = 0, p = 0, c = 0, f = 0;
  draft.meals.forEach(m =>
    m.foods.forEach(x => { kcal += x.kcal; p += x.prot; c += x.carbs; f += x.fat; }),
  );
  return {
    ...draft,
    totalCalories: kcal,
    macros: { ...draft.macros, protein: p, carbs: c, fat: f },
  };
};

/* ───────── Component ───────── */
export default function CaloriePanel({
  date         = new Date().toISOString().split("T")[0],
  goalCalories = 2000,
  waterGoalMl  = 3000,
  macroGoals   = { protein: 150, carbs: 250, fat: 70 },
  onUpdated,
}: {
  date?: string; goalCalories?: number; waterGoalMl?: number;
  macroGoals?: MacroGoals; onUpdated?: (s: CalorieState) => void;
}) {
  const router = useRouter();                                // ← NEW

  /* ---------- state ---------- */
  const empty: CalorieState = {
    totalCalories: 0,
    goalCalories,
    macros: { protein: 0, carbs: 0, fat: 0, goals: macroGoals },
    meals: (["breakfast", "lunch", "dinner", "snacks"] as const).map(id => ({ id, foods: [] })),
    waterMl: 0,
    waterGoalMl,
  };
  const [data,      setData     ] = useState<CalorieState>(empty);
  const [openMeal,  setOpenMeal ] = useState<MealId | null>(null);
  const [modalMeal, setModalMeal] = useState<MealId | null>(null);
  const [detected,  setDetected ] = useState<Food[]>([]);
  const [isMobile,  setIsMobile ] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /* ---------- media query ---------- */
  useEffect(() => {
    const cb = () => setIsMobile(window.innerWidth <= 600);
    cb(); window.addEventListener("resize", cb);
    return () => window.removeEventListener("resize", cb);
  }, []);

  /* ---------- backend → state ---------- */
  const transformDiary = useCallback((d: any): CalorieState => {
    const meals: Meal[] = (["breakfast", "lunch", "dinner", "snacks"] as const).map(id => ({
      id,
      foods: (d.meals.find((m: any) => m.type?.toLowerCase?.() === id)?.foods || []).map(
        (f: any): Food => ({
          id  : f.id,
          name: f.name,
          kcal: f.calories,
          prot: f.protein,
          carbs:f.carbs,
          fat : f.fat,
          quantity: f.quantity,
        })),
    }));
    return recalcTotals({
      totalCalories: d.totalCalories,
      goalCalories : d.calorieGoal,
      macros: {
        protein: d.protein,
        carbs  : d.carbs,
        fat    : d.fat,
        goals  : d.macroGoals ?? macroGoals,
      },
      meals,
      waterMl    : d.waterMl,
      waterGoalMl: d.waterGoalMl,
    });
  }, [macroGoals]);

  
  const fetched = useRef(false);
  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    (async () => {
      const res = await fetchWithAutoRefresh(`http://localhost:8080/api/diary/${date}`);
      if (res?.ok) {
        const fresh = transformDiary(await res.json());
        setData(fresh);
        onUpdated?.(fresh);
      }
    })();
  }, [date, transformDiary, onUpdated]);

  
  const addFood = async (food: Food, mealId: MealId) => {
    
    setData(prev => {
      const meals = prev.meals.map(m =>
        m.id === mealId ? { ...m, foods: [...m.foods, food] } : m);
      return recalcTotals({ ...prev, meals });
    });

    
    const res = await fetchWithAutoRefresh(
      `http://localhost:8080/api/diary/${date}/meals/${mealId}/foods`,
      {
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body   : JSON.stringify({
          name    : food.name,
          calories: food.kcal,
          protein : food.prot,
          carbs   : food.carbs,
          fat     : food.fat,
          quantity: food.quantity,
        }),
      },
    );
    if (res?.ok) {
      const fresh = transformDiary(await res.json());
      setData(fresh);
      onUpdated?.(fresh);
      router.refresh();                               
    }
    setModalMeal(null);
  };

  const addWater = async () => {
    const res = await fetchWithAutoRefresh(
      `http://localhost:8080/api/diary/${date}/water`,
      {
        method : "PUT",
        headers: { "Content-Type": "application/json" },
        body   : JSON.stringify({ value: 250 }),
      },
    );
    if (res?.ok) {
      const fresh = transformDiary(await res.json());
      setData(fresh);
      onUpdated?.(fresh);
    }
  };

  
  const handlePhotoUpload = async (file?: File) => {
    if (!file) return;

    const form = new FormData();
    form.append("file", file);

    const res = await fetch("http://127.0.0.1:8001/api/detect", { method: "POST", body: form });
    if (!res.ok) return;

    const { labels } = await res.json() as { labels: string[] };

    const normalise = (l: string) =>
      l.toLowerCase()
       .replace(/(bowl|plate|serving|sandwich|slice|whole|piece)s?/g, "")
       .replace(/[^a-z0-9 ]+/g, " ")
       .replace(/\s{2,}/g, " ")
       .trim();

    const foods: Food[] = [];
    for (const raw of labels) {
      const query = normalise(raw);
      const nutr  = await fetch(
        `http://localhost:9091/api/foods?q=${encodeURIComponent(query)}&limit=1`
      ).then(r => r.ok ? r.json() : []);
      if (!nutr.length) continue;
      const f = nutr[0];
      foods.push({
        id  : `${f.name}-${Date.now()}`,
        name: f.name,
        kcal: Math.round(f.calories),
        prot: +f.protein.toFixed(1),
        carbs:+f.carbs.toFixed(1),
        fat : +f.fat.toFixed(1),
        quantity: 100,
      });
    }
    if (foods.length) setDetected(foods);
  };

  
  const pct      = Math.min(100, (data.totalCalories / data.goalCalories) * 100);
  const pctWater = data.waterGoalMl ? Math.min(100, (data.waterMl / data.waterGoalMl) * 100) : 0;
  const macroPct = (v: number, g: number) => Math.min(100, (v / g) * 100);
  const mealTotals = (m: Meal) => m.foods.reduce((a, f) => ({
    kcal : a.kcal  + f.kcal,
    prot : a.prot  + f.prot,
    carbs: a.carbs + f.carbs,
    fat  : a.fat   + f.fat,
  }), { kcal: 0, prot: 0, carbs: 0, fat: 0 });

  
  return (
    <>
      {/* ===== main panel ===== */}
      <section className={styles.panel}>
        {/* ---- left column ---- */}
        <div className={styles.left}>
          {/* total calories */}
          <div className={styles.totalRow}>
            <CircularProgress determinate value={pct} color="calorie">
              <span className={styles.bigPct}>{Math.round(pct)}%</span>
            </CircularProgress>
            <div className={styles.totalLabel}>
              <h2>Calorie&nbsp;Intake</h2>
              <span>{data.totalCalories}/{data.goalCalories}&nbsp;kcal</span>
            </div>
            <Button
              size="sm"
              variant="soft"
              startDecorator={<IoCamera />}
              onClick={() => fileInputRef.current?.click()}
            >
              Detect&nbsp;photo
            </Button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={e => handlePhotoUpload(e.target.files?.[0])}
            />
          </div>

          {/* macro rings */}
          <div className={styles.macros}>
            {(["protein", "carbs", "fat"] as const).map(k => {
              const percent = macroPct(data.macros[k], data.macros.goals[k]);
              return (
                <div key={k} className={styles.macroItem}>
                  <CircularProgress determinate value={percent}>
                    <span className={styles.macroPct}>{Math.round(percent)}%</span>
                  </CircularProgress>
                  <span className={styles.macroLabel}>
                    {k[0].toUpperCase() + k.slice(1)}<br />
                    {Math.round(data.macros[k])}/{data.macros.goals[k]} g
                  </span>
                </div>
              );
            })}
          </div>

          {/* meals accordion */}
          <div className={styles.meals}>
            {data.meals.map(m => {
              const totals = mealTotals(m);
              const open   = openMeal === m.id;
              return (
                <div key={m.id} className={styles.mealBlock}>
                  <div className={styles.mealHeader}>
                    <IconButton size="sm" variant="plain"
                                onClick={() => setOpenMeal(open ? null : m.id)}>
                      {open ? <IoChevronDown /> : <IoChevronForward />}
                    </IconButton>
                    <h3 className={styles.mealTitle}>{m.id[0].toUpperCase() + m.id.slice(1)}</h3>
                    <span className={styles.mealTotals}>
                      {Math.round(totals.kcal)} kcal&nbsp;|&nbsp;
                      {Math.round(totals.prot)} P&nbsp;
                      {Math.round(totals.carbs)} C&nbsp;
                      {Math.round(totals.fat)} F
                    </span>
                    <Button size="sm" className={styles.trackBtn} onClick={() => setModalMeal(m.id)}>
                      Track
                    </Button>
                  </div>

                  {open && m.foods.length > 0 && (
                    <List className={styles.foodList}>
                      {m.foods.map(f => (
                        <ListItem key={f.id}>
                          <ListItemDecorator><IoAdd /></ListItemDecorator>
                          <ListItemButton disabled>
                            <Box>
                              <Typography>
                                {f.name}&nbsp;
                                <Typography component="span" level="body-sm">
                                  ({f.quantity} g)
                                </Typography>
                              </Typography>
                              <Typography level="body-sm">
                                {f.kcal} kcal • {f.prot} P {f.carbs} C {f.fat} F
                              </Typography>
                            </Box>
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ---- water column ---- */}
        <div className={styles.waterCol}>
          <div className={styles.customWaterBar}>
            <div className={styles.customWaterFill}
                 style={isMobile ? { width: `${pctWater}%` } : { height: `${pctWater}%` }} />
          </div>
          <span className={styles.waterLabel}>
            <div>Water intake:</div>
            <div>{data.waterMl}/{data.waterGoalMl}&nbsp;ml</div>
            <Button size="sm" onClick={addWater}>+250 ml</Button>
          </span>
        </div>
      </section>

      {/* ===== modals ===== */}
      <FoodSearchModal
        open   ={modalMeal !== null}
        mealId ={modalMeal}
        onAdd  ={addFood}
        onClose={()=> setModalMeal(null)}
      />

      <DetectedFoodsModal
        open   ={detected.length > 0}
        foods  ={detected}
        onAdd  ={(f, m) => { addFood(f, m); setDetected([]); }}
        onClose={() => setDetected([])}
      />
    </>
  );
}
