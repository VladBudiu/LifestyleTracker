package VladBudiu.licenta.Backend.repository;

import VladBudiu.licenta.Backend.DTOs.MaxWeightDTO;
import VladBudiu.licenta.Backend.model.MaxWeightRow;
import VladBudiu.licenta.Backend.model.UserExerciseSet;
import com.jayway.jsonpath.internal.function.numeric.Max;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ExerciseSetRepo extends JpaRepository<UserExerciseSet, Long> {

    @Query(value = """
        SELECT 
            CAST(ues.performed_at AS date) AS date,
            MAX(ues.weight_kg) AS max_weight
        FROM user_workout_sets ues
        JOIN user_workout_exercises uwe ON uwe.exercise_id = ues.exercise_id
        JOIN user_workouts uw ON uw.id = uwe.user_workout_id
        JOIN exercises ex ON ex.id = ues.exercise_id
        WHERE uw.user_id = :uid
          AND LOWER(ex.exercise) = LOWER(:exercise)
          AND ues.performed_at BETWEEN :from AND :to
        GROUP BY CAST(ues.performed_at AS date)
        ORDER BY CAST(ues.performed_at AS date)
    """, nativeQuery = true)
    List<MaxWeightDTO> getMaxWeightSeries(
            @Param("uid") Long uid,
            @Param("exercise") String exercise,
            @Param("from") LocalDateTime from,
            @Param("to") LocalDateTime to
    );
}