package com.sustainrank.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

/**
 * Subclass representing community and social welfare ventures.
 */
@Entity
@DiscriminatorValue("SOCIAL")
public class SocialStartup extends Startup {

    private Long beneficiariesReached = 0L;
    private String unSdgAlignment; // e.g. "SDG 1 (No Poverty), SDG 4 (Quality Education)"

    public SocialStartup() {
        super();
        setCategory(StartupCategory.SocialStartup);
    }

    public SocialStartup(String name, String description, String founderName,
                         String location, Integer yearEstablished, String contactEmail,
                         Long beneficiariesReached, String unSdgAlignment) {
        super(name, StartupCategory.SocialStartup, description, founderName, location, yearEstablished, contactEmail);
        this.beneficiariesReached = beneficiariesReached;
        this.unSdgAlignment = unSdgAlignment;
    }

    @Override
    public String getCategorySpecialization() {
        return "Social Reach: " + (beneficiariesReached != null ? beneficiariesReached : 0) +
               " lives impacted (" + (unSdgAlignment != null ? unSdgAlignment : "UN SDGs") + ")";
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
