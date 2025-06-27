package VladBudiu.licenta.Backend.repository;

import VladBudiu.licenta.Backend.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {}

