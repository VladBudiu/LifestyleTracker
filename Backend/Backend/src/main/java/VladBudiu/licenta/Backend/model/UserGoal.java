package VladBudiu.licenta.Backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_goals")
public class UserGoal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;
    @Column(name = "workout_goal")
    private Integer workout_goal; // goalDays
    /* getters / setters */

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Integer getWorkoutGoal() {
        return workout_goal;
    }

    public void setWorkoutGoal(Integer workoutGoal) {
        this.workout_goal = workoutGoal;
    }
}

