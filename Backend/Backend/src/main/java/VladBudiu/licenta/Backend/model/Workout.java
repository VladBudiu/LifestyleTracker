package VladBudiu.licenta.Backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "workouts")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Workout {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;               // new – NOT NULL in DB
    private String description;        // nullable

    @Column(name = "muscle_group")
    private String muscleGroup;

    private String imageUrl;
    private Integer durationInMin;

    /*  many-to-many linker via workout_exercises  */
    @ManyToMany
    @JoinTable(name = "workout_exercises",
            joinColumns        = @JoinColumn(name = "workout_id"),
            inverseJoinColumns = @JoinColumn(name = "exercise_id"))
    private List<Exercise> exercises;
}
