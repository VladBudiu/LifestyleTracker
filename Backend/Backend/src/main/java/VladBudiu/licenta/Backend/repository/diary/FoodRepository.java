package VladBudiu.licenta.Backend.repository.diary;

import VladBudiu.licenta.Backend.model.diary.Food;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface FoodRepository extends JpaRepository<Food, Long> {
    List<Food> findByMealId(Long id);
}
