package com.sustainrank.dto;

import com.sustainrank.model.StartupCategory;
import jakarta.validation.constraints.*;

/**
 * Data Transfer Object for creating or updating a Startup.
 * Separates HTTP web layer concerns from the core JPA entity.
 */
public class StartupFormDto {

    private Long id;

    @NotBlank(message = "Startup name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;

    @NotNull(message = "Please select a valid category")
    private StartupCategory category;

    @NotBlank(message = "Startup description is required")
    @Size(min = 10, max = 1000, message = "Description must be between 10 and 1000 characters")
    private String description;

    @NotBlank(message = "Founder name is required")
    @Size(min = 2, max = 80, message = "Founder name must be between 2 and 80 characters")
    private String founderName;

    @NotBlank(message = "Headquarters location is required")
    @Size(min = 2, max = 100, message = "Location must be between 2 and 100 characters")
    private String location;

    @NotNull(message = "Year established is required")
    @Min(value = 1900, message = "Year must be 1900 or later")
    @Max(value = 2030, message = "Year cannot be in the future")
    private Integer yearEstablished;

    @NotBlank(message = "Contact email is required")
    @Email(message = "Please enter a valid email address")
    private String contactEmail;

    // Optional category-specific fields
    private String primaryTechStack;
    private Integer patentCount;
    private Double estimatedCarbonOffsetTons;
    private Double renewableEnergyPercentage;
    private String clinicalPhase;
    private Boolean hipaaOrGdprCompliant;
    private Long beneficiariesReached;
    private String unSdgAlignment;

    public StartupFormDto() {}

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public StartupCategory getCategory() {
        return category;
    }

    public void setCategory(StartupCategory category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getFounderName() {
        return founderName;
    }

    public void setFounderName(String founderName) {
        this.founderName = founderName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getYearEstablished() {
        return yearEstablished;
    }

    public void setYearEstablished(Integer yearEstablished) {
        this.yearEstablished = yearEstablished;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public String getPrimaryTechStack() {
        return primaryTechStack;
    }

    public void setPrimaryTechStack(String primaryTechStack) {
        this.primaryTechStack = primaryTechStack;
    }

    public Integer getPatentCount() {
        return patentCount;
    }

    public void setPatentCount(Integer patentCount) {
        this.patentCount = patentCount;
    }

    public Double getEstimatedCarbonOffsetTons() {
        return estimatedCarbonOffsetTons;
    }

    public void setEstimatedCarbonOffsetTons(Double estimatedCarbonOffsetTons) {
        this.estimatedCarbonOffsetTons = estimatedCarbonOffsetTons;
    }

    public Double getRenewableEnergyPercentage() {
        return renewableEnergyPercentage;
    }

    public void setRenewableEnergyPercentage(Double renewableEnergyPercentage) {
        this.renewableEnergyPercentage = renewableEnergyPercentage;
    }

    public String getClinicalPhase() {
        return clinicalPhase;
    }

    public void setClinicalPhase(String clinicalPhase) {
        this.clinicalPhase = clinicalPhase;
    }

    public Boolean getHipaaOrGdprCompliant() {
        return hipaaOrGdprCompliant;
    }

    public void setHipaaOrGdprCompliant(Boolean hipaaOrGdprCompliant) {
        this.hipaaOrGdprCompliant = hipaaOrGdprCompliant;
    }

    public Long getBeneficiariesReached() {
        return beneficiariesReached;
    }

    public void setBeneficiariesReached(Long beneficiariesReached) {
        this.beneficiariesReached = beneficiariesReached;
    }

    public String getUnSdgAlignment() {
        return unSdgAlignment;
    }

    public void setUnSdgAlignment(String unSdgAlignment) {
        this.unSdgAlignment = unSdgAlignment;
    }
}
