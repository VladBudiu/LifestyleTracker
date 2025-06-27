package VladBudiu.licenta.Backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_workout_exercises")
@Getter @Setter @NoArgsConstructor
@AllArgsConstructor @Builder
public class UserWorkoutExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /* ───── relationships ───── */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "workout_id")           // FK → user_workouts(id)
    private UserWorkout userWorkout;

    /* ───── columns ───── */
    @Column(nullable = false)
    private String name;

    @Column(name = "exercise_order")
    private Integer order;
}