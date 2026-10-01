package com.sustainrank.service;

/**
 * Strategy interface for calculating the overall sustainability score
 * based on the four fundamental pillars.
 */
public interface SustainabilityScorer {

    /**
     * Calculates the overall composite score from the four criteria.
     *
     * @param environmental Environmental sustainability score (0 - 100)
     * @param innovation    Innovation score (0 - 100)
     * @param social        Social impact score (0 - 100)
     * @param financial     Financial viability score (0 - 100)
     * @return Composite overall score between 0.0 and 100.0, rounded to 2 decimal places.
     */
    double calculateOverallScore(double environmental, double innovation, double social, double financial);

    /**
     * Validates that all criterion scores fall strictly in the valid range [0, 100].
     */
    void validateScores(double environmental, double innovation, double social, double financial);

    /**
     * Returns an explanation string detailing the calculation formula.
     */
    String getFormulaExplanation();
}
