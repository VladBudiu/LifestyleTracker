"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/joy";
import SignupNavbar from "@/components/signup/SignupNavbar";
import "../SignupStyles.css";
import { writeDraft } from "@/lib/registrationCookie";

export default function SignupWeightGoal() {
  const router = useRouter();

  return (
    <>
      {/* <SignupNavbar /> */}
      <Box className="signupWrapper">
        <Box className="insideBox">
          <Typography variant="h5" style={{ marginBottom: 10 }}>
            What is your weight goal?
          </Typography>
          <Button
            variant="outlined"
            style={{ width: 300, marginBottom: 20, alignSelf: "center"  }}
            onClick={() =>{
              writeDraft({"weightGoal": "Lose"})
              router.push("/signup/activity")} }
          >
            Lose Weight
          </Button>
          <Button
            variant="outlined"
            style={{ width: 300, marginBottom: 20, alignSelf: "center"  }}
            onClick={() =>{
              writeDraft({"weightGoal": "Maintain"})
              router.push("/signup/activity")} }
          >
            Maintain Weight
          </Button>
          <Button
            variant="outlined"
            style={{ width: 300, alignSelf: "center" }}
            onClick={() =>{
              writeDraft({"weightGoal": "Gain"})
              router.push("/signup/activity")} }
          >
            Gain Weight
          </Button>
        </Box>
      </Box>
    </>
  );
}
