package VladBudiu.licenta.Backend.repository.diary;

import VladBudiu.licenta.Backend.model.diary.StepsLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

public interface StepsLogRepository extends JpaRepository<StepsLog, Long> {
    Optional<StepsLog> findFirstByUserIdAndLoggedAtBetween(
            Long userId, LocalDateTime start, LocalDateTime end);

    @Query("""
                SELECT COALESCE(SUM(s.steps),0)
                FROM   StepsLog s
                WHERE  s.user.id      = :uid
                  AND  s.loggedAt BETWEEN :start AND :end
            """)
    int stepsForDay(
            @Param("uid") Long uid,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );

}
