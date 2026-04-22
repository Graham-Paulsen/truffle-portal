const express = require('express')
const path = require('path')
const { Pool } = require('pg')
const axios = require('axios')

const app = express()
const PORT = process.env.PORT || 8080
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'WWPS2026'
const LOXO_API_KEY = process.env.LOXO_API_KEY || ''
const LOXO_BASE = 'https://truffle-talent.app.loxo.co/api/truffle-talent'

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

// Submit screening
app.post('/api/submit', async (req, res) => {
  const { name, email, phone, answers, score, fit_level } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  let loxoid = null

  // Insert into PostgreSQL
  if (pool) {
    try {
      const result = await pool.query(
        `INSERT INTO submissions (name, email, phone, answers, score, fit_level)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
        [name || null, email, phone || null, JSON.stringify(answers), score, fit_level]
      )
      const submissionId = result.rows[0]?.id

      // Create person in Loxo
      if (LOXO_API_KEY) {
        try {
          const nameParts = (name || '').trim().split(' ')
          const firstName = nameParts[0] || ''
          const lastName = nameParts.slice(1).join(' ') || ''

          const loxoPayload = {
            name: name || 'Unknown',
            emails: [{ value: email }],
            phones: phone ? [{ value: phone }] : [],
            salary: answers?.ctc_zar || 0,
          }

          const loxoRes = await axios.post(
            `${LOXO_BASE}/people`,
            loxoPayload,
            {
              headers: {
                Authorization: `Bearer ${LOXO_API_KEY}`,
                'Content-Type': 'application/json',
              },
              timeout: 10000,
            }
          )

          loxoid = loxoRes.data?.id || loxoRes.data?.person?.id || null

          // Update loxoid in DB
          if (loxoid && submissionId) {
            await pool.query(
              'UPDATE submissions SET loxoid = $1 WHERE id = $2',
              [String(loxoid), submissionId]
            )
          }
        } catch (loxoErr) {
          console.error('Loxo API error:', loxoErr?.response?.data || loxoErr.message)
        }
      }
    } catch (dbErr) {
      console.error('DB error:', dbErr.message)
      return res.status(500).json({ error: 'Database error' })
    }
  }

  return res.json({ success: true, loxoid: loxoid ? String(loxoid) : null })
})

// Get all submissions (admin)
app.get('/api/submissions', requireAdmin, async (_req, res) => {
  if (!pool) {
    return res.json([])
  }
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


// DEBUG endpoint - must be before SPA fallback
app.get('/api/debug', (req, res) => {
  res.json({
    hasPool: !!pool,
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    nodeEnv: process.env.NODE_ENV,
    hasLoxoKey: !!process.env.LOXO_API_KEY
  })
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
