/* app/components/FoodSearchModal/FoodSearchModal.tsx */
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Box, Input, List, ListItem, ListItemButton, ListItemDecorator,
  Modal, ModalClose, ModalDialog, Sheet, Typography
} from "@mui/joy";
import { IoAdd, IoSearch } from "react-icons/io5";
import type { Food } from "@/components/CaloriePanel/CaloriePanel";
import { debounce } from "@/lib/debounce";

export interface FoodSearchModalProps {
  open   : boolean;
  mealId : string | null;
  onAdd  : (food: Food, mealId: string) => void;
  onClose: () => void;
}

export default function FoodSearchModal({ open, mealId, onAdd, onClose }: FoodSearchModalProps) {
  const [query , setQuery ] = useState("");
  const [grams , setGrams ] = useState(100);
  const [results, setResults] = useState<Food[]>([]);


  const fetchFoodsDebounced = useCallback(
    debounce(async (q: string, g: number) => {
      try {
        const res = await fetch(`http://localhost:9091/api/foods?q=${encodeURIComponent(q)}`);
        if (!res.ok) return;

        const raw = await res.json();
        const scaled: Food[] = raw.map((r: any, idx: number) => ({
         
          id  : `${r.name}-${Date.now()}-${idx}`,
          name: r.name,
          kcal: Math.round(r.calories * g / 100),
          prot: +(r.protein  * g / 100).toFixed(1),
          carbs:+(r.carbs    * g / 100).toFixed(1),
          fat : +(r.fat      * g / 100).toFixed(1),
          quantity: g,
        }));
        setResults(scaled);
      } catch (err) {
        console.error("Food search failed:", err);
      }
    }, 300),
    []  
  );
 /* ---- effect: call debounced fetch when query or grams change ---- */
  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    fetchFoodsDebounced(query, grams);
  }, [query, grams, fetchFoodsDebounced]);

 
  const handleClose = () => {
    setQuery("");
    setGrams(100);
    setResults([]);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} disablePortal>
      <ModalDialog sx={{ width: 500, maxWidth: "90vw" }}>
        <ModalClose />
        <Typography level="h4" mb={2}>Add food</Typography>

        {/* search + grams inputs */}
        <Box display="flex" gap={1} mb={2} flexWrap="wrap">
          <Input
            startDecorator={<IoSearch />}
            placeholder="Search food…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            sx={{ flexGrow: 1, minWidth: 220 }}
            autoFocus
          />
          <Input
            type="number"
            value={grams}
            onChange={e => setGrams(Number(e.target.value))}
            endDecorator="g"
            slotProps={{ input: { min: 1, step: 1 } }}
            sx={{ width: 120 }}
          />
        </Box>

        {/* search results */}
        <Sheet variant="outlined" sx={{ maxHeight: "60vh", overflow: "auto" }}>
          <List>
            {results.map((item, idx) => (
              
              <ListItem key={`${item.name}-${idx}`} sx={{ alignItems: "flex-start" }}>
                <ListItemButton
                  disabled={!mealId}
                  onClick={() => { if (mealId) onAdd(item, mealId); handleClose(); }}
                  sx={{ gap: 1 }}
                >
                  <ListItemDecorator><IoAdd /></ListItemDecorator>
                  <Box>
                    <Typography>
                      {item.name}&nbsp;
                      <Typography level="body-sm" component="span">
                        ({grams}&nbsp;g)
                      </Typography>
                    </Typography>
                    <Typography level="body-sm">
                      {item.kcal}&nbsp;kcal • {item.prot} P {item.carbs} C {item.fat} F
                    </Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Sheet>
      </ModalDialog>
    </Modal>
  );
}
