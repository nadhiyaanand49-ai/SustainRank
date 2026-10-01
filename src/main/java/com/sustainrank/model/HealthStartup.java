package com.sustainrank.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

/**
 * Subclass representing medical, wellness, and digital health ventures.
 */
@Entity
@DiscriminatorValue("HEALTH")
public class HealthStartup extends Startup {

    private String clinicalPhase;
    private Boolean hipaaOrGdprCompliant = true;

    public HealthStartup() {
        super();
        setCategory(StartupCategory.HealthStartup);
    }

    public HealthStartup(String name, String description, String founderName,
                         String location, Integer yearEstablished, String contactEmail,
                         String clinicalPhase, Boolean hipaaOrGdprCompliant) {
        super(name, StartupCategory.HealthStartup, description, founderName, location, yearEstablished, contactEmail);
        this.clinicalPhase = clinicalPhase;
        this.hipaaOrGdprCompliant = hipaaOrGdprCompliant;
    }

    @Override
    public String getCategorySpecialization() {
        return "Health Milestone: " + (clinicalPhase != null ? clinicalPhase : "Phase 1") +
               (hipaaOrGdprCompliant != null && hipaaOrGdprCompliant ? " (HIPAA/GDPR Compliant)" : " (Pre-compliance)");
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
}
