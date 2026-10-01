package com.sustainrank.controller;

import com.sustainrank.dto.StartupFormDto;
import com.sustainrank.model.*;
import com.sustainrank.service.StartupService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

/**
 * Controller managing Startup CRUD actions (Create, Read, Update, Delete),
 * search queries, and category filtering.
 */
@Controller
@RequestMapping("/startups")
public class StartupController {

    private final StartupService startupService;

    @Autowired
    public StartupController(StartupService startupService) {
        this.startupService = startupService;
    }

    @GetMapping
    public String listStartups(
            @RequestParam(value = "query", required = false) String query,
            @RequestParam(value = "category", required = false) StartupCategory category,
            Model model) {

        List<Startup> startups = startupService.searchAndFilter(query, category);

        model.addAttribute("startups", startups);
        model.addAttribute("categories", StartupCategory.values());
        model.addAttribute("selectedCategory", category);
        model.addAttribute("searchQuery", query);
        model.addAttribute("activePage", "startups");
        return "startups/list";
    }

    @GetMapping("/new")
    public String newStartupForm(Model model) {
        model.addAttribute("startupForm", new StartupFormDto());
        model.addAttribute("categories", StartupCategory.values());
        model.addAttribute("isEdit", false);
        model.addAttribute("activePage", "startups");
        return "startups/form";
    }

    @PostMapping("/save")
    public String saveStartup(
            @Valid @ModelAttribute("startupForm") StartupFormDto startupForm,
            BindingResult bindingResult,
            Model model,
            RedirectAttributes redirectAttributes) {

        if (bindingResult.hasErrors()) {
            model.addAttribute("categories", StartupCategory.values());
            model.addAttribute("isEdit", startupForm.getId() != null);
            model.addAttribute("activePage", "startups");
            return "startups/form";
        }

        boolean isUpdate = startupForm.getId() != null;
        if (isUpdate) {
            startupService.updateStartup(startupForm.getId(), startupForm);
            redirectAttributes.addFlashAttribute("successMessage", "Startup '" + startupForm.getName() + "' updated successfully.");
        } else {
            Startup created = startupService.createStartup(startupForm);
            redirectAttributes.addFlashAttribute("successMessage", "Startup '" + created.getName() + "' added successfully. You can now assess its sustainability.");
        }

        return "redirect:/startups";
    }

    @GetMapping("/{id}")
    public String viewStartupDetails(@PathVariable("id") Long id, Model model) {
        Startup startup = startupService.getStartupById(id);
        model.addAttribute("startup", startup);
        model.addAttribute("activePage", "startups");
        return "startups/details";
    }

    @GetMapping("/{id}/edit")
    public String editStartupForm(@PathVariable("id") Long id, Model model) {
        Startup startup = startupService.getStartupById(id);

        StartupFormDto formDto = new StartupFormDto();
        formDto.setId(startup.getId());
        formDto.setName(startup.getName());
        formDto.setCategory(startup.getCategory());
        formDto.setDescription(startup.getDescription());
        formDto.setFounderName(startup.getFounderName());
        formDto.setLocation(startup.getLocation());
        formDto.setYearEstablished(startup.getYearEstablished());
        formDto.setContactEmail(startup.getContactEmail());

        if (startup instanceof TechStartup tech) {
            formDto.setPrimaryTechStack(tech.getPrimaryTechStack());
            formDto.setPatentCount(tech.getPatentCount());
        } else if (startup instanceof GreenStartup green) {
            formDto.setEstimatedCarbonOffsetTons(green.getEstimatedCarbonOffsetTons());
            formDto.setRenewableEnergyPercentage(green.getRenewableEnergyPercentage());
        } else if (startup instanceof HealthStartup health) {
            formDto.setClinicalPhase(health.getClinicalPhase());
            formDto.setHipaaOrGdprCompliant(health.getHipaaOrGdprCompliant());
        } else if (startup instanceof SocialStartup social) {
            formDto.setBeneficiariesReached(social.getBeneficiariesReached());
            formDto.setUnSdgAlignment(social.getUnSdgAlignment());
        }

        model.addAttribute("startupForm", formDto);
        model.addAttribute("categories", StartupCategory.values());
        model.addAttribute("isEdit", true);
        model.addAttribute("activePage", "startups");
        return "startups/form";
    }

    @PostMapping("/{id}/delete")
    public String deleteStartup(@PathVariable("id") Long id, RedirectAttributes redirectAttributes) {
        Startup startup = startupService.getStartupById(id);
        String name = startup.getName();
        startupService.deleteStartup(id);
        redirectAttributes.addFlashAttribute("successMessage", "Startup '" + name + "' was permanently removed.");
        return "redirect:/startups";
    }
}
