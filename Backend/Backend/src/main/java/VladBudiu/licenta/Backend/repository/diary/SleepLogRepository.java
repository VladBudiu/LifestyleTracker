package VladBudiu.licenta.Backend.repository.diary;

import VladBudiu.licenta.Backend.model.diary.SleepLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface SleepLogRepository extends JpaRepository<SleepLog, Long> {

    Optional<SleepLog> findFirstByUserIdOrderByLoggedAtDesc(Long userId);

    Optional<SleepLog> findFirstByUserIdAndLoggedAtBetweenOrderByLoggedAtDesc(
            Long uid, LocalDateTime start, LocalDateTime end);

}
