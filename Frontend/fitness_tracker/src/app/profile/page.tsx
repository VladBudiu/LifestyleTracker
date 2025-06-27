"use client";

import React from "react";
import { Container, Typography, Box } from "@mui/joy";
import ProfileDetails from "@/components/ProfileDetails";

export default function ProfilePage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography level="h2" gutterBottom>
        Profile & Goals
      </Typography>
      <Typography level="body-md" sx={{ color: "neutral.600", mb: 2, marginTop: "10%" }}>
        Here’s your current data. You can edit your lifestyle goals and personal information below.
      </Typography>
      <Box mt={4}>
        <ProfileDetails />
      </Box>
    </Container>
  );
}
