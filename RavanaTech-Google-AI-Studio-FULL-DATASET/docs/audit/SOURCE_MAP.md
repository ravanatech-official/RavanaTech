# Source → production mapping

| Existing source | Production destination |
|---|---|
| WorldMapStep | `src/reception/components/WorldMapEntry.tsx` + `docs/02_COMPLETE_FLOW.md` |
| AvatarReception | `src/reception/components/FounderReception.tsx` |
| GuidedStepView | `src/reception/components/FlowStep.tsx` + `flowCatalog.ts` |
| FinalQuotationStep | Outcome / project brief flow; quotation is no longer a mandatory terminal state |
| decisionTree.ts | `flowCatalog.ts` concepts; rewritten as intent-first adaptive flow |
| servicesData.ts | `src/data/servicesData.ts` → future Truth Registry |
| projectsData.ts | `src/data/projectsData.ts` → future Truth Registry |
| faqsData.ts | `src/data/faqsData.ts` → future Truth Registry |
| geminiKnowledgeBase.ts | `docs/03_RAVANA_AGENT_TRUTH_ARCHITECTURE.md` + `server/ravanaAgent.ts` |
| analytics.ts | `src/reception/lib/journeyAnalytics.ts` |
| founder real images | `assets/founder/` |
| six demos | `public/demos/` |
