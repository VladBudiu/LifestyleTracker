package VladBudiu.licenta.Backend.controller;

import VladBudiu.licenta.Backend.DTOs.LoginRequestDTO;
import VladBudiu.licenta.Backend.DTOs.LoginResponseDTO;
import VladBudiu.licenta.Backend.Utility.JWTUtil;
import VladBudiu.licenta.Backend.service.AuthService;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AuthController {

    @Autowired
    private AuthService authService;
    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO request,
                                                  HttpServletResponse response) {
        LoginResponseDTO user = authService.login(request);
        System.out.println("am intrat in login");

        String accessToken = jwtUtil.generateAccessToken(user.getEmail());
        String refreshToken = jwtUtil.generateRefreshToken(user.getEmail());

        ResponseCookie accessCookie = ResponseCookie.from("access_token", accessToken)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(600)
                .sameSite("Lax")
                .build();

        ResponseCookie refreshCookie = ResponseCookie.from("refresh_token", refreshToken)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(604800) 
                .sameSite("Lax")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());
        response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());

        System.out.println("incercam login cred");

        return ResponseEntity.ok(user);
    }


    @PostMapping("/auth/refresh")
    public ResponseEntity<?> refreshToken(@CookieValue(value = "refresh_token", required = false) String refreshToken,
                                          HttpServletResponse response) {
        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token missing");
        }

        try {
            String username = jwtUtil.validateRefreshToken(refreshToken);
            String newAccessToken = jwtUtil.generateAccessToken(username);

            ResponseCookie accessCookie = ResponseCookie.from("access_token", newAccessToken)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(600)
                    .sameSite("Lax")
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());
            return ResponseEntity.ok("Access token refreshed");
        } catch (JwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
        }
    }


    @PostMapping("auth/logout")
    public ResponseEntity<?> logout(HttpServletResponse response){

        System.out.println("Entered logout");
        ResponseCookie accessCookie = ResponseCookie.from("access_token", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .sameSite("Lax")
                .build();

        ResponseCookie refreshCookie = ResponseCookie.from("refresh_token", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .sameSite("Strict")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());
        response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());

        System.out.println("Cookies theoretically cleared");

        return ResponseEntity.ok("Logged out");
    }

}