package VladBudiu.licenta.Backend.DTOs;

import java.util.List;

public record DayDto(
        String date,                       // YYYY-MM-DD
        List<WorkoutDto2> workouts          
) {}