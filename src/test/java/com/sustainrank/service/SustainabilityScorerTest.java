package com.sustainrank.service;

import com.sustainrank.exception.InvalidScoreException;
import com.sustainrank.service.impl.DefaultSustainabilityScorer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for the SustainabilityScorer business logic.
 * Verifies calculation accuracy, equal 25% weights, decimal precision, and boundary validation.
 */
class SustainabilityScorerTest {

    private SustainabilityScorer scorer;

    @BeforeEach
    void setUp() {
        scorer = new DefaultSustainabilityScorer();
    }

    @Test
    @DisplayName("Should calculate exact average with equal 25% weights")
    void testStandardScoreCalculation() {
        // (90 + 80 + 70 + 60) / 4 = 75.0
        double result = scorer.calculateOverallScore(90.0, 80.0, 70.0, 60.0);
        assertEquals(75.0, result, 0.001);
    }

    @Test
    @DisplayName("Should handle boundary minimum scores (0, 0, 0, 0)")
    void testMinimumBoundary() {
        double result = scorer.calculateOverallScore(0.0, 0.0, 0.0, 0.0);
        assertEquals(0.0, result, 0.001);
    }

    @Test
    @DisplayName("Should handle boundary maximum scores (100, 100, 100, 100)")
    void testMaximumBoundary() {
        double result = scorer.calculateOverallScore(100.0, 100.0, 100.0, 100.0);
        assertEquals(100.0, result, 0.001);
    }

    @Test
    @DisplayName("Should round decimal scores accurately to 2 decimal places")
    void testDecimalRounding() {
        // (85.5 + 77.25 + 91.1 + 64.3) / 4 = 318.15 / 4 = 79.5375 -> rounded to 79.54
        double result = scorer.calculateOverallScore(85.5, 77.25, 91.1, 64.3);
        assertEquals(79.54, result, 0.001);
    }

    @Test
    @DisplayName("Should throw InvalidScoreException when environmental score is negative")
    void testNegativeScoreValidation() {
        assertThrows(InvalidScoreException.class, () ->
                scorer.calculateOverallScore(-5.0, 80.0, 80.0, 80.0));
    }

    @Test
    @DisplayName("Should throw InvalidScoreException when any score exceeds 100")
    void testScoreExceedingMaxValidation() {
        assertThrows(InvalidScoreException.class, () ->
                scorer.calculateOverallScore(90.0, 105.0, 80.0, 80.0));
    }
}
