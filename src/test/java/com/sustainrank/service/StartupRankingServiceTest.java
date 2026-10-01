package com.sustainrank.service;

import com.sustainrank.model.GreenStartup;
import com.sustainrank.model.Startup;
import com.sustainrank.model.TechStartup;
import com.sustainrank.service.impl.StartupServiceImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests verifying sorting, ranking, and deterministic tie-breaking logic.
 */
class StartupRankingServiceTest {

    @Test
    @DisplayName("Should rank startup with higher overall score first")
    void testBasicRankingOrder() {
        Startup s1 = new TechStartup("Startup Beta", "Desc", "Founder", "City", 2021, "b@test.com", "Java", 1);
        s1.setOverallScore(82.5);

        Startup s2 = new GreenStartup("Startup Alpha", "Desc", "Founder", "City", 2022, "a@test.com", 100.0, 80.0);
        s2.setOverallScore(91.0);

        List<Startup> list = new ArrayList<>(List.of(s1, s2));
        list.sort(StartupServiceImpl.RANKING_COMPARATOR);

        assertEquals("Startup Alpha", list.get(0).getName(), "Higher overall score should be ranked first");
        assertEquals("Startup Beta", list.get(1).getName());
    }

    @Test
    @DisplayName("Tie-Breaker: When overall scores match, highest Environmental score must win")
    void testTieBreakingByEnvironmentalScore() {
        Startup s1 = new GreenStartup("EcoClean", "Desc", "Founder", "City", 2021, "e@test.com", 200.0, 90.0);
        s1.setOverallScore(85.0);
        s1.setEnvironmentalScore(92.0); // Higher environmental
        s1.setInnovationScore(78.0);
        s1.setSocialImpactScore(85.0);
        s1.setFinancialViabilityScore(85.0);

        Startup s2 = new TechStartup("AI Solutions", "Desc", "Founder", "City", 2021, "a@test.com", "Python", 2);
        s2.setOverallScore(85.0);
        s2.setEnvironmentalScore(80.0); // Lower environmental
        s2.setInnovationScore(90.0);
        s2.setSocialImpactScore(85.0);
        s2.setFinancialViabilityScore(85.0);

        List<Startup> list = new ArrayList<>(List.of(s2, s1));
        list.sort(StartupServiceImpl.RANKING_COMPARATOR);

        assertEquals("EcoClean", list.get(0).getName(), "Startup with higher environmental score should win tie");
    }

    @Test
    @DisplayName("Tie-Breaker: When overall and environmental match, Innovation score breaks tie")
    void testTieBreakingByInnovationScore() {
        Startup s1 = new TechStartup("Alpha Tech", "Desc", "Founder", "City", 2021, "a@test.com", "Java", 2);
        s1.setOverallScore(80.0);
        s1.setEnvironmentalScore(80.0);
        s1.setInnovationScore(85.0); // Higher innovation
        s1.setSocialImpactScore(75.0);
        s1.setFinancialViabilityScore(80.0);

        Startup s2 = new TechStartup("Beta Tech", "Desc", "Founder", "City", 2021, "b@test.com", "Kotlin", 0);
        s2.setOverallScore(80.0);
        s2.setEnvironmentalScore(80.0);
        s2.setInnovationScore(75.0); // Lower innovation
        s2.setSocialImpactScore(85.0);
        s2.setFinancialViabilityScore(80.0);

        List<Startup> list = new ArrayList<>(List.of(s2, s1));
        list.sort(StartupServiceImpl.RANKING_COMPARATOR);

        assertEquals("Alpha Tech", list.get(0).getName(), "Higher innovation score should break tie when environmental is equal");
    }

    @Test
    @DisplayName("Tie-Breaker: When all 4 scores match identically, alphabetical name breaks tie")
    void testTieBreakingByAlphabeticalName() {
        Startup s1 = new TechStartup("Zenith Labs", "Desc", "Founder", "City", 2021, "z@test.com", "Rust", 1);
        s1.setOverallScore(80.0);
        s1.setEnvironmentalScore(80.0);
        s1.setInnovationScore(80.0);
        s1.setSocialImpactScore(80.0);
        s1.setFinancialViabilityScore(80.0);

        Startup s2 = new TechStartup("Apex Innovations", "Desc", "Founder", "City", 2021, "a@test.com", "C++", 1);
        s2.setOverallScore(80.0);
        s2.setEnvironmentalScore(80.0);
        s2.setInnovationScore(80.0);
        s2.setSocialImpactScore(80.0);
        s2.setFinancialViabilityScore(80.0);

        List<Startup> list = new ArrayList<>(List.of(s1, s2));
        list.sort(StartupServiceImpl.RANKING_COMPARATOR);

        assertEquals("Apex Innovations", list.get(0).getName(), "Alphabetical name ordering should be final deterministic tie breaker");
    }
}
