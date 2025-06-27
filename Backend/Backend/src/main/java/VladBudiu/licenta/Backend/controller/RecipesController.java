package VladBudiu.licenta.Backend.controller;

import VladBudiu.licenta.Backend.DTOs.RecipesDTO;
import VladBudiu.licenta.Backend.model.RecipesModel;
import VladBudiu.licenta.Backend.service.RecipesService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/recipes")
public class RecipesController {

    private final RecipesService recipesService;

    public RecipesController(RecipesService recipesService) {
        this.recipesService = recipesService;
    }

    @GetMapping
    public List<RecipesDTO> getAllRecipes() {
        return recipesService.getAllRecipes().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }


    @GetMapping("/search")
    public List<RecipesDTO> searchRecipes(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String ingredient) {

        List<RecipesModel> results;

        if (name != null && !name.isEmpty()) {
            results = recipesService.getRecipesByName(name);
        } else if (ingredient != null && !ingredient.isEmpty()) {
            results = recipesService.getRecipesByIngredient(ingredient);
        } else {
            results = recipesService.getAllRecipes();
        }

        return results.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }


    private RecipesDTO convertToDTO(RecipesModel recipe) {
        return new RecipesDTO(
                recipe.getId(),
                recipe.getName(),
                recipe.getIngredientsAsList(),
                recipe.getCalories(),
                recipe.getImage_path()
        );
    }
}
