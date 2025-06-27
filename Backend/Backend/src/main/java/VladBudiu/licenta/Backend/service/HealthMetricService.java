package VladBudiu.licenta.Backend.service;

import VladBudiu.licenta.Backend.DTOs.HealthMetricsDTO;
import VladBudiu.licenta.Backend.model.CalorieLog;
import VladBudiu.licenta.Backend.repository.CalorieLogRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HealthMetricService {

    @PersistenceContext
    private final EntityManager entityManager;

    private final CalorieLogRepository calorieRepo;

    /* ------------------------------------------------------ *
     *  Public API                                            *
     * ------------------------------------------------------ */
    public List<HealthMetricsDTO> getMetricsForUser(Long userId) {

        List<HealthMetricsDTO> metrics = new ArrayList<>();

        /* ---------- 1) CALORIES TODAY ---------- */
        CalorieLog today = calorieRepo
                .findByUserIdAndDay(userId, LocalDate.now())
                .orElse(null);

        long curCalories = today != null ? today.getCurrentCalories() : 0;
        long tgtCalories = today != null ? today.getTargetCalories()  : 2_000;

        metrics.add(new HealthMetricsDTO("Calories Intake",
                (int) curCalories,  "kcal",
                (int) tgtCalories, "kcal"));

        /* ---------- 2) WEIGHT ---------- */
        long latestWeight = singleLong("""
                SELECT w.weight
                FROM   weight_logs w
                WHERE  w.user_id = :uid
                ORDER  BY w.logged_at DESC
                LIMIT  1
                """, userId, 0L);

        long startWeight = singleLong("""
                SELECT w.weight
                FROM   weight_logs w
                WHERE  w.user_id = :uid
                ORDER  BY w.logged_at ASC
                LIMIT  1
                """, userId, latestWeight);     // fallback if only one entry

        long goalWeight = singleLong("""
                SELECT COALESCE(g.goal_weight, %d)
                FROM   user_goals g
                WHERE  g.user_id = :uid
                """.formatted(latestWeight), userId, latestWeight);


        metrics.add(new HealthMetricsDTO(
                "Weight",
                (int) latestWeight, "kg",
                (int) goalWeight,  "kg",
                (int) startWeight ));


        /* ---------- 3) WATER TODAY -------------- */
        long waterToday = singleLong("""
                SELECT COALESCE(SUM(w.water_intake), 0)
                FROM   water_logs w
                WHERE  w.user_id = :uid
                  AND  w.logged_at::date = CURRENT_DATE
                """, userId, 0L);

        long waterGoal = singleLong("""
                SELECT COALESCE(g.water_goal, 2_000)
                FROM   user_goals g
                WHERE  g.user_id = :uid
                """, userId, 2_000L);

        metrics.add(new HealthMetricsDTO("Water",
                (int) waterToday, "ml",
                (int) waterGoal,  "ml"));

        /* ---------- 4) SLEEP (latest) ----------- */
        long sleepLatest = singleLong("""
                SELECT s.sleep_hours
                FROM   sleep_logs s
                WHERE  s.user_id = :uid
                ORDER  BY s.id DESC
                LIMIT  1
                """, userId, 0L);

        long sleepGoal = singleLong("""
                SELECT COALESCE(g.sleep_goal, 8)
                FROM   user_goals g
                WHERE  g.user_id = :uid
                """, userId, 8L);

        metrics.add(new HealthMetricsDTO("Sleep",
                (int) sleepLatest, "hrs",
                (int) sleepGoal,  "hrs"));

        /* ---------- 5) STEPS TODAY -------------- */
        long stepsToday = singleLong("""
                SELECT COALESCE(SUM(s.steps), 0)
                FROM   steps_logs s
                WHERE  s.user_id = :uid
                  AND  s.logged_at::date = CURRENT_DATE
                """, userId, 0L);

        long stepsGoal = singleLong("""
                SELECT COALESCE(g.steps_goal, 10_000)
                FROM   user_goals g
                WHERE  g.user_id = :uid
                """, userId, 10_000L);

        metrics.add(new HealthMetricsDTO("Steps",
                (int) stepsToday, "steps",
                (int) stepsGoal,  "steps"));

        /* ---------- 6) WORKOUTS THIS WEEK ------- */
        long workoutsThisWeek = singleLong("""
                SELECT COALESCE(SUM(w.workouts_done), 0)
                FROM   workout_logs w
                WHERE  w.user_id   = :uid
                  AND  w.week_start >= date_trunc('week', CURRENT_DATE)
                """, userId, 0L);

        long workoutGoal = singleLong("""
                SELECT COALESCE(g.workout_goal, 3)
                FROM   user_goals g
                WHERE  g.user_id = :uid
                """, userId, 3L);

        metrics.add(new HealthMetricsDTO("Workout",
                (int) workoutsThisWeek, "days",
                (int) workoutGoal,      "days"));

        return metrics;
    }

    @Transactional
    public void updateMetric(Long userId, HealthMetricsDTO metricUpdate) {
        System.out.println("UserID = " + userId);
        System.out.println("DTO name = " + metricUpdate.getName());

        String name = metricUpdate.getName();
        int newValue = metricUpdate.getValue();

        switch (name) {
            case "Weight" -> entityManager.createNativeQuery("""
            INSERT INTO weight_logs (user_id, weight, logged_at)
            VALUES (:uid, :val, now())
            """)
                    .setParameter("uid", userId)
                    .setParameter("val", newValue)
                    .executeUpdate();

            case "Sleep" -> entityManager.createNativeQuery("""
            INSERT INTO sleep_logs (user_id, sleep_hours, logged_at)
            VALUES (:uid, :val, now())
            """)
                    .setParameter("uid", userId)
                    .setParameter("val", newValue)
                    .executeUpdate();

            case "Water" -> entityManager.createNativeQuery("""
            INSERT INTO water_logs (user_id, water_intake, logged_at)
            VALUES (:uid, :val, now())
            """)
                    .setParameter("uid", userId)
                    .setParameter("val", newValue)
                    .executeUpdate();

            case "Steps" -> entityManager.createNativeQuery("""
            INSERT INTO steps_logs (user_id, steps, logged_at)
            VALUES (:uid, :val, now())
            """)
                    .setParameter("uid", userId)
                    .setParameter("val", newValue)
                    .executeUpdate();

            case "Calories Intake" -> entityManager.createNativeQuery("""
            INSERT INTO calorie_logs (user_id, current_calories, target_calories, day)
            VALUES (:uid, :val, 2000, current_date)
            ON CONFLICT (user_id, day)
            DO UPDATE SET current_calories = :val
            """)
                    .setParameter("uid", userId)
                    .setParameter("val", newValue)
                    .executeUpdate();

            case "Workout" -> entityManager.createNativeQuery("""
            INSERT INTO workout_logs (user_id, week_start, workouts_done)
            VALUES (:uid, date_trunc('week', CURRENT_DATE), :val)
            ON CONFLICT (user_id, week_start)
            DO UPDATE SET workouts_done = :val
            """)
                    .setParameter("uid", userId)
                    .setParameter("val", newValue)
                    .executeUpdate();

            default -> throw new IllegalArgumentException("Unsupported metric: " + name);
        }
    }


    /* ------------------------------------------------------ *
     *  Helper: run a native query that returns a single long  *
     * ------------------------------------------------------ */
    private long singleLong(String sql, Long uid, long fallback) {
        try {
            Object val = entityManager.createNativeQuery(sql)
                    .setParameter("uid", uid)
                    .getSingleResult();
            // `getSingleResult()` can legally return `null`
            if (val == null) return fallback;
            return ((Number) val).longValue();
        } catch (NoResultException ignored) {
            return fallback;
        }
    }
}
