"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Typography,
  FormControl,
  FormLabel,
  Input,
} from "@mui/joy";
import SignupNavbar from "@/components/signup/SignupNavbar";
import "../SignupStyles.css";
import { writeDraft } from "@/lib/registrationCookie";

export default function SignupTall() {
  const router = useRouter();

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [weightTarget, setWeightTarget] = useState("");

  return (
    <Box className="signupWrapper">
      <Box className="insideBox" style={{ padding: 20 }}>
        <Box className="tallSubBox">
          <Typography level="h5" mb={1}>
            How tall are you?
          </Typography>
          <FormControl>
            <FormLabel>Height (cm)</FormLabel>
            <Input
              placeholder="Enter height (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </FormControl>
        </Box>

        <Box className="tallSubBox">
          <Typography level="h5" mb={1}>
            How much do you weigh?
          </Typography>
          <Typography level="body-sm" mb={1} color="neutral">
            It's OK to estimate. You can update this later.
          </Typography>
          <FormControl>
            <FormLabel>Weight (kg)</FormLabel>
            <Input
              placeholder="Enter weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </FormControl>
        </Box>

        <Box className="tallSubBox">
          <Typography level="h5" mb={1}>
            What’s your goal weight?
          </Typography>
          <Typography level="body-sm" mb={1} color="neutral">
            Don’t worry. This doesn’t affect your daily calorie goal and you can always change it later.
          </Typography>
          <FormControl>
            <FormLabel>Goal Weight (kg)</FormLabel>
            <Input
              placeholder="Enter weight (kg)"
              value={weightTarget}
              onChange={(e) => setWeightTarget(e.target.value)}
            />
          </FormControl>
        </Box>

        <Box display="flex" gap={2} mt={2}>
          <Button
            variant="outlined"
            onClick={() => router.push("/signup/activity")}
          >
            BACK
          </Button>
          <Button
            variant="solid"
            color="primary"
            onClick={() => {
              writeDraft({
                height,
                weight,
                weightTarget,
              });
              router.push("/signup/weekly");
            }}
          >
            NEXT
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
