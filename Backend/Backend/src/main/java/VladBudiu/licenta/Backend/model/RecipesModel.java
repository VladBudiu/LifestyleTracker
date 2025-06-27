package VladBudiu.licenta.Backend.model;


import jakarta.persistence.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "recipes")
public class RecipesModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "\"name\"")
    private String name;

    @Column(name = "\"ingredients\"")
    private String ingredients;
    @Column(name = "\"calories\"")
    private Long calories;
    @Column(name = "\"image_path\"")
    private String image_path;


    //Contructors
    public RecipesModel() {
    }

    public RecipesModel(Long id, String name, String ingredients, Long calories, String image_path) {
        this.id = id;
        this.name = name;
        this.ingredients = ingredients;
        this.calories = calories;
        this.image_path = image_path;
    }


    //Getters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getIngredients() {
        return ingredients;
    }

    public List<String> getIngredientsAsList() {
        return Arrays.stream(ingredients.split(","))
                .map(String::trim)
                .collect(Collectors.toList());
    }

    public Long getCalories() {
        return calories;
    }

    public String getImage_path() {
        return image_path;
    }
}
