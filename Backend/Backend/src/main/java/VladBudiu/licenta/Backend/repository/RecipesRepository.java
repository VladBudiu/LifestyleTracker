package VladBudiu.licenta.Backend.repository;

import VladBudiu.licenta.Backend.model.RecipesModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RecipesRepository extends JpaRepository<RecipesModel, Long> {

        List<RecipesModel> findByName(String name);

        List<RecipesModel> findByNameContainingIgnoreCase(String name);

        @Query("SELECT r FROM RecipesModel r WHERE LOWER(r.ingredients) LIKE LOWER(CONCAT('%', :ingredient, '%'))")
        List<RecipesModel> findByIngredient(String ingredient);
}
