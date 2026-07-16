package com.promptforge.promptforge_backend.service;

import com.promptforge.promptforge_backend.dto.DashboardSummaryResponse;

public interface DashboardService {

    DashboardSummaryResponse getDashboardSummary(String userEmail);

}