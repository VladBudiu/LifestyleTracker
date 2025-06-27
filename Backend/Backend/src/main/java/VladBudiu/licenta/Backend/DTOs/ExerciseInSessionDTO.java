package VladBudiu.licenta.Backend.DTOs;

import java.util.List;

public record ExerciseInSessionDTO(
        Long exerciseId,
        List<SetInSessionDTO> sets) {}