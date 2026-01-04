# Spec: Service Quoter Removal

## REMOVED Requirements

### Requirement: The Service Quoter component MUST be removed
The `ServiceQuoter` component and its logic are no longer needed.

#### Scenario: Verify Component Deletion
-   **Given** the project file structure
-   **When** checking `src/components/`
-   **Then** `ServiceQuoter.astro` should not exist

### Requirement: The "Cotizador" link MUST be removed from the Header
The navigation link to the quoter should be removed to prevent users from accessing non-existent functionality.

#### Scenario: Verify Header Navigation
-   **Given** the main navigation header
-   **When** viewing the menu items
-   **Then** there should be no link labeled "Cotizador"

### Requirement: The Services page MUST NOT display the Quoter
The services page should display only the header info (or other content) but not the quoter form.

#### Scenario: key functionality removal
-   **Given** the `src/pages/servicios.astro` page
-   **When** rendering the page
-   **Then** the `<ServiceQuoter />` component should not be present
