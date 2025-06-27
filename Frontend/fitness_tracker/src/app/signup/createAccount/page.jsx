"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Typography,
  Input,
  FormControl,
  FormLabel,
} from "@mui/joy";
import { FcGoogle } from "react-icons/fc";
import SignupNavbar from "@/components/signup/SignupNavbar";
import { writeDraft, readDraft, clearDraft } from "@/lib/registrationCookie";
import "../SignupStyles.css";

export default function SignupCreateAcc() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleContinue = async (e) => {
    e.preventDefault();

    writeDraft({ email, password });

    const signupData = readDraft();

    try {
      const res = await fetch("http://localhost:8080/signup/createAccount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
        credentials: "include",
      });

      if (res.ok) {
        router.push("/signup/congrats");
      } else {
        const error = await res.json();
        alert("Signup failed: " + (error.message || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again later.");
    }
  };

  const googleAuth = () => {
    window.open("https://your-backend-domain.com/oauth2/authorization/google", "_self");
  };

  return (
    <Box className="signupWrapper">
      <Box className="insideBox" style={{ height: "fit-content", padding: 20 }}>
        <form onSubmit={handleContinue}>
          <Typography level="h5" mb={1}>
            Almost there! Create your account.
          </Typography>

          <FormControl required sx={{ width: "100%", marginY: 2 }}>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl required sx={{ width: "100%", marginBottom: 2 }}>
            <FormLabel>Create a password</FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Typography style={{ marginTop: 5 }} align="left">
            Must be at least 10 characters, no spaces.
          </Typography>

          <Box mt={4}>
            <Typography style={{}} align="center" mb={1}>
              By signing up you are agreeing to our
            </Typography>
            <Typography color="primary" sx={{ cursor: "pointer", mb: 1 }} align="center">
              Privacy Policy <span>and</span> Terms.
            </Typography>

            <Button
              variant="solid"
              color="primary"
              sx={{ width: 350, fontSize: 18 }}
              type="submit"
            >
              CONTINUE
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
