package VladBudiu.licenta.Backend.service;

import VladBudiu.licenta.Backend.DTOs.*;
import VladBudiu.licenta.Backend.model.*;
import VladBudiu.licenta.Backend.repository.ExerciseRepository;
import VladBudiu.licenta.Backend.repository.UserRepository;
import VladBudiu.licenta.Backend.repository.UserWorkoutRepository;
import VladBudiu.licenta.Backend.repository.UserWorkoutSetRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserWorkoutService {

    private final UserWorkoutRepository repo;
    private final UserRepository userRepository;
    private final ExerciseRepository exerciseRepository;

    private final UserWorkoutRepository userWorkoutRepository;

    private final UserWorkoutSetRepository userWorkoutSetRepository;

    public UserWorkoutService(UserWorkoutRepository repo, UserRepository userRepository, ExerciseRepository exerciseRepository, UserWorkoutRepository userWorkoutRepository, UserWorkoutSetRepository userWorkoutSetRepository ){
        this.repo = repo;
        this.userRepository = userRepository;
        this.exerciseRepository = exerciseRepository;
        this.userWorkoutRepository = userWorkoutRepository;
        this.userWorkoutSetRepository = userWorkoutSetRepository;
    }

    public List<UserWorkoutDTO> getByTypeAndUser(Long userId, String type) {
        return repo.findByUserIdAndTypeIgnoreCase(userId, type).stream()
                .map(w -> new UserWorkoutDTO(
                        w.getId(),
                        w.getTitle(),
                        w.getDescription(),

                        w.getImageUrl(),
                        w.getType(),
                        w.getDurationInMin(),
                        w.getExercises() != null ? w.getExercises().size() : 0,
                        w.getUserId()
                )).collect(Collectors.toList());
    }

    public WorkoutMetaDTO getMeta(Long id) {
        UserWorkout w = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Workout not found"));
        return new WorkoutMetaDTO(
                w.getId(), w.getTitle(), w.getDescription(),
                w.getDurationInMin(), w.getType());
    }

    public UserWorkoutDTO create(CreateUserWorkoutDTO dto) {
        UserWorkout workout = new UserWorkout();
        workout.setTitle(dto.getTitle());
        workout.setDescription(dto.getDescription());
        workout.setImageUrl(dto.getImageUrl());
        workout.setType(dto.getType());
        workout.setDurationInMin(dto.getDuration());

        
        workout.setExercises(Collections.emptyList());

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + dto.getUserId()));
        workout.setUserId(user.getId());

        UserWorkout saved = repo.save(workout);

        return new UserWorkoutDTO(
                saved.getId(),
                saved.getTitle(),
                saved.getDescription(),
                saved.getImageUrl(),
                saved.getType(),
                saved.getDurationInMin(),
                0,
                saved.getUserId()
        );


    }

    public List<ExercisesDTO> getExercisesForUserWorkout(Long workoutId) {

        List<UserWorkoutSet> sets = userWorkoutSetRepository.findByUserWorkoutId(workoutId);

        return repo.findById(workoutId)
                .orElseThrow(() -> new RuntimeException("User workout not found"))
                .getExercises()
                .stream()
                .map(ex -> {
                    List<SetRowDTO> setRows = sets.stream()
                            .filter(s -> s.getExercise().getId().equals(ex.getId()))
                            .map(s -> new SetRowDTO(
                                    s.getId().getSetOrder().intValue(),
                                    s.getReps(),
                                    s.getWeightKg()))
                            .toList();

                    return new ExercisesDTO(ex, setRows);   
                })
                .toList();
    }


    public void saveSession(CreateWorkoutSessionDTO dto) {

        UserWorkout uw = repo.findById(dto.workoutId())
                .orElseThrow(() -> new RuntimeException("User workout not found"));

        short order = 1;
        for (ExerciseInSessionDTO exIn : dto.exercises()) {
            for (SetInSessionDTO setIn : exIn.sets()) {
                UserWorkoutSet set = new UserWorkoutSet();

                UserWorkoutSetId id = new UserWorkoutSetId();
                id.setUserWorkoutId(uw.getId());
                id.setExerciseId(exIn.exerciseId());
                id.setSetOrder(order++);

                set.setId(id);
                set.setUserWorkout(uw);
                set.setExercise(
                        exerciseRepository.findById(exIn.exerciseId())
                                .orElseThrow());
                set.setWeightKg(setIn.weightKg());
                set.setReps(setIn.reps());
                set.setPerformedAt(dto.date().atStartOfDay());

                System.out.println("Before flush: " + userWorkoutSetRepository.count());
                System.out.println("Saved set: " + set.getId());
                userWorkoutSetRepository.save(set);
                System.out.println("Session save complete!");
            }
        }
    }


    public void addExercisesToWorkout(Long workoutId, List<Long> exerciseIds) {
        UserWorkout workout = userWorkoutRepository.findById(workoutId)
                .orElseThrow(() -> new RuntimeException("Workout not found"));

        List<Exercise> exercises = exerciseRepository.findAllById(exerciseIds);
        workout.getExercises().addAll(exercises);

        userWorkoutRepository.save(workout);
    }

}