package com.sustainrank.config;

import com.sustainrank.repository.StartupRepository;
import com.sustainrank.service.StartupService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Initializes realistic demo startups on the first run of the application.
 * Ensures idempotent behavior so duplicate records are not added on subsequent application boots.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final StartupRepository startupRepository;
    private final StartupService startupService;

    public DataInitializer(StartupRepository startupRepository, StartupService startupService) {
        this.startupRepository = startupRepository;
        this.startupService = startupService;
    }

    @Override
    public void run(String... args) {
        if (startupRepository.count() == 0) {
            log.info("SustainRank Database is empty. Seeding initial demonstration startups...");
            startupService.resetDemoData();
            log.info("Successfully seeded {} demonstration startups into persistent H2 database.", startupRepository.count());
        } else {
            log.info("SustainRank Database already contains {} records. Skipping automatic seeding.", startupRepository.count());
        }
    }
}
