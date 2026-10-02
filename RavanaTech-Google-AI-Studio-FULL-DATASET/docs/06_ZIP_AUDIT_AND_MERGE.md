# 06 — Supplied ZIP Audit and Merge Decision

## ZIP A — receptionist prototype

Kept concepts:
- world-map arrival
- location-based language selection
- avatar reception
- five main pathways
- guided steps
- conceptual showcase
- final quotation concept
- audio utility

Discarded as production architecture:
- rigid numeric step state
- cost-weight / timeline arithmetic in client state
- hard-coded “Step 5 = quotation” assumption
- map-only country list as the only location mechanism

## ZIP B — full Ravana Tech site

Kept:
- service data
- project/concept data
- FAQ data
- founder assets
- six concept demos
- Firebase foundation
- analytics foundation
- WhatsApp contact route
- Gemini integration concept
- validation patterns

Consolidated:
- `VirtualCyberReceptionist`
- `InteractiveQuotationMatrix`
- `FounderAvatarExperience`
- `LivingHumanAvatar`
- `WelcomeAudioGreeting`
- old decision-tree components

These are not separate production systems anymore. Their useful ideas belong to the new Digital Front Desk.

## Specific issues found

1. The old receptionist has multiple overlapping entry/reception components.
2. The old flow is rigid: five steps then quotation, even when the visitor may only want a demo or a simple answer.
3. Pricing logic is mixed with decision-tree state. Pricing should be authoritative data, not a client-side calculation.
4. Existing Gemini code uses a hard-coded knowledge prompt and a fallback heuristic. This is useful as a prototype but not sufficient for a truth-critical public agent.
5. `gemini-3.8-flash` is hard-coded in server code. Production model selection should be environment/config driven and validated against the currently supported model list.
6. Browser speech synthesis is not the founder's actual voice.
7. The supplied map has a finite preset country list and contains at least one malformed flag value (`🇫RU`). Production location selection should not depend on that finite list.
8. The existing analytics contract is too general for the new journey measurement goal. Add journey/flow events while keeping PII out.
9. Existing public content should remain accessible for SEO and independent browsing, but the receptionist should be the primary guided route.
