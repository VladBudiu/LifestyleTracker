package VladBudiu.licenta.Backend.repository.diary;

import VladBudiu.licenta.Backend.model.diary.WaterLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Optional;

public interface WaterLogRepository extends JpaRepository<WaterLog, Long> {
    Optional<WaterLog> findFirstByUserIdOrderByLoggedAtDesc(Long userId);
    Optional<WaterLog> findFirstByUserIdAndLoggedAtBetween(Long userId, LocalDateTime start, LocalDateTime end);

    @Query("""
    SELECT COALESCE(SUM(w.waterIntake),0)
    FROM   WaterLog w
    WHERE  w.user.id      = :uid
      AND  w.loggedAt BETWEEN :start AND :end
""")
    int waterForDay(
            @Param("uid") Long uid,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );


}
