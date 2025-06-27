import React, { useEffect, useState } from 'react';
import styles from './AddExerciseModal.module.css';
import { fetchWithAutoRefresh } from '@/lib/fetchWithAutoRefresh';

interface Exercise {
  id: number;
  exercise: string;
  difficulty_level: string;
  short_youtube_demo?: { url?: string };
  in_depth_youtube_explanation?: any;
  target_muscle_group?: string;
  prime_mover_muscle?: string;
  secondary_muscle?: string;
  posture?: string;
  primary_equipment?: string;
}

const AddExercisesModal = ({
  workoutId,
  onClose,
}: {
  workoutId: number;
  onClose: () => void;
}) => {
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    fetchWithAutoRefresh('http://localhost:8080/api/exercises')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAllExercises(data);
        } else {
          console.error('Expected array but got:', data);
          setAllExercises([]);
        }
      })
      .catch(console.error);
  }, []);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const submit = async () => {


    await fetchWithAutoRefresh(`http://localhost:8080/api/user-workouts/${workoutId}/exercises`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedIds),
    });
    console.log('Selected exercises added:', selectedIds);
    onClose();
  };

  const filteredExercises = allExercises.filter((ex) =>
    ex.exercise.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Select Exercises</h3>

        {/* Search Input */}
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search exercises..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className={styles.scrollArea}>
                <ul className={styles.exerciseList}>
                {filteredExercises.map((ex) => (
                    <li key={ex.id} className={styles.exerciseItem}>
                    <div className={styles.exerciseHeader} onClick={() => toggleExpand(ex.id)}>
                    <span className={styles.exerciseName}>
                        {ex.exercise} – {ex.difficulty_level}
                    </span>
                
                        <button
                            className={`${styles.selectButton} ${selectedIds.includes(ex.id) ? styles.selected : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleSelect(ex.id);
                            }}
                            >
                            {selectedIds.includes(ex.id) ? '✓ Added' : 'Add'}
                    </button>
                    </div>
                
                    {expandedId === ex.id && (
                    <div className={styles.exerciseDetails}>
                        <p><strong>Target Muscle:</strong> {ex.target_muscle_group}</p>
                        <p><strong>Primary Equipment:</strong> {ex.primary_equipment}</p>
                        <p><strong>Prime Mover:</strong> {ex.prime_mover_muscle}</p>
                        <p><strong>Secondary Muscle:</strong> {ex.secondary_muscle}</p>
                        <p><strong>Posture:</strong> {ex.posture}</p>
                        {ex.short_youtube_demo?.url && (
                        <iframe
                            width="100%"
                            height="200"
                            src={ex.short_youtube_demo.url}
                            title="Demo"
                        />
                        )}
                    </div>
                    )}
                </li>
                
                ))}
                </ul>
        </div>
        <div className={styles.modalButtons}>
            <button type="button" className={styles.confirmButton} onClick={submit}>
            Add Selected
          </button>
          <button type="button" className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExercisesModal;
