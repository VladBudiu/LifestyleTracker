package VladBudiu.licenta.Backend.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "user_workouts")
public class UserWorkout {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_workouts_seq")
    @SequenceGenerator(name = "user_workouts_seq", sequenceName = "user_workouts_seq", allocationSize = 1)
    private Long id;


    @Column(name = "user_id")
    private Long userId;
    private String title;
    private String imageUrl;
    private String description;
    private String type;

    private int durationInMin;
    @Column(name = "performed_at")
    private LocalDate performedAt;

    @ManyToMany
    @JoinTable(
            name = "user_workout_exercises",
            joinColumns = @JoinColumn(name = "user_workout_id"),
            inverseJoinColumns = @JoinColumn(name = "exercise_id")
    )
    private List<Exercise> exercises;

    // Getters & Setters


    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getDescription() {
        return description;
    }

    public String getType() {
        return type;
    }

    public int getDurationInMin() {
        return durationInMin;
    }

    public List<Exercise> getExercises() {
        return exercises;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setDurationInMin(int durationInMin) {
        this.durationInMin = durationInMin;
    }

    public void setExercises(List<Exercise> exercises) {
        this.exercises = exercises;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDate getPerformedAt() {
        return performedAt;
    }

    public void setPerformedAt(LocalDate performedAt) {
        this.performedAt = performedAt;
    }
}