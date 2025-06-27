package VladBudiu.licenta.Backend.repository;

import VladBudiu.licenta.Backend.model.UserGoal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserGoalRepo extends JpaRepository<UserGoal, Long> {
    Optional<UserGoal> findFirstByUserId(Long userId);
}