package com.sustainrank.model;

/**
 * Enumeration representing the four distinct industry domains
 * of startups evaluated within SustainRank.
 */
public enum StartupCategory {
    TechStartup("Tech Startup", "Enterprise software, AI, Cloud & Hardware", "primary"),
    GreenStartup("Green Startup", "CleanTech, Renewable Energy & Circular Economy", "success"),
    HealthStartup("Health Startup", "Biotech, Digital Health & Medical Devices", "info"),
    SocialStartup("Social Startup", "EdTech, Agritech, Financial Inclusion & Community Impact", "warning");

    private final String displayName;
    private final String description;
    private final String badgeClass;

    StartupCategory(String displayName, String description, String badgeClass) {
        this.displayName = displayName;
        this.description = description;
        this.badgeClass = badgeClass;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getDescription() {
        return description;
    }

    public String getBadgeClass() {
        return badgeClass;
    }
}
