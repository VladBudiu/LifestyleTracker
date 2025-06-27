package VladBudiu.licenta.Backend.controller;

import VladBudiu.licenta.Backend.DTOs.SignUpRequestDTO;
import VladBudiu.licenta.Backend.Utility.JWTUtil;
import VladBudiu.licenta.Backend.model.User;
import VladBudiu.licenta.Backend.service.SignUpService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/signup/createAccount")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class SignUpController {

    private final SignUpService signUpService;
    private final JWTUtil jwt;

    @Autowired
    public SignUpController(SignUpService signUpService, JWTUtil jwt) {
        this.signUpService = signUpService;
        this.jwt = jwt;
    }

    @PostMapping
    public ResponseEntity<?> signUp(@RequestBody SignUpRequestDTO req, HttpServletResponse res) {
        User user = signUpService.register(req);

        String accessToken = jwt.generateAccessToken(user.getEmail());
        String refreshToken = jwt.generateRefreshToken(user.getEmail());

        ResponseCookie accessCookie = ResponseCookie.from("access_token", accessToken)
                .httpOnly(true)
                .secure(true)
                .sameSite("Strict")
                .path("/")
                .maxAge(600) // 10 minutes
                .build();

        ResponseCookie refreshCookie = ResponseCookie.from("refresh_token", refreshToken)
                .httpOnly(true)
                .secure(true)
                .sameSite("Strict")
                .path("/auth/refresh")
                .maxAge(604800) // 7 days
                .build();

        res.addHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());
        res.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());

        return ResponseEntity.ok("Account created and logged in");
    }
}
