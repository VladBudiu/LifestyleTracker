package VladBudiu.licenta.Backend.DTOs;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class DiaryDTO {
    private LocalDate date;
    private int totalCalories;
    private double  protein;
    private double  carbs;
    private double  fat;
    private int waterMl;
    private int waterGoalMl;
    private int steps;
    private double sleepHours;
    private double weight;
    private int calorieGoal;
    private List<MealDTO> meals;
    private MacroGoals macroGoals;
}