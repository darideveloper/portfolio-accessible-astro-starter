# Design: Service Quoter

## Architecture
- **Component**: `src/components/ServiceQuoter.astro`
- **Logic**: Client-side TypeScript (Vanilla) embedded in the Astro component to handle state (selected services).
- **Data Source**: Import `services` and `createWhatsAppLink` from `src/lib/constants/services.ts`.

## UI/UX Flow
1. **Service Selection**:
   - Display services categorized (accordion or grouped list).
   - Each service has a stylized checkbox/card toggle.
   - Interactive feedback (highlight selected).

2. **Floating/Sticky Summary**:
   - concise list of "X services selected".
   - "Clear All" button.

3. **CTA (Call to Action)**:
   - "Solicitar Cotización" (Request Quote) button.
   - On click: 
     - Construct message: "Hola, me interesa una cotización para los siguientes servicios: \n- Service A\n- Service B..."
     - Open WhatsApp API link.

## Technical Implementation
- **State Management**: Simple `Set<string>` or array of IDs in a script tag.
- **Event Delegation**: Listen for clicks on service cards/checkboxes.
- **Accessibility**:
   - Use correct ARIA attributes (`aria-pressed`, `role="button"` or standard `<input type="checkbox">`).
   - ensure keyboard navigation works.

## Schemas / Data
No schema changes strictly required unless we add functionality.
Future extensibility: Add `basePrice` to `Service` interface.
