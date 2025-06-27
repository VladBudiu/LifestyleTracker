// components/MetricGrid/MetricGrid.tsx
"use client";
import MetricCard from "@/components/MetricCard/MetricCard";
import { Metric } from "@/lib/workoutUtils";
import styles from "./MetricGrid.module.css";

/* Utility to split array into rows of 2 items each */
const chunk = <T,>(arr: T[]) =>
  Array.from({ length: Math.ceil(arr.length / 2) }, (_, i) =>
    arr.slice(i * 2, i * 2 + 2)
  );

export default function MetricGrid({
  metrics,
  onClick,
}: {
  metrics: Metric[];
  onClick?: (m: Metric) => void;
}) {
  const rows = chunk(metrics);

  return (
    <div className={styles.wrapper}>
      {rows.map((row, i) => (
        <div
          key={i}
          className={`${styles.row} ${i % 2 === 0 ? styles.light : styles.dark}`}
        >
          {row.map((m, j) => (
            <MetricCard
              key={m.id ?? m.name ?? `${i}-${j}`}
              metric={m}
              onClick={onClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
