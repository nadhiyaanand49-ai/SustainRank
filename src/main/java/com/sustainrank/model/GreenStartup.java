package com.sustainrank.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

/**
 * Subclass representing environmental and clean-tech ventures.
 */
@Entity
@DiscriminatorValue("GREEN")
public class GreenStartup extends Startup {

    private Double estimatedCarbonOffsetTons = 0.0;
    private Double renewableEnergyPercentage = 0.0;

    public GreenStartup() {
        super();
        setCategory(StartupCategory.GreenStartup);
    }

    public GreenStartup(String name, String description, String founderName,
                        String location, Integer yearEstablished, String contactEmail,
                        Double estimatedCarbonOffsetTons, Double renewableEnergyPercentage) {
        super(name, StartupCategory.GreenStartup, description, founderName, location, yearEstablished, contactEmail);
        this.estimatedCarbonOffsetTons = estimatedCarbonOffsetTons;
        this.renewableEnergyPercentage = renewableEnergyPercentage;
    }

    @Override
    public String getCategorySpecialization() {
        return "Green Impact: " + (estimatedCarbonOffsetTons != null ? estimatedCarbonOffsetTons : 0.0) +
               " tons CO2 offset / yr (" + (renewableEnergyPercentage != null ? renewableEnergyPercentage : 0.0) + "% renewable)";
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
}
