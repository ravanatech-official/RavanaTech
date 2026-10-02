# 05 — Trust / Satisfaction Measurement

The target is not “time on site”. A long session can mean confusion. The product metric is **progress with increasing clarity**.

## Core event sequence

Track a pseudonymous `journeyId` only. Never put names, phone numbers, email addresses, free-form message contents, or AI transcripts into analytics events.

Events:

- `journey_started`
- `location_selected`
- `language_auto_selected`
- `founder_greeting_started`
- `founder_greeting_completed`
- `intent_selected`
- `flow_step_viewed`
- `flow_option_selected`
- `answer_changed`
- `help_opened`
- `ravana_agent_opened`
- `ravana_agent_question`
- `ravana_agent_action`
- `proof_viewed`
- `demo_opened`
- `brief_generated`
- `whatsapp_clicked`
- `call_clicked`
- `email_clicked`
- `journey_completed`
- `exit_satisfaction_selected`
- `exit_feedback_submitted`

## Derived product metrics

### Clarity Progress
Percentage of completed meaningful steps without a backtrack or help request.

### Time to Value
Time from arrival to first useful output: relevant demo, recommendation, project brief, or clear next action.

### Friction Rate
Backtracks + repeated questions + abandoned forms / meaningful interactions.

### Trust Progress
Use self-reported clarity/satisfaction pulses, not an inferred psychological score.

### Outcome Completion
Percentage of journeys that reach a useful outcome without requiring manual browsing.

## Exit pulse

Ask only after a useful outcome or when the visitor is leaving:

“Did Ravana Tech make this easier for you today?”

Options: Not yet / A little / Yes / Very much / Exactly what I needed.

Store the selection without identity unless the visitor separately chooses to contact Ravana Tech.

## Dashboard

The founder should be able to see:
- which intent paths produce useful outcomes;
- where people backtrack;
- where “Not sure” is selected;
- which demos are useful;
- which steps cause abandonment;
- satisfaction distribution by journey type and language;
- AI questions that frequently fail the truth layer.

Do not rank individual visitors or infer education, mental state, social class, or other sensitive characteristics.
