package com.sustainrank.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

/**
 * Base Entity representing a Startup in the SustainRank ecosystem.
 *
 * Demonstrates:
 * - Encapsulation (private fields, controlled getters/setters)
 * - Object-Oriented Inheritance (Single-table JPA inheritance for subclasses)
 * - Data Integrity & Bean Validation (JSR-380)
 */
@Entity
@Table(name = "startups")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "startup_type", discriminatorType = DiscriminatorType.STRING)
@DiscriminatorValue("GENERAL")
public class Startup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Startup name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    @Column(nullable = false)
    private String name;

    @NotNull(message = "Category must be selected")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StartupCategory category;

    @NotBlank(message = "Description is required")
    @Size(min = 10, max = 1000, message = "Description must be between 10 and 1000 characters")
    @Column(length = 1000, nullable = false)
    private String description;

    @NotBlank(message = "Founder name is required")
    @Size(min = 2, max = 80, message = "Founder name must be between 2 and 80 characters")
    @Column(nullable = false)
    private String founderName;

    @NotBlank(message = "Location is required")
    @Size(min = 2, max = 100, message = "Location must be between 2 and 100 characters")
    @Column(nullable = false)
    private String location;

    @NotNull(message = "Year established is required")
    @Min(value = 1900, message = "Year must be 1900 or later")
    @Max(value = 2030, message = "Year cannot be in the future")
    @Column(nullable = false)
    private Integer yearEstablished;

    @NotBlank(message = "Contact email is required")
    @Email(message = "Please provide a valid email address")
    @Column(nullable = false)
    private String contactEmail;

    // Four core sustainability criteria (0.0 to 100.0)
    @DecimalMin(value = "0.0", message = "Score cannot be less than 0")
    @DecimalMax(value = "100.0", message = "Score cannot exceed 100")
    private Double environmentalScore = 0.0;

    @DecimalMin(value = "0.0", message = "Score cannot be less than 0")
    @DecimalMax(value = "100.0", message = "Score cannot exceed 100")
    private Double innovationScore = 0.0;

    @DecimalMin(value = "0.0", message = "Score cannot be less than 0")
    @DecimalMax(value = "100.0", message = "Score cannot exceed 100")
    private Double socialImpactScore = 0.0;

    @DecimalMin(value = "0.0", message = "Score cannot be less than 0")
    @DecimalMax(value = "100.0", message = "Score cannot exceed 100")
    private Double financialViabilityScore = 0.0;

    // Derived overall score: (Env + Innov + Social + Financial) / 4.0
    @Column(nullable = false)
    private Double overallScore = 0.0;

    // Flag to differentiate startups that have received a formal assessment
    @Column(nullable = false)
    private Boolean isAssessed = false;

    @Size(max = 1000, message = "Assessment notes cannot exceed 1000 characters")
    @Column(length = 1000)
    private String assessmentNotes;

    @Column(nullable = false)
    private Boolean isDemo = false;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    // Transient field for dynamic ranking display
    @Transient
    private Integer rank;

    // Constructors
    public Startup() {
    }

    public Startup(String name, StartupCategory category, String description,
                   String founderName, String location, Integer yearEstablished, String contactEmail) {
        this.name = name;
        this.category = category;
        this.description = description;
        this.founderName = founderName;
        this.location = location;
        this.yearEstablished = yearEstablished;
        this.contactEmail = contactEmail;
        this.isAssessed = false;
        this.isDemo = false;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        if (this.overallScore == null) {
            this.overallScore = 0.0;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * Polymorphic method demonstrating OOP Abstraction and Polymorphism.
     * Can be overridden by subclasses to provide specialized domain metadata.
     */
    public String getCategorySpecialization() {
        return "General Startup";
    }

    // Getters and Setters (Encapsulation)
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

    public Double getEnvironmentalScore() {
        return environmentalScore != null ? environmentalScore : 0.0;
    }

    public void setEnvironmentalScore(Double environmentalScore) {
        this.environmentalScore = environmentalScore;
    }

    public Double getInnovationScore() {
        return innovationScore != null ? innovationScore : 0.0;
    }

    public void setInnovationScore(Double innovationScore) {
        this.innovationScore = innovationScore;
    }

    public Double getSocialImpactScore() {
        return socialImpactScore != null ? socialImpactScore : 0.0;
    }

    public void setSocialImpactScore(Double socialImpactScore) {
        this.socialImpactScore = socialImpactScore;
    }

    public Double getFinancialViabilityScore() {
        return financialViabilityScore != null ? financialViabilityScore : 0.0;
    }

    public void setFinancialViabilityScore(Double financialViabilityScore) {
        this.financialViabilityScore = financialViabilityScore;
    }

    public Double getOverallScore() {
        return overallScore != null ? overallScore : 0.0;
    }

    public void setOverallScore(Double overallScore) {
        this.overallScore = overallScore;
    }

    public Boolean getIsAssessed() {
        return isAssessed != null && isAssessed;
    }

    public void setIsAssessed(Boolean assessed) {
        isAssessed = assessed;
    }

    public String getAssessmentNotes() {
        return assessmentNotes;
    }

    public void setAssessmentNotes(String assessmentNotes) {
        this.assessmentNotes = assessmentNotes;
    }

    public Boolean getIsDemo() {
        return isDemo != null && isDemo;
    }

    public void setIsDemo(Boolean demo) {
        isDemo = demo;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Integer getRank() {
        return rank;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
    }
}
