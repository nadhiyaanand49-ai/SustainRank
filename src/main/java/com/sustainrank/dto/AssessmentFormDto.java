package com.sustainrank.dto;

import jakarta.validation.constraints.*;

/**
 * DTO for recording the 4 sustainability assessment criteria scores.
 */
public class AssessmentFormDto {

    @NotNull(message = "Startup ID is required")
    private Long startupId;

    private String startupName;
    private String categoryName;

    @NotNull(message = "Environmental score is required")
    @DecimalMin(value = "0.0", message = "Score must be at least 0.0")
    @DecimalMax(value = "100.0", message = "Score cannot exceed 100.0")
    private Double environmentalScore = 0.0;

    @NotNull(message = "Innovation score is required")
    @DecimalMin(value = "0.0", message = "Score must be at least 0.0")
    @DecimalMax(value = "100.0", message = "Score cannot exceed 100.0")
    private Double innovationScore = 0.0;

    @NotNull(message = "Social Impact score is required")
    @DecimalMin(value = "0.0", message = "Score must be at least 0.0")
    @DecimalMax(value = "100.0", message = "Score cannot exceed 100.0")
    private Double socialImpactScore = 0.0;

    @NotNull(message = "Financial Viability score is required")
    @DecimalMin(value = "0.0", message = "Score must be at least 0.0")
    @DecimalMax(value = "100.0", message = "Score cannot exceed 100.0")
    private Double financialViabilityScore = 0.0;

    @Size(max = 1000, message = "Assessment notes must not exceed 1000 characters")
    private String assessmentNotes;

    public AssessmentFormDto() {}

    public Long getStartupId() {
        return startupId;
    }

    public void setStartupId(Long startupId) {
        this.startupId = startupId;
    }

    public String getStartupName() {
        return startupName;
    }

    public void setStartupName(String startupName) {
        this.startupName = startupName;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Double getEnvironmentalScore() {
        return environmentalScore;
    }

    public void setEnvironmentalScore(Double environmentalScore) {
        this.environmentalScore = environmentalScore;
    }

    public Double getInnovationScore() {
        return innovationScore;
    }

    public void setInnovationScore(Double innovationScore) {
        this.innovationScore = innovationScore;
    }

    public Double getSocialImpactScore() {
        return socialImpactScore;
    }

    public void setSocialImpactScore(Double socialImpactScore) {
        this.socialImpactScore = socialImpactScore;
    }

    public Double getFinancialViabilityScore() {
        return financialViabilityScore;
    }

    public void setFinancialViabilityScore(Double financialViabilityScore) {
        this.financialViabilityScore = financialViabilityScore;
    }

    public String getAssessmentNotes() {
        return assessmentNotes;
    }

    public void setAssessmentNotes(String assessmentNotes) {
        this.assessmentNotes = assessmentNotes;
    }
}
