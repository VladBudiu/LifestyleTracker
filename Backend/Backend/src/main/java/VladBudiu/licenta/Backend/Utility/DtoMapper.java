package VladBudiu.licenta.Backend.Utility;

import VladBudiu.licenta.Backend.DTOs.*;
import VladBudiu.licenta.Backend.model.diary.*;

import java.util.List;

public class DtoMapper {

    public static FoodDTO toDto(Food food) {
        return FoodDTO.builder()
                .id(food.getId())
                .name(food.getName())
                .calories(food.getCalories())
                .quantity(food.getQuantity())
                .protein(food.getProtein())
                .carbs(food.getCarbs())
                .fat(food.getFat())
                .build();
    }

    public static MealDTO toDto(Meal meal) {
        List<FoodDTO> foods = meal.getFoods().stream()
                .map(DtoMapper::toDto)
                .toList();

        return MealDTO.builder()
                .id(meal.getId())
                .type(meal.getType())
                .totalCalories(meal.getTotalCalories())
                .foods(foods)
                .build();
    }
}
