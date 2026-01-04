# Remove Service Quoter

## Summary
Remove the `ServiceQuoter` component and all associated references, including the header link and its usage in the services page.

## Problem Statement
The user requests to remove the "quoter/cotizador" functionality, including links and the component itself, to streamline the application or remove unwanted features.

## Proposed Solution
1.  **Delete Component**: Remove `src/components/ServiceQuoter.astro`.
2.  **Update Header**: Remove the "Cotizador" link from `src/components/Header.astro`.
3.  **Update Page**: Remove the integration of `ServiceQuoter` from `src/pages/servicios.astro`.

## Impact
-   **UI/UX**: Cleaner header; Services page will no longer show the quoter form.
-   **Codebase**: Reduced complexity by removing unused component.
