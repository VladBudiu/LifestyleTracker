"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Typography,
  Divider,
  Checkbox,
} from "@mui/joy";
import "../SignupStyles.css";
import { readDraft, clearDraft } from "@/lib/registrationCookie";

export default function SignupCongrats() {
  const router = useRouter();
  const [calorieGoal, setCalorieGoal] = useState(null);
  const [weightLossKg, setWeightLossKg] = useState(null);

  useEffect(() => {
    const data = readDraft();

    if (data?.weekly && data?.weight && data?.weightTarget) {
      const weeklyLoss = parseFloat(data.weekly);
      const weightNow = parseFloat(data.weight);
      const targetWeight = parseFloat(data.weightTarget);

      const totalLoss = weightNow - targetWeight;
      const dailyDeficit = (weeklyLoss * 7700) / 7;
      const estimatedGoal = Math.max(1200, 2000 - dailyDeficit);

      setCalorieGoal(Math.round(estimatedGoal));
      setWeightLossKg(Math.round(totalLoss));
    }

    clearDraft();
  }, []);

  return (
    <Box className="signupWrapper">
      <Box className="insideBox" sx={{ height: "fit-content", p: 3 }}>
        <Typography level="h3" sx={{ color: "#0066EE", fontWeight: "bold", mb: 2 }}>
          Congratulations!
        </Typography>

        <Typography fontWeight="lg" align="center" mb={1}>
          Your daily net calorie goal is:
        </Typography>

        <Typography level="h1" align="center" sx={{ fontWeight: "bold", mb: 1 }}>
          {calorieGoal !== null ? calorieGoal : "Calculating..."}
        </Typography>

        <Typography align="center" sx={{ fontWeight: "bold", fontSize: 18, color: "#0066EE", mb: 3 }}>
          calories
        </Typography>

        <Typography align="center" color="neutral" fontSize={16}>
          With this plan, you should:
        </Typography>

        <Typography align="center" sx={{ fontWeight: "bold", fontSize: 18 }}>
          {weightLossKg !== null
            ? `Lose ${weightLossKg} kg`
            : "Calculating..."}{" "}
          <Typography component="span" fontSize={16} color="neutral">
            with your new goal
          </Typography>
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Button
          variant="solid"
          color="primary"
          sx={{ fontSize: 18, mt: 2 }}
          onClick={() => router.push("/login")}
        >
          EXPLORE EVOTRACK
        </Button>
      </Box>
    </Box>
  );
}
