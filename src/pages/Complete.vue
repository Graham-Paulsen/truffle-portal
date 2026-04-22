<template>
  <div class="min-h-screen bg-oxford-blue flex flex-col">
    <!-- Nav -->
    <nav class="flex items-center justify-between px-6 py-4 border-b border-lavender/10 bg-oxford-blue/95 backdrop-blur-sm sticky top-0 z-50">
      <router-link to="/" class="flex items-center">
        <TruffleLogo className="h-8 w-auto" />
      </router-link>
    </nav>

    <main class="flex-1 flex flex-col items-center justify-center px-6 py-16">
      <div class="max-w-md mx-auto w-full space-y-8">

        <!-- Email capture gate -->
        <div v-if="!revealed">
          <div class="text-center space-y-3 mb-8">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyclamen to-veronica flex items-center justify-center mx-auto text-white text-3xl">✓</div>
            <h1 class="text-2xl font-bold text-white">Screening Complete</h1>
            <p class="text-lavender/70">Enter your details to see your results and submit your profile.</p>
          </div>

          <form class="space-y-4" @submit.prevent="submitForm">
            <div>
              <label class="block text-sm font-medium text-lavender/70 mb-1.5">Full Name <span class="text-cyclamen">*</span></label>
              <input
                v-model="name"
                type="text"
                placeholder="Sonia Negondeni"
                required
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-lavender/30 focus:outline-none focus:border-cyclamen/60 focus:ring-2 focus:ring-cyclamen/20 transition-colors"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-lavender/70 mb-1.5">Email Address <span class="text-cyclamen">*</span></label>
              <input
                v-model="email"
                type="email"
                placeholder="you@email.com"
                required
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-lavender/30 focus:outline-none focus:border-cyclamen/60 focus:ring-2 focus:ring-cyclamen/20 transition-colors"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-lavender/70 mb-1.5">Phone Number</label>
              <input
                v-model="phone"
                type="tel"
                placeholder="0821234567"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-lavender/30 focus:outline-none focus:border-cyclamen/60 focus:ring-2 focus:ring-cyclamen/20 transition-colors"
              />
            </div>

            <p v-if="submitError" class="text-red-400 text-sm text-center">{{ submitError }}</p>

            <button
              type="submit"
              class="btn-primary w-full text-center py-4 text-base mt-2"
              :disabled="submitting || !name.trim() || !email.trim()"
            >
              <span v-if="submitting">Submitting…</span>
              <span v-else>See My Results →</span>
            </button>
          </form>
        </div>

        <!-- Results revealed -->
        <div v-else class="text-center space-y-8">
          <div>
            <h1 class="text-2xl font-bold text-white mb-2">Your Screening Results</h1>
            <p class="text-lavender/60 text-sm">Based on your answers</p>
          </div>

          <ResultBadge :fit-level="fitLevel" />

          <div class="card text-left space-y-3">
            <h3 class="text-white font-medium text-sm">What happens next?</h3>
            <ul class="space-y-2 text-lavender/70 text-sm">
              <li class="flex items-start gap-2">
                <span class="text-cyclamen mt-0.5">→</span>
                Your profile has been submitted to the Truffle recruitment team.
              </li>
              <li class="flex items-start gap-2">
                <span class="text-cyclamen mt-0.5">→</span>
                A recruiter will review your details and reach out via email or phone.
              </li>
              <li class="flex items-start gap-2">
                <span class="text-cyclamen mt-0.5">→</span>
                Keep an eye on your inbox — we typically respond within 3–5 business days.
              </li>
            </ul>
          </div>

          <router-link to="/" class="btn-outline inline-block">
            ← Back to Home
          </router-link>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import TruffleLogo from '../components/TruffleLogo.vue'
import ResultBadge from '../components/ResultBadge.vue'

const router = useRouter()

type FitLevel = 'strong' | 'possible' | 'under_review'

const name = ref('')
const email = ref('')
const phone = ref('')
const revealed = ref(false)
const submitting = ref(false)
const submitError = ref('')
const fitLevel = ref<FitLevel>('under_review')

let screeningData: { answers: Record<string, unknown>; score: number; fitLevel: FitLevel } | null = null

onMounted(() => {
  const raw = sessionStorage.getItem('screening_result')
  if (!raw) {
    router.replace('/screen')
    return
  }
  screeningData = JSON.parse(raw)
})

async function submitForm() {
  if (!screeningData) return
  submitting.value = true
  submitError.value = ''

  try {
    await axios.post('/api/submit', {
      name: name.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim() || undefined,
      answers: screeningData.answers,
      score: screeningData.score,
      fit_level: screeningData.fitLevel,
    })

    fitLevel.value = screeningData.fitLevel
    revealed.value = true
    sessionStorage.removeItem('screening_result')
  } catch (err) {
    console.error(err)
    submitError.value = 'Something went wrong. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>
