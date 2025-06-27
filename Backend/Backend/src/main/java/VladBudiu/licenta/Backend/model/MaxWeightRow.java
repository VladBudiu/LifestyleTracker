package VladBudiu.licenta.Backend.model;

import java.time.LocalDate;

public interface MaxWeightRow {
    LocalDate getDate();        // column alias must match “date”
    Double    getMaxWeight();   // alias must match “max_weight”
}