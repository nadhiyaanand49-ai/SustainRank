package com.sustainrank.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

/**
 * Spring Security 6 Configuration for SustainRank.
 *
 * Security Principles:
 * - Passwords are NEVER stored in plaintext (BCrypt hashing with strength 10).
 * - Protected routes require authentication.
 * - Form-based login with CSRF protection enabled.
 * - H2 Console configured safely for developer evaluation.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${sustainrank.security.demo-username:admin}")
    private String demoUsername;

    @Value("${sustainrank.security.demo-password:admin123}")
    private String demoPassword;

    @Value("${sustainrank.security.demo-role:ADMIN}")
    private String demoRole;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder encoder) {
        // Encode the demo password using BCrypt - never store in plaintext
        UserDetails adminUser = User.builder()
                .username(demoUsername)
                .password(encoder.encode(demoPassword))
                .roles(demoRole)
                .build();

        return new InMemoryUserDetailsManager(adminUser);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                // Static resources and public endpoints
                .requestMatchers(
                    "/login",
                    "/css/**",
                    "/js/**",
                    "/images/**",
                    "/favicon.ico",
                    "/error",
                    "/h2-console/**"
                ).permitAll()
                // All other business endpoints require authentication
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")
                .loginProcessingUrl("/login")
                .defaultSuccessUrl("/dashboard", true)
                .failureUrl("/login?error=true")
                .permitAll()
            )
            .logout(logout -> logout
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/login?logout=true")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .permitAll()
            )
            // Allow H2 console frames in development
            .headers(headers -> headers
                .frameOptions(frameOptions -> frameOptions.sameOrigin())
            )
            .csrf(csrf -> csrf
                // Disable CSRF solely for H2 console
                .ignoringRequestMatchers("/h2-console/**")
            );

        return http.build();
    }
}
