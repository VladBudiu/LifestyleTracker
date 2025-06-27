package VladBudiu.licenta.Backend.model.diary;


import VladBudiu.licenta.Backend.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "water_logs")
@Data @NoArgsConstructor
public class WaterLog {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "user_id")
    private User user;

    private int waterIntake;          // ml
    private LocalDateTime loggedAt;
}
