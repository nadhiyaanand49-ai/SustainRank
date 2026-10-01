package com.sustainrank.controller;

import com.sustainrank.model.Startup;
import com.sustainrank.model.StartupCategory;
import com.sustainrank.service.StartupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

/**
 * Controller for the Leaderboard and Rankings module.
 * Displays dynamically sorted ranking results with deterministic tie-breaking.
 */
@Controller
public class RankingController {

    private final StartupService startupService;

    @Autowired
    public RankingController(StartupService startupService) {
        this.startupService = startupService;
    }

    @GetMapping("/rankings")
    public String viewRankings(
            @RequestParam(value = "query", required = false) String query,
            @RequestParam(value = "category", required = false) StartupCategory category,
            Model model) {

        List<Startup> rankedList = startupService.getRankedStartups(query, category);

        long assessedCount = rankedList.stream().filter(Startup::getIsAssessed).count();
        long unassessedCount = rankedList.size() - assessedCount;

        model.addAttribute("startups", rankedList);
        model.addAttribute("categories", StartupCategory.values());
        model.addAttribute("selectedCategory", category);
        model.addAttribute("searchQuery", query);
        model.addAttribute("assessedCount", assessedCount);
        model.addAttribute("unassessedCount", unassessedCount);
        model.addAttribute("activePage", "rankings");
        return "rankings";
    }
}
