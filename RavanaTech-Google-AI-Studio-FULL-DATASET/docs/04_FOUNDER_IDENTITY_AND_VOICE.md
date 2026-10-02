# 04 — Founder Identity: Make It Feel Like Meeting Shanthapriya

## Visual identity

Use the supplied real founder photographs as the source assets:
- `assets/founder/founder-real-portrait.jpg`
- `assets/founder/founder-real-full.jpg`
- `assets/founder/founder-avatar.jpg`

Do not use an AI-generated face as the primary identity. The visitor should see the actual person.

## Voice identity

For the production experience, record Shanthapriya's real voice once for the core scripts and short transition phrases. Store versioned audio files under a future `assets/voice/` directory.

Required recordings:
- arrival greeting — Sinhala
- arrival greeting — English
- five intent introductions — both languages
- “I understood you” confirmations — both languages
- help / not-sure reassurance — both languages
- outcome handoff — both languages
- WhatsApp/call handoff — both languages
- exit thank-you — both languages

Browser `speechSynthesis` must not be presented as the founder's real voice. It can be an accessibility fallback only.

## Autoplay

Attempt to start the founder recording automatically. Modern browsers may block unmuted autoplay, so the system must immediately expose a single, obvious “Play my introduction” control if blocked. Never leave a silent screen with no explanation.

## “Met me before meeting me” principle

The founder should not constantly talk. Use short, natural moments:

1. Welcome.
2. Acknowledge the visitor's choice.
3. Explain the next decision.
4. Confirm what was understood.
5. Give a useful result.
6. Hand over to the founder/contact only when appropriate.

This creates familiarity without becoming theatrical or repetitive.
