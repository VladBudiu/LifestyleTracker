package VladBudiu.licenta.Backend.DTOs;

import java.util.List;

public record WeekResponse(
        String weekStart,                  // Monday of the week
        Integer goalDays,                  // from user_goals
        List<DayDto> days,                 // always 7 entries
        Integer totalDaysWithWorkouts      // count
) {}