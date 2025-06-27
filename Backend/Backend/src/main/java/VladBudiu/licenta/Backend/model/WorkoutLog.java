package VladBudiu.licenta.Backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "workout_logs")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class WorkoutLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

   
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    private User user;

   
    @Column(name = "week_start", nullable = false)
    private LocalDate weekStart;

    @Column(name = "workouts_done", nullable = false)
    private int workoutsDone;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser_id() {
        return user;
    }

    public void setUser_id(User user_id) {
        this.user = user_id;
    }

    public LocalDate getWeekStart() {
        return weekStart;
    }

    public void setWeekStart(LocalDate weekStart) {
        this.weekStart = weekStart;
    }

    public int getWorkoutsDone() {
        return workoutsDone;
    }

    public void setWorkoutsDone(int workoutsDone) {
        this.workoutsDone = workoutsDone;
    }
}
