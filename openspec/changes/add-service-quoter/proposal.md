# Change Proposal: Service Quoter Feature

## Summary
Add a "Service Quoter" / "Quote Builder" feature that allows users to select multiple services from the existing catalog (`src/lib/constants/services.ts`) and generate a unified inquiry via WhatsApp.

## Motivation
Currently, the site lists services with individual "Call to Action" links (WhatsApp/Form). Users interested in a comprehensive solution (e.g., "Web Development" + "SEO" + "Maintenance") have to contact separately or manually explain their needs.
A "Service Quoter" enables a smoother user journey for building custom packages.

## Proposed Solution
1. Implementation of a `ServiceQuoter` component (or page section).
2. Interface to browse services by category and multi-select them.
3. Live "Summary" of selected services.
4. "Request Quote" action that generates a pre-filled WhatsApp message with the list of selected services.

## Scope
- **Added**: New UI component `ServiceQuoter.astro`.
- **Modified**: Possibly `services.ts` if we need to add pricing data (optional, currently assuming "Request for Quote" model without auto-pricing).
- **Target Audience**: Potential clients looking for bundled services.

## Open Questions
- Does the user want **automatic pricing** (requires data entry of prices) or just a **list-based inquiry**? (Assumption: List-based inquiry for now).
- Should this trigger an API call/Email form or just WhatsApp? (Assumption: WhatsApp as per existing patterns, possibly Form pre-fill).
