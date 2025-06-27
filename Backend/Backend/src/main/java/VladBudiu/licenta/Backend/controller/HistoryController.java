package VladBudiu.licenta.Backend.controller;

import VladBudiu.licenta.Backend.DTOs.HistoryDTO;
import VladBudiu.licenta.Backend.DTOs.MaxWeightDTO;
import VladBudiu.licenta.Backend.Utility.JWTUtil;
import VladBudiu.licenta.Backend.model.User;
import VladBudiu.licenta.Backend.repository.UserRepository;
import VladBudiu.licenta.Backend.service.HistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

import static org.springframework.format.annotation.DateTimeFormat.ISO.DATE;

@RestController
@RequestMapping("/api/history")
@RequiredArgsConstructor
public class HistoryController {

    private final HistoryService historySvc;
    private final JWTUtil jwtUtil;
    private final UserRepository userRepository;

    private User resolveUserFromToken(String token) {
        if (token == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing token");

        String email = jwtUtil.validateAccessToken(token);
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    @GetMapping
    public List<HistoryDTO> history(
            @CookieValue(value = "access_token", required = false) String token,
            @RequestParam @DateTimeFormat(iso = DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DATE) LocalDate end) {

        if (end.isBefore(start))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "`end` < `start`");

        User user = resolveUserFromToken(token);
        return historySvc.load(user, start, end);
    }

    @GetMapping("/progression")
    public List<MaxWeightDTO> exerciseProgression(
            @CookieValue(value = "access_token", required = false) String token,
            @RequestParam String exercise,
            @RequestParam @DateTimeFormat(iso = DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DATE) LocalDate end) {

        User user = resolveUserFromToken(token);
        return historySvc.exerciseSeries(user, exercise, start, end);
    }
}
