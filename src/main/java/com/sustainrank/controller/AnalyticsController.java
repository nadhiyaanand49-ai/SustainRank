package com.sustainrank.controller;

import com.sustainrank.dto.DashboardStatsDto;
import com.sustainrank.model.Startup;
import com.sustainrank.service.StartupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

/**
 * Controller for the Analytics & Sustainability Performance Reports.
 */
@Controller
public class AnalyticsController {

    private final StartupService startupService;

    @Autowired
    public AnalyticsController(StartupService startupService) {
        this.startupService = startupService;
    }

    @GetMapping("/analytics")
    public String viewAnalytics(Model model) {
        DashboardStatsDto stats = startupService.getDashboardStatistics();
        List<Startup> rankedStartups = startupService.getRankedStartups(null, null);

        model.addAttribute("stats", stats);
        model.addAttribute("rankedStartups", rankedStartups);
        model.addAttribute("activePage", "analytics");
        return "analytics";
    }
}
