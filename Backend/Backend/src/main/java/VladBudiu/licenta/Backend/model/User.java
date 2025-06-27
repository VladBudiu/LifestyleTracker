package VladBudiu.licenta.Backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /* Required on signup */
    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;        // BCrypt hash

    @Column(nullable = false, unique = true)
    private String username;

    /* Optional / captured later */
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;


    private String weightGoal;

    private String activityLevel;

    private Double height;
    private Double weight;
    private Double weightTarget;

    @Column(name = "sign_up_date", nullable = false)
    private LocalDate signUpDate = LocalDate.now();

    /* ── 1‑to‑1 link to goals table ──────────────── */
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL,
            fetch = FetchType.LAZY, orphanRemoval = true)
    private List<UserGoals> goals;

//    @OneToMany(mappedBy = "user")
//    private List<UserWorkout> userWorkouts;
    //Constructors

    public User(Long id, String email, String password, String username, String firstName, String lastName, LocalDate dateOfBirth, String weightGoal, String activityLevel, Double height, Double weight, Double weightTarget, LocalDate signUpDate, List<UserGoals> goals) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.weightGoal = weightGoal;
        this.activityLevel = activityLevel;
        this.height = height;
        this.weight = weight;
        this.weightTarget = weightTarget;
        this.signUpDate = signUpDate;
        this.goals = goals;
    }

    public User() {


    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getWeightGoal() {
        return weightGoal;
    }

    public void setWeightGoal(String weightGoal) {
        this.weightGoal = weightGoal;
    }

    public String getActivityLevel() {
        return activityLevel;
    }

    public void setActivityLevel(String activityLevel) {
        this.activityLevel = activityLevel;
    }

    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Double getWeightTarget() {
        return weightTarget;
    }

    public void setWeightTarget(Double weightTarget) {
        this.weightTarget = weightTarget;
    }

    public LocalDate getSignUpDate() {
        return signUpDate;
    }

    public void setSignUpDate(LocalDate signUpDate) {
        this.signUpDate = signUpDate;
    }

    public List<UserGoals> getGoals() {
        return goals;
    }

    public void setGoals(List<UserGoals> goals) {
        this.goals = goals;
    }
}
