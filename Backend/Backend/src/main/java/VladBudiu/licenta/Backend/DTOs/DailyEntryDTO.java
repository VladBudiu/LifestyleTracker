package VladBudiu.licenta.Backend.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
public class DailyEntryDTO {
    private LocalDate date;
    private int    calories;
    private double weight;
    private int    water;      // ml
    private double sleep;      // hrs
    private int    steps;
    private int    workoutDays;
    private List<ExerciseDTO> exercises;
}
