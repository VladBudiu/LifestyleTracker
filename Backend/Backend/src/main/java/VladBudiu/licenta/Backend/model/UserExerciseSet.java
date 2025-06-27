package VladBudiu.licenta.Backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_workout_sets")
@Getter @Setter @NoArgsConstructor
@AllArgsConstructor @Builder
public class UserExerciseSet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /* ───── relationships ───── */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "exercise_id")          // FK → user_workout_exercises(id)
    private UserWorkoutExercise exercise;

    /* ───── columns ───── */
    private int    reps;

    private double weight;                     // kg

    /** Timestamp when the set was performed (added in the SQL migration). */
    @Column(name = "performed_at", nullable = false)
    private LocalDateTime performedAt;
}