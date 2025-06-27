package VladBudiu.licenta.Backend.repository.diary;

import VladBudiu.licenta.Backend.model.diary.Meal;
import VladBudiu.licenta.Backend.model.diary.MealType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Optional;

public interface MealRepository extends JpaRepository<Meal, Long> {
    Optional<Meal> findByDayIdAndType(Long dayId, MealType type);

    @Query("""
    SELECT COALESCE(SUM(m.totalCalories), 0)
    FROM Meal m
    WHERE m.day.user.id = :userId AND m.day.date = :date
""")
    int caloriesForDay(@Param("userId") Long userId,
                       @Param("date") LocalDate date);

}
