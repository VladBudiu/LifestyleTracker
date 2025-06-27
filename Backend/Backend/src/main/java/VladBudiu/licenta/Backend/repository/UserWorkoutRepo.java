package VladBudiu.licenta.Backend.repository;

import VladBudiu.licenta.Backend.model.UserWorkout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface UserWorkoutRepo extends JpaRepository<UserWorkout, Long> {

    List<UserWorkout> findByUserIdAndPerformedAtBetween(
            Long userId, LocalDate start, LocalDate end);

}
