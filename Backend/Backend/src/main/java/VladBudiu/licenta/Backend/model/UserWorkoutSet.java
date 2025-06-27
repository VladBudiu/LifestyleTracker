package VladBudiu.licenta.Backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_workout_sets")
public class UserWorkoutSet {

    @EmbeddedId
    private UserWorkoutSetId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userWorkoutId")
    private UserWorkout userWorkout;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("exerciseId")
    private Exercise exercise;

    @Column(name = "weight_kg")
    private Double weightKg;

    private Integer reps;
    private Integer rir;
    @Column(name = "rest_seconds")
    private Integer restSeconds;
    private String notes;

    @Column(name = "performed_at")
    private LocalDateTime performedAt = LocalDateTime.now();

    /* getters / setters */

    public UserWorkoutSetId getId() {
        return id;
    }

    public void setId(UserWorkoutSetId id) {
        this.id = id;
    }

    public UserWorkout getUserWorkout() {
        return userWorkout;
    }

    public void setUserWorkout(UserWorkout userWorkout) {
        this.userWorkout = userWorkout;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }

    public Double getWeightKg() {
        return weightKg;
    }

    public void setWeightKg(Double weightKg) {
        this.weightKg = weightKg;
    }

    public Integer getReps() {
        return reps;
    }

    public void setReps(Integer reps) {
        this.reps = reps;
    }

    public Integer getRir() {
        return rir;
    }

    public void setRir(Integer rir) {
        this.rir = rir;
    }

    public Integer getRestSeconds() {
        return restSeconds;
    }

    public void setRestSeconds(Integer restSeconds) {
        this.restSeconds = restSeconds;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalDateTime getPerformedAt() {
        return performedAt;
    }

    public void setPerformedAt(LocalDateTime performedAt) {
        this.performedAt = performedAt;
    }
}

