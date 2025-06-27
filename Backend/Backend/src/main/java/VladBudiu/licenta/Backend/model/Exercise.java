package VladBudiu.licenta.Backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "exercises")
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String exercise;

    @Column(columnDefinition = "jsonb")
    private String short_youtube_demo;

    @Column(columnDefinition = "jsonb")
    private String in_depth_youtube_explanation;

    private String difficultyLevel;
    private String target_muscle_group;
    private String prime_mover_muscle;
    private String secondary_muscle;
    private String tertiary_muscle;
    private String primary_equipment;
    private Integer primary_items;
    private String secondary_equipment;
    private Integer secondary_items;
    private String posture;
    private String single_or_double_arm;
    private String continuous_or_alternating_arms;
    private String grip;
    private String load_position_ending;
    private String continuous_or_alternating_legs;
    private String foot_elevation;
    private String combination_exercises;
    private String movement_pattern_1;
    private String movement_pattern_2;
    private String movement_pattern_3;
    private String plane_of_motion_1;
    private String plane_of_motion_2;
    private String plane_of_motion_3;
    private String body_region;
    private String force_type;
    private String mechanics;
    private String laterality;
    private String primary_exercise_classification;

    @ManyToMany(mappedBy = "exercises")
    @JsonIgnore
    private List<Workout> workouts;

    @ManyToMany(mappedBy = "exercises")
    @JsonIgnore
    private List<UserWorkout> userWorkouts;


    // Getters and Setters

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getExercise() { return exercise; }

    public void setExercise(String exercise) { this.exercise = exercise; }

    public String getShort_youtube_demo() { return short_youtube_demo; }

    public void setShort_youtube_demo(String short_youtube_demo) { this.short_youtube_demo = short_youtube_demo; }

    public String getIn_depth_youtube_explanation() { return in_depth_youtube_explanation; }

    public void setIn_depth_youtube_explanation(String in_depth_youtube_explanation) { this.in_depth_youtube_explanation = in_depth_youtube_explanation; }

    public String getDifficultyLevel() { return difficultyLevel; }

    public void setDifficultyLevel(String difficultyLevel) { this.difficultyLevel = difficultyLevel; }

    public String getTarget_muscle_group() { return target_muscle_group; }

    public void setTarget_muscle_group(String target_muscle_group) { this.target_muscle_group = target_muscle_group; }

    public String getPrime_mover_muscle() { return prime_mover_muscle; }

    public void setPrime_mover_muscle(String prime_mover_muscle) { this.prime_mover_muscle = prime_mover_muscle; }

    public String getSecondary_muscle() { return secondary_muscle; }

    public void setSecondary_muscle(String secondary_muscle) { this.secondary_muscle = secondary_muscle; }

    public String getTertiary_muscle() { return tertiary_muscle; }

    public void setTertiary_muscle(String tertiary_muscle) { this.tertiary_muscle = tertiary_muscle; }

    public String getPrimary_equipment() { return primary_equipment; }

    public void setPrimary_equipment(String primary_equipment) { this.primary_equipment = primary_equipment; }

    public Integer getPrimary_items() { return primary_items; }

    public void setPrimary_items(Integer primary_items) { this.primary_items = primary_items; }

    public String getSecondary_equipment() { return secondary_equipment; }

    public void setSecondary_equipment(String secondary_equipment) { this.secondary_equipment = secondary_equipment; }

    public Integer getSecondary_items() { return secondary_items; }

    public void setSecondary_items(Integer secondary_items) { this.secondary_items = secondary_items; }

    public String getPosture() { return posture; }

    public void setPosture(String posture) { this.posture = posture; }

    public String getSingle_or_double_arm() { return single_or_double_arm; }

    public void setSingle_or_double_arm(String single_or_double_arm) { this.single_or_double_arm = single_or_double_arm; }

    public String getContinuous_or_alternating_arms() { return continuous_or_alternating_arms; }

    public void setContinuous_or_alternating_arms(String continuous_or_alternating_arms) { this.continuous_or_alternating_arms = continuous_or_alternating_arms; }

    public String getGrip() { return grip; }

    public void setGrip(String grip) { this.grip = grip; }

    public String getLoad_position_ending() { return load_position_ending; }

    public void setLoad_position_ending(String load_position_ending) { this.load_position_ending = load_position_ending; }

    public String getContinuous_or_alternating_legs() { return continuous_or_alternating_legs; }

    public void setContinuous_or_alternating_legs(String continuous_or_alternating_legs) { this.continuous_or_alternating_legs = continuous_or_alternating_legs; }

    public String getFoot_elevation() { return foot_elevation; }

    public void setFoot_elevation(String foot_elevation) { this.foot_elevation = foot_elevation; }

    public String getCombination_exercises() { return combination_exercises; }

    public void setCombination_exercises(String combination_exercises) { this.combination_exercises = combination_exercises; }

    public String getMovement_pattern_1() { return movement_pattern_1; }

    public void setMovement_pattern_1(String movement_pattern_1) { this.movement_pattern_1 = movement_pattern_1; }

    public String getMovement_pattern_2() { return movement_pattern_2; }

    public void setMovement_pattern_2(String movement_pattern_2) { this.movement_pattern_2 = movement_pattern_2; }

    public String getMovement_pattern_3() { return movement_pattern_3; }

    public void setMovement_pattern_3(String movement_pattern_3) { this.movement_pattern_3 = movement_pattern_3; }

    public String getPlane_of_motion_1() { return plane_of_motion_1; }

    public void setPlane_of_motion_1(String plane_of_motion_1) { this.plane_of_motion_1 = plane_of_motion_1; }

    public String getPlane_of_motion_2() { return plane_of_motion_2; }

    public void setPlane_of_motion_2(String plane_of_motion_2) { this.plane_of_motion_2 = plane_of_motion_2; }

    public String getPlane_of_motion_3() { return plane_of_motion_3; }

    public void setPlane_of_motion_3(String plane_of_motion_3) { this.plane_of_motion_3 = plane_of_motion_3; }

    public String getBody_region() { return body_region; }

    public void setBody_region(String body_region) { this.body_region = body_region; }

    public String getForce_type() { return force_type; }

    public void setForce_type(String force_type) { this.force_type = force_type; }

    public String getMechanics() { return mechanics; }

    public void setMechanics(String mechanics) { this.mechanics = mechanics; }

    public String getLaterality() { return laterality; }

    public void setLaterality(String laterality) { this.laterality = laterality; }

    public String getPrimary_exercise_classification() { return primary_exercise_classification; }

    public void setPrimary_exercise_classification(String primary_exercise_classification) {
        this.primary_exercise_classification = primary_exercise_classification;
    }

    public List<Workout> getWorkouts() { return workouts; }

    public void setWorkouts(List<Workout> workouts) { this.workouts = workouts; }

    public List<UserWorkout> getUserWorkouts() { return userWorkouts; }

    public void setUserWorkouts(List<UserWorkout> userWorkouts) { this.userWorkouts = userWorkouts; }
}