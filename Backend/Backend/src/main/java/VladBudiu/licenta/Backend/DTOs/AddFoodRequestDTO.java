package VladBudiu.licenta.Backend.DTOs;

import lombok.Data;

@Data
public class AddFoodRequestDTO {
    private String  name;
    private int     calories;
    private double  protein;   // g
    private double  carbs;     // g
    private double  fat;       // g
    private int     quantity;  // g ml etc.
}
