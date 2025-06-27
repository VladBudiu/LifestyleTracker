package VladBudiu.licenta.Backend.DTOs;

import VladBudiu.licenta.Backend.model.Exercise;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

public class ExercisesDTO {
    private Long id;
    private String exercise;
    private String difficultyLevel;
    private String target_muscle_group;
    private String prime_mover_muscle;
    private String secondary_muscle;
    private String posture;
    private String primary_equipment;
    private String short_youtube_demo_url;
    private List<SetRowDTO> sets;

    public ExercisesDTO(Exercise ex) {
        this.id = ex.getId();
        this.exercise = ex.getExercise();
        this.difficultyLevel = ex.getDifficultyLevel();
        this.target_muscle_group = ex.getTarget_muscle_group();
        this.prime_mover_muscle = ex.getPrime_mover_muscle();
        this.secondary_muscle = ex.getSecondary_muscle();
        this.posture = ex.getPosture();
        this.primary_equipment = ex.getPrimary_equipment();

        try {
            if (ex.getShort_youtube_demo() != null) {
                ObjectMapper mapper = new ObjectMapper();
                JsonNode demoNode = mapper.readTree(ex.getShort_youtube_demo());
                if (demoNode.has("url")) {
                    this.short_youtube_demo_url = demoNode.get("url").asText();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public ExercisesDTO(Exercise ex, List<SetRowDTO> sets) {
        this(ex); 
        this.sets = sets;
    }


    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getExercise() {
        return exercise;
    }

    public void setExercise(String exercise) {
        this.exercise = exercise;
    }

    public String getDifficultyLevel() {
        return difficultyLevel;
    }

    public void setDifficultyLevel(String difficultyLevel) {
        this.difficultyLevel = difficultyLevel;
    }

    public String getTarget_muscle_group() {
        return target_muscle_group;
    }

    public void setTarget_muscle_group(String targe_muscle_group) {
        this.target_muscle_group = targe_muscle_group;
    }

    public String getPrime_mover_muscle() {
        return prime_mover_muscle;
    }

    public void setPrime_mover_muscle(String prime_mover_muscle) {
        this.prime_mover_muscle = prime_mover_muscle;
    }

    public String getSecondary_muscle() {
        return secondary_muscle;
    }

    public void setSecondary_muscle(String secondary_muscle) {
        this.secondary_muscle = secondary_muscle;
    }

    public String getPosture() {
        return posture;
    }

    public void setPosture(String posture) {
        this.posture = posture;
    }

    public String getPrimary_equipment() {
        return primary_equipment;
    }

    public void setPrimary_equipment(String primary_equipment) {
        this.primary_equipment = primary_equipment;
    }

    public String getShort_youtube_demo_url() {
        return short_youtube_demo_url;
    }

    public void setShort_youtube_demo_url(String short_youtube_demo_url) {
        this.short_youtube_demo_url = short_youtube_demo_url;
    }

    public List<SetRowDTO> getSets() {
        return sets !=null ? sets: List.of();
    }

    public void setSets(List<SetRowDTO> sets) {
        this.sets = sets;
    }

}