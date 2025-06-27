package VladBudiu.licenta.Backend.DTOs;

import java.time.LocalDate;

public record HistoryDTO(
        LocalDate date,
        int      calories,
        double   weight,
        int      water,     // ml
        double   sleep,     // hrs
        int      steps,
        int      workouts   // workouts done in the ISO-week of `date`
) {}
