package VladBudiu.licenta.Backend.DTOs;

public record WorkoutMetaDTO(
        Long id,
        String title,
        String description,
        Integer durationInMin,
        String type) {}
