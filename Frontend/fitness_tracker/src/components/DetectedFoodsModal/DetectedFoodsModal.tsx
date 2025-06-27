/* app/components/DetectedFoodsModal.tsx */
"use client";

import {
  Modal,
  ModalDialog,
  ModalClose,
  List,
  ListItem,
  Box,
  Button,
  Typography,
  Input,
  Sheet,
  CircularProgress,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Food, MealId } from "@/components/CaloriePanel/CaloriePanel";


interface RawFood {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}
interface LocalState {
  id: string;      
  label: string;   
  base?: RawFood | null; 
  qty: number;     
}
interface Props {
  foods: Food[];
  open: boolean;
  onAdd: (food: Food, meal: MealId) => void;
  onClose: () => void;
}

export default function DetectedFoodsModal({
  foods,
  open,
  onAdd,
  onClose,
}: Props) {
  const [items, setItems] = useState<LocalState[]>([]);
  const router = useRouter(); 

  
  useEffect(() => {
    if (!open) {
      setItems([]);
      return;
    }

    const init = foods.map((f, idx) => ({
      id: `${f.name}-${idx}`,
      label: f.name,
      base: undefined, 
      qty: 100,
    }));
    setItems(init);

    Promise.all(
      init.map(async (i) => {
        try {
          const res = await fetch(
            `http://localhost:9091/api/foods?q=${encodeURIComponent(i.label)}`
          );
          if (!res.ok) throw new Error();
          const data: RawFood[] = await res.json();
          return { ...i, base: data[0] ?? null };
        } catch {
          return { ...i, base: null };
        }
      })
    ).then(setItems);
    
  }, [open]);

  
  const toFood = (state: LocalState): Food | null => {
    if (!state.base) return null;
    const { calories, protein, carbs, fat, name } = state.base;
    const f = state.qty / 100;
    return {
      id: `${name}-${Date.now()}`,
      name,
      kcal: Math.round(calories * f),
      prot: +(protein * f).toFixed(1),
      carbs: +(carbs * f).toFixed(1),
      fat: +(fat * f).toFixed(1),
      quantity: state.qty,
    };
  };

  
  const handleAdd = (food: Food, meal: MealId) => {
    onAdd(food, meal);  
    router.refresh();   
    setItems([]);       
    onClose();         
  };

  return (
    <Modal open={open} onClose={onClose} disablePortal>
      <ModalDialog>
        <ModalClose />
        <Typography level="h4" mb={1}>
          Detected foods
        </Typography>

        <Sheet variant="outlined" sx={{ maxHeight: 450, overflow: "auto" }}>
          <List>
            {items.map((it, idx) => {
              const food = toFood(it);
              return (
                <ListItem
                  key={it.id}
                  sx={{ flexDirection: "column", alignItems: "flex-start" }}
                >
                  <Typography fontWeight="lg">{it.label}</Typography>

                  {/* loading / not-found states */}
                  {it.base === undefined && (
                    <Box mt={1} mb={1}>
                      <CircularProgress size="sm" />
                    </Box>
                  )}
                  {it.base === null && (
                    <Typography level="body-sm" color="danger" mb={1}>
                      No nutrition data found
                    </Typography>
                  )}

                  {/* quantity picker + meal buttons */}
                  {it.base && (
                    <>
                      <Box display="flex" gap={1} mb={1}>
                        <Input
                          type="number"
                          value={it.qty}
                          onChange={(e) =>
                            setItems((cur) =>
                              cur.map((c, i) =>
                                i === idx ? { ...c, qty: Math.max(1, +e.target.value) } : c
                              )
                            )
                          }
                          endDecorator="g"
                          slotProps={{ input: { min: 1, step: 1 } }}
                          sx={{ width: 100 }}
                        />
                        <Typography level="body-sm" mt={0.5}>
                          {food!.kcal} kcal • {food!.prot} P {food!.carbs} C {food!.fat} F
                        </Typography>
                      </Box>

                      {(["breakfast", "lunch", "dinner", "snacks"] as MealId[]).map(
                        (m) => (
                          <Button
                            key={m}
                            size="sm"
                            variant="soft"
                            disabled={!food}
                            onClick={() => food && handleAdd(food, m)} 
                            sx={{ mr: 0.5, mb: 0.5 }}
                          >
                            {m}
                          </Button>
                        )
                      )}
                    </>
                  )}
                </ListItem>
              );
            })}
          </List>
        </Sheet>
      </ModalDialog>
    </Modal>
  );
}
