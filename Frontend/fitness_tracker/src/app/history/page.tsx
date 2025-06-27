"use client";

import {
  Box, Sheet, Typography, Input, Grid,
} from "@mui/joy";
import {
  ResponsiveContainer, LineChart, AreaChart, BarChart, ComposedChart,
  Line, Area, Bar, CartesianGrid, XAxis, YAxis, Tooltip,
} from "recharts";
import styles from "./History.module.css";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { fetchWithAutoRefresh } from "@/lib/fetchWithAutoRefresh";

const fmt = (d: string) => dayjs(d).format("MMM D");

export default function HistoryPage() {
  const [exercise, setExercise] = useState("Bench Press");
  const [chartData, setChartData] = useState<any[]>([]);
  const [exerciseSeries, setExerciseSeries] = useState<any[]>([]);
  const [weeklyWorkouts, setWeeklyWorkouts] = useState<any[]>([]);

  const start = dayjs().subtract(30, "days").format("YYYY-MM-DD");
  const end = dayjs().format("YYYY-MM-DD");

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (!userString) return;
    const { userId } = JSON.parse(userString);

    const fetchHistory = async () => {
      const res = await fetchWithAutoRefresh(`http://localhost:8080/api/history?user=${userId}&start=${start}&end=${end}`);
      const raw = await res.json();
      const chart = raw.map((d: any) => ({ ...d, dateLabel: fmt(d.date) }));
      const weeks: Record<string, number> = {};
      for (const r of raw) {
        const week = dayjs(r.date).startOf("week").format("YYYY-MM-DD");
        weeks[week] = (weeks[week] || 0) + r.workoutDays;
      }
      const weekly = Object.entries(weeks).map(([week, count]) => ({ date: week, workouts: count }));
      setChartData(chart);
      setWeeklyWorkouts(weekly);
    };

  
    fetchHistory();
  }, [exercise]);

  const minWeight = Math.min(...chartData.map((d) => d.weight ?? 100));
  const maxWeight = Math.max(...chartData.map((d) => d.weight ?? 100));

  const metricCfg = [
    { key: "calories", label: "Calories (kcal)", color: "#ff7300", Chart: AreaChart, Render: (color: string) => <Area type="monotone" dataKey="calories" stroke={color} fill={color} fillOpacity={0.2} /> },
    { key: "water",    label: "Water (ml)",      color: "#00b5ff", Chart: BarChart,   Render: (color: string) => <Bar dataKey="water" fill={color} /> },
    { key: "sleep",    label: "Sleep (hrs)",     color: "#c300ff", Chart: AreaChart,  Render: (color: string) => <Area type="monotone" dataKey="sleep" stroke={color} fill={color} fillOpacity={0.25} /> },
    { key: "steps",    label: "Steps",           color: "#ff4e50", Chart: BarChart,   Render: (color: string) => <Bar dataKey="steps" fill={color} /> },
  ];

  return (
    <Box className={styles.page} p={{ xs: 1, md: 3 }}>
      <Typography level="h2" mb={2}>Progress History</Typography>

      <Grid container spacing={2}>
        {[{ key: "weight", label: "Weight (kg)", color: "#387908", Chart: LineChart, Render: (color: string) =>
          <Line type="monotone" dataKey="weight" stroke={color} dot={false} />, yDomain: [Math.floor(minWeight - 5), Math.ceil(maxWeight + 5)] },
          ...metricCfg.map(({ key, label, color, Chart, Render }) => ({
            key, label, color, Chart, Render, yDomain: undefined,
          }))
        ].map(({ key, label, color, Chart, Render, yDomain }) => (
          <Grid key={key} xs={12} md={6}>
            <Sheet variant="outlined" className={styles.card}>
              <Typography level="title-md" mb={1}>{label}</Typography>
              <ResponsiveContainer width="100%" height={260}>
                <Chart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dateLabel" />
                  <YAxis domain={yDomain} />
                  <Tooltip />
                  {Render(color)}
                </Chart>
              </ResponsiveContainer>
            </Sheet>
          </Grid>
        ))}

        <Grid xs={12} md={6}>
          <Sheet variant="outlined" className={styles.card}>
            <Typography level="title-md" mb={1}>Workouts / Week</Typography>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={weeklyWorkouts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={fmt} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="workouts" stroke="#ffd300" dot />
              </LineChart>
            </ResponsiveContainer>
          </Sheet>
        </Grid>
      </Grid>
    </Box>
  );
}
