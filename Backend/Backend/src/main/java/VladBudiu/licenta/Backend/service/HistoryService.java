package VladBudiu.licenta.Backend.service;

import VladBudiu.licenta.Backend.DTOs.*;
import VladBudiu.licenta.Backend.model.User;
import VladBudiu.licenta.Backend.repository.ExerciseSetRepo;
import VladBudiu.licenta.Backend.repository.WorkoutLogRepo;
import VladBudiu.licenta.Backend.repository.diary.*;
import VladBudiu.licenta.Backend.model.diary.*;
import VladBudiu.licenta.Backend.model.WorkoutLog;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class HistoryService {

    private final MealRepository   mealRepo;
    private final WeightLogRepository  weightRepo;
    private final WaterLogRepository   waterRepo;
    private final SleepLogRepository    sleepRepo;
    private final StepsLogRepository  stepsRepo;
    private final WorkoutLogRepo workoutRepo;
    private final ExerciseSetRepo exerciseSetRepo;

    public List<HistoryDTO> load(User user, LocalDate start, LocalDate end) {

        List<HistoryDTO> list = new ArrayList<>();
        for (LocalDate d = start; !d.isAfter(end); d = d.plusDays(1)) {

            /* calories */
            int kcal = mealRepo.caloriesForDay(user.getId(), d);

            /* weight (latest end of day) */
            double weight = weightRepo.latestUpTo(
                            user.getId(), d.atTime(LocalTime.MAX))
                    .map(WeightLog::getWeight)
                    .orElse(0.0);

            /* water / sleep / steps */
            LocalDateTime s = d.atStartOfDay();
            LocalDateTime e = d.plusDays(1).atStartOfDay();

            int water = waterRepo.waterForDay(user.getId(), s, e);
            int steps = stepsRepo.stepsForDay(user.getId(), s, e);
            double sleep = sleepRepo
                    .findFirstByUserIdAndLoggedAtBetweenOrderByLoggedAtDesc(
                            user.getId(), s, e)
                    .map(SleepLog::getSleepHours)
                    .orElse(0.0);

            /* workouts this ISO-week */
            LocalDate weekStart = d.with(DayOfWeek.MONDAY);
            int workouts = workoutRepo
                    .findByUserIdAndWeekStart(user.getId(), weekStart)
                    .map(WorkoutLog::getWorkoutsDone).orElse(0).intValue();

            list.add(new HistoryDTO(d, kcal, weight, water, sleep, steps, workouts));
        }
        return list;
    }

    
    public List<MaxWeightDTO> exerciseSeries(User user,
                                              String exercise,
                                              LocalDate from,
                                              LocalDate to) {

        return exerciseSetRepo
                .getMaxWeightSeries(user.getId(),
                        exercise,
                        from.atStartOfDay(),
                        to.plusDays(1).atStartOfDay())
                .stream()
                .map(r -> new MaxWeightDTO(r.getDate(), r.getMaxWeight()))
                .toList();
    }

}


