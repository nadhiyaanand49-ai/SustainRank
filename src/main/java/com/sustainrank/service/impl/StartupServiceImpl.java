package com.sustainrank.service.impl;

import com.sustainrank.dto.AssessmentFormDto;
import com.sustainrank.dto.DashboardStatsDto;
import com.sustainrank.dto.StartupFormDto;
import com.sustainrank.exception.StartupNotFoundException;
import com.sustainrank.model.*;
import com.sustainrank.repository.StartupRepository;
import com.sustainrank.service.StartupService;
import com.sustainrank.service.SustainabilityScorer;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Service implementation containing core business logic for:
 * - Startup lifecycle management (CRUD)
 * - Sustainability assessment scoring
 * - Multi-criteria ranking and deterministic tie-breaking
 * - Aggregated dashboard metrics
 * - CSV export generation
 */
@Service
@Transactional
public class StartupServiceImpl implements StartupService {

    private final StartupRepository startupRepository;
    private final SustainabilityScorer sustainabilityScorer;

    @Autowired
    public StartupServiceImpl(StartupRepository startupRepository, SustainabilityScorer sustainabilityScorer) {
        this.startupRepository = startupRepository;
        this.sustainabilityScorer = sustainabilityScorer;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Startup> getAllStartups() {
        return startupRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Startup> searchAndFilter(String query, StartupCategory category) {
        boolean hasQuery = query != null && !query.trim().isEmpty();
        boolean hasCategory = category != null;

        if (hasQuery && hasCategory) {
            return startupRepository.findByNameContainingIgnoreCaseAndCategory(query.trim(), category);
        } else if (hasQuery) {
            return startupRepository.findByNameContainingIgnoreCase(query.trim());
        } else if (hasCategory) {
            return startupRepository.findByCategory(category);
        } else {
            return startupRepository.findAll();
        }
    }

    /**
     * Deterministic Ranking Comparator:
     * 1. Overall Score (Descending)
     * 2. Environmental Score (Descending) - Tie Breaker #1
     * 3. Innovation Score (Descending) - Tie Breaker #2
     * 4. Social Impact Score (Descending) - Tie Breaker #3
     * 5. Financial Viability Score (Descending) - Tie Breaker #4
     * 6. Startup Name (Ascending alphabetical) - Deterministic final tie breaker
     */
    public static final Comparator<Startup> RANKING_COMPARATOR = (s1, s2) -> {
        // Compare overall score DESC
        int cmp = Double.compare(s2.getOverallScore(), s1.getOverallScore());
        if (cmp != 0) return cmp;

        // Tie-breaker 1: Environmental DESC
        cmp = Double.compare(s2.getEnvironmentalScore(), s1.getEnvironmentalScore());
        if (cmp != 0) return cmp;

        // Tie-breaker 2: Innovation DESC
        cmp = Double.compare(s2.getInnovationScore(), s1.getInnovationScore());
        if (cmp != 0) return cmp;

        // Tie-breaker 3: Social Impact DESC
        cmp = Double.compare(s2.getSocialImpactScore(), s1.getSocialImpactScore());
        if (cmp != 0) return cmp;

        // Tie-breaker 4: Financial Viability DESC
        cmp = Double.compare(s2.getFinancialViabilityScore(), s1.getFinancialViabilityScore());
        if (cmp != 0) return cmp;

        // Final tie-breaker: Name ASC
        return s1.getName().compareToIgnoreCase(s2.getName());
    };

    @Override
    @Transactional(readOnly = true)
    public List<Startup> getRankedStartups(String query, StartupCategory category) {
        List<Startup> filtered = searchAndFilter(query, category);

        // Separate assessed and unassessed startups
        List<Startup> assessed = filtered.stream()
                .filter(Startup::getIsAssessed)
                .sorted(RANKING_COMPARATOR)
                .collect(Collectors.toList());

        // Assign ordinal rank to assessed startups
        for (int i = 0; i < assessed.size(); i++) {
            assessed.get(i).setRank(i + 1);
        }

        List<Startup> unassessed = filtered.stream()
                .filter(s -> !s.getIsAssessed())
                .sorted(Comparator.comparing(Startup::getName, String.CASE_INSENSITIVE_ORDER))
                .collect(Collectors.toList());

        // Unassessed startups have null rank
        unassessed.forEach(s -> s.setRank(null));

        List<Startup> combined = new ArrayList<>(assessed);
        combined.addAll(unassessed);
        return combined;
    }

    @Override
    @Transactional(readOnly = true)
    public Startup getStartupById(Long id) {
        Startup startup = startupRepository.findById(id)
                .orElseThrow(() -> new StartupNotFoundException("Startup not found with ID: " + id));

        // Calculate and set current rank if assessed
        if (startup.getIsAssessed()) {
            List<Startup> allRanked = startupRepository.findByIsAssessedTrue().stream()
                    .sorted(RANKING_COMPARATOR)
                    .toList();
            for (int i = 0; i < allRanked.size(); i++) {
                if (allRanked.get(i).getId().equals(startup.getId())) {
                    startup.setRank(i + 1);
                    break;
                }
            }
        }
        return startup;
    }

    @Override
    public Startup createStartup(StartupFormDto formDto) {
        Startup startup = instantiateSubclass(formDto.getCategory());
        populateStartupFields(startup, formDto);
        startup.setIsAssessed(false);
        startup.setOverallScore(0.0);
        startup.setIsDemo(false);
        return startupRepository.save(startup);
    }

    @Override
    public Startup updateStartup(Long id, StartupFormDto formDto) {
        Startup existing = getStartupById(id);

        // If category changed, re-instantiate subclass to maintain correct JPA discriminator
        if (existing.getCategory() != formDto.getCategory()) {
            startupRepository.delete(existing);
            Startup replacement = instantiateSubclass(formDto.getCategory());
            populateStartupFields(replacement, formDto);
            replacement.setEnvironmentalScore(existing.getEnvironmentalScore());
            replacement.setInnovationScore(existing.getInnovationScore());
            replacement.setSocialImpactScore(existing.getSocialImpactScore());
            replacement.setFinancialViabilityScore(existing.getFinancialViabilityScore());
            replacement.setOverallScore(existing.getOverallScore());
            replacement.setIsAssessed(existing.getIsAssessed());
            replacement.setAssessmentNotes(existing.getAssessmentNotes());
            replacement.setIsDemo(existing.getIsDemo());
            return startupRepository.save(replacement);
        }

        populateStartupFields(existing, formDto);
        return startupRepository.save(existing);
    }

    @Override
    public void deleteStartup(Long id) {
        if (!startupRepository.existsById(id)) {
            throw new StartupNotFoundException("Cannot delete: Startup not found with ID: " + id);
        }
        startupRepository.deleteById(id);
    }

    @Override
    public Startup recordAssessment(AssessmentFormDto assessmentDto) {
        Startup startup = getStartupById(assessmentDto.getStartupId());

        double env = assessmentDto.getEnvironmentalScore();
        double innov = assessmentDto.getInnovationScore();
        double soc = assessmentDto.getSocialImpactScore();
        double fin = assessmentDto.getFinancialViabilityScore();

        // Calculate score using business logic engine
        double overall = sustainabilityScorer.calculateOverallScore(env, innov, soc, fin);

        startup.setEnvironmentalScore(env);
        startup.setInnovationScore(innov);
        startup.setSocialImpactScore(soc);
        startup.setFinancialViabilityScore(fin);
        startup.setOverallScore(overall);
        startup.setIsAssessed(true);
        startup.setAssessmentNotes(assessmentDto.getAssessmentNotes());

        return startupRepository.save(startup);
    }

    @Override
    @Transactional(readOnly = true)
    public DashboardStatsDto getDashboardStatistics() {
        DashboardStatsDto stats = new DashboardStatsDto();

        long total = startupRepository.count();
        long assessed = startupRepository.countByIsAssessed(true);
        long pending = total - assessed;

        stats.setTotalStartups(total);
        stats.setAssessedCount(assessed);
        stats.setPendingCount(pending);

        // Category counts
        Map<StartupCategory, Long> categoryMap = new EnumMap<>(StartupCategory.class);
        for (StartupCategory cat : StartupCategory.values()) {
            categoryMap.put(cat, startupRepository.countByCategory(cat));
        }
        stats.setCategoryDistribution(categoryMap);
        stats.setTotalCategories(categoryMap.values().stream().filter(c -> c > 0).count());

        // Averages
        Double avgOverall = startupRepository.getAverageAssessedScore();
        stats.setAverageSustainabilityScore(avgOverall != null ? Math.round(avgOverall * 10.0) / 10.0 : 0.0);

        Double avgEnv = startupRepository.getAverageEnvironmentalScore();
        stats.setAverageEnvironmental(avgEnv != null ? Math.round(avgEnv * 10.0) / 10.0 : 0.0);

        Double avgInnov = startupRepository.getAverageInnovationScore();
        stats.setAverageInnovation(avgInnov != null ? Math.round(avgInnov * 10.0) / 10.0 : 0.0);

        Double avgSoc = startupRepository.getAverageSocialScore();
        stats.setAverageSocial(avgSoc != null ? Math.round(avgSoc * 10.0) / 10.0 : 0.0);

        Double avgFin = startupRepository.getAverageFinancialScore();
        stats.setAverageFinancial(avgFin != null ? Math.round(avgFin * 10.0) / 10.0 : 0.0);

        // Highest-ranked assessed startup
        stats.setTopRankedStartup(startupRepository.findFirstByIsAssessedTrueOrderByOverallScoreDesc().orElse(null));

        return stats;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Startup> getRecentStartups() {
        return startupRepository.findTop5ByOrderByCreatedAtDesc();
    }

    @Override
    @Transactional(readOnly = true)
    public byte[] exportStartupsCsv() {
        List<Startup> ranked = getRankedStartups(null, null);

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        try (CSVPrinter printer = new CSVPrinter(new OutputStreamWriter(out, StandardCharsets.UTF_8),
                CSVFormat.DEFAULT.builder().setHeader(
                        "Rank", "Startup Name", "Category", "Status", "Overall Score",
                        "Environmental (25%)", "Innovation (25%)", "Social Impact (25%)", "Financial Viability (25%)",
                        "Founder", "Location", "Year Established", "Contact Email", "Notes"
                ).build())) {

            for (Startup s : ranked) {
                printer.printRecord(
                        s.getRank() != null ? String.valueOf(s.getRank()) : "Unranked (Pending)",
                        s.getName(),
                        s.getCategory().getDisplayName(),
                        s.getIsAssessed() ? "Assessed" : "Pending Assessment",
                        s.getIsAssessed() ? String.format("%.2f", s.getOverallScore()) : "N/A",
                        s.getIsAssessed() ? String.format("%.1f", s.getEnvironmentalScore()) : "N/A",
                        s.getIsAssessed() ? String.format("%.1f", s.getInnovationScore()) : "N/A",
                        s.getIsAssessed() ? String.format("%.1f", s.getSocialImpactScore()) : "N/A",
                        s.getIsAssessed() ? String.format("%.1f", s.getFinancialViabilityScore()) : "N/A",
                        s.getFounderName(),
                        s.getLocation(),
                        s.getYearEstablished(),
                        s.getContactEmail(),
                        s.getAssessmentNotes() != null ? s.getAssessmentNotes() : ""
                );
            }
            printer.flush();
            return out.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("Failed to generate CSV export", e);
        }
    }

    @Override
    public void resetDemoData() {
        clearDemoData();
        seedDefaultDemoData();
    }

    @Override
    public void clearDemoData() {
        startupRepository.deleteByIsDemoTrue();
    }

    @Override
    @Transactional(readOnly = true)
    public long countDemoData() {
        return startupRepository.countByIsDemo(true);
    }

    private Startup instantiateSubclass(StartupCategory category) {
        if (category == null) return new Startup();
        return switch (category) {
            case TechStartup -> new TechStartup();
            case GreenStartup -> new GreenStartup();
            case HealthStartup -> new HealthStartup();
            case SocialStartup -> new SocialStartup();
        };
    }

    private void populateStartupFields(Startup s, StartupFormDto dto) {
        s.setName(dto.getName());
        s.setCategory(dto.getCategory());
        s.setDescription(dto.getDescription());
        s.setFounderName(dto.getFounderName());
        s.setLocation(dto.getLocation());
        s.setYearEstablished(dto.getYearEstablished());
        s.setContactEmail(dto.getContactEmail());

        // Category-specific polymorphic properties
        if (s instanceof TechStartup tech) {
            tech.setPrimaryTechStack(dto.getPrimaryTechStack());
            tech.setPatentCount(dto.getPatentCount() != null ? dto.getPatentCount() : 0);
        } else if (s instanceof GreenStartup green) {
            green.setEstimatedCarbonOffsetTons(dto.getEstimatedCarbonOffsetTons() != null ? dto.getEstimatedCarbonOffsetTons() : 0.0);
            green.setRenewableEnergyPercentage(dto.getRenewableEnergyPercentage() != null ? dto.getRenewableEnergyPercentage() : 0.0);
        } else if (s instanceof HealthStartup health) {
            health.setClinicalPhase(dto.getClinicalPhase());
            health.setHipaaOrGdprCompliant(dto.getHipaaOrGdprCompliant() != null ? dto.getHipaaOrGdprCompliant() : true);
        } else if (s instanceof SocialStartup social) {
            social.setBeneficiariesReached(dto.getBeneficiariesReached() != null ? dto.getBeneficiariesReached() : 0L);
            social.setUnSdgAlignment(dto.getUnSdgAlignment());
        }
    }

    private void seedDefaultDemoData() {
        // 1. Green Startup: EcoLoop Circular Packaging
        GreenStartup s1 = new GreenStartup(
                "EcoLoop Packaging",
                "Biodegradable mycelium packaging solutions replacing single-use styrofoam and bubble wrap for global e-commerce supply chains.",
                "Dr. Ananya Sharma",
                "Bengaluru, Karnataka",
                2022,
                "contact@ecoloop.in",
                450.0,
                92.5
        );
        s1.setEnvironmentalScore(94.0);
        s1.setInnovationScore(88.0);
        s1.setSocialImpactScore(82.0);
        s1.setFinancialViabilityScore(78.0);
        s1.setOverallScore(sustainabilityScorer.calculateOverallScore(94.0, 88.0, 82.0, 78.0));
        s1.setIsAssessed(true);
        s1.setIsDemo(true);
        s1.setAssessmentNotes("Exceptional environmental metrics with 92.5% renewable manufacturing energy. Strong patent-pending mushroom root binders.");
        startupRepository.save(s1);

        // 2. Tech Startup: NeuroGrid Energy AI
        TechStartup s2 = new TechStartup(
                "NeuroGrid Systems",
                "Decentralized AI algorithms predicting municipal grid peak loads and optimizing industrial battery storage dispatch in real-time.",
                "Vikramaditya Rao",
                "Hyderabad, Telangana",
                2021,
                "hello@neurogrid.ai",
                "Rust, PyTorch, Kafka, Kubernetes",
                3
        );
        s2.setEnvironmentalScore(85.0);
        s2.setInnovationScore(96.0);
        s2.setSocialImpactScore(74.0);
        s2.setFinancialViabilityScore(89.0);
        s2.setOverallScore(sustainabilityScorer.calculateOverallScore(85.0, 96.0, 74.0, 89.0));
        s2.setIsAssessed(true);
        s2.setIsDemo(true);
        s2.setAssessmentNotes("High tech innovation score driven by 3 granted grid patents and contracts with 4 state electrical utilities.");
        startupRepository.save(s2);

        // 3. Health Startup: BioPulse NanoDiagnostics
        HealthStartup s3 = new HealthStartup(
                "BioPulse Diagnostic Tech",
                "Point-of-care microfluidic biosensors enabling 15-minute pathogen detection for underserved rural clinics without refrigeration.",
                "Dr. Preeti Deshmukh",
                "Pune, Maharashtra",
                2023,
                "info@biopulsehealth.com",
                "Phase II Clinical Validation",
                true
        );
        s3.setEnvironmentalScore(72.0);
        s3.setInnovationScore(91.0);
        s3.setSocialImpactScore(95.0);
        s3.setFinancialViabilityScore(70.0);
        s3.setOverallScore(sustainabilityScorer.calculateOverallScore(72.0, 91.0, 95.0, 70.0));
        s3.setIsAssessed(true);
        s3.setIsDemo(true);
        s3.setAssessmentNotes("Outstanding social impact score for expanding healthcare diagnostic access to over 50 rural primary health centres.");
        startupRepository.save(s3);

        // 4. Social Startup: JalDharini Water Tech
        SocialStartup s4 = new SocialStartup(
                "JalDharini Solutions",
                "Community-owned solar atmospheric water generators providing clean drinking water to arid agricultural villages in Rajasthan.",
                "Kavita Meena",
                "Jaipur, Rajasthan",
                2020,
                "reach@jaldharini.org",
                38000L,
                "SDG 6 (Clean Water), SDG 7 (Clean Energy), SDG 5 (Gender Equality)"
        );
        s4.setEnvironmentalScore(88.0);
        s4.setInnovationScore(80.0);
        s4.setSocialImpactScore(96.0);
        s4.setFinancialViabilityScore(68.0);
        s4.setOverallScore(sustainabilityScorer.calculateOverallScore(88.0, 80.0, 96.0, 68.0));
        s4.setIsAssessed(true);
        s4.setIsDemo(true);
        s4.setAssessmentNotes("Deep grassroots social impact benefiting 38,000 villagers with zero groundwater extraction.");
        startupRepository.save(s4);

        // 5. Tech Startup: AgriSense Drone Analytics
        TechStartup s5 = new TechStartup(
                "AgriSense Vision",
                "Precision drone multispectral imaging and soil moisture AI minimizing chemical fertilizer runoff and irrigation water waste.",
                "Rohan Joshi",
                "Chennai, Tamil Nadu",
                2024,
                "founders@agrisense.io",
                "Python, TensorFlow Lite, ROS, OpenCV",
                1
        );
        s5.setEnvironmentalScore(81.0);
        s5.setInnovationScore(85.0);
        s5.setSocialImpactScore(80.0);
        s5.setFinancialViabilityScore(74.0);
        s5.setOverallScore(sustainabilityScorer.calculateOverallScore(81.0, 85.0, 80.0, 74.0));
        s5.setIsAssessed(true);
        s5.setIsDemo(true);
        s5.setAssessmentNotes("Solid ESG performance with 22% reduction in nitrate fertilizer runoff for smallholder farmers.");
        startupRepository.save(s5);

        // 6. Green Startup: UrbanFlora Waste Biofuels (Unassessed candidate to demonstrate pending status)
        GreenStartup s6 = new GreenStartup(
                "UrbanFlora BioFuels",
                "Enzymatic conversion of municipal restaurant food waste into clean aviation fuel and organic microbial fertilizers.",
                "Manoj Nair",
                "Kochi, Kerala",
                2025,
                "contact@urbanflora.bio",
                800.0,
                88.0
        );
        s6.setIsAssessed(false); // Demonstrates unassessed state
        s6.setIsDemo(true);
        startupRepository.save(s6);
    }
}
