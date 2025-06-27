package VladBudiu.licenta.Backend.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class ExerciseSeriesDTO {
    private LocalDate date;
    private double    weight;   
}
