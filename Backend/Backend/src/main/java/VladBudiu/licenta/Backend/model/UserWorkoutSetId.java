package VladBudiu.licenta.Backend.model;

import jakarta.persistence.*;
import java.io.Serializable;

@Embeddable
public class UserWorkoutSetId implements Serializable {
    @Column(name = "user_workout_id")
    private Long userWorkoutId;

    @Column(name = "exercise_id")
    private Long exerciseId;

    @Column(name = "set_order")
    private Short setOrder;



    /* getters / setters / equals / hashCode */

    public Long getUserWorkoutId() {
        return userWorkoutId;
    }

    public void setUserWorkoutId(Long userWorkoutId) {
        this.userWorkoutId = userWorkoutId;
    }

    public Long getExerciseId() {
        return exerciseId;
    }

    public void setExerciseId(Long exerciseId) {
        this.exerciseId = exerciseId;
    }

    public Short getSetOrder() {
        return setOrder;
    }

    public void setSetOrder(Short setOrder) {
        this.setOrder = setOrder;
    }
}

