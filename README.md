# SustainRank – Startup Sustainability Assessment and Ranking Platform

**Java Programming Project Based Learning (PBL) Report & Execution Guide**  
* **Course:** B.Tech Information Technology, Section C  
* **Year & Semester:** 2nd Year, 3rd Semester  
* **Team Members:** **Harshini V** & **Nadhiya A**  
* **Technology Stack:** Java 17, Spring Boot 3.2, Spring MVC, Spring Data JPA, Spring Security 6, Thymeleaf, Bootstrap 5, Chart.js, H2 Database (Persistent File Mode), Maven, JUnit 5.

---

## 1. Project Abstract & Objectives

**SustainRank** is an enterprise-grade decision-support and educational platform engineered to evaluate and rank early-stage startup ventures across four core ESG and commercial sustainability pillars:
1. **Environmental Sustainability (25%):** Carbon offset, renewable energy adoption, circular packaging, and waste reduction.
2. **Innovation & Technical Moat (25%):** R&D depth, patent portfolio, algorithm originality, and tech scalability.
3. **Social Impact & Inclusion (25%):** Beneficiaries reached, UN Sustainable Development Goal (SDG) alignment, and community upliftment.
4. **Financial Viability & Traction (25%):** Unit economics, capital efficiency, and commercial self-sufficiency.

The platform provides a responsive administrative interface with real-time score synthesis, deterministic tie-breaking ranking, dynamic interactive Chart.js visualizations, RFC-compliant CSV data export, and persistent database storage.

---

## 2. Object-Oriented Programming (OOP) Mapping

As part of the **2nd Year B.Tech IT Java PBL Curriculum**, the codebase explicitly demonstrates the key tenets of Object-Oriented Software Engineering:

| OOP Concept | Project Implementation | Source Code File |
| :--- | :--- | :--- |
| **Encapsulation** | Private member variables, public accessors/mutators with strict JSR-380 bean validations (`@DecimalMin`, `@NotBlank`, `@Size`). | `com.sustainrank.model.Startup` |
| **Inheritance** | Base entity `Startup` extended by specialized subclasses using JPA Single-Table inheritance (`@Inheritance(strategy = InheritanceType.SINGLE_TABLE)`). | `TechStartup`, `GreenStartup`, `HealthStartup`, `SocialStartup` |
| **Polymorphism** | Overridden method `getCategorySpecialization()` providing domain-specific metrics depending on runtime instance type. | Subclasses of `Startup` |
| **Abstraction** | Service and Scorer interfaces separating contracts from concrete business logic implementations. | `StartupService`, `SustainabilityScorer` |
| **Interfaces** | `SustainabilityScorer` defines score contracts; `StartupRepository` extends Spring Data `JpaRepository<Startup, Long>`. | `StartupRepository.java`, `SustainabilityScorer.java` |
| **Collections Framework** | `List<Startup>`, `Map<StartupCategory, Long>`, custom `Comparator<Startup>` for multi-tiered tie-breaking. | `StartupServiceImpl.java` |
| **Exception Handling** | Custom checked/unchecked exceptions (`StartupNotFoundException`, `InvalidScoreException`) managed via `@ControllerAdvice`. | `GlobalExceptionHandler.java` |
| **File I/O & Streams** | Byte array streaming and RFC-4180 CSV export via `ByteArrayOutputStream` and Apache Commons CSV. | `StartupServiceImpl.java` |

---

## 3. Mathematical Scoring Model & Deterministic Tie-Breaking

### Equal-Weight Composite Formula
Each pillar carries an equal weight of **25% (0.25)**:

$$\text{Overall Score} = \frac{\text{Environmental} + \text{Innovation} + \text{Social Impact} + \text{Financial Viability}}{4}$$

Scores are rounded using `BigDecimal` with `RoundingMode.HALF_UP` to two decimal places.

### Deterministic Tie-Breaking Rules
When two or more startups share the same composite score, rankings are resolved deterministically using a custom Java `Comparator<Startup>`:
1. **Overall Score** (Descending)
2. **Environmental Sustainability Score** (Descending) – *Primary ESG Priority*
3. **Innovation Score** (Descending) – *Technical Merit*
4. **Social Impact Score** (Descending) – *Ethical Footprint*
5. **Financial Viability Score** (Descending) – *Commercial Longevity*
6. **Alphabetical Name** (Ascending, Case-Insensitive) – *Final Deterministic Resolution*

> **Note on Transparency:** Startups awaiting formal review are clearly designated as **Pending Assessment** with unranked status (`rank = null`), ensuring unverified ventures are never assigned misleading ranks.

---

## 4. Database Architecture & Persistence

SustainRank uses an embedded **H2 Database configured in Persistent File Mode**:
* **Connection URL:** `jdbc:h2:file:./data/sustainrank;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE;AUTO_SERVER=TRUE`
* **File Location:** Stored on the local file system in `./data/sustainrank.mv.db`.
* **Data Retention:** Records, evaluations, and custom notes survive complete application reboots and restarts.
* **H2 Web Console:** Available at `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:file:./data/sustainrank`, User: `sa`, Password: `password`).

---

## 5. Security & Authentication

* **Framework:** Spring Security 6 with Form Login and CSRF Protection.
* **Password Storage:** Passwords are **never** stored in plaintext; all credentials are hashed using `BCryptPasswordEncoder` (cost factor 10).
* **Default Administrator Credentials:**
  * **Username:** `admin`
  * **Password:** `admin123`
* **Changing Credentials:** Update `sustainrank.security.demo-username` and `sustainrank.security.demo-password` in `src/main/resources/application.properties`.

---

## 6. How to Run the Application

### Prerequisites
* **Java Development Kit (JDK):** Version 17 or 21
* **Build Tool:** Apache Maven 3.8+ (or use included Maven Wrapper `./mvnw`)

### Option A: Running from Terminal / Command Line
1. Clone or open the project folder in terminal.
2. Build the project and run tests:
   ```bash
   mvn clean test
   ```
3. Start the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
4. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```
5. Log in with `admin` / `admin123`.

### Option B: Running in IntelliJ IDEA
1. Open IntelliJ IDEA &rarr; **File** &rarr; **Open** &rarr; Select the project root folder (containing `pom.xml`).
2. IntelliJ will automatically detect the Maven project and download dependencies.
3. Locate `src/main/java/com/sustainrank/SustainRankApplication.java`.
4. Right-click &rarr; **Run 'SustainRankApplication'**.
5. Access `http://localhost:8080` in your web browser.

### Option C: Running in Visual Studio Code
1. Install the **Extension Pack for Java** and **Spring Boot Extension Pack**.
2. Open the project directory in VS Code.
3. In the Spring Boot Dashboard side-panel, click the **Play** button next to `sustainrank`.
4. Open `http://localhost:8080`.

---

## 7. Automated Test Suite

The project includes automated unit and integration tests under `src/test/java/com/sustainrank`:
* **`SustainabilityScorerTest`:** Verifies equal 25% weights, decimal precision rounding, boundary limits (0 and 100), and invalid negative/excess score exception handling.
* **`StartupRankingServiceTest`:** Tests multi-level sorting, deterministic tie-breaking (environmental priority, innovation fallback, alphabetical tie-breaker), and unassessed status handling.
* **`SustainRankApplicationTests`:** Verifies Spring ApplicationContext boots cleanly without configuration errors.

Execute tests via:
```bash
mvn test
```

---

## 8. Faculty Review Viva Voce Questions & Answers

**Q1: Why did you choose Spring Boot for this PBL project?**  
*A:* Spring Boot eliminates boilerplate configuration through convention-over-configuration, provides embedded web server execution, integrates seamlessly with Thymeleaf for server-side rendering, and pairs with Spring Data JPA for object-relational mapping.

**Q2: How is data preserved when the server stops?**  
*A:* We configured H2 in file-persistent mode via `jdbc:h2:file:./data/sustainrank`. Rather than keeping data solely in volatile RAM, Hibernate synchronizes entity states into a persistent `.mv.db` binary file on disk.

**Q3: Where is Polymorphism used in this project?**  
*A:* The `Startup` entity defines a method `getCategorySpecialization()`. Each subclass (`TechStartup`, `GreenStartup`, `HealthStartup`, `SocialStartup`) overrides this method to output specialized domain metrics (such as patent count, carbon offset tonnage, clinical phases, or beneficiaries). At runtime, Java dynamically binds the method based on the concrete subclass instance.

**Q4: How does Spring Security prevent credential leaks?**  
*A:* Passwords are protected using salted one-way cryptographic hashing via `BCryptPasswordEncoder`. Even if the database or properties were inspected, the original plaintext password cannot be reversed.

**Q5: How does tie-breaking work when two startups receive identical scores?**  
*A:* In `StartupServiceImpl`, a dedicated Java `Comparator<Startup>` evaluates `overallScore` first. In the event of a tie, it falls back to `environmentalScore`, followed by `innovationScore`, `socialImpactScore`, `financialViabilityScore`, and ultimately alphabetical sorting by name.
