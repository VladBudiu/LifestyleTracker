package VladBudiu.licenta.Backend.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ExerciseDTO {
    private String name;
    private List<SetDTO> sets;

}