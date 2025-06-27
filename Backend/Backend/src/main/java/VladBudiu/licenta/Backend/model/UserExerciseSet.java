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
    @JoinColumn(name = "exercise_id")         
    private UserWorkoutExercise exercise;

    
    private int    reps;

    private double weight;                    

    
    @Column(name = "performed_at", nullable = false)
    private LocalDateTime performedAt;
}