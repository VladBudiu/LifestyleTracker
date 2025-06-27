"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  FormControl,
  FormLabel,
  Input,
} from "@mui/joy";
import { useRouter } from "next/navigation";
import "../SignupStyles.css";
import { writeDraft } from "@/lib/registrationCookie";

export default function SignupUsername() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const handleUsernameClick = () => {
    if (username.trim()) {
      writeDraft({ username });
      router.push("/signup/createAccount");
    } else {
      alert("Please fill the username");
    }
  };

  return (
    <Box className="signupWrapper">
      <Box className="insideBox" style={{ height: "fit-content", padding: 20 }}>
        <Typography level="h5" mb={1}>
          Create a username!
        </Typography>

        <FormControl required sx={{ width: 400, marginY: 2 }}>
          <FormLabel>Create a username</FormLabel>
          <Input
            placeholder="e.g. johndoe123"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>

        <Box display="flex" gap={2} marginTop="100px">
          <Button
            variant="outlined"
            color="primary"
            sx={{ fontSize: 18, width: 150 }}
            onClick={() => router.push("/signup/weekly")}
          >
            BACK
          </Button>
          <Button
            variant="solid"
            color="primary"
            sx={{ fontSize: 18, width: 150 }}
            onClick={handleUsernameClick}
          >
            CONTINUE
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
