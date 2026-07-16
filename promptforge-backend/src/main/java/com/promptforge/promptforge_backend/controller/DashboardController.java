package com.promptforge.promptforge_backend.controller;

import com.promptforge.promptforge_backend.dto.DashboardSummaryResponse;
import com.promptforge.promptforge_backend.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/summary")
    public ResponseEntity<DashboardSummaryResponse> getDashboardSummary(
            Authentication authentication
    ) {

        DashboardSummaryResponse response =
                dashboardService.getDashboardSummary(authentication.getName());

        return ResponseEntity.ok(response);
    }
}