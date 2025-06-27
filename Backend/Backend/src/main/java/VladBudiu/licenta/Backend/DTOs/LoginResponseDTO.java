package VladBudiu.licenta.Backend.DTOs;

public class LoginResponseDTO {
    private String message;
    private String firstName;
    private String lastName;
    private String email;
    private Long userId;
    private String token;

    public LoginResponseDTO(String message, String firstName, String lastName, String email, Long userId) {
        this.message = message;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.userId = userId;
        this.token = token;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public Long getUserId() {
        return userId;
    }

    public String getMessage() {
        return message;
    }

    public String getToken() {
        return token;
    }
}
