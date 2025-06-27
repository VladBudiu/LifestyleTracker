package VladBudiu.licenta.Backend.model.diary;

import jakarta.persistence.*;
import lombok.*;

import java.util.*;

@Entity
@Table(name = "meals")
@Data @NoArgsConstructor
public class Meal {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "day_id")
    private Day day;

    @Enumerated(EnumType.STRING)
    private MealType type;

    @Column(name = "total_calories")
    private int totalCalories;

    @OneToMany(mappedBy = "meal",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<Food> foods = new ArrayList<>();
}