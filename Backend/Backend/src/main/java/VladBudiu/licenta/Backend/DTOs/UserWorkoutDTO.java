package VladBudiu.licenta.Backend.DTOs;

public class UserWorkoutDTO {
    private Long id;
    private String title;
    private String description;
    private String imageUrl;
    private String type;
    private int duration;
    private int numberOfExercises;
    private Long userId;

    public UserWorkoutDTO(Long id, String title, String description, String imageUrl, String type, int duration, int numberOfExercises, long userId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.type = type;
        this.duration = duration;
        this.numberOfExercises = numberOfExercises;
        this.userId = userId;
    }

    // Getters

    public Long getUserId() {
        return userId;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getType() {
        return type;
    }

    public int getDuration() {
        return duration;
    }

    public int getNumberOfExercises() {
        return numberOfExercises;
    }
}
