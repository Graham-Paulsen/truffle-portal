<template>
  <div class="min-h-screen bg-oxford-blue flex flex-col">
    <!-- Nav -->
    <nav class="flex items-center justify-between px-6 py-4 border-b border-lavender/10 bg-oxford-blue/95 backdrop-blur-sm sticky top-0 z-50">
      <router-link to="/" class="flex items-center">
        <TruffleLogo className="h-8 w-auto" />
      </router-link>
    </nav>

    <!-- Welcome back banner -->
    <div v-if="restoredFromStorage" class="px-6 pt-4 max-w-xl mx-auto w-full">
      <div class="bg-veronica/10 border border-veronica/30 rounded-lg px-4 py-2.5 text-sm text-lavender/80">
        Welcome back — picking up where you left off
      </div>
    </div>

    <!-- Progress -->
    <div class="px-6 pt-6 max-w-xl mx-auto w-full">
      <StepProgress :current-step="currentStep" :total-steps="5" />
    </div>

    <!-- Form area -->
    <div class="flex-1 flex flex-col justify-center px-6 py-8">
      <div class="max-w-xl mx-auto w-full relative" style="min-height: 320px;">
        <Transition :name="transitionName">
          <div :key="currentStep" class="absolute inset-0">
            <!-- Step 1: Timezone -->
            <QuestionStep
              v-if="currentStep === 1"
              question="Are you able to work hours that overlap with US Eastern Time (UTC-5)? We need a minimum 5-hour overlap with the US team."
              :options="timezoneOptions"
              :model-value="answers.timezone_overlap"
              @update:model-value="answers.timezone_overlap = $event"
            />

            <!-- Step 2: Remote work -->
            <QuestionStep
              v-else-if="currentStep === 2"
              question="This role is fully remote. Are you comfortable working entirely remotely?"
              :options="remoteOptions"
              :model-value="answers.remote_work"
              @update:model-value="answers.remote_work = $event"
            />

            <!-- Step 3: Notice period -->
            <QuestionStep
              v-else-if="currentStep === 3"
              question="What is your current notice period or earliest possible start date?"
              :options="noticeOptions"
              :model-value="answers.notice_period"
              @update:model-value="answers.notice_period = $event"
            />

            <!-- Step 4: CTC -->
            <QuestionStep
              v-else-if="currentStep === 4"
              question="What is your current monthly cost-to-company (CTC) in ZAR?"
              type="number"
              :numeric-value="answers.ctc_zar"
              :validation-error="ctcError"
              @update:numeric-value="onCtcChange"
            />

            <!-- Step 5: Availability -->
            <QuestionStep
              v-else-if="currentStep === 5"
              question="Is there anything that would prevent you from accepting an offer in the next 4–6 weeks?"
              :options="availabilityOptions"
              :model-value="answers.availability_issue"
              :show-textarea="answers.availability_issue === 'yes'"
              :textarea-value="answers.availability_note"
              :textarea-error="noteError"
              @update:model-value="answers.availability_issue = $event"
              @update:textarea-value="answers.availability_note = $event"
            />
          </div>
        </Transition>
      </div>
    </div>

    <!-- Navigation buttons -->
    <div class="px-6 pb-10 max-w-xl mx-auto w-full">
      <div class="flex gap-3">
        <button
          v-if="currentStep > 1"
          type="button"
          class="btn-outline flex-shrink-0"
          @click="goBack"
        >
          ← Back
        </button>
        <button
          type="button"
          class="btn-primary flex-1 text-center"
          :disabled="!canProceed"
          @click="goNext"
        >
          {{ currentStep === 5 ? 'See My Results →' : 'Next →' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TruffleLogo from '../components/TruffleLogo.vue'
import StepProgress from '../components/StepProgress.vue'
import QuestionStep from '../components/QuestionStep.vue'

const router = useRouter()

const currentStep = ref(1)
const transitionName = ref('slide-left')
const ctcError = ref('')
const noteError = ref('')
const restoredFromStorage = ref(false)

const answers = reactive({
  timezone_overlap: '' as string,
  remote_work: '' as string,
  notice_period: '' as string,
  ctc_zar: null as number | null,
  availability_issue: '' as string,
  availability_note: '' as string,
})

onMounted(() => {
  const saved = localStorage.getItem('truffle_portal_form')
  if (saved) {
    try {
      const state = JSON.parse(saved)
      if (state.answers) Object.assign(answers, state.answers)
      if (state.currentStep && state.currentStep >= 1 && state.currentStep <= 5) {
        currentStep.value = state.currentStep
      }
      restoredFromStorage.value = true
    } catch {}
  }
})

watch(
  [currentStep, answers],
  () => {
    localStorage.setItem('truffle_portal_form', JSON.stringify({
      answers: { ...answers },
      currentStep: currentStep.value,
    }))
  },
  { deep: true }
)

const timezoneOptions = [
  { label: 'Yes — I have at least 5 hours overlap', value: 'yes' },
  { label: 'No — I cannot accommodate this', value: 'no' },
]

const remoteOptions = [
  { label: 'Yes — fully remote is perfect', value: 'yes' },
  { label: 'No — I prefer hybrid or on-site', value: 'no' },
]

const noticeOptions = [
  { label: 'Immediate', value: 'immediate' },
  { label: '2 weeks', value: '2weeks' },
  { label: '1 month', value: '1month' },
  { label: '2 months', value: '2months' },
  { label: '3 months or longer', value: '3months+' },
]

const availabilityOptions = [
  { label: 'No — I\'m ready to proceed', value: 'no' },
  { label: 'Yes — see below', value: 'yes' },
]

const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1: return !!answers.timezone_overlap
    case 2: return !!answers.remote_work
    case 3: return !!answers.notice_period
    case 4: return answers.ctc_zar != null && answers.ctc_zar > 0
    case 5:
      if (!answers.availability_issue) return false
      if (answers.availability_issue === 'yes') return answers.availability_note.trim().length >= 10
      return true
    default: return false
  }
})

function onCtcChange(val: number | null) {
  answers.ctc_zar = val
  if (val != null && (val < 1 || val > 500000)) {
    ctcError.value = 'Please enter an amount between R1 and R500,000'
  } else {
    ctcError.value = ''
  }
}

function goBack() {
  transitionName.value = 'slide-right'
  currentStep.value--
}

function goNext() {
  if (!canProceed.value) return

  if (currentStep.value === 4) {
    const ctc = answers.ctc_zar
    if (!ctc || ctc < 1 || ctc > 500000) {
      ctcError.value = 'Please enter an amount between R1 and R500,000'
      return
    }
    ctcError.value = ''
  }

  if (currentStep.value === 5) {
    if (answers.availability_issue === 'yes' && answers.availability_note.trim().length < 10) {
      noteError.value = 'Please provide at least 10 characters of explanation'
      return
    }
    noteError.value = ''
    const result = calculateScore()
    sessionStorage.setItem('screening_result', JSON.stringify({
      answers: { ...answers },
      score: result.score,
      fitLevel: result.fitLevel,
    }))
    localStorage.removeItem('truffle_portal_form')
    router.push('/complete')
    return
  }

  transitionName.value = 'slide-left'
  currentStep.value++
}

type FitLevel = 'strong' | 'possible' | 'under_review'

function calculateScore(): { score: number; fitLevel: FitLevel } {
  if (answers.timezone_overlap === 'no' || answers.remote_work === 'no') {
    return { score: 0, fitLevel: 'under_review' }
  }

  let score = 0
  score += 30 // timezone yes
  score += 20 // remote yes

  if (['immediate', '2weeks', '1month'].includes(answers.notice_period)) {
    score += 20
  } else if (answers.notice_period === '2months') {
    score += 15
  } else {
    score += 5
  }

  const ctc = answers.ctc_zar || 0
  if (ctc >= 50000 && ctc <= 120000) {
    score += 20
  } else if (ctc > 120000 && ctc <= 160000) {
    score += 10
  }

  if (answers.availability_issue === 'no') {
    score += 10
  }

  let fitLevel: FitLevel
  if (score >= 70) {
    fitLevel = 'strong'
  } else if (score >= 50) {
    fitLevel = 'possible'
  } else {
    fitLevel = 'under_review'
  }

  return { score, fitLevel }
}
</script>
