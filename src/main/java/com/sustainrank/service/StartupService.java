package com.sustainrank.service;

import com.sustainrank.dto.AssessmentFormDto;
import com.sustainrank.dto.DashboardStatsDto;
import com.sustainrank.dto.StartupFormDto;
import com.sustainrank.model.Startup;
import com.sustainrank.model.StartupCategory;

import java.util.List;

/**
 * Service Interface defining the contract for Startup management,
 * sustainability assessment, ranking calculations, and reporting.
 *
 * Demonstrates OOP Abstraction.
 */
public interface StartupService {

    List<Startup> getAllStartups();

    List<Startup> searchAndFilter(String query, StartupCategory category);

    /**
     * Retrieves startups ranked by overall sustainability score in descending order.
     * Uses deterministic tie-breaking logic.
     */
    List<Startup> getRankedStartups(String query, StartupCategory category);

    Startup getStartupById(Long id);

    Startup createStartup(StartupFormDto formDto);

    Startup updateStartup(Long id, StartupFormDto formDto);

    void deleteStartup(Long id);

    Startup recordAssessment(AssessmentFormDto assessmentDto);

    DashboardStatsDto getDashboardStatistics();

    List<Startup> getRecentStartups();

    byte[] exportStartupsCsv();

    void resetDemoData();

    void clearDemoData();

    long countDemoData();
}
