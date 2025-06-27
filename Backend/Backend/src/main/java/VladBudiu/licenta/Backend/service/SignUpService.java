package VladBudiu.licenta.Backend.service;

import VladBudiu.licenta.Backend.DTOs.MacroGoals;
import VladBudiu.licenta.Backend.DTOs.SignUpRequestDTO;
import VladBudiu.licenta.Backend.model.CalorieLog;
import VladBudiu.licenta.Backend.model.User;
import VladBudiu.licenta.Backend.model.UserGoals;
import VladBudiu.licenta.Backend.model.diary.WeightLog;
import VladBudiu.licenta.Backend.repository.CalorieLogRepository;
import VladBudiu.licenta.Backend.repository.UserGoalsRepository;
import VladBudiu.licenta.Backend.repository.UserRepository;
import VladBudiu.licenta.Backend.repository.diary.WeightLogRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class SignUpService {

    private final UserRepository       userRepo;
    private final UserGoalsRepository  goalsRepo;
    private final CalorieLogRepository calorieRepo;
    private final WeightLogRepository  weightRepo;
    private final PasswordEncoder      passwordEncoder;

    
    public User register(SignUpRequestDTO req) {

        /*  uniqueness check  */
        userRepo.findByEmail(req.getEmail())
                .ifPresent(u -> { throw new IllegalArgumentException("Email already in use"); });

        /*  USER  */
        User user = new User();
        user.setEmail(req.getEmail());
        user.setUsername(req.getUsername());

        // BCrypt-hash 
        user.setPassword(passwordEncoder.encode(req.getPassword()));

        user.setWeightGoal(req.getWeightGoal());
        user.setActivityLevel(req.getActivityLevel());

        if (req.getHeight()       != null) user.setHeight(Double.parseDouble(req.getHeight()));
        if (req.getWeight()       != null) user.setWeight(Double.parseDouble(req.getWeight()));
        if (req.getWeightTarget() != null) user.setWeightTarget(Double.parseDouble(req.getWeightTarget()));

        userRepo.save(user);

        /*  GOALS  */
        int kcalTarget = calcCalorieTarget(req);
        MacroGoals macroGoals = computeMacroGoals(kcalTarget, user.getWeightGoal());

        UserGoals goals = new UserGoals();
        goals.setUser(user);
        goals.setGoalWeight(user.getWeightTarget());
        goals.setCalorieTarget(kcalTarget);
        goals.setProteinGoal((int) macroGoals.getProtein());
        goals.setCarbsGoal((int) macroGoals.getCarbs());
        goals.setFatGoal((int) macroGoals.getFat());

        goals.setSleepGoal(8);
        goals.setStepsGoal(10_000);
        goals.setWaterGoal(2000);

        String level = user.getActivityLevel();
        if (level != null) {
            switch (level.toLowerCase()) {
                case "high" -> goals.setWorkout_goal(5);
                case "moderate" -> goals.setWorkout_goal(3);
                default -> goals.setWorkout_goal(2);
            }
        } else {
            goals.setWorkout_goal(2);
        }

        if (req.getWeekly() != null) {
            goals.setWeeklyGoal(Double.parseDouble(req.getWeekly()));
        }

        goalsRepo.save(goals);

        /*  INITIAL DAILY CALORIE LOG */
        CalorieLog cLog = new CalorieLog();
        cLog.setUser(user);
        cLog.setDay(LocalDate.now());
        cLog.setCurrentCalories(0);
        cLog.setTargetCalories(kcalTarget);
        calorieRepo.save(cLog);

        /*  INITIAL WEIGHT LOG  */
        if (user.getWeight() != null) {
            WeightLog wLog = new WeightLog();
            wLog.setUser(user);
            wLog.setWeight(Math.round(user.getWeight()));
            wLog.setLoggedAt(LocalDateTime.now());
            weightRepo.save(wLog);
        }

        return user;
    }

   
    private int calcCalorieTarget(SignUpRequestDTO u) {
        if (u.getWeekly() == null) return 2000;
        double dailyDeficit = (Double.parseDouble(u.getWeekly()) * 7_700) / 7.0;
        return (int) Math.max(1_200, 2_000 - dailyDeficit);
    }

    private MacroGoals computeMacroGoals(int kcal, String weightGoal) {
        int cPerc = 40;
        int pPerc = "gain".equalsIgnoreCase(weightGoal) ? 40 : 30;
        int fPerc = 100 - cPerc - pPerc;

        double carbsG   = (kcal * cPerc / 100.0) / 4;
        double proteinG = (kcal * pPerc / 100.0) / 4;
        double fatG     = (kcal * fPerc / 100.0) / 9;

        return new MacroGoals(
                Math.round(proteinG),
                Math.round(carbsG),
                Math.round(fatG));
    }
}
