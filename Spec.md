# WWPS Candidate Screening Portal — Build Spec

## Project
A standalone Vue 3 + Express web app for WWPS semiconductor client candidates to self-screen before recruiter outreach. Lives at `portal.truffle.global` (separate Render service).

## Stack
- Frontend: Vue 3 + TypeScript + TailwindCSS + Vite (same stack as truffle-website)
- Backend: Express.js on port 8080
- Database: Render PostgreSQL (on this service)
- Loxo: REST API for candidate creation

## Branding
Match Truffle branding exactly. Colors/fonts from truffle-website repo at `/home/node/.openclaw/tmp/truffle-website`. Tailwind config should mirror it.

## Project structure
```
truffle-portal/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── proxy-server.js          # Express backend
├── supabase/migrations/
│   └── 001_create_submissions.sql
└── src/
    ├── main.ts
    ├── App.vue
    ├── router.ts
    ├── index.css
    ├── pages/
    │   ├── Home.vue         # Landing page
    │   ├── Screen.vue       # Multi-step form
    │   ├── Complete.vue     # Results page
    │   └── Admin.vue        # Admin dashboard
    └── components/
        ├── StepProgress.vue
        ├── QuestionStep.vue
        ├── ResultBadge.vue
        └── AdminTable.vue
```

## Database
PostgreSQL — connection via `DATABASE_URL` env var.

```sql
CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(100),
  answers JSONB,
  score INTEGER,
  fit_level VARCHAR(20),  -- 'strong' | 'possible' | 'under_review'
  loxoid VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Express API Endpoints

### `GET /health`
200 OK, `{ "status": "ok" }`

### `POST /api/submit`
Request:
```json
{
  "name": "Sonia Negondeni",
  "email": "sonia@email.com",
  "phone": "0821234567",
  "answers": {
    "timezone_overlap": "yes",
    "remote_work": "yes",
    "notice_period": "1month",
    "ctc_zar": 95000,
    "availability_issue": "no",
    "availability_note": ""
  },
  "score": 90,
  "fit_level": "strong"
}
```
Logic:
1. Insert into PostgreSQL submissions table
2. Create person in Loxo via `POST https://truffle-talent.app.loxo.co/api/truffle-talent/people` with:
   - `first_name`, `last_name` (split on first space)
   - `email`
   - `phone`
   - `salary` (CTC in ZAR)
   - `notes` = JSON string of all answers + score + fit_level
   - `person_types` = ["Candidate"]
   - Auth: `Bearer {LOXO_API_KEY}` env var
3. Return `{ "success": true, "loxoid": "..." }`

### `GET /api/submissions`
Admin only. Check `Authorization: Bearer WWPS2026` header. Returns all rows from submissions table ordered by score desc.

### `GET /api/whoami`
Returns `{ "authenticated": true }` if correct bearer token provided.

## Fit Score Logic

| Question | Points |
|---|---|
| Timezone overlap (yes) | 30 |
| Remote work (yes) | 20 |
| Notice ≤1month | 20 |
| Notice 2months | 15 |
| Notice 3months+ | 5 |
| CTC R50k–R120k | 20 |
| CTC R120k–R160k | 10 |
| CTC outside these | 0 |
| Availability: no issue | 10 |
| Availability: has issue | 0 |

**Hard fail (score = 0, under_review):** timezone_overlap = "no" OR remote_work = "no"
**Under review (score ≤ 49):** 3+ soft fails
**Possible (score 50–69):** 1–2 soft fails
**Strong (score 70–100):** 0–1 soft fails

## Form Questions (5 steps)

### Step 1 — Timezone overlap
Q: "Are you able to work hours that overlap with US Eastern Time (UTC-5)? We need a minimum 5-hour overlap with the US team."
Options: ["Yes — I have at least 5 hours overlap", "No — I cannot accommodate this"]

### Step 2 — Remote work
Q: "This role is fully remote. Are you comfortable working entirely remotely?"
Options: ["Yes — fully remote is perfect", "No — I prefer hybrid or on-site"]

### Step 3 — Notice period
Q: "What is your current notice period or earliest possible start date?"
Options: ["Immediate", "2 weeks", "1 month", "2 months", "3 months or longer"]

### Step 4 — Compensation
Q: "What is your current monthly cost-to-company (CTC) in ZAR?"
Input: Text field, numeric, formatted as "R XX" with thousand separator display while typing. Validates R1–R500k.

### Step 5 — Availability
Q: "Is there anything that would prevent you from accepting an offer in the next 4–6 weeks?"
Options: ["No — I'm ready to proceed", "Yes — see below"]
If Yes: Show text area "Please explain" (required, min 10 chars).

## Frontend Pages

### `/` — Home
- Hero section: "Join a Global Semiconductor Analytics Practice" heading
- 3–5 sentence value prop paragraph (WWPS context: semiconductor client, large migration project, Azure/Fabric, long-term programme, SA timezone bridge to US)
- CTA button: "Start Screening" → `/screen`
- Trust line: "Truffle has been placing analytics and actuarial talent for 15+ years"
- Truffle logo + nav bar (minimal, just logo + "Admin" link top right)

### `/screen` — Form
- Stepped form, one question at a time
- Top progress bar: "Step X of 5" with filled segments
- Large, clear question text
- Animated transitions between steps (slide left/right, 300ms)
- Back button on steps 2–5
- Next/submit button — disabled until selection made (or validated)
- Mobile-first, full-screen feeling on mobile

### `/complete` — Results
Before revealing score: simple email capture form ("Enter your email to see your results" + button)
Then reveal:
- Fit badge: "Strong Match" (green) / "Possible Match" (amber) / "Under Review" (grey)
- Message: appropriate copy based on fit level
- "Our team will be in touch shortly" or "A member of our team will review your profile"

### `/admin` — Dashboard
- Password gate: input field + submit ("Enter admin password")
- On correct password (WWPS2026): table of submissions
- Columns: Name | Email | Score | Fit Level | Date | Loxo ID
- Sort by score descending
- Logout button

## Build & Deploy

1. Create GitHub repo via GitHub API: `POST /user/repos` — name: `Graham-Paulsen/truffle-portal`, private: false
2. Push all code to main branch
3. Create Render service via Render API:
   - Service type: Web Service
   - Repo: the new GitHub repo
   - Build command: `npm install && npm run build`
   - Start command: `node proxy-server.js`
   - Add PostgreSQL instance
   - Environment variables:
     - `LOXO_API_KEY` = `125ad58eeb80ebcc8961900b97a960217cc941b049295c2eeaa9f571cd7f3db076543ad9613a75451b2cc14be626b5c679d530b2bdf2a76cc2f388bda64a1d051908f366161bb07cca2da71af45bff932b0f0cb406f7de2a6884549e9ea8faaa1531003790f454fb1bf8545c57dea17d0eb999297e84068cc90b138f617b646e`
     - `ADMIN_PASSWORD` = `WWPS2026`
     - `DATABASE_URL` = (from Render PostgreSQL)
     - `NODE_ENV` = `production`
4. Provide the onrender.com URL once deployed

## Implementation Notes
- Use `pg` (node-postgres) for PostgreSQL
- Use `axios` for Loxo API calls
- Form state in Screen.vue component
- Vue Router with history mode
- No Pinia/Vuex needed
- Tailwind: extend truffle-website palette (amber/gold primary, dark text)
- Transitions: use Vue `<Transition>` component with CSS slide/fade
- Admin password: WWPS2026 (hardcoded in proxy-server.js)
- On Render, the Express server should serve the Vue build from `/dist` as static files
- Port: 8080 (Render sets PORT env var)

## Important
- Loxo API base: `https://truffle-talent.app.loxo.co/api/truffle-talent`
- Loxo auth header: `Authorization: Bearer {LOXO_API_KEY}`
- All code goes in `/home/node/.openclaw/workspace/projects/truffle-portal/`
- Initialize git, commit, push to GitHub, deploy to Render
- Notify via `openclaw system event --text "Done: [summary]" --mode now` when complete
