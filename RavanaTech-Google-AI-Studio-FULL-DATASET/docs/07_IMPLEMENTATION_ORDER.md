# 07 — Implementation Order

## Phase 1 — Core experience
1. Install the new reception state machine.
2. Add real founder portrait/full-body assets.
3. Add founder-recorded Sinhala/English audio.
4. Implement world-map entry + search + optional geolocation.
5. Implement language selection and manual override.
6. Implement five-intent reception.
7. Implement adaptive 5×5 flow catalog.

## Phase 2 — Value layer
8. Connect services/projects/FAQs as verified data.
9. Route to the relevant concept demo.
10. Generate a concise project brief from selected answers.
11. Preserve answers so the visitor never repeats information.

## Phase 3 — Ravana Agent
12. Create approved Firestore knowledge records.
13. Add verification/version fields.
14. Build server-side retrieval.
15. Add Gemini Interactions API.
16. Add structured response schema.
17. Add server-side factual validation.
18. Add safe “not verified” behavior.
19. Add function tools for navigation, demo opening, contact handoff, and approved data lookup.

## Phase 4 — Measurement
20. Add journey-safe analytics.
21. Add exit satisfaction pulse.
22. Build founder dashboard.
23. Review drop-offs and “not sure” paths weekly.

## Phase 5 — quality gate
24. Test mobile first.
25. Test keyboard/screen reader.
26. Test Sinhala rendering.
27. Test slow network.
28. Test audio blocked.
29. Test AI unavailable.
30. Test database unavailable.
31. Test wrong/unknown questions.
32. Test every branch and back navigation.

## Release gate
The system is not production-ready until the visitor can complete every intent path without dead ends and every factual AI response can be traced to an approved source record.
