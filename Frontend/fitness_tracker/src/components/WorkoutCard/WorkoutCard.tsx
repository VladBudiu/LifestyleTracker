'use client';

import React from 'react';
import styles from './WorkoutCard.module.css';

interface Workout {
  title: string;
  description: string;
  duration: number;
  imageUrl: string;
}

const WorkoutCard: React.FC<{ workout: Workout }> = ({ workout }) => {
  return (
    <div className={styles.card}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${workout.imageUrl})` }}
      />
      <div className={styles.content}>
        <h3>{workout.title}</h3>
        <p>{workout.description}</p>
        <span>{workout.duration} min</span>
      </div>
    </div>
  );
};

export default WorkoutCard;
