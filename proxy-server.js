const express = require('express')
const path = require('path')
const { Pool } = require('pg')
const axios = require('axios')
const FormData = require('form-data')

const app = express()
const PORT = process.env.PORT || 8080
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'WWPS2026'
const LOXO_API_KEY = process.env.LOXO_API_KEY || ''
const LOXO_BASE = 'https://truffle-talent.app.loxo.co/api/truffle-talent'
const WWPS_JOBS = {
  'intermediate_data_engineer': 3568888,
  'senior_data_engineer': 3568889,
  'senior_sql_developer': 3568890,
  'senior_bi_developer': 3568891,
}

app.use(express.json())

// PostgreSQL pool — gracefully handles missing DATABASE_URL
let pool = null
if (process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } })
}

async function ensureTable() {
  if (!pool) return
  await pool.query(`
    CREATE TABLE IF NOT EXISTS submissions (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      phone VARCHAR(100),
      answers JSONB,
      score INTEGER,
      fit_level VARCHAR(20),
      job_results JSONB,
      loxoid VARCHAR(50),
      created_at TIMESTAMP DEFAULT NOW()
    )
  `)
}

ensureTable().catch(console.error)

// Serve Vue build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')))
}

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

// Auth middleware for admin endpoints
function requireAdmin(req, res, next) {
  const auth = req.headers['authorization'] || ''
  const token = auth.replace('Bearer ', '').trim()
  if (token !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function loxoHeaders() {
  return {
    Authorization: `Bearer ${LOXO_API_KEY}`,
    'Content-Type': 'application/json',
  }
}

// ── Loxo Hierarchy Option IDs ──

// H4: EE Status
const EE_STATUS_IDS = {
  african_black: 6248129,
  coloured: 6248130,
  indian: 6248131,
  asian: 6248132,
  white_sa: 6248133,
  foreign_citizen_post1994: 6248135,
  foreign_permanent_residency: 6248134,
  foreign_work_permit: 6248136,
  foreign_no_right: 6248137,
}

// H5: Notice Period
const NOTICE_PERIOD_IDS = {
  '1-2_weeks': 5994778,
  '30_days': 5994777,
  '60_days': 5994776,
  '90_days': 5994774,
  calendar_month: 5994775,
}

// H6: Work Arrangement
const WORK_ARRANGEMENT_IDS = {
  remote: 5994781,
  hybrid: 5994780,
  onsite: 5994779,
}

// H7: Recruitment Preference
const RECRUITMENT_PREF_IDS = {
  actively_pursuing: 5994784,
  open_to_exceptional: 5994783,
  not_looking: 5994782,
}

// H8: Preferred Location
const LOCATION_IDS = {
  cape_town: 5994795,
  johannesburg: 5994793,
  pretoria: 5994792,
  durban: 5994794,
  international: 5994791,
}

// H9: Software Proficiency (portal name → Loxo ID)
const TECH_STACK_IDS = {
  'SQL Server / T-SQL': 6248144,
  'SSIS': 6248149,
  'SSRS': 6248150,
  'SSAS': 6248148,
  'SSAS Tabular': 6248139,
  'Azure SQL': 6248146,
  'Snowflake': 6248143,
  'Azure Data Factory': 6248147,
  'Microsoft Fabric': 6248145,
  'Power BI': 5994811,
  'DAX': 6248140,
  'Power Query': 6248141,
  'Python': 5994807,
  'Excel': 5994813,
  'Azure': 6159562,
}

// Tech stack items with NO Loxo match → activity note only
const TECH_STACK_NOTE_ONLY = [
  'Stored Procedures', 'SAP HANA', 'Data Modelling', 'Query Tuning / Indexing',
  'Azure Data Lake', 'Databricks', 'APIs', 'Git / GitHub', 'ETL / ELT',
  'Teradata', 'DTS', 'PBIRS',
]

// H12: Disabled
const DISABLED_IDS = {
  yes: 6248152,
  no: 6248151,
}

function mapLocationToId(residence) {
  if (!residence) return null
  const lower = residence.toLowerCase().trim()
  if (lower.includes('cape town')) return LOCATION_IDS.cape_town
  if (lower.includes('johannesburg') || lower.includes('jhb') || lower.includes('joburg')) return LOCATION_IDS.johannesburg
  if (lower.includes('pretoria') || lower.includes('pta')) return LOCATION_IDS.pretoria
  if (lower.includes('durban')) return LOCATION_IDS.durban
  return LOCATION_IDS.international
}

// Build Loxo hierarchy arrays from portal answers
function buildHierarchyFormData(answers) {
  const form = []

  // H4: EE Status
  const eeId = EE_STATUS_IDS[answers.ee_status]
  if (eeId) form.push({ key: 'person[custom_hierarchy_4][]', value: String(eeId) })

  // H5: Notice Period
  const noticeId = NOTICE_PERIOD_IDS[answers.notice_period]
  if (noticeId) form.push({ key: 'person[custom_hierarchy_5][]', value: String(noticeId) })

  // H6: Work Arrangement (multi: remote + hybrid)
  if (answers.remote_willing === 'yes') form.push({ key: 'person[custom_hierarchy_6][]', value: String(WORK_ARRANGEMENT_IDS.remote) })
  if (answers.hybrid_willing === 'yes') form.push({ key: 'person[custom_hierarchy_6][]', value: String(WORK_ARRANGEMENT_IDS.hybrid) })

  // H7: Recruitment Preference
  const prefId = RECRUITMENT_PREF_IDS[answers.recruitment_preference]
  if (prefId) form.push({ key: 'person[custom_hierarchy_7][]', value: String(prefId) })

  // H8: Preferred Location
  const locId = mapLocationToId(answers.residence)
  if (locId) form.push({ key: 'person[custom_hierarchy_8][]', value: String(locId) })

  // City / Address (plain text)
  if (answers.residence) form.push({ key: 'person[city]', value: answers.residence })

  // H9: Software Proficiency
  const techIds = (answers.tech_stack || []).map(t => TECH_STACK_IDS[t]).filter(Boolean)
  for (const id of techIds) {
    form.push({ key: 'person[custom_hierarchy_9][]', value: String(id) })
  }

  // H12: Disabled
  if (answers.disabled !== undefined) {
    form.push({ key: 'person[custom_hierarchy_12][]', value: String(answers.disabled ? DISABLED_IDS.yes : DISABLED_IDS.no) })
  }

  // Text fields
  const notes = []
  if (answers.recruitment_reason) notes.push(`Reason for leaving: ${answers.recruitment_reason}`)
  if (answers.notice_considerations) notes.push(`Notice considerations: ${answers.notice_considerations}`)
  if (notes.length > 0) form.push({ key: 'person[custom_text_1]', value: notes.join(' | ') })

  if (answers.id_number) form.push({ key: 'person[custom_text_4]', value: answers.id_number })

  // Salary
  if (answers.current_ctc) form.push({ key: 'person[salary]', value: String(answers.current_ctc) })

  // Bonus
  if (answers.previous_bonus) {
    form.push({ key: 'person[bonus]', value: String(answers.previous_bonus) })
    form.push({ key: 'person[bonus_type_id]', value: '1' })
  }

  // Compensation notes
  const compNotes = []
  if (answers.repayable_on_leaving) compNotes.push(`Repayable on leaving: ${answers.repayable_on_leaving}`)
  if (answers.annual_leave_days) compNotes.push(`Annual leave: ${answers.annual_leave_days} days`)
  if (answers.expected_ctc) compNotes.push(`Expected CTC: R${answers.expected_ctc.toLocaleString('en-ZA')} p/a`)
  if (compNotes.length > 0) form.push({ key: 'person[compensation_notes]', value: compNotes.join('. ') })

  return form
}

// Send custom fields via PUT multipart/form-data (Loxo requires this for hierarchy fields)
async function updatePersonFields(personId, answers) {
  const formData = buildHierarchyFormData(answers)
  if (formData.length === 0) return

  const form = new FormData()
  for (const entry of formData) {
    form.append(entry.key, entry.value)
  }

  await axios.put(
    `${LOXO_BASE}/people/${personId}`,
    form,
    { headers: { ...loxoHeaders(), ...form.getHeaders() }, timeout: 15000 }
  )
}

// Submit screening
app.post('/api/submit', async (req, res) => {
  const { name, email, phone, answers, score, fit_level, jobResults } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  // Block duplicate submissions
  if (pool) {
    try {
      const dupCheck = await pool.query('SELECT id FROM submissions WHERE email = $1 LIMIT 1', [email])
      if (dupCheck.rows.length > 0) {
        return res.status(409).json({
          success: false,
          error: 'duplicate',
          message: 'This email has already submitted a screening.',
        })
      }
    } catch (dbErr) {
      console.error('DB duplicate check error:', dbErr.message)
    }
  }

  let loxoid = null
  let existing = false

  if (LOXO_API_KEY) {
    try {
      // Exact email lookup in Loxo — search with per_page=50 to maximise matches
      const searchRes = await axios.get(`${LOXO_BASE}/people`, {
        params: { query: email, per_page: 50 },
        headers: loxoHeaders(),
        timeout: 10000,
      })

      const people = searchRes.data?.people || []
      const emailLower = email.toLowerCase()
      const match = people.find((p) =>
        (p.emails || []).some(
          (e) => e.value && e.value.toLowerCase().trim() === emailLower
        )
      )

      if (match) {
        // Update existing person — basic profile via PATCH
        existing = true
        loxoid = match.id
        await axios.patch(
          `${LOXO_BASE}/people/${loxoid}`,
          { person: { phones: phone ? [{ value: phone }] : [] } },
          { headers: loxoHeaders(), timeout: 10000 }
        )
        // Custom fields via PUT multipart/form-data
        await updatePersonFields(loxoid, answers)
      } else {
        // Create new person — basic profile via POST JSON
        const loxoRes = await axios.post(
          `${LOXO_BASE}/people`,
          { person: { name: name || 'Unknown', emails: [{ value: email }], phones: phone ? [{ value: phone }] : [] } },
          { headers: loxoHeaders(), timeout: 10000 }
        )
        loxoid = loxoRes.data?.id || loxoRes.data?.person?.id || null
        // Custom fields via PUT multipart/form-data
        if (loxoid) await updatePersonFields(loxoid, answers)
      }

      if (loxoid) {
        // Process each job from jobResults
        const jobs = jobResults || []
        for (const jr of jobs) {
          const loxoJobId = WWPS_JOBS[jr.jobId]
          if (!loxoJobId) {
            console.warn(`Unknown job ID: ${jr.jobId}, skipping`)
            continue
          }

          // Check if person is already on this job
          let alreadyOnJob = false
          try {
            const candRes = await axios.get(
              `${LOXO_BASE}/jobs/${loxoJobId}/candidates`,
              { params: { person_id: loxoid, per_page: 1 }, headers: loxoHeaders(), timeout: 10000 }
            )
            const candidates = candRes.data?.candidates || candRes.data || []
            alreadyOnJob = candidates.some(
              (c) => String(c.person_id || c.person?.id) === String(loxoid)
            )
          } catch (lookupErr) {
            console.error(`Job candidate lookup error (${jr.jobId}):`, lookupErr?.response?.data || lookupErr.message)
          }

          // Add to job if not already
          if (!alreadyOnJob) {
            try {
              await axios.post(
                `${LOXO_BASE}/person_events`,
                { person_event: { person_id: loxoid, job_id: loxoJobId, activity_type_id: 1941928 } },
                { headers: loxoHeaders(), timeout: 10000 }
              )
            } catch (evErr) {
              console.error(`Added to job error (${jr.jobId}):`, evErr?.response?.data || evErr.message)
            }
          }

          // Move to Screening stage
          try {
            await axios.post(
              `${LOXO_BASE}/person_events`,
              { person_event: { person_id: loxoid, job_id: loxoJobId, activity_type_id: 1941943 } },
              { headers: loxoHeaders(), timeout: 10000 }
            )
          } catch (evErr) {
            console.error(`Screening stage error (${jr.jobId}):`, evErr?.response?.data || evErr.message)
          }

          // Per-job activity note
          const ratings = answers?.tech_ratings || {}
          const ratingLines = (answers?.tech_stack || []).map(t => {
            const r = ratings[t]
            const label = r != null ? ['None','Beginner','Intermediate','Advanced','Expert'][r] || r : 'N/A'
            return `${t}: ${label}`
          }).join(' | ')

          const bd = jr.breakdown || {}
          const noteLines = [
            `<li><strong>Role:</strong> ${jr.title}</li>`,
            `<li><strong>Tech Ratings:</strong> ${ratingLines}</li>`,
            `<li><strong>Notice:</strong> ${{'1-2_weeks':'1-2 Weeks','30_days':'30 Days','60_days':'60 Days','90_days':'90 Days','calendar_month':'Calendar Month'}[answers?.notice_period] || answers?.notice_period || ''}</li>`,
            `<li><strong>Current CTC:</strong> R${(answers?.current_ctc || 0).toLocaleString('en-ZA')}</li>`,
            `<li><strong>Timezone:</strong> ${answers?.timezone_overlap === 'yes' ? 'Yes' : 'No'}</li>`,
            `<li><strong>Contract:</strong> ${answers?.contract_terms === 'yes' ? 'Yes' : 'No'}</li>`,
          ].join('')

          try {
            await axios.post(
              `${LOXO_BASE}/person_events`,
              {
                person_event: {
                  person_id: loxoid,
                  job_id: loxoJobId,
                  activity_type_id: 1941923,
                  notes: `<p><strong>Portal Screening — ${jr.title}</strong></p><ul>${noteLines}</ul><p><strong>Score: ${jr.score}/100 | Fit: ${jr.fitLevel}</strong></p><p>Stack: ${bd.tech||0}/50 | Skills: ${bd.competencies||0}/20 | Notice: ${bd.notice||0}/15 | CTC: ${bd.ctc||0}/15</p>`,
                },
              },
              { headers: loxoHeaders(), timeout: 10000 }
            )
          } catch (noteErr) {
            console.error(`Activity note error (${jr.jobId}):`, noteErr?.response?.data || noteErr.message)
          }

          await new Promise(r => setTimeout(r, 300)) // Rate limit between jobs
        }

        // Person-level summary note (no job_id)
        const techMapped = (answers?.tech_stack || []).filter(t => TECH_STACK_IDS[t])
        const techUnmapped = (answers?.tech_stack || []).filter(t => !TECH_STACK_IDS[t])
        const summaryLines = [
          `<li><strong>Recruitment:</strong> ${{'actively_pursuing':'Actively pursuing','open_to_exceptional':'Open to exceptional','not_looking':'Not looking'}[answers?.recruitment_preference] || ''}</li>`,
          answers?.recruitment_reason ? `<li><strong>Reason:</strong> ${answers.recruitment_reason}</li>` : '',
          `<li><strong>Roles:</strong> ${(answers?.preferred_roles || []).join(', ')}</li>`,
          `<li><strong>Tech:</strong> ${techMapped.join(', ')}${techUnmapped.length ? ' + ' + techUnmapped.join(', ') : ''}</li>`,
          `<li><strong>EE:</strong> ${{'african_black':'African Black','coloured':'Coloured','indian':'Indian','asian':'Asian','white_sa':'White SA','foreign_citizen_post1994':'Foreign - Citizenship post 1994','foreign_permanent_residency':'Foreign - Permanent Resident','foreign_work_permit':'Foreign - Work Permit','foreign_no_right':'Foreign - No Right to Work'}[answers?.ee_status] || ''}</li>`,
          answers?.id_number ? `<li><strong>ID:</strong> ${answers.id_number}</li>` : '',
          `<li><strong>Residence:</strong> ${answers?.residence || ''}</li>`,
          `<li><strong>Remote:</strong> ${answers?.remote_willing === 'yes' ? 'Yes' : 'No'} | <strong>Hybrid:</strong> ${answers?.hybrid_willing === 'yes' ? 'Yes' : 'No'}</li>`,
          `<li><strong>Expected CTC:</strong> R${(answers?.expected_ctc || 0).toLocaleString('en-ZA')}</li>`,
        ].filter(Boolean).join('')

        try {
          await axios.post(
            `${LOXO_BASE}/person_events`,
            {
              person_event: {
                person_id: loxoid,
                activity_type_id: 1941923,
                notes: `<p><strong>Portal Screening Summary</strong></p><ul>${summaryLines}</ul><p><strong>Overall: ${score}/100 | ${fit_level}</strong></p>`,
              },
            },
            { headers: loxoHeaders(), timeout: 10000 }
          )
        } catch (noteErr) {
          console.error('Summary note error:', noteErr?.response?.data || noteErr.message)
        }
      }
    } catch (loxoErr) {
      console.error('Loxo error:', loxoErr?.response?.data || loxoErr.message)
    }
  }

  // Insert into PostgreSQL
  if (pool) {
    try {
      await pool.query(
        `INSERT INTO submissions (name, email, phone, answers, score, fit_level, job_results, loxoid)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [name || null, email, phone || null, JSON.stringify(answers), score, fit_level, JSON.stringify(jobResults || []), loxoid ? String(loxoid) : null]
      )
    } catch (dbErr) {
      console.error('DB insert error:', dbErr.message)
      return res.status(500).json({ error: 'Database error' })
    }
  }

  return res.json({ success: true, loxoid: loxoid ? String(loxoid) : null, existing })
})

// Get all submissions (admin)
app.get('/api/submissions', requireAdmin, async (_req, res) => {
  if (!pool) return res.json([])
  try {
    const result = await pool.query(
      'SELECT id, name, email, score, fit_level, created_at, loxoid FROM submissions ORDER BY score DESC'
    )
    return res.json(result.rows)
  } catch (err) {
    console.error('DB error:', err.message)
    return res.status(500).json({ error: 'Database error' })
  }
})

// Whoami (auth check)
app.get('/api/whoami', requireAdmin, (_req, res) => {
  res.json({ authenticated: true })
})

// Admin: delete submission by ID
app.delete('/api/submissions/:id', requireAdmin, async (req, res) => {
  if (!pool) return res.status(500).json({ error: 'No database' })
  try {
    await pool.query('DELETE FROM submissions WHERE id = $1', [req.params.id])
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// SPA fallback — serve index.html for all non-API routes in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Truffle Portal server running on port ${PORT}`)
})
