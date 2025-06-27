'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import WorkoutCard from '@/components/WorkoutCard/WorkoutCard';
import CreateWorkoutForm from '@/components/CreateWorkoutForm/CreateWorkoutForm';
import AddExercisesModal from '@/components/AddExercisesModal/AddExercisesModal';
import styles from './MuscleGroups.module.css';
import Navbar from '@/components/Navbar/Navbar';
import { fetchWithAutoRefresh } from '@/lib/fetchWithAutoRefresh';
import { useRouter } from 'next/navigation';


interface Workout {
  id: number;
  name: string;
  description: string;
  muscle_group: string;
  imageUrl: string;
  numberOfExercises: number;
  title: string;
  duration: number;
  type: string;
  source: 'default' | 'custom';
}

interface Exercise {
  exercise: string;
  difficultyLevel: string;
  expanded?: boolean;
  short_youtube_demo_url?: string;
  target_muscle_group?: string;
  prime_mover_muscle?: string;
  secondary_muscle?: string;
  posture?: string;
  primary_equipment?: string;
}


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

const getEmbedUrl = (url?: string): string | null => {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};


const MuscleGroupPage = () => {
  const { muscleGroup } = useParams();
  const router = useRouter();
 
  const [group, setGroup] = useState('');
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [customWorkouts, setCustomWorkouts] = useState<Workout[]>([]);
  const [loadingCustom, setLoadingCustom] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [visibleDefault, setVisibleDefault] = useState(4); 

  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false);

  
  const getUserId = (): number | null => {
    try {
      const stored = localStorage.getItem('user');
      if (!stored) return null;
      const user = JSON.parse(stored);
      return user?.userId ?? null;
    } catch (err) {
      console.error('Failed to parse user from localStorage:', err);
      return null;
    }
  };

  
  useEffect(() => {
    if (!muscleGroup) return;

    const groupStr = muscleGroup.toString().toLowerCase();
    setGroup(groupStr);

    const fetchGroupWorkouts = async () => {
      try {
        const res = await fetchWithAutoRefresh(
          'http://localhost:8080/api/workouts'
        );
        const data = await res.json();

        const filtered = data.filter(
          (w: any) => w.type?.toLowerCase() === groupStr
        );

        const formatted: Workout[] = filtered.map((w: any) => ({
          id: w.id,
          name: w.type,
          muscle_group: w.type,
          imageUrl:
            w.imageUrl && w.imageUrl.trim().length > 0
              ? w.imageUrl
              : getRandomFallback(),
          numberOfExercises: w.numberOfExercises || 0,
          title: w.type,
          duration: w.durationInMin || 30,
          description: '',
          type: w.type,
          source: 'default',
        }));

        setWorkouts(formatted);
        setVisibleDefault(4); 
      } catch (error) {
        console.error('Failed to fetch workouts:', error);
      }
    };

    fetchGroupWorkouts();
  }, [muscleGroup]);

  
  useEffect(() => {
    if (!group) return;

    const fetchCustomWorkouts = async () => {
      setLoadingCustom(true);
      const userId = getUserId();
      if (!userId) {
        console.error('User ID not found in localStorage');
        setLoadingCustom(false);
        return;
      }

      try {
        const res = await fetchWithAutoRefresh(
          `http://localhost:8080/api/user-workouts?group=${group}&userId=${userId}`
        );
        const data = await res.json();

        const formatted: Workout[] = data.map((w: any) => ({
          ...w,
          name: w.title,
          title: w.title,
          muscle_group: w.type,
          imageUrl:
            w.imageUrl && w.imageUrl.trim().length > 0
              ? w.imageUrl
              : getRandomFallback(),
          source: 'custom',
        }));

        setCustomWorkouts(formatted);
      } catch (err) {
        console.error('Failed to fetch user-created workouts:', err);
      } finally {
        setLoadingCustom(false);
      }
    };

    fetchCustomWorkouts();
  }, [group]);

  
  const handleAddWorkout = async (workout: Workout) => {
    const userId = getUserId();
    if (!userId) {
      console.error('No user ID found in localStorage.');
      return;
    }

    try {
      const res = await fetchWithAutoRefresh(
        'http://localhost:8080/api/user-workouts',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...workout, userId }),
        }
      );
      const newWorkout = await res.json();

      setCustomWorkouts((prev) => [
        ...prev,
        {
          ...newWorkout,
          name: newWorkout.title,
          title: newWorkout.title,
          muscle_group: newWorkout.type,
          imageUrl:
            newWorkout.imageUrl && newWorkout.imageUrl.trim().length > 0
              ? newWorkout.imageUrl
              : getRandomFallback(),
          source: 'custom',
        },
      ]);
    } catch (err) {
      console.error('Failed to save custom workout:', err);
    }
    setShowForm(false);
  };

  
  const handleWorkoutClick = async (workout: Workout) => {
    setSelectedWorkout(workout);
    setIsModalOpen(true);

    const endpoint =
      workout.source === 'custom'
        ? `http://localhost:8080/api/user-workouts/${workout.id}/exercises`
        : `http://localhost:8080/api/workouts/${workout.id}/exercises`;

    try {
      const res = await fetchWithAutoRefresh(endpoint);
      const data = await res.json();
      const formatted = data.map((ex: any) => ({ ...ex, expanded: false }));
      setExercises(formatted);
    } catch (error) {
      console.error('Failed to fetch exercises:', error);
      setExercises([]);
    }
  };

  const toggleExerciseExpand = (index: number) => {
    setExercises((prev) =>
      prev.map((ex, i) => ({
        ...ex,
        expanded: i === index ? !ex.expanded : ex.expanded,
      }))
    );
  };

  
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.heading}>{group.toUpperCase()} Workouts</h1>

        {/* ------------------- USER CUSTOM WORKOUTS ------------------------- */}
        <h2 className={styles.subHeading}>Your {group.toUpperCase()} Workouts</h2>
        {loadingCustom ? (
          <p>Loading your workouts...</p>
        ) : customWorkouts.length === 0 ? (
          <p className={styles.empty}>You haven’t created any workouts yet.</p>
        ) : (
          <div className={styles.grid}>
            {customWorkouts.map((workout) => (
              <div
                key={workout.id}
                onClick={() => handleWorkoutClick(workout)}
                className={styles.cardWrapper}
              >
                <WorkoutCard workout={workout} />
              </div>
            ))}
          </div>
        )}

        {!showForm && (
          <div className={styles.buttonWrapper}>
            <button
              className={styles.button}
              onClick={() => setShowForm(true)}
            >
              Create New Workout
            </button>
          </div>
        )}

        {showForm && (
          <div className={styles.formContainer}>
            <CreateWorkoutForm onAdd={handleAddWorkout} defaultType={group} />
          </div>
        )}

        {/* ------------------- SYSTEM DEFAULT WORKOUTS ---------------------- */}
        <h2 className={styles.subHeading}>
          Default {group.toUpperCase()} Workouts
        </h2>
        <div className={styles.grid}>
          {workouts.slice(0, visibleDefault).map((workout) => (
            <div
              key={workout.id}
              onClick={() => handleWorkoutClick(workout)}
              className={styles.cardWrapper}
            >
              <WorkoutCard workout={workout} />
            </div>
          ))}
        </div>

        {/* Show-more button if there are hidden items */}
        {visibleDefault < workouts.length && (
          <div className={styles.buttonWrapper}>
            <button
              className={styles.button}
              onClick={() => setVisibleDefault((n) => n + 4)}
            >
              Show more workouts
            </button>
          </div>
        )}
      </div>

      {/* --------------------- Workout Modal ------------------------------ */}
      {isModalOpen && selectedWorkout && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>{selectedWorkout.name} Workout</h2>
            <ul className={styles.exerciseList}>
              {exercises.length > 0 ? (
                exercises.map((exercise, idx) => (
                  <li key={idx} className={styles.exerciseItem}>
                    <div
                      className={styles.exerciseHeader}
                      onClick={() => toggleExerciseExpand(idx)}
                    >
                      <strong>{exercise.exercise}</strong> –{' '}
                      {exercise.difficultyLevel}
                    </div>

                    {exercise.expanded &&
                      (() => {
                        const embedUrl = getEmbedUrl(
                          exercise.short_youtube_demo_url
                        );
                        return (
                          <div className={styles.exerciseDetails}>
                            {exercise.target_muscle_group && (
                              <p>
                                <strong>Target Muscle:</strong>{' '}
                                {exercise.target_muscle_group}
                              </p>
                            )}
                            {exercise.primary_equipment && (
                              <p>
                                <strong>Primary Equipment:</strong>{' '}
                                {exercise.primary_equipment}
                              </p>
                            )}
                            {exercise.prime_mover_muscle && (
                              <p>
                                <strong>Prime Mover:</strong>{' '}
                                {exercise.prime_mover_muscle}
                              </p>
                            )}
                            {exercise.secondary_muscle && (
                              <p>
                                <strong>Secondary Muscle:</strong>{' '}
                                {exercise.secondary_muscle}
                              </p>
                            )}
                            {exercise.posture && (
                              <p>
                                <strong>Posture:</strong> {exercise.posture}
                              </p>
                            )}
                            {embedUrl && (
                              <iframe
                                width="100%"
                                height="250"
                                src={`${embedUrl}?autoplay=1&mute=1`}
                                title="Exercise demo"
                                allow="autoplay"
                                allowFullScreen
                              />
                            )}
                          </div>
                        );
                      })()}
                  </li>
                ))
              ) : (
                <li>No exercises found for this workout.</li>
              )}
            </ul>

            <div className={styles.modalButtons}>
              {selectedWorkout?.source === 'custom' && (
                <button
                  className={styles.startButton}
                  onClick={() => {
                    setIsModalOpen(false);         
                    setShowAddExerciseModal(true); 
                  }}
                >
                  Add exercises to the workout
                </button>
              )}

             <button
                className={styles.startButton}
                onClick={() => {
                  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
                  router.push(`/workout-session/${selectedWorkout.id}?date=${today}`);
                }}
              >
                Start This Workout
              </button>
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

      {/* ------------------- Add Exercises Modal -------------------------- */}
      {showAddExerciseModal && selectedWorkout?.source === 'custom' && (
        <AddExercisesModal
          workoutId={selectedWorkout.id}
          onClose={() => {
            setShowAddExerciseModal(false);
            setIsModalOpen(false);
            setExercises([]);
          }}

        />
      )}
    </div>
  );
};

export default MuscleGroupPage;
