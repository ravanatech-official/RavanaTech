# 03 — Ravana Agent: Truth-First AI Architecture

## Goal

Ravana Agent must be useful in natural Sinhala or English while never becoming a source of invented Ravana Tech facts.

A language model cannot honestly guarantee “100% correct” simply because it has a strong prompt. The correct architecture is to make **verified Ravana data the authority** and make Gemini a reasoning / language layer.

## Recommended production stack

```text
Firestore / approved CMS records
        ↓
Truth Registry
        ↓
Retriever / search index
        ↓
Verified context package
        ↓
Gemini Interactions API
        ↓
Structured JSON response
        ↓
Server-side validator
        ↓
UI / action router
```

Google currently recommends the Interactions API for new agent projects, and Gemini supports function calling, structured outputs, and grounding. Structured output controls format but does not by itself make facts correct, so application validation remains mandatory. citeturn0search18turn0search4turn0search10

## Source hierarchy

### Tier A — authoritative Ravana data
- approved services
- approved pricing
- approved founder bio/credentials
- approved contact details
- approved project/demos
- approved FAQs
- approved policies
- approved delivery constraints

### Tier B — derived but deterministic
- matching a visitor need to a service
- choosing a relevant demo
- summarizing selected answers
- generating a project brief from selected facts

### Tier C — generative language
- explaining concepts simply
- translating Sinhala/English
- rephrasing a verified answer
- producing a warm spoken script

The model may never use Tier C to create Tier A facts.

## Verified record contract

Every factual record should carry:

```ts
{
  id: string;
  type: 'service' | 'project' | 'faq' | 'founder' | 'pricing' | 'contact' | 'policy';
  status: 'draft' | 'approved' | 'retired';
  version: number;
  source: string;
  verifiedAt: string;
  validFrom?: string;
  validUntil?: string;
  content: unknown;
}
```

Only `approved` records are retrievable by the public agent.

## Pricing rule

Never allow Gemini to calculate or invent a price. Pricing must be selected from an approved pricing table or returned as `pricingUnavailable`.

If a scope is ambiguous:

> “I can give you a useful direction now, but I don't have enough verified information to give you a reliable price yet.”

Then route to the founder.

## Unknown-answer rule

If no approved source supports an answer:

1. Do not guess.
2. Say that the information is not confirmed.
3. Offer the closest verified information if useful.
4. Offer WhatsApp/call to confirm.

## Web grounding rule

Do not use Google Search as the source of truth for Ravana Tech's own pricing, services, founder details, or promises. External grounding is only appropriate for external facts where freshness matters and the answer clearly distinguishes those facts from Ravana's own verified information. Google documents grounding with Search and grounding with own data/RAG as separate mechanisms. citeturn0search0turn0search3

## Response contract

The Agent returns structured data, not free-form HTML:

```json
{
  "message": "...",
  "language": "si",
  "confidence": "verified|insufficient",
  "citations": ["service:web-platform-v3"],
  "actions": [
    {"type":"open_demo","id":"bakery"}
  ],
  "nextStep": "...",
  "needsHumanConfirmation": false
}
```

The UI decides how to render it.

## Context caching

A large, stable system prefix can be cached to reduce repeated prompt overhead. Gemini documents implicit caching for newer models and explicit caching for supported APIs. citeturn0search11turn0search17
