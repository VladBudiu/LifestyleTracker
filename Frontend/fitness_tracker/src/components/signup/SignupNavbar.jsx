"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Box, Button, AppBar, Toolbar } from "@mui/material";
import logo from "../../assets/logo.png"; 

export default function SignupNavbar() {
  const router = useRouter();

  
  return (
    <AppBar position="static" style={{ backgroundColor: "#fff", color: "#000" }}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <img
          src={logo}
          alt="logo"
          style={{ width: 150, cursor: "pointer" }}
          onClick={() => router.push("/")}
        />
        <Button
          variant="text"
          onClick={() => router.push("/login")}
        >
          LOG IN
        </Button>
      </Toolbar>
    </AppBar>
  );
}
