# BUGBOT — mock-publisher-express4

> Watches for naming accuracy, authentication flow correctness, and data-state mismatches in this Express publisher service.

## Code Quality
- **Misleading variable names**: Name variables for their actual state — avoid `signedPayload` before signing has occurred.

## Checklist
- [ ] Variable names reflect actual data state at point of use
- [ ] Signing/encoding steps complete before naming result as such
- [ ] Authentication flow steps are clearly sequenced and named
