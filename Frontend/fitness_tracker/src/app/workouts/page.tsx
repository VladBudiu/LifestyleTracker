'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import styles from './Workouts.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { fetchWithAutoRefresh } from '@/lib/fetchWithAutoRefresh';
import { useRouter } from 'next/navigation';

interface Workout {
  id: number;
  name: string;
  description: string;
  muscle_group: string;
  imageUrl: string;
  numberOfExercises: number;
}

interface Exercise {
  exercise: string;
  difficultyLevel: string;
}

interface GroupData {
  type: string;
  workouts: Workout[];
}

/**
 * -----------------------------------------------------------------------------
 *  🖼  BASE WORKOUT PICTURES
 * -----------------------------------------------------------------------------
 *  1.  Put all your fallback images (jpg / png / webp) in the **public** folder
 *      under baseWorkoutPictures** →   public/baseWorkoutPictures/..
 *  2.  List them below *once* and we will randomly pick one every time a workout
 *      comes back from the API without a predefined `imageUrl`.
 *  3.  Because they live in **public** you can reference them with a simple
 *      absolute URL (starting with '/') and you do **NOT** need to import or
 *      use <Image/> if you don’t want to. Swiper just needs a URL string for a
 *      background‑image.
 * ---------------------------------------------------------------------------*/
const FALLBACK_IMAGES: string[] = [
  '/baseWorkoutPictures/1.jpg',
  '/baseWorkoutPictures/2.jpg',
  '/baseWorkoutPictures/3.jpg',
  '/baseWorkoutPictures/4.jpg',
  '/baseWorkoutPictures/5.jpg',
  '/baseWorkoutPictures/6.jpg',
  '/baseWorkoutPictures/7.jpg',
  '/baseWorkoutPictures/8.jpg',
  '/baseWorkoutPictures/9.jpg',
  '/baseWorkoutPictures/10.jpg',
  '/baseWorkoutPictures/11.jpg',
  '/baseWorkoutPictures/12.jpg',
  '/baseWorkoutPictures/13.jpg',
  '/baseWorkoutPictures/14.jpg',
  '/baseWorkoutPictures/15.jpg',
  '/baseWorkoutPictures/16.jpg',
  '/baseWorkoutPictures/17.jpg',
  '/baseWorkoutPictures/18.jpg',
  '/baseWorkoutPictures/19.jpg',
  '/baseWorkoutPictures/20.jpg',
  '/baseWorkoutPictures/21.jpg',
  '/baseWorkoutPictures/22.jpg',
  '/baseWorkoutPictures/23.jpg',
  '/baseWorkoutPictures/24.jpg',
  '/baseWorkoutPictures/25.jpg',
  '/baseWorkoutPictures/26.jpg',
  '/baseWorkoutPictures/27.jpg',
  '/baseWorkoutPictures/28.jpg',
  '/baseWorkoutPictures/29.jpg',
  '/baseWorkoutPictures/30.jpg',
  '/baseWorkoutPictures/31.jpg',
  '/baseWorkoutPictures/32.jpg',
  '/baseWorkoutPictures/33.jpg',
  '/baseWorkoutPictures/34.jpg',
  '/baseWorkoutPictures/35.jpg',
  '/baseWorkoutPictures/36.jpg',
];

const getRandomFallback = () =>
  FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)];

const Workouts = () => {
  const [groups, setGroups] = useState<GroupData[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetchWithAutoRefresh('http://localhost:8080/api/workouts');
        const data = await res.json();

        const grouped: Record<string, Workout[]> = {};
        data.forEach((w: any) => {
          const group = w.type?.toLowerCase() || 'unknown';
          if (!grouped[group]) grouped[group] = [];

          grouped[group].push({
            id: w.id,
            name: w.type,
            description: '',
            muscle_group: w.type,
            // ▶️  Pick the server image if provided, otherwise grab a random fallback
            imageUrl: w.imageUrl && w.imageUrl.trim().length > 0 ? w.imageUrl : getRandomFallback(),
            numberOfExercises: w.numberOfExercises || 0,
          });
        });

        const formatted: GroupData[] = Object.keys(grouped).map((groupKey) => ({
          type: groupKey.charAt(0).toUpperCase() + groupKey.slice(1),
          workouts: grouped[groupKey],
        }));

        setGroups(formatted);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchWorkouts();
  }, []);

  const handleWorkoutClick = async (workout: Workout) => {
    setSelectedWorkout(workout);
    setIsModalOpen(true);
    try {
      const res = await fetchWithAutoRefresh(`http://localhost:8080/api/workouts/${workout.id}/exercises`);
      const data = await res.json();
      setExercises(data);
    } catch (error) {
      console.error('Failed to fetch exercises:', error);
      setExercises([]);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.heading}>Workouts by Muscle Group</h1>

        {groups.map((group, i) => (
          <div key={i} className={styles.groupSection}>
            <h2 className={styles.groupTitle}>{group.type}</h2>

            <Swiper
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={3}
              spaceBetween={0}
              loop={true}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 150,
                modifier: 1.5,
                slideShadows: false,
              }}
              modules={[EffectCoverflow]}
              className={styles.swiper}
            >
              {group.workouts.map((workout, j) => (
                <SwiperSlide
                  key={j}
                  className={styles.swiperSlide}
                  style={{
                    backgroundImage: `url(${workout.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                  onClick={() => handleWorkoutClick(workout)}
                >
                  <div className={styles.overlayContent}>
                    <h3>{workout.name}</h3>
                    <p>{workout.numberOfExercises} Exercises</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className={styles.viewAllWrapper}>
              <a href={`/workouts/${group.type.toLowerCase()}`}>
                <button className={styles.viewAllButton}>
                  View All {group.type} Workouts
                </button>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedWorkout && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>{selectedWorkout.name} Workout</h2>
            <ul className={styles.exerciseList}>
              {exercises.length > 0 ? (
                exercises.map((exercise, idx) => (
                  <li key={idx}>
                    <strong>{exercise.exercise}</strong> – {exercise.difficultyLevel}
                  </li>
                ))
              ) : (
                <li>No exercises found for this workout.</li>
              )}
            </ul>
            <div className={styles.modalButtons}>
              {/* <button
                className={styles.startButton}
                onClick={() => {
                  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
                  router.push(`/workout-session/${selectedWorkout.id}?date=${today}`);
                }}
              >
                Start This Workout
              </button> */}
              <button
                className={styles.closeButton}
                onClick={() => {
                  setIsModalOpen(false);
                  setExercises([]);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workouts;
