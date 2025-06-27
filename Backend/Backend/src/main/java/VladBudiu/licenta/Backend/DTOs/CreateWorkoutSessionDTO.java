package VladBudiu.licenta.Backend.DTOs;

import java.time.LocalDate;
import java.util.List;

public record CreateWorkoutSessionDTO(
        Long workoutId,
        LocalDate date,
        List<ExerciseInSessionDTO> exercises) {}