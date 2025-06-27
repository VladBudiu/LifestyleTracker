package VladBudiu.licenta.Backend.DTOs;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FoodDTO {
    private Long id;
    private String name;
    private int calories;
    private int quantity;

    private double  protein;   // NEW
    private double  carbs;     // NEW
    private double  fat;       // NEW

    public double getProtein() {
        return protein;
    }

    public double getCarbs() {
        return carbs;
    }

    public double getFat() {
        return fat;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getCalories() {
        return calories;
    }

    public int getQuantity() {
        return quantity;
    }
}