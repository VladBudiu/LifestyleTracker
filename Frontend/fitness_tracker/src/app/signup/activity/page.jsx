"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/joy";
import SignupNavbar from "@/components/signup/SignupNavbar";
import "../SignupStyles.css";
import { writeDraft } from "@/lib/registrationCookie";

export default function SignupActivity() {
  const router = useRouter();

  const handleClick = (activityLevel) => {
    writeDraft({"activityLevel": activityLevel});
    router.push("/signup/tall");
  };

  return (
    <>
      <Box className="signupWrapper">
        <Box className="insideBox" style={{ height: "fit-content", padding: 20 }}>
          <Typography variant="h5">
            What is your baseline activity level?
          </Typography>
          <Typography style={{ color: "gray", marginBottom: 20 }}>
            Not including workouts–we count that separately
          </Typography>

          <Button
            variant="outlined"
            style={{
              borderColor: "#0066EE",
              width: 400,
              marginBottom: 20,
              textAlign: "center",
              alignSelf: "center",
            }}
            onClick={() => handleClick("sedentary")}
          >
            <Box p={1}>
              <Typography style={{ fontSize: 18, color: "#0066EE" }}>
                Not Very Active
              </Typography>
              <Typography style={{ fontSize: 14, color: "#909090" }}>
                Spends most of the day sitting
              </Typography>
              <Typography style={{ fontSize: 14, color: "#909090" }}>
                (e.g., bank teller, desk job)
              </Typography>
            </Box>
          </Button>

          <Button
            variant="outlined"
            style={{
              borderColor: "#0066EE",
              width: 400,
              marginBottom: 20,
              textAlign: "center",
              alignSelf: "center",
            }}
            onClick={() => handleClick("lightly active")}
          >
            <Box p={1}>
              <Typography style={{ fontSize: 18, color: "#0066EE" }}>
                Lightly Active
              </Typography>
              <Typography style={{ fontSize: 14, color: "#909090" }}>
                Spends a considerably good part of the day on your feet
              </Typography>
              <Typography style={{ fontSize: 14, color: "#909090" }}>
                (e.g., teacher, salesperson)
              </Typography>
            </Box>
          </Button>

          <Button
            variant="outlined"
            style={{
              borderColor: "#0066EE",
              width: 400,
              marginBottom: 20,
              textAlign: "center",
              alignSelf: "center",
            }}
            onClick={() => handleClick("active")}
          >
            <Box p={1}>
              <Typography style={{ fontSize: 18, color: "#0066EE" }}>
                Active
              </Typography>
              <Typography style={{ fontSize: 14, color: "#909090" }}>
                Spend a good part of the day doing some physical activity
              </Typography>
              <Typography style={{ fontSize: 14, color: "#909090" }}>
                (e.g., food server, postal carrier)
              </Typography>
            </Box>
          </Button>

          <Button
            variant="outlined"
            style={{
              borderColor: "#0066EE",
              width: 400,
              marginBottom: 20,
              textAlign: "center",
              alignSelf: "center",
            }}
            onClick={() => handleClick("very active")}
          >
            <Box p={1}>
              <Typography style={{ fontSize: 18, color: "#0066EE" }}>
                Very Active
              </Typography>
              <Typography style={{ fontSize: 14, color: "#909090" }}>
                Spend a good part of the day doing heavy physical activity
              </Typography>
              <Typography style={{ fontSize: 14, color: "#909090" }}>
                (e.g., bike messenger, carpenter)
              </Typography>
            </Box>
          </Button>
        </Box>
      </Box>
    </>
  );
}
