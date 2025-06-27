package VladBudiu.licenta.Backend.DTOs;

import jakarta.persistence.Column;

import java.util.List;

public class RecipesDTO {

    private Long id;
    private String name;
    private List<String> ingredients;
    private Long calories;
    private String image_path;

    public RecipesDTO(Long id, String name, List<String> ingredients, Long calories, String image_path) {
        this.id = id;
        this.name = name;
        this.ingredients = ingredients;
        this.calories = calories;
        this.image_path = image_path;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<String> getIngredients() {
        return ingredients;
    }

    public Long getCalories() {
        return calories;
    }

    public String getImage_path() {
        return image_path;
    }
}
