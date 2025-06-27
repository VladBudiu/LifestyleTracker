"use client"; // Keep this to enable client-side hooks like useRouter

import React from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/joy";
import SignupNavbar from "@/components/signup/SignupNavbar";
import "../SignupStyles.css";

export default function Page() {
  const router = useRouter();

  return (
    <>
      
      <Box className="signupWrapper">
        <Box className="insideBox">
          <Typography variant="h6">Welcome! Just a few</Typography>
          <Typography variant="h6">quick questions so we can customize</Typography>
          <Typography variant="h6">the app for you.</Typography>

         <Button
          variant="contained"
          sx={{
            bgcolor: "#0066EE",
            color: "white",
            mt: 5,
            width: 400,
            alignSelf: "center",
          }}

            onClick={() => router.push("/signup/weightGoal")}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </>
  );
}
