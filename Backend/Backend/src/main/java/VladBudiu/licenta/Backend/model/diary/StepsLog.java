package VladBudiu.licenta.Backend.model.diary;


import VladBudiu.licenta.Backend.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "steps_logs")
@Data @NoArgsConstructor
public class StepsLog {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "user_id")
    private User user;

    private int steps;
    private LocalDateTime loggedAt;
}
