package VladBudiu.licenta.Backend.controller;

import VladBudiu.licenta.Backend.DTOs.WorkoutDTO;
import VladBudiu.licenta.Backend.model.Workout;
import VladBudiu.licenta.Backend.service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import VladBudiu.licenta.Backend.DTOs.ExercisesDTO;

import java.util.List;

@RestController
@RequestMapping("/api/workouts")
@CrossOrigin(origins = "http://localhost:3000")
public class WorkoutController {

    @Autowired
    private WorkoutService service;

    @GetMapping
    public List<WorkoutDTO> getWorkouts() {
        return service.getAll();
    }

    @GetMapping("/{id}/exercises")
    public List<ExercisesDTO> getExercisesByWorkout(@PathVariable Long id) {
        System.out.println("geeting exercises for workout id: " + id);
        return service.getExercisesForWorkout(id);
    }
}
