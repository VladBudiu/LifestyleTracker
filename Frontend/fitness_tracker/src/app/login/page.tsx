"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Typography,
  Link as JoyLink,
  FormControl,
  FormLabel,
  Sheet,
} from "@mui/joy";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import "../signup/SignupStyles.css";

const Login = () => {
  const router = useRouter();

  const [loginCreds, setLoginCreds] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginCreds({ ...loginCreds, [name]: value });
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginCreds),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
      console.log("Login response:", data);

      localStorage.setItem(
        "user",
        JSON.stringify({
          userId: data.userId,
        })
      );

      router.push("/myhome");
    } catch (err: any) {
      setError("Login failed: " + err.message);
    }
  };

  const googleAuth = () => {
    window.open(
      "https://myfitnesspalclone17.herokuapp.com/google/callback",
      "_self"
    );
  };

  return (
    <Box className="signupWrapper">
      <Sheet
        variant="outlined"
        className="insideBox"
        sx={{
          maxWidth: 400,
          mx: "auto",
          mt: 4,
          p: 3,
          borderRadius: "md",
          height: "fit-content",
        }}
      >
        <form onSubmit={handleLoginSubmit}>
          <Typography level="h4" textAlign="center" mb={2}>
            Member Login
          </Typography>

          <FormControl required>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              name="email"
              value={loginCreds.email}
              onChange={handleLoginChange}
            />
          </FormControl>

          <FormControl required sx={{ mt: 2 }}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={loginCreds.password}
              onChange={handleLoginChange}
            />
          </FormControl>

          {error && (
            <Typography color="danger" level="body-sm" mt={1}>
              {error}
            </Typography>
          )}

          {/* <JoyLink
            onClick={() => alert("Reset flow not implemented")}
            sx={{ display: "block", mt: 1, cursor: "pointer" }}
            underline="hover"
            color="primary"
          >
            Forgot Password?
          </JoyLink> */}

          <Button
            type="submit"
            variant="solid"
            color="primary"
            fullWidth
            size="lg"
            sx={{ mt: 3 }}
          >
            LOG IN
          </Button>

        </form>
      </Sheet>

      <Typography
        level="body-sm"
        color="neutral"
        textAlign="center"
        mt={3}
        sx={{ width: "100%" }}
      >
        Not a member?{" "}
        <JoyLink
          onClick={() => router.push("/signup/welcome")}
          underline="hover"
          color="primary"
          sx={{ cursor: "pointer" }}
        >
          Sign Up now
        </JoyLink>
      </Typography>
    </Box>
  );
};

export default Login;
