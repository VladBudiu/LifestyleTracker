package VladBudiu.licenta.Backend.DTOs;

import lombok.Data;

@Data
public class SignUpRequestDTO {
    private String username;
    private String email;
    private String password;

    /* ----- Metrics ----- */
    private String weightGoal;
    private String activityLevel;
    private String height;
    private String weight;
    private String weightTarget;
    private String weekly;

    public SignUpRequestDTO(String username, String email, String password, String weightGoal, String activityLevel, String height, String weight, String weightTarget, String weekly) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.weightGoal = weightGoal;
        this.activityLevel = activityLevel;
        this.height = height;
        this.weight = weight;
        this.weightTarget = weightTarget;
        this.weekly = weekly;
    }

    public SignUpRequestDTO() {
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getWeightGoal() {
        return weightGoal;
    }

    public String getActivityLevel() {
        return activityLevel;
    }

    public String getHeight() {
        return height;
    }

    public String getWeight() {
        return weight;
    }

    public String getWeightTarget() {
        return weightTarget;
    }

    public String getWeekly() {
        return weekly;
    }
}