const express = require('express')
const path = require('path')
const { Pool } = require('pg')
const axios = require('axios')

const app = express()
const PORT = process.env.PORT || 8080
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'WWPS2026'
const LOXO_API_KEY = process.env.LOXO_API_KEY || ''
const LOXO_BASE = 'https://truffle-talent.app.loxo.co/api/truffle-talent'
const WWPS_JOB_ID = 3568888

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

// Submit screening
app.post('/api/submit', async (req, res) => {
  const { name, email, phone, answers, score, fit_level } = req.body

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
        // Update existing person
        existing = true
        loxoid = match.id
        await axios.patch(
          `${LOXO_BASE}/people/${loxoid}`,
          {
            person: {
              salary: answers?.ctc_zar || 0,
              phones: phone ? [{ value: phone }] : [],
            },
          },
          { headers: loxoHeaders(), timeout: 10000 }
        )
      } else {
        // Create new person
        const loxoRes = await axios.post(
          `${LOXO_BASE}/people`,
          {
            person: {
              name: name || 'Unknown',
              emails: [{ value: email }],
              phones: phone ? [{ value: phone }] : [],
              salary: answers?.ctc_zar || 0,
            },
          },
          { headers: loxoHeaders(), timeout: 10000 }
        )
        loxoid = loxoRes.data?.id || loxoRes.data?.person?.id || null
      }

      if (loxoid) {
        // Add to WWPS job — fire events with no notes to advance through stages silently
        // Applied → Longlist → Outbound → Screening
        for (let i = 0; i < 6; i++) {
          if (i > 0) await sleep(500)
          try {
            await axios.post(
              `${LOXO_BASE}/person_events`,
              {
                person_event: {
                  person_id: loxoid,
                  job_id: WWPS_JOB_ID,
                  activity_type_id: 1941923,
                },
              },
              { headers: loxoHeaders(), timeout: 10000 }
            )
          } catch (evErr) {
            console.error(`Job event ${i + 1} error:`, evErr?.response?.data || evErr.message)
          }
        }

        // Person-level activity note with full screening results (no job_id)
        const noteLines = [
          `<li>Timezone overlap: ${answers?.timezone_overlap || ''}</li>`,
          `<li>Remote work: ${answers?.remote_work || ''}</li>`,
          `<li>Notice period: ${answers?.notice_period || ''}</li>`,
          `<li>CTC: R${answers?.ctc_zar || 0}</li>`,
          `<li>Availability: ${answers?.availability_issue === 'yes' ? (answers?.availability_note || 'yes') : (answers?.availability_issue || '')}</li>`,
        ].join('')

        try {
          await axios.post(
            `${LOXO_BASE}/person_events`,
            {
              person_event: {
                person_id: loxoid,
                activity_type_id: 1941923,
                notes: `<p><strong>Truffle Portal Screening Results</strong></p><ul>${noteLines}</ul><p><strong>Score: ${score}/100 | Fit: ${fit_level}</strong></p>`,
              },
            },
            { headers: loxoHeaders(), timeout: 10000 }
          )
        } catch (noteErr) {
          console.error('Activity note error:', noteErr?.response?.data || noteErr.message)
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
        `INSERT INTO submissions (name, email, phone, answers, score, fit_level, loxoid)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [name || null, email, phone || null, JSON.stringify(answers), score, fit_level, loxoid ? String(loxoid) : null]
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
