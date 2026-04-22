<template>
  <div class="min-h-screen bg-oxford-blue flex flex-col">
    <!-- Nav -->
    <nav class="flex items-center justify-between px-6 py-4 border-b border-lavender/10 bg-oxford-blue/95 backdrop-blur-sm sticky top-0 z-50">
      <router-link to="/" class="flex items-center">
        <TruffleLogo className="h-8 w-auto" />
      </router-link>
      <div class="flex items-center gap-4">
        <span class="text-lavender/40 text-sm">Admin Dashboard</span>
        <button
          v-if="authenticated"
          class="btn-outline text-sm px-4 py-2"
          @click="logout"
        >
          Logout
        </button>
      </div>
    </nav>

    <main class="flex-1 px-6 py-12">
      <div class="max-w-6xl mx-auto">

        <!-- Password gate -->
        <div v-if="!authenticated" class="max-w-sm mx-auto">
          <div class="card space-y-6">
            <div class="text-center space-y-2">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyclamen to-veronica flex items-center justify-center mx-auto text-white text-xl">🔐</div>
              <h1 class="text-xl font-bold text-white">Admin Access</h1>
              <p class="text-lavender/60 text-sm">Enter the admin password to view submissions.</p>
            </div>

            <form @submit.prevent="doLogin" class="space-y-4">
              <input
                v-model="passwordInput"
                type="password"
                placeholder="Admin password"
                autocomplete="current-password"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-lavender/30 focus:outline-none focus:border-cyclamen/60 focus:ring-2 focus:ring-cyclamen/20 transition-colors"
                :class="{ 'border-red-500/60': loginError }"
              />
              <p v-if="loginError" class="text-red-400 text-sm">{{ loginError }}</p>
              <button type="submit" class="btn-primary w-full text-center py-3" :disabled="logging">
                <span v-if="logging">Checking…</span>
                <span v-else>Enter</span>
              </button>
            </form>
          </div>
        </div>

        <!-- Dashboard -->
        <div v-else>
          <div class="flex items-center justify-between mb-8">
            <div>
              <h1 class="text-2xl font-bold text-white">Submissions</h1>
              <p class="text-lavender/60 text-sm mt-1">{{ submissions.length }} candidate{{ submissions.length !== 1 ? 's' : '' }} screened · sorted by score</p>
            </div>
            <button class="btn-outline text-sm px-4 py-2" @click="loadSubmissions">↻ Refresh</button>
          </div>

          <div v-if="loading" class="text-center py-16 text-lavender/40">Loading…</div>
          <div v-else-if="loadError" class="text-center py-16 text-red-400">{{ loadError }}</div>
          <div v-else class="card p-0 overflow-hidden">
            <div class="px-6 py-4 border-b border-white/5">
              <AdminTable :submissions="submissions" />
            </div>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import TruffleLogo from '../components/TruffleLogo.vue'
import AdminTable from '../components/AdminTable.vue'

const ADMIN_TOKEN = 'WWPS2026'
const AUTH_KEY = 'truffle_admin_auth'

interface Submission {
  id: number
  name: string | null
  email: string
  score: number
  fit_level: string
  created_at: string
  loxoid: string | null
}

const authenticated = ref(false)
const passwordInput = ref('')
const loginError = ref('')
const logging = ref(false)

const submissions = ref<Submission[]>([])
const loading = ref(false)
const loadError = ref('')

onMounted(() => {
  if (sessionStorage.getItem(AUTH_KEY) === ADMIN_TOKEN) {
    authenticated.value = true
    loadSubmissions()
  }
})

async function doLogin() {
  logging.value = true
  loginError.value = ''
  try {
    await axios.get('/api/whoami', {
      headers: { Authorization: `Bearer ${passwordInput.value}` },
    })
    sessionStorage.setItem(AUTH_KEY, passwordInput.value)
    authenticated.value = true
    loadSubmissions()
  } catch {
    loginError.value = 'Incorrect password. Please try again.'
  } finally {
    logging.value = false
  }
}

async function loadSubmissions() {
  loading.value = true
  loadError.value = ''
  try {
    const res = await axios.get('/api/submissions', {
      headers: { Authorization: `Bearer ${ADMIN_TOKEN}` },
    })
    submissions.value = res.data
  } catch {
    loadError.value = 'Failed to load submissions. Please refresh.'
  } finally {
    loading.value = false
  }
}

function logout() {
  sessionStorage.removeItem(AUTH_KEY)
  authenticated.value = false
  passwordInput.value = ''
  submissions.value = []
}
</script>
