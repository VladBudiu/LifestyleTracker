package VladBudiu.licenta.Backend.service;

import VladBudiu.licenta.Backend.DTOs.DayDto;
import VladBudiu.licenta.Backend.DTOs.WeekResponse;
import VladBudiu.licenta.Backend.DTOs.WorkoutDto2;
import VladBudiu.licenta.Backend.model.UserWorkout;
import VladBudiu.licenta.Backend.repository.UserGoalRepo;
import VladBudiu.licenta.Backend.repository.UserWorkoutRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Map;
import java.util.stream.IntStream;

import VladBudiu.licenta.Backend.model.UserGoal;

import static java.util.stream.Collectors.*;

@Service
@RequiredArgsConstructor
public class WorkoutWeekService {

    private final UserWorkoutRepo workoutRepo;
    private final UserGoalRepo goalRepo;

    public WeekResponse getWeek(Long userId, LocalDate weekStart) {
        LocalDate weekEnd = weekStart.plusDays(6);

        
        List<UserWorkout> dbRows = workoutRepo
                .findByUserIdAndPerformedAtBetween(userId, weekStart, weekEnd);

        int goalDays = goalRepo.findFirstByUserId(userId)
                .map(UserGoal::getWorkoutGoal)
                .orElse(5);               

        
        Map<LocalDate,List<WorkoutDto2>> byDate = dbRows.stream()
                .collect(groupingBy(UserWorkout::getPerformedAt,
                        mapping(w -> new WorkoutDto2(w.getId(), w.getTitle()), toList())));

        List<DayDto> days = IntStream.rangeClosed(0,6)
                .mapToObj(i -> {
                    LocalDate d = weekStart.plusDays(i);
                    return new DayDto(
                            d.toString(),
                            byDate.getOrDefault(d, List.of())
                    );
                }).toList();

        long nonEmpty = days.stream().filter(d -> !d.workouts().isEmpty()).count();

        return new WeekResponse(
                weekStart.toString(),
                goalDays,
                days,
                (int)nonEmpty
        );
    }

    public WeekResponse addWorkout(
            Long userId, LocalDate date, String name,
            Integer duration, Integer calories) {

        UserWorkout w = new UserWorkout();
        w.setUserId(userId);
        w.setTitle(name);
        w.setDurationInMin(duration);
        w.setPerformedAt(date);
        workoutRepo.save(w);

        LocalDate monday = date.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        return getWeek(userId, monday);
    }
}
