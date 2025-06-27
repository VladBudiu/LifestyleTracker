package VladBudiu.licenta.Backend.controller;

import VladBudiu.licenta.Backend.DTOs.AddWorkoutDTO;
import VladBudiu.licenta.Backend.DTOs.WeekResponse;
import VladBudiu.licenta.Backend.service.WorkoutWeekService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/workout-week")
@RequiredArgsConstructor
public class WorkoutWeekController {

    private final WorkoutWeekService svc;

    @GetMapping
    public WeekResponse getWeek(
            @RequestParam Long userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate weekStart) {

        return svc.getWeek(userId, weekStart);
    }

    @PostMapping("/log")
    public WeekResponse log(
            @RequestBody LogRequest body) {    
        return svc.addWorkout(
                body.userId(),
                body.date(),
                body.name(),
                body.durationMinutes(),
                body.caloriesBurned());
    }

    
    public record LogRequest(
            Long userId,
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            String name,
            Integer durationMinutes,
            Integer caloriesBurned) {}
}


