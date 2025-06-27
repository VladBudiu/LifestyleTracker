package VladBudiu.licenta.Backend.repository;

import VladBudiu.licenta.Backend.model.UserWorkout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserWorkoutRepository extends JpaRepository<UserWorkout, Long> {
    List<UserWorkout> findByUserIdAndTypeIgnoreCase(Long id,String type);

}
