package VladBudiu.licenta.Backend.DTOs;

public class HealthMetricsDTO {
    private String name;
    private int value;
    private String unit;
    private int goal;
    private String goalUnit;
    private int start;

    // Constructors
    public HealthMetricsDTO() {
    }

    public HealthMetricsDTO(String name, int value, String unit, int goal, String goalUnit) {
        this.name = name;
        this.value = value;
        this.unit = unit;
        this.goal = goal;
        this.goalUnit = goalUnit;
        this.start = 0;
    }

    public HealthMetricsDTO(String name, int value, String unit, int goal, String goalUnit, int start) {
        this.name = name;
        this.value = value;
        this.unit = unit;
        this.goal = goal;
        this.goalUnit = goalUnit;
        this.start = start;
    }

    //Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public int getGoal() {
        return goal;
    }

    public void setGoal(int goal) {
        this.goal = goal;
    }

    public String getGoalUnit() {
        return goalUnit;
    }

    public void setGoalUnit(String goalUnit) {
        this.goalUnit = goalUnit;
    }

    public int getStart() {
        return start;
    }

    public void setStart(int start) {
        this.start = start;
    }

    @Override
    public String toString() {
        return "HealthMetricsDTO{" +
                "name='" + name + '\'' +
                ", value=" + value +
                ", unit='" + unit + '\'' +
                ", goal=" + goal +
                ", goalUnit='" + goalUnit + '\'' +
                '}';
    }
}
