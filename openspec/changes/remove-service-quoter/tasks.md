# Tasks: Remove Service Quoter

1.  [x] Remove "Cotizador" link from Header <!-- id: remove-header-link -->
    -   **File**: `src/components/Header.astro`
    -   **Action**: Remove the `<li>` element containing the link to `/cotizador/`.

2.  [x] Remove ServiceQuoter from Services Page <!-- id: remove-page-usage -->
    -   **File**: `src/pages/servicios.astro`
    -   **Action**: Remove the import and usage of `<ServiceQuoter />`.

3.  [x] Delete ServiceQuoter Component <!-- id: delete-component -->
    -   **File**: `src/components/ServiceQuoter.astro`
    -   **Action**: Delete the file.
