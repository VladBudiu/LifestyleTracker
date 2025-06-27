package VladBudiu.licenta.Backend.DTOs;

import lombok.Data;

@Data
public class UpdateDoubleDTO {
    private double value;

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }
}
