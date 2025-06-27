package VladBudiu.licenta.Backend.repository;
import VladBudiu.licenta.Backend.model.UserWorkoutSet;
import VladBudiu.licenta.Backend.model.UserWorkoutSetId;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserWorkoutSetRepository
        extends JpaRepository<UserWorkoutSet, UserWorkoutSetId> {

    List<UserWorkoutSet> findByUserWorkoutId(Long userWorkoutId);
}
