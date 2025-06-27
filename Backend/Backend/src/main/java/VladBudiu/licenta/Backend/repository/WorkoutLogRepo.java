package VladBudiu.licenta.Backend.repository;

import VladBudiu.licenta.Backend.model.WorkoutLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface WorkoutLogRepo extends JpaRepository<WorkoutLog,Long> {
    Optional<WorkoutLog> findByUserIdAndWeekStart(Long uid, LocalDate weekStart);
}
