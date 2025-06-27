package VladBudiu.licenta.Backend.DTOs;

import lombok.Data;

@Data
public class UserProfileDTO {
    // User personal info
    private String first_name;
    private String last_name;
    private String email;
    private double height;
    private double weight;
    private String activity_level;

    // Goals
    private double goal_weight;
    private int calorie_target;
    private int water_goal;
    private int sleep_goal;
    private int steps_goal;

    private  Integer workout_goal;
}