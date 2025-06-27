package VladBudiu.licenta.Backend.repository;

import VladBudiu.licenta.Backend.model.CalorieLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface CalorieLogRepository
        extends JpaRepository<CalorieLog, Long> {

    Optional<CalorieLog> findByUserIdAndDay(Long userId, LocalDate day);
}
