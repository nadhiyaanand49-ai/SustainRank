package com.sustainrank.exception;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * Centralized Global Exception Handler for friendly error pages.
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(StartupNotFoundException.class)
    public String handleStartupNotFound(StartupNotFoundException ex, Model model) {
        model.addAttribute("errorTitle", "Startup Not Found");
        model.addAttribute("errorMessage", ex.getMessage());
        return "error/404";
    }

    @ExceptionHandler(InvalidScoreException.class)
    public String handleInvalidScore(InvalidScoreException ex, Model model) {
        model.addAttribute("errorTitle", "Invalid Assessment Score");
        model.addAttribute("errorMessage", ex.getMessage());
        return "error/500";
    }

    @ExceptionHandler(Exception.class)
    public String handleGeneralException(Exception ex, Model model) {
        model.addAttribute("errorTitle", "An Unexpected Error Occurred");
        model.addAttribute("errorMessage", ex.getMessage() != null ? ex.getMessage() : "Internal server error.");
        return "error/500";
    }
}
