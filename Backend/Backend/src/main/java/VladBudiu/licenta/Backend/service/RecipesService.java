package VladBudiu.licenta.Backend.service;

import VladBudiu.licenta.Backend.model.RecipesModel;
import VladBudiu.licenta.Backend.repository.RecipesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipesService {

    private final RecipesRepository recipesRepository;

    public RecipesService(RecipesRepository recipesRepository) {
        this.recipesRepository = recipesRepository;
    }

    public List<RecipesModel> getAllRecipes() {
        return recipesRepository.findAll();
    }


    public List<RecipesModel> getRecipesByName(String name) {
        return recipesRepository.findByNameContainingIgnoreCase(name);
    }

    
    public List<RecipesModel> getRecipesByIngredient(String ingredient) {
        return recipesRepository.findByIngredient(ingredient);
    }
}
