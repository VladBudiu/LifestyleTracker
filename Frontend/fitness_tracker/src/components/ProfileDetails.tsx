

"use client";

import React, { useEffect, useState } from "react";
import {
  Box, Button, Grid, FormControl, FormLabel,
  Input, Typography, Select, Option,
} from "@mui/joy";
import { fetchWithAutoRefresh } from "@/lib/fetchWithAutoRefresh";


const safeVal = (v: unknown) => (v ?? "") as string | number;


const normalise = (obj: any) =>
  Object.fromEntries(
    Object.entries(obj ?? {}).map(([k, v]) => [k, v ?? ""]),
  );

 
export default function ProfileDetails() {
  const [data, setData]       = useState<any>(null);
  const [editMode, setEdit]   = useState(false);
  const [form, setForm]       = useState<any>({});              

  
  useEffect(() => {
    (async () => {
      const { userId } = JSON.parse(localStorage.getItem("user") || "{}");
      const res  = await fetchWithAutoRefresh(`http://localhost:8080/api/profile/${userId}`);
      const json = await res.json();
      setData(json);
      setForm(normalise(json));                                  
    })();
  }, []);

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((p: any) => ({ ...p, [name]: value }));
  };

  
  const saveChanges = async () => {
    const { userId } = JSON.parse(localStorage.getItem("user") || "{}");
    await fetchWithAutoRefresh(
      `http://localhost:8080/api/profile/${userId}`,
      {
        method : "PUT",
        headers: { "Content-Type": "application/json" },
        body   : JSON.stringify(form),
      },
    );
    setData(form);
    setEdit(false);
  };

  if (!data) return <p>Loading profile…</p>;

  
  return (
    <Box component="form" onSubmit={e => e.preventDefault()}>
      <Grid container spacing={2}>

        {/* names */}
        <Grid xs={6}>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              name="first_name"
              value={safeVal(form.first_name)}
              onChange={handleChange}
              disabled={!editMode}
            />
          </FormControl>
        </Grid>
        <Grid xs={6}>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              name="last_name"
              value={safeVal(form.last_name)}
              onChange={handleChange}
              disabled={!editMode}
            />
          </FormControl>
        </Grid>

        {/* email */}
        <Grid xs={12}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input name="email" value={safeVal(form.email)} disabled />
          </FormControl>
        </Grid>

        {/* body stats */}
        <Grid xs={6}>
          <FormControl>
            <FormLabel>Height (cm)</FormLabel>
            <Input
              name="height"
              value={safeVal(form.height)}
              onChange={handleChange}
              disabled={!editMode}
            />
          </FormControl>
        </Grid>
        <Grid xs={6}>
          <FormControl>
            <FormLabel>Weight (kg)</FormLabel>
            <Input
              name="weight"
              value={safeVal(form.weight)}
              onChange={handleChange}
              disabled={!editMode}
            />
          </FormControl>
        </Grid>

        {/* activity level */}
        <Grid xs={12}>
          <FormControl>
            <FormLabel>Activity Level</FormLabel>
            <Select
              name="activity_level"
              value={safeVal(form.activity_level)}
              onChange={(_, v) => setForm((p: any) => ({ ...p, activity_level: v }))}
              disabled={!editMode}
            >
              <Option value="">— select —</Option>
              <Option value="low">Low</Option>
              <Option value="moderate">Moderate</Option>
              <Option value="high">High</Option>
            </Select>
          </FormControl>
        </Grid>

        {/* ---- goals header ---- */}
        <Grid xs={12}>
          <Typography level="h4" mt={3}>Goals</Typography>
        </Grid>

        {/* goals inputs */}
        {[
          ["goal_weight",     "Goal Weight (kg)"],
          ["calorie_target",  "Calories Target (kcal)"],
          ["water_goal",      "Water Goal (ml)"],
          ["sleep_goal",      "Sleep Goal (hrs)"],
          ["steps_goal",      "Steps Goal"],
          ["workout_goal",    "Workouts Goal"],
        ].map(([key, label]) => (
          <Grid xs={6} key={key}>
            <FormControl>
              <FormLabel>{label}</FormLabel>
              <Input
                name={key}
                value={safeVal(form[key as keyof typeof form])}
                onChange={handleChange}
                disabled={!editMode}
              />
            </FormControl>
          </Grid>
        ))}
      </Grid>

      {/* buttons */}
      <Box mt={3}>
        {editMode ? (
          <Button onClick={saveChanges}>Save Changes</Button>
        ) : (
          <Button onClick={() => setEdit(true)}>Edit Profile</Button>
        )}
      </Box>
    </Box>
  );
}
