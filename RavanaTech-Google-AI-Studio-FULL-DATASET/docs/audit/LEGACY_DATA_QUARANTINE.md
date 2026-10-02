# LEGACY DATA QUARANTINE

During the audit, legacy prototype files were found to contain claims and values that conflict with the newer production architecture.

## Examples
- Multiple different pricing ranges.
- A “100% client satisfaction” guarantee claim.
- Sample/demo statistics that could be mistaken for real results.
- Language such as “sales closer” or “close orders automatically”.
- Prototype project names and sample client-like language.
- Hard-coded price/timeline fallbacks.

## Rule
These materials are retained only to explain what was found during the audit. They must not be loaded as active Ravana Truth data.

If an old value is desired for production, it must be explicitly re-approved and added to the active Truth Registry with a version/date.
