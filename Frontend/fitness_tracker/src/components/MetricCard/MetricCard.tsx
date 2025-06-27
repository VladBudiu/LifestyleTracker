// components/MetricCard/MetricCard.tsx
"use client";

import LinearProgress from "@mui/joy/LinearProgress";
import styles from "./MetricCard.module.css";
import { Metric } from "@/lib/workoutUtils";

export default function MetricCard({
  metric,
  onClick,
}: {
  metric: Metric;
  onClick?: (m: Metric) => void;
}) {
  const isWeight = metric.name.toLowerCase() === "weight";
  let adjustedPct: number;

  if (isWeight && metric.direction === "loss") {
    adjustedPct =
      metric.value <= metric.goal
        ? 100
        : Math.max(0, Math.round((1 - metric.value / metric.goal) * 100));
  } else {
    adjustedPct =
      metric.goal === 0
        ? 0
        : Math.min(100, Math.round((metric.value / metric.goal) * 100));
  }

  const barColor = adjustedPct >= 100 ? "success" : "primary";

  return (
    <div className={styles.card} role="button" onClick={() => onClick?.(metric)}>
      <h3 className={styles.name}>{metric.name}</h3>

      <div className={styles.row}>
        <span className={styles.stat}>
          {metric.value} {metric.unit}
        </span>

        <LinearProgress
          determinate
          variant="soft"
          value={adjustedPct}
          color={barColor}
          className={styles.bar}
        />

        <span className={styles.statGoal}>
          {metric.goal} {metric.unit}
        </span>
      </div>
    </div>
  );
}
