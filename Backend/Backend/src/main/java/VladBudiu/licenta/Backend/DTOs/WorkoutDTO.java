package VladBudiu.licenta.Backend.DTOs;

import VladBudiu.licenta.Backend.model.Workout;

public class WorkoutDTO {
    private Long id;
    private String type;
    private String imageUrl;
    private int durationInMin;
    private int numberOfExercises;

    public WorkoutDTO(Workout workout) {
        this.id = workout.getId();
        this.type = workout.getMuscleGroup();
        this.imageUrl = workout.getImageUrl();
        this.durationInMin = workout.getDurationInMin();
        this.numberOfExercises = workout.getExercises() != null ? workout.getExercises().size() : 0;
    }

    public Long getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public int getDurationInMin() {
        return durationInMin;
    }

    public int getNumberOfExercises() {
        return numberOfExercises;
    }
}
