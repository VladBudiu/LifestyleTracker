package VladBudiu.licenta.Backend.integration;

import VladBudiu.licenta.Backend.DTOs.SignUpRequestDTO;
import VladBudiu.licenta.Backend.repository.UserRepository;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Import;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;
@Import(DisableJwtFilterConfig.class)
@ActiveProfiles("test")
@SpringBootTest(webEnvironment = RANDOM_PORT)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class SignUpServiceIT {

    @Autowired
    private TestRestTemplate rest;

    @Autowired
    private UserRepository userRepo;

    private final String signupUrl = "/signup/createAccount";

    @Test
    @Order(1)
    void postSignup_createsUserInDatabase() {
        SignUpRequestDTO dto = new SignUpRequestDTO(
                "testuser", "test@demo.com", "pass123",
                "maintain", "active", "175", "70", "68", "0.5"
        );


        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<SignUpRequestDTO> request = new HttpEntity<>(dto, headers);

        ResponseEntity<Void> rsp =
                rest.postForEntity("/signup/createAccount", request, Void.class);

        assertEquals(HttpStatus.OK, rsp.getStatusCode());

    }
}
