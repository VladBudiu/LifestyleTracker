package VladBudiu.licenta.Backend.controller;

import VladBudiu.licenta.Backend.model.Exercise;
import VladBudiu.licenta.Backend.repository.ExerciseRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exercises")
@CrossOrigin(origins = "http://localhost:3000")
public class ExerciseController {

    private final ExerciseRepository exerciseRepository;

    public ExerciseController(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    @GetMapping
    public List<Exercise> getAll() {
        return exerciseRepository.findAll();
    }
}
