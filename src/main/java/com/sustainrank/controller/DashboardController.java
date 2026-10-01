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
 * Controller for the Executive Sustainability Dashboard.
 */
@Controller
public class DashboardController {

    private final StartupService startupService;

    @Autowired
    public DashboardController(StartupService startupService) {
        this.startupService = startupService;
    }

    @GetMapping({"/", "/dashboard"})
    public String dashboard(Model model) {
        DashboardStatsDto stats = startupService.getDashboardStatistics();
        List<Startup> recentStartups = startupService.getRecentStartups();

        model.addAttribute("stats", stats);
        model.addAttribute("recentStartups", recentStartups);
        model.addAttribute("activePage", "dashboard");
        return "dashboard";
    }
}
