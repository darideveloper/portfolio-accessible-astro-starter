# Spec: Service Quoter Capabilities

## ADDED Requirements

### Requirement: Quote Builder Interface
The system MUST provide a user interface that allows users to select one or more professional services to generate a quote request.

#### Scenario: Selection of multiple services
Given the user is on the Service Quoter section
When the user clicks on multiple service cards (e.g., "Web Development" and "SEO")
Then the services should be visually marked as selected
And the "Request Quote" button should update to reflect the selection.

#### Scenario: Generating WhatsApp Link
Given the user has selected services
When the user clicks "Solicitar Cotización"
Then they should be redirected to WhatsApp
And the pre-filled message should list all selected services clearly.

### Requirement: Data Integration
The component MUST utilize the centralized service definitions.

#### Scenario: Dynamic Rendering
Given the `services.ts` file contains categories and items
When the Quoter loads
Then it should display all available services grouped by their category
And changes to `services.ts` should automatically reflect in the Quoter.
