package com.sustainrank.controller;

import com.sustainrank.dto.AssessmentFormDto;
import com.sustainrank.model.Startup;
import com.sustainrank.service.StartupService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 * Controller dedicated to the Sustainability Assessment module.
 * Users evaluate startups across the four core dimensions (0 - 100 each).
 */
@Controller
@RequestMapping("/assess")
public class AssessmentController {

    private final StartupService startupService;

    @Autowired
    public AssessmentController(StartupService startupService) {
        this.startupService = startupService;
    }

    @GetMapping("/{id}")
    public String showAssessmentForm(@PathVariable("id") Long id, Model model) {
        Startup startup = startupService.getStartupById(id);

        AssessmentFormDto dto = new AssessmentFormDto();
        dto.setStartupId(startup.getId());
        dto.setStartupName(startup.getName());
        dto.setCategoryName(startup.getCategory().getDisplayName());

        // Prepopulate with existing scores if already assessed
        if (startup.getIsAssessed()) {
            dto.setEnvironmentalScore(startup.getEnvironmentalScore());
            dto.setInnovationScore(startup.getInnovationScore());
            dto.setSocialImpactScore(startup.getSocialImpactScore());
            dto.setFinancialViabilityScore(startup.getFinancialViabilityScore());
            dto.setAssessmentNotes(startup.getAssessmentNotes());
        } else {
            dto.setEnvironmentalScore(50.0);
            dto.setInnovationScore(50.0);
            dto.setSocialImpactScore(50.0);
            dto.setFinancialViabilityScore(50.0);
        }

        model.addAttribute("assessmentForm", dto);
        model.addAttribute("startup", startup);
        model.addAttribute("activePage", "startups");
        return "startups/assess";
    }

    @PostMapping("/save")
    public String saveAssessment(
            @Valid @ModelAttribute("assessmentForm") AssessmentFormDto assessmentForm,
            BindingResult bindingResult,
            Model model,
            RedirectAttributes redirectAttributes) {

        if (bindingResult.hasErrors()) {
            Startup startup = startupService.getStartupById(assessmentForm.getStartupId());
            model.addAttribute("startup", startup);
            model.addAttribute("activePage", "startups");
            return "startups/assess";
        }

        Startup updated = startupService.recordAssessment(assessmentForm);
        redirectAttributes.addFlashAttribute("successMessage",
                "Sustainability assessment for '" + updated.getName() +
                "' successfully recorded. Calculated Overall Score: " +
                String.format("%.2f", updated.getOverallScore()) + " / 100");

        return "redirect:/startups/" + updated.getId();
    }
}
