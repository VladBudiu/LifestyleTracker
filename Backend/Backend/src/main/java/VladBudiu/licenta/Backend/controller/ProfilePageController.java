package VladBudiu.licenta.Backend.controller;

import VladBudiu.licenta.Backend.DTOs.UserProfileDTO;
import VladBudiu.licenta.Backend.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfilePageController {

    private final ProfileService profileService;

    @GetMapping("/{userId}")
    public UserProfileDTO getUserProfile(@PathVariable Long userId) {
        return profileService.getUserProfile(userId);
    }

    @PutMapping("/{userId}")
    public void updateUserProfile(@PathVariable Long userId, @RequestBody UserProfileDTO dto) {
        profileService.updateUserProfile(userId, dto);
    }
}
