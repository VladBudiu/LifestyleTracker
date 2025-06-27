package VladBudiu.licenta.Backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

// CalorieLog.java
@Entity
@Table(name = "calorie_logs",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id","day"}))
@Getter
@Setter
public class CalorieLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

//    @Column(name = "day_date")
    private LocalDate day;
    private int currentCalories;
    private int targetCalories;
}
