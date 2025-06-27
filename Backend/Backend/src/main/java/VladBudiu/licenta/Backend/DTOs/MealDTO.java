package VladBudiu.licenta.Backend.DTOs;

import VladBudiu.licenta.Backend.model.diary.MealType;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MealDTO {
    private Long id;
    private MealType type;
    private int totalCalories;
    private List<FoodDTO> foods;
}