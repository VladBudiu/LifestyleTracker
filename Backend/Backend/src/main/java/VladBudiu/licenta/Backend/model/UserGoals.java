package VladBudiu.licenta.Backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_goals")
@Data
public class UserGoals {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private Double goalWeight;
    private Integer calorieTarget;

    private Integer proteinGoal;  
    private Integer carbsGoal;    
    private Integer fatGoal;      

    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    private Integer sleepGoal;
    private Integer stepsGoal;
    private Integer waterGoal;
    private Integer workout_goal;
    private Double weeklyGoal;
}
