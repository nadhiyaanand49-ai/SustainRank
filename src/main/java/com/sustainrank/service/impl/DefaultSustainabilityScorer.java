package com.sustainrank.service.impl;

import com.sustainrank.exception.InvalidScoreException;
import com.sustainrank.service.SustainabilityScorer;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * Default implementation of the SustainabilityScorer using equal weights (25% per criterion).
 *
 * Overall Score = (Environmental + Innovation + Social Impact + Financial Viability) / 4.0
 */
@Component
public class DefaultSustainabilityScorer implements SustainabilityScorer {

    public static final double WEIGHT_PER_CRITERION = 0.25;

    @Override
    public double calculateOverallScore(double environmental, double innovation, double social, double financial) {
        validateScores(environmental, innovation, social, financial);

        double composite = (environmental * WEIGHT_PER_CRITERION) +
                           (innovation * WEIGHT_PER_CRITERION) +
                           (social * WEIGHT_PER_CRITERION) +
                           (financial * WEIGHT_PER_CRITERION);

        // Round to 2 decimal places using BigDecimal for precision
        return BigDecimal.valueOf(composite)
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue();
    }

    @Override
    public void validateScores(double environmental, double innovation, double social, double financial) {
        checkRange("Environmental Sustainability", environmental);
        checkRange("Innovation", innovation);
        checkRange("Social Impact", social);
        checkRange("Financial Viability", financial);
    }

    private void checkRange(String criterionName, double score) {
        if (Double.isNaN(score) || score < 0.0 || score > 100.0) {
            throw new InvalidScoreException(criterionName + " score must be between 0.0 and 100.0 (received: " + score + ")");
        }
    }

    @Override
    public String getFormulaExplanation() {
        return "Overall Score = (Environmental × 25%) + (Innovation × 25%) + (Social Impact × 25%) + (Financial Viability × 25%)";
    }
}
