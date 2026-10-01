package com.sustainrank.controller;

import com.sustainrank.service.StartupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.LocalDate;

/**
 * Controller handling CSV data export and demo database maintenance operations.
 */
@Controller
public class ExportController {

    private final StartupService startupService;

    @Autowired
    public ExportController(StartupService startupService) {
        this.startupService = startupService;
    }

    @GetMapping("/export/csv")
    public ResponseEntity<byte[]> exportCsv() {
        byte[] csvData = startupService.exportStartupsCsv();
        String filename = "sustainrank_report_" + LocalDate.now() + ".csv";

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .contentType(MediaType.parseMediaType("text/csv; charset=UTF-8"))
                .body(csvData);
    }

    @PostMapping("/demo/reset")
    public String resetDemoData(RedirectAttributes redirectAttributes) {
        startupService.resetDemoData();
        redirectAttributes.addFlashAttribute("successMessage",
                "Demonstration dataset successfully re-initialized with 6 curated sample startups.");
        return "redirect:/dashboard";
    }

    @PostMapping("/demo/clear")
    public String clearDemoData(RedirectAttributes redirectAttributes) {
        startupService.clearDemoData();
        redirectAttributes.addFlashAttribute("successMessage",
                "All demonstration startups were purged from the database.");
        return "redirect:/dashboard";
    }
}
