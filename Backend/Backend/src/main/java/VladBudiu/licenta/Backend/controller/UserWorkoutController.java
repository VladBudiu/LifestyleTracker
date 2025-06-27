package VladBudiu.licenta.Backend.controller;

import VladBudiu.licenta.Backend.DTOs.*;
import VladBudiu.licenta.Backend.service.UserWorkoutService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-workouts")
@CrossOrigin(origins = "http://localhost:3000")
public class UserWorkoutController {

    private final UserWorkoutService service;

    public UserWorkoutController(UserWorkoutService service) {
        this.service = service;
    }

    @GetMapping
    public List<UserWorkoutDTO> getByTypeAndUser(@RequestParam String group,
                                                 @RequestParam Long userId) {
        System.out.println("Type;" + group);
        System.out.println("userId:" + userId);
        return service.getByTypeAndUser(userId,group);
    }
    @GetMapping("/{id}")
    public WorkoutMetaDTO getOne(@PathVariable Long id) {
        return service.getMeta(id);
    }
    @PostMapping("/sessions")
    public void saveSession(@RequestBody CreateWorkoutSessionDTO dto) {
        service.saveSession(dto);
    }



    @GetMapping("/{id}/exercises")
    public List<ExercisesDTO> getExercisesForUserWorkout(@PathVariable Long id) {
        return service.getExercisesForUserWorkout(id);
    }

    @PostMapping
    public UserWorkoutDTO create(@RequestBody CreateUserWorkoutDTO dto) {
        System.out.println("Receive type: " + dto.getType());
        return service.create(dto);
    }

    @PostMapping("/{id}/exercises")
    public void addExercisesToWorkout(@PathVariable Long id, @RequestBody List<Long> exerciseIds) {
        service.addExercisesToWorkout(id, exerciseIds);
    }

}
