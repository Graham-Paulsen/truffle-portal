# PRP: Truffle Portal Screening Scoring Redesign v2

**Status:** READY FOR EXECUTION  
**Date:** 2026-05-07  
**Project:** Truffle Portal (`projects/truffle-portal`)  
**Scope:** Enhance existing 8-step screening with per-job scoring, dynamic proficiency ratings, and budget-relative CTC scoring

---

## Current State (remote `main`)

8-step flow with separate Step components:

| Step | Component | What it captures |
|---|---|---|
| 1 | Step1Recruitment | Recruitment preference (actively/open/exploring/not looking) + reason |
| 2 | Step2Opportunity | Role multi-select (Int DE, Sr DE, Sr SQL, Sr BI) + Tech stack multi-select pills |
| 3 | Step3RightToWork | EE status, ID number, disability |
| 4 | Step4Location | Residence, remote willingness, hybrid willingness |
| 5 | Step5Timezone | 4pm-9pm SAST availability (US overlap) |
| 6 | Step6Contract | Fixed-term 12-18 month contract acceptance |
| 7 | Step7Notice | Notice period (1-2wk/30d/60d/90d/cal month) + considerations textarea |
| 8 | Step8Compensation | Current CTC (annual), previous bonus, repayable on leaving, annual leave days, expected CTC |

**Current scoring (max 100):** Recruitment preference=10, Role match=5, Tech depth=15, EE=5, Remote=10, Hybrid=5, Timezone=20, Contract=10, Notice=10, CTC=10.

**Problems:**
- Tech stack is just a count of selected pills (no depth assessment)
- CTC uses fixed bands instead of budget-relative
- Single score — no per-job differentiation
- Timezone and contract scored (should be binary gates)
- No engineering competency assessment

---

## Changes Required

### A. Step2Opportunity — Unified skills + proficiency

**Two sections in one step:**

**Section 1 (existing, expanded):** "Which of these technologies and skills do you have experience with?" — multi-select pills. Add 2 new items to the existing list:
- "Reverse Engineering / Legacy Refactoring"
- "Production Monitoring & Debugging"

Full pill list (alphabetical):
```
APIs, Azure Data Factory, Azure Data Lake, Azure SQL,
Databricks, Data Modelling, DAX, DTS,
ETL / ELT, Excel, Git / GitHub, Microsoft Fabric,
Power BI, Power Query, Production Monitoring & Debugging, Python,
Query Tuning / Indexing, Reverse Engineering / Legacy Refactoring,
SAP HANA, Snowflake, SSAS, SSAS Tabular,
SSIS, SSRS, Stored Procedures, Teradata,
PBIRS, SQL Server / T-SQL
```

**Section 2 (new):** "Rate your proficiency:" — appears **dynamically below Section 1, showing ONLY items the candidate selected**. Each selected item gets a 5-point scale: None / Beginner / Intermediate / Advanced / Expert.

Rating values: None=0, Beginner=1, Intermediate=2, Advanced=3, Expert=4

**Key design principle:** The pill list mixes technologies and competencies indistinguishably. Candidates have no way to tell which items are core requirements (SQL, SSIS, SSAS, ADF, Power BI, ETL, Query Tuning, Data Modelling, Reverse Engineering, Production Monitoring) vs. nice-to-haves (Databricks, Python, Snowflake, etc.). The rating grid only appears for what they selected — no hints.

**New answer fields:**
- `tech_stack: string[]` (existing — selected pills)
- `tech_ratings: Record<string, number>` (new — rating per selected item, key = exact pill text)

**UI note:** Step 2 may need scrollable content since the rating grid can be long. Keep nav buttons fixed at bottom.

### B. Scoring Rewrite — Per-Job, Budget-Relative

**Disqualifying gates (binary — not scored):**
- Step 5: Timezone = no → reject
- Step 6: Contract terms = no → reject

**Scorecard per job (max 100):**

| Factor | Points | Logic |
|---|---|---|
| Core tech ratings | 50 | 5 core techs scored against per-job minimums. At/above min for all 5 = 50, each below min = -10, not selected or rated None = disqualify for that job = 0. Non-core pills are informational only. |
| Competency ratings | 20 | 5 competencies hidden in pill list. Each rated 0-4 by candidate. Sum of 5 ratings = score (max 20). Not selected = 0. |
| Notice period | 15 | 1-2 weeks=15, 30 days=10, calendar month=10, 60 days=5, 90 days+=0 |
| CTC vs budget | 15 | 85-95% of budget=15, 75-85%=10, 65-75%=5, <65%=0, >95%=8 |

**Core tech mapping (pill text → scoring key):**
```
'SQL Server / T-SQL' → sql
'SSIS' → ssis
'SSAS' → ssas (also 'SSAS Tabular' counts as ssas)
'Azure Data Factory' → adf
'Power BI' → powerbi
```

**Competency mapping (pill text → scoring key):**
```
'ETL / ELT' → etl
'Query Tuning / Indexing' → query_tuning
'Data Modelling' → dw_modelling
'Reverse Engineering / Legacy Refactoring' → reverse_engineering
'Production Monitoring & Debugging' → prod_monitoring
```

**Per-job config:**
```ts
const JOBS = [
  { id: 'intermediate_data_engineer', title: 'Intermediate Data Engineer', loxoJobId: 3568888, budget: 900000, techMinimums: { sql: 3, ssis: 2, ssas: 2, adf: 2, powerbi: 2 } },
  { id: 'senior_data_engineer', title: 'Senior Data Engineer', loxoJobId: 3568889, budget: 1400000, techMinimums: { sql: 4, ssis: 3, ssas: 3, adf: 3, powerbi: 3 } },
  { id: 'senior_sql_developer', title: 'Senior SQL Developer', loxoJobId: 3568890, budget: 0, techMinimums: { sql: 4, ssis: 2, ssas: 2, adf: 1, powerbi: 1 } },
  { id: 'senior_bi_developer', title: 'Senior BI Developer', loxoJobId: 3568891, budget: 1100000, techMinimums: { sql: 3, ssis: 2, ssas: 3, adf: 2, powerbi: 4 } },
]
```

Note: Senior SQL Developer budget=0 (TBC). CTC scoring skipped if budget=0.

**Thresholds:** ≥75 = Strong, 50-74 = Possible, <50 = Under Review

### C. Results Page (Complete.vue) — Per-Job Results

Show a results card per selected role:
- Job title
- Score / 100
- Fit level badge
- Breakdown: Stack=X/50, Competencies=X/20, Notice=X/15, CTC=X/15

### D. Proxy Server — Multi-Job Loxo Integration

**Current:** Hardcoded to `WWPS_JOB_ID = 3568888`  
**New:** Map each job to its Loxo ID. For each selected job:
1. Add person to job (if not already on it)
2. Move to Screening stage
3. Write per-job activity note with full breakdown (tech ratings, competency ratings, notice, CTC, score)

```js
const WWPS_JOBS = {
  'intermediate_data_engineer': 3568888,
  'senior_data_engineer': 3568889,
  'senior_sql_developer': 3568890,
  'senior_bi_developer': 3568891,
}
```

### E. Step Numbers — No Change

| Step | Component | What changes |
|---|---|---|
| 1 | Step1Recruitment | No change |
| 2 | Step2Opportunity | Add dynamic rating grid below pills |
| 3 | Step3RightToWork | No change |
| 4 | Step4Location | No change |
| 5 | Step5Timezone | No change |
| 6 | Step6Contract | No change |
| 7 | Step7Notice | No change |
| 8 | Step8Compensation | No change |

Total steps: **8** (unchanged)

---

## Existing Features to Keep Unchanged

- Step1Recruitment (recruitment preference + reason)
- Step3RightToWork (EE status, ID, disability)
- Step4Location (residence, remote, hybrid)
- Step5Timezone (4pm-9pm SAST window)
- Step6Contract (fixed-term acceptance)
- Step7Notice (notice period + considerations textarea)
- Step8Compensation (current CTC, bonus, repayable, leave days, expected CTC)
- localStorage persistence (`truffle_portal_form_v2`)
- Welcome back banner
- Fade transitions
- Complete.vue email/name/phone gate
- ResultBadge.vue
- Admin page

---

## Data Flow

1. Candidate selects tech pills → rating grid appears for selected items only
2. Candidate completes all 8 steps
3. `calculateScores()` runs per role from `preferred_roles` using job config
4. Store in sessionStorage: `{ answers, score (best), fitLevel (best), jobResults: [{jobId, title, loxoJobId, score, fitLevel, breakdown}] }`
5. Complete.vue sends to `/api/submit` with `jobResults` array
6. Proxy server iterates `jobResults`, creates candidate + activity note per Loxo job

---

## Implementation Checklist

- [ ] Update `Step2Opportunity.vue` — expand pill list, add dynamic rating grid
- [ ] Update `Screen.vue` — rewrite scoring logic (per-job, budget-relative), add `tech_ratings` field
- [ ] Update `Complete.vue` — per-job results cards
- [ ] Update `proxy-server.js` — multi-job Loxo integration
- [ ] `npm run build` — verify build
- [ ] Commit + push

---

## Decisions Log

| Decision | Rationale |
|---|---|
| Enhance existing flow, don't replace | Remote has 8 well-built steps; don't throw away work |
| Rating grid shows only selected pills | Doesn't reveal what's core vs. nice-to-have |
| Competencies mixed into pill list | Indistinguishable from technologies — no hints |
| 8 steps, no new step | Step 2 absorbs proficiency ratings; scroll handles length |
| Score per job, not recommend role | Path of least resistance; Loxo already captures per-job |
| Timezone/contract as binary gates | Can't score someone who can't do the basics |
| CTC relative to budget | Auto-calibrates per role |
| Keep existing tech pills | Breadth signal; ratings add depth signal |
| Notice: 30 days/calendar month = 10 | ~30 days is standard; 1-2 weeks = 15 (fast); >30 = diminishing |
