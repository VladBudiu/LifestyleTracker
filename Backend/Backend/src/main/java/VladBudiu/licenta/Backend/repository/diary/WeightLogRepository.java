package VladBudiu.licenta.Backend.repository.diary;

import VladBudiu.licenta.Backend.model.diary.WeightLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Optional;

public interface WeightLogRepository extends JpaRepository<WeightLog, Long> {
    Optional<WeightLog> findFirstByUserIdOrderByLoggedAtDesc(Long userId);
    @Query("""
            SELECT w
            FROM   WeightLog w
            WHERE  w.user.id   = :uid
              AND  w.loggedAt <= :endOfDay
            ORDER  BY w.loggedAt DESC
            LIMIT  1
        """)
    Optional<WeightLog> latestUpTo(
            @Param("uid") Long uid,
            @Param("endOfDay") LocalDateTime endOfDay
    );

}
