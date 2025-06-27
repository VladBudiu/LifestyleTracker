package VladBudiu.licenta.Backend.DTOs;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;

public class MaxWeightDTO {

    private final LocalDate date;
    private final Double maxWeight;
    public MaxWeightDTO(LocalDate date, Double maxWeight) {
        this.date = date;
        this.maxWeight = maxWeight;
    }

    /* Getters */

    public LocalDate getDate()      { return date; }
    public Double    getMaxWeight() { return maxWeight; }
}