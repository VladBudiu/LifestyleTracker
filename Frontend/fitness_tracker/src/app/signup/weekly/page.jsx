"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Typography,
} from "@mui/joy";
import SignupNavbar from "@/components/signup/SignupNavbar";
import "../SignupStyles.css";
import { writeDraft } from "@/lib/registrationCookie";

export default function SignupWeekly() {
  
  const router = useRouter();

  const handleClick = (weeklyGoal) => {
    writeDraft({"weekly": weeklyGoal})
    router.push("/signup/username");
  };

  return (
    <>
      <Box className="signupWrapper">
        <Box className="insideBox">
          <Typography variant="h5" style={{ marginBottom: 10 }}>
            What is your weekly goal?
          </Typography>
          <Typography style={{ color: "#A0A0A0" }}>
            Let&apos;s break down your overall health goal into a weekly one
          </Typography>
          <Typography style={{ color: "#A0A0A0", marginBottom: 20 }}>
            you can maintain. Slow-and-steady is best!
          </Typography>

          <Button variant="outlined" style={{ color: "#0066EE", width: 370, marginBottom: 20, alignSelf:"center" }} onClick={()=>handleClick("0.25")}>
            Lose 0.25 kilograms per week
          </Button>
          <Button variant="outlined" style={{ color: "#0066EE", width: 370, marginBottom: 20, alignSelf:"center" }} onClick={()=>handleClick("0.5")}>
            Lose 0.5 kilograms per week (Recommended)
          </Button>
          <Button variant="outlined" style={{ color: "#0066EE", width: 370, marginBottom: 20, alignSelf:"center" }} onClick={()=>handleClick("0.75")}>
            Lose 0.75 kilograms per week
          </Button>
          <Button variant="outlined" style={{ color: "#0066EE", width: 370, alignSelf:"center" }} onClick={()=>handleClick("1")}>
            Lose 1 kilogram per week
          </Button>
        </Box>
      </Box>
    </>
  );
}
