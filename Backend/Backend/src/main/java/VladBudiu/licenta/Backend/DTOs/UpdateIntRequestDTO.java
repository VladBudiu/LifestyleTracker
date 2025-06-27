package VladBudiu.licenta.Backend.DTOs;

import lombok.Data;

@Data
public class UpdateIntRequestDTO {
    private int value;

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }
}