package com.sustainrank.dto;

import com.sustainrank.model.Startup;
import com.sustainrank.model.StartupCategory;

import java.util.Map;

/**
 * Encapsulates aggregated metrics for the SustainRank Executive Dashboard.
 */
public class DashboardStatsDto {

    private long totalStartups;
    private long totalCategories;
    private long assessedCount;
    private long pendingCount;
    private double averageSustainabilityScore;
    private Startup topRankedStartup;
    private Map<StartupCategory, Long> categoryDistribution;
    private double averageEnvironmental;
    private double averageInnovation;
    private double averageSocial;
    private double averageFinancial;

    public DashboardStatsDto() {}

    public long getTotalStartups() {
        return totalStartups;
    }

    public void setTotalStartups(long totalStartups) {
        this.totalStartups = totalStartups;
    }

    public long getTotalCategories() {
        return totalCategories;
    }

    public void setTotalCategories(long totalCategories) {
        this.totalCategories = totalCategories;
    }

    public long getAssessedCount() {
        return assessedCount;
    }

    public void setAssessedCount(long assessedCount) {
        this.assessedCount = assessedCount;
    }

    public long getPendingCount() {
        return pendingCount;
    }

    public void setPendingCount(long pendingCount) {
        this.pendingCount = pendingCount;
    }

    public double getAverageSustainabilityScore() {
        return averageSustainabilityScore;
    }

    public void setAverageSustainabilityScore(double averageSustainabilityScore) {
        this.averageSustainabilityScore = averageSustainabilityScore;
    }

    public Startup getTopRankedStartup() {
        return topRankedStartup;
    }

    public void setTopRankedStartup(Startup topRankedStartup) {
        this.topRankedStartup = topRankedStartup;
    }

    public Map<StartupCategory, Long> getCategoryDistribution() {
        return categoryDistribution;
    }

    public void setCategoryDistribution(Map<StartupCategory, Long> categoryDistribution) {
        this.categoryDistribution = categoryDistribution;
    }

    public double getAverageEnvironmental() {
        return averageEnvironmental;
    }

    public void setAverageEnvironmental(double averageEnvironmental) {
        this.averageEnvironmental = averageEnvironmental;
    }

    public double getAverageInnovation() {
        return averageInnovation;
    }

    public void setAverageInnovation(double averageInnovation) {
        this.averageInnovation = averageInnovation;
    }

    public double getAverageSocial() {
        return averageSocial;
    }

    public void setAverageSocial(double averageSocial) {
        this.averageSocial = averageSocial;
    }

    public double getAverageFinancial() {
        return averageFinancial;
    }

    public void setAverageFinancial(double averageFinancial) {
        this.averageFinancial = averageFinancial;
    }
}
