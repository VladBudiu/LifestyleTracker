package VladBudiu.licenta.Backend.service;

import VladBudiu.licenta.Backend.DTOs.UserProfileDTO;
import VladBudiu.licenta.Backend.model.User;
import VladBudiu.licenta.Backend.model.UserGoals;
import VladBudiu.licenta.Backend.model.diary.WeightLog;
import VladBudiu.licenta.Backend.repository.UserRepository;
import VladBudiu.licenta.Backend.repository.UserGoalsRepository;
import VladBudiu.licenta.Backend.repository.diary.WeightLogRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepo;
    private final UserGoalsRepository goalsRepo;
    private final WeightLogRepository weightRepo;

    public UserProfileDTO getUserProfile(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        UserGoals goals = goalsRepo.findByUserId(userId)
                .orElseGet(() -> new UserGoals()); // empty fallback

        UserProfileDTO dto = new UserProfileDTO();
        dto.setFirst_name(user.getFirstName());
        dto.setLast_name(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setHeight(user.getHeight());
        dto.setWeight(user.getWeight());
        dto.setActivity_level(user.getActivityLevel());


        dto.setGoal_weight(goals.getGoalWeight());
        dto.setCalorie_target(goals.getCalorieTarget());
        dto.setWater_goal(goals.getWaterGoal());
        dto.setSleep_goal(goals.getSleepGoal());
        dto.setSteps_goal(goals.getStepsGoal());
        dto.setWorkout_goal(goals.getWorkout_goal());

        return dto;
    }

    @Transactional
    public void updateUserProfile(Long userId, UserProfileDTO dto) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        /*  detect weight change  */
        Double previousWeight = user.getWeight();            
        Double newWeight      = (double) dto.getWeight();    

        /*  update personal fields  */
        user.setFirstName(dto.getFirst_name());
        user.setLastName(dto.getLast_name());
        user.setHeight((double) dto.getHeight());
        user.setWeight(newWeight);
        user.setActivityLevel(dto.getActivity_level());

        userRepo.save(user);

        /*  goals  */
        UserGoals goals = goalsRepo.findByUserId(userId)
                .orElse(new UserGoals());

        goals.setUser(user);
        goals.setGoalWeight(dto.getGoal_weight());
        goals.setCalorieTarget(dto.getCalorie_target());
        goals.setWaterGoal(dto.getWater_goal());
        goals.setSleepGoal(dto.getSleep_goal());
        goals.setStepsGoal(dto.getSteps_goal());
        goals.setWorkout_goal(dto.getWorkout_goal());

        goalsRepo.save(goals);

        /*  weight log*/
        if (previousWeight == null || !previousWeight.equals(newWeight)) {
            WeightLog log = new WeightLog();
            log.setUser(user);
            log.setWeight(Math.round(newWeight));    
            log.setLoggedAt(LocalDateTime.now());
            weightRepo.save(log);
        }
    }

}
