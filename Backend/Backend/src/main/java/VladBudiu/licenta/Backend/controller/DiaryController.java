package VladBudiu.licenta.Backend.controller;

import VladBudiu.licenta.Backend.DTOs.AddFoodRequestDTO;
import VladBudiu.licenta.Backend.DTOs.DiaryDTO;
import VladBudiu.licenta.Backend.DTOs.UpdateDoubleDTO;
import VladBudiu.licenta.Backend.DTOs.UpdateIntRequestDTO;
import VladBudiu.licenta.Backend.Utility.JWTUtil;
import VladBudiu.licenta.Backend.model.User;
import VladBudiu.licenta.Backend.model.diary.MealType;
import VladBudiu.licenta.Backend.repository.UserRepository;
import VladBudiu.licenta.Backend.service.DiaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/diary")
@RequiredArgsConstructor
public class DiaryController {

    private final DiaryService diaryService;
    private final JWTUtil jwtUtil;
    private final UserRepository userRepository;

    private User resolveUserFromToken(String token) {
        if (token == null) throw new RuntimeException("Missing token");
        String email = jwtUtil.validateAccessToken(token); 
        return userRepository.findByEmail(email).orElseThrow(() ->
                new RuntimeException("User not found for email: " + email));
    }

    @GetMapping("/{date}")
    public DiaryDTO getDiary(
            @CookieValue(value = "access_token", required = false) String token,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        User user = resolveUserFromToken(token);;
        return diaryService.buildDiary(user, date);
    }

    @PostMapping("/{date}/meals/{mealType}/foods")
    public DiaryDTO addFood(
            @CookieValue(value = "access_token", required = false) String token,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @PathVariable MealType mealType,
            @RequestBody AddFoodRequestDTO req) {

        System.out.println("🍽 Received food add request: " + req);
        System.out.println("📅 Date: " + date + ", Meal: " + mealType);


        User user = resolveUserFromToken(token);
        return diaryService.addFood(user, date, mealType, req);
    }

    @PutMapping("/{date}/water")
    public DiaryDTO updateWater(@CookieValue(value = "access_token", required = false) String token,
                                @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
                                @RequestBody UpdateIntRequestDTO req) {
        User user = resolveUserFromToken(token);
        return diaryService.updateWater(user, date, req.getValue());
    }

    @PutMapping("/{date}/steps")
    public DiaryDTO updateSteps(@CookieValue(value = "access_token", required = false) String token,
                                @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
                                @RequestBody UpdateIntRequestDTO req) {
        User user = resolveUserFromToken(token);
        return diaryService.updateSteps(user, date, req.getValue());
    }

    @PutMapping("/{date}/sleep")
    public DiaryDTO updateSleep(@CookieValue(value = "access_token", required = false) String token,
                                @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
                                @RequestBody UpdateDoubleDTO req) {
        User user = resolveUserFromToken(token);
        return diaryService.updateSleep(user, date, req.getValue());
    }

    @PutMapping("/{date}/weight")
    public DiaryDTO updateWeight(@CookieValue(value = "access_token", required = false) String token,
                                 @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
                                 @RequestBody UpdateDoubleDTO req) {
        User user = resolveUserFromToken(token);
        return diaryService.updateWeight(user, date, req.getValue());
    }
}
