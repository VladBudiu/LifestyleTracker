package VladBudiu.licenta.Backend.model.diary;

import VladBudiu.licenta.Backend.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.*;

@Entity
@Table(name = "days",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id","date"}))
@Data @NoArgsConstructor
public class Day {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "user_id")
    private User user;

    private LocalDate date;

    @OneToMany(mappedBy = "day",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<Meal> meals = new ArrayList<>();
}