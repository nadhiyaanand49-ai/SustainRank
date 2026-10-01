package com.sustainrank.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

/**
 * Subclass representing technology-focused ventures.
 * Demonstrates OOP Inheritance and Polymorphic method overriding.
 */
@Entity
@DiscriminatorValue("TECH")
public class TechStartup extends Startup {

    private String primaryTechStack;
    private Integer patentCount = 0;

    public TechStartup() {
        super();
        setCategory(StartupCategory.TechStartup);
    }

    public TechStartup(String name, String description, String founderName,
                       String location, Integer yearEstablished, String contactEmail,
                       String primaryTechStack, Integer patentCount) {
        super(name, StartupCategory.TechStartup, description, founderName, location, yearEstablished, contactEmail);
        this.primaryTechStack = primaryTechStack;
        this.patentCount = patentCount;
    }

    @Override
    public String getCategorySpecialization() {
        return "Tech Focus: " + (primaryTechStack != null ? primaryTechStack : "Software") +
               " (" + (patentCount != null ? patentCount : 0) + " patents)";
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
}
