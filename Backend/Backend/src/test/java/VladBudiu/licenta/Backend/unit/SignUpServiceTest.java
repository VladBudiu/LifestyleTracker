package VladBudiu.licenta.Backend.unit;

import VladBudiu.licenta.Backend.DTOs.SignUpRequestDTO;
import VladBudiu.licenta.Backend.exceptions.DuplicateEmailException;
import VladBudiu.licenta.Backend.model.User;
import VladBudiu.licenta.Backend.repository.CalorieLogRepository;
import VladBudiu.licenta.Backend.repository.UserGoalsRepository;
import VladBudiu.licenta.Backend.repository.UserGoalRepo;
import VladBudiu.licenta.Backend.repository.UserRepository;
import VladBudiu.licenta.Backend.repository.diary.WeightLogRepository;
import VladBudiu.licenta.Backend.service.SignUpService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SignUpServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserGoalsRepository userGoalRepository;

    @Mock
    private CalorieLogRepository calorieLogRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private WeightLogRepository weightRepo;

    @InjectMocks
    private SignUpService signUpService;


    @Test
    void whenEmailIsUnique_userIsPersisted() {
        // Arrange
        SignUpRequestDTO dto = new SignUpRequestDTO(
                "john123", "john@demo.com", "pass123",
                "lose", "medium", "180", "80", "70", "0.5");

        when(userRepository.findByEmail(dto.getEmail())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(dto.getPassword())).thenReturn("encoded-password");
        when(userRepository.save(any(User.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        User savedUser = signUpService.register(dto);

        // Assert
        assertEquals(dto.getEmail(), savedUser.getEmail());
        assertEquals(dto.getUsername(), savedUser.getUsername());
        assertEquals(dto.getWeightGoal(), savedUser.getWeightGoal());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void whenEmailAlreadyExists_throwDuplicateException() {
        // Arrange
        SignUpRequestDTO dto = new SignUpRequestDTO(
                "john123", "john@demo.com", "pass123",
                "lose", "medium", "180", "80", "70", "0.5");

        when(userRepository.findByEmail(dto.getEmail()))
                .thenReturn(Optional.of(new User()));

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> signUpService.register(dto));


        verify(userRepository, never()).save(any());
    }
}
