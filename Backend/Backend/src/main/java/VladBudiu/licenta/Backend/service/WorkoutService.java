package VladBudiu.licenta.Backend.service;

import VladBudiu.licenta.Backend.DTOs.ExercisesDTO;
import VladBudiu.licenta.Backend.DTOs.WorkoutDTO;
import VladBudiu.licenta.Backend.repository.WorkoutRepository;
import VladBudiu.licenta.Backend.model.Workout;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutService {
    @Autowired
    private WorkoutRepository repo;

    public List<WorkoutDTO> getAll() {
        return repo.findAll().stream()
                .map(WorkoutDTO::new)
                .toList();
    }

    public List<ExercisesDTO> getExercisesForWorkout(Long workoutId) {
        Workout workout = repo.findById(workoutId)
                .orElseThrow(() -> new RuntimeException("Workout not found with id " + workoutId));

        return workout.getExercises().stream()
                .map(ExercisesDTO::new)
                .toList();
    }
}
