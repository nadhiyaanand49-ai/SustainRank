package com.sustainrank.repository;

import com.sustainrank.model.Startup;
import com.sustainrank.model.StartupCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA Repository providing high-level database operations
 * with the underlying H2 database.
 */
@Repository
public interface StartupRepository extends JpaRepository<Startup, Long> {

    List<Startup> findByCategory(StartupCategory category);

    List<Startup> findByNameContainingIgnoreCase(String name);

    List<Startup> findByNameContainingIgnoreCaseAndCategory(String name, StartupCategory category);

    List<Startup> findByIsAssessedTrue();

    List<Startup> findByIsAssessedFalse();

    long countByCategory(StartupCategory category);

    long countByIsAssessed(boolean isAssessed);

    long countByIsDemo(boolean isDemo);

    @Query("SELECT AVG(s.overallScore) FROM Startup s WHERE s.isAssessed = true")
    Double getAverageAssessedScore();

    @Query("SELECT AVG(s.environmentalScore) FROM Startup s WHERE s.isAssessed = true")
    Double getAverageEnvironmentalScore();

    @Query("SELECT AVG(s.innovationScore) FROM Startup s WHERE s.isAssessed = true")
    Double getAverageInnovationScore();

    @Query("SELECT AVG(s.socialImpactScore) FROM Startup s WHERE s.isAssessed = true")
    Double getAverageSocialScore();

    @Query("SELECT AVG(s.financialViabilityScore) FROM Startup s WHERE s.isAssessed = true")
    Double getAverageFinancialScore();

    Optional<Startup> findFirstByIsAssessedTrueOrderByOverallScoreDesc();

    List<Startup> findTop5ByOrderByCreatedAtDesc();

    @Modifying
    @Query("DELETE FROM Startup s WHERE s.isDemo = true")
    void deleteByIsDemoTrue();

    boolean existsByNameIgnoreCase(String name);
}
