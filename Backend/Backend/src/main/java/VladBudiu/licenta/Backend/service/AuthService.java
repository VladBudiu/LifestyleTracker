package VladBudiu.licenta.Backend.service;

import VladBudiu.licenta.Backend.DTOs.LoginRequestDTO;
import VladBudiu.licenta.Backend.DTOs.LoginResponseDTO;
import VladBudiu.licenta.Backend.model.User;
import VladBudiu.licenta.Backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor    // Lombok – generates ctor for final fields
public class AuthService {

    private final UserRepository  userRepository;
    private final PasswordEncoder passwordEncoder;

    /** Throws 401 on bad credentials, returns DTO on success. */
    public LoginResponseDTO login(LoginRequestDTO loginRequest) {

        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
        }

        return new LoginResponseDTO(
                "Login successful",
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getId());
    }
}
