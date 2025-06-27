package VladBudiu.licenta.Backend.controller;

import VladBudiu.licenta.Backend.DTOs.HealthMetricsDTO;
import VladBudiu.licenta.Backend.service.HealthMetricService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/metrics")
@CrossOrigin(origins = "http://localhost:3000")
public class HealthMetricController {

    @Autowired
    private HealthMetricService service;

    @GetMapping("/{userId}")
    public List<HealthMetricsDTO> getUserMetrics(@PathVariable Long userId) {
        return service.getMetricsForUser(userId);
    }
    @RestController
    @RequestMapping("/api/metrics")
    @RequiredArgsConstructor
    public class HealthMetricsController {

        private final HealthMetricService service;

        @PostMapping("/{userId}")
        public void updateMetric(@PathVariable Long userId, @RequestBody HealthMetricsDTO metric) {
            service.updateMetric(userId, metric);
        }
    }

    @PutMapping("/{userId}")
    public void updateUserMetric(
            @PathVariable Long userId,
            @RequestBody HealthMetricsDTO metricUpdate) {

        service.updateMetric(userId, metricUpdate);
    }

}

