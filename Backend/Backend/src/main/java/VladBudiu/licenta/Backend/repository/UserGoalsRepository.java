package VladBudiu.licenta.Backend.repository;

import VladBudiu.licenta.Backend.model.UserGoals;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

    public interface UserGoalsRepository extends JpaRepository<UserGoals, Long> {
        Optional<UserGoals> findByUserId(Long userId);

    }
