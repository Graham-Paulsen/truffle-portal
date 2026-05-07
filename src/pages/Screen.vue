<template>
  <div class="min-h-screen bg-oxford-blue flex flex-col">
    <!-- Nav -->
    <nav class="flex items-center justify-between px-6 py-4 border-b border-lavender/10 bg-oxford-blue/95 backdrop-blur-sm sticky top-0 z-50">
      <router-link to="/" class="flex items-center">
        <TruffleLogo className="h-10 w-auto" />
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
      <StepProgress :current-step="currentStep" :total-steps="8" />
    </div>

    <!-- Form area -->
    <div class="flex-1 flex flex-col justify-center px-6 py-8">
      <div class="max-w-xl mx-auto w-full">
        <Transition name="fade" mode="out-in">
          <div :key="currentStep">
            <!-- Step 1: Recruitment Preference -->
            <Step1Recruitment
              v-if="currentStep === 1"
              :model-preference="answers.recruitment_preference"
              :model-reason="answers.recruitment_reason"
              :reason-error="reasonError"
              @update:preference="answers.recruitment_preference = $event"
              @update:reason="answers.recruitment_reason = $event"
            />

            <!-- Step 2: Preferred Opportunity + Skills + Proficiency -->
            <Step2Opportunity
              v-else-if="currentStep === 2"
              :model-roles="answers.preferred_roles"
              :model-tech="answers.tech_stack"
              :model-ratings="answers.tech_ratings"
              @update:roles="answers.preferred_roles = $event"
              @update:tech="answers.tech_stack = $event"
              @update:ratings="answers.tech_ratings = $event"
            />

            <!-- Step 3: Right to Work & EE -->
            <Step3RightToWork
              v-else-if="currentStep === 3"
              :model-status="answers.ee_status"
              :model-id-number="answers.id_number"
              :model-disabled="answers.disabled"
              @update:status="answers.ee_status = $event"
              @update:id-number="answers.id_number = $event"
              @update:disabled="answers.disabled = $event"
            />

            <!-- Step 4: Location & Work Arrangement -->
            <Step4Location
              v-else-if="currentStep === 4"
              :model-residence="answers.residence"
              :model-remote="answers.remote_willing"
              :model-hybrid="answers.hybrid_willing"
              @update:residence="answers.residence = $event"
              @update:remote="answers.remote_willing = $event"
              @update:hybrid="answers.hybrid_willing = $event"
            />

            <!-- Step 5: Timezone Overlap -->
            <Step5Timezone
              v-else-if="currentStep === 5"
              :model-value="answers.timezone_overlap"
              @update:model-value="answers.timezone_overlap = $event"
            />

            <!-- Step 6: Contract Terms -->
            <Step6Contract
              v-else-if="currentStep === 6"
              :model-value="answers.contract_terms"
              @update:model-value="answers.contract_terms = $event"
            />

            <!-- Step 7: Notice Period -->
            <Step7Notice
              v-else-if="currentStep === 7"
              :model-notice="answers.notice_period"
              :model-considerations="answers.notice_considerations"
              @update:notice="answers.notice_period = $event"
              @update:considerations="answers.notice_considerations = $event"
            />

            <!-- Step 8: Compensation & Benefits -->
            <Step8Compensation
              v-else-if="currentStep === 8"
              :model-current-ctc="answers.current_ctc"
              :model-bonus="answers.previous_bonus"
              :model-repayable="answers.repayable_on_leaving"
              :model-leave-days="answers.annual_leave_days"
              :model-expected-ctc="answers.expected_ctc"
              :ctc-error="ctcError"
              @update:current-ctc="onCtcChange"
              @update:bonus="answers.previous_bonus = $event"
              @update:repayable="answers.repayable_on_leaving = $event"
              @update:leave-days="answers.annual_leave_days = $event"
              @update:expected-ctc="answers.expected_ctc = $event"
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
          {{ currentStep === 8 ? 'See My Results →' : 'Next →' }}
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
import Step1Recruitment from '../components/ScreenSteps/Step1Recruitment.vue'
import Step2Opportunity from '../components/ScreenSteps/Step2Opportunity.vue'
import Step3RightToWork from '../components/ScreenSteps/Step3RightToWork.vue'
import Step4Location from '../components/ScreenSteps/Step4Location.vue'
import Step5Timezone from '../components/ScreenSteps/Step5Timezone.vue'
import Step6Contract from '../components/ScreenSteps/Step6Contract.vue'
import Step7Notice from '../components/ScreenSteps/Step7Notice.vue'
import Step8Compensation from '../components/ScreenSteps/Step8Compensation.vue'

const router = useRouter()

const currentStep = ref(1)
const ctcError = ref('')
const reasonError = ref('')
const restoredFromStorage = ref(false)

// ── Per-job config ──
interface JobConfig {
  id: string
  title: string
  loxoJobId: number
  budget: number
  techMinimums: Record<string, number>
}

const JOBS: JobConfig[] = [
  { id: 'intermediate_data_engineer', title: 'Intermediate Data Engineer', loxoJobId: 3568888, budget: 900000,  techMinimums: { sql: 3, ssis: 2, ssas: 2, adf: 2, powerbi: 2 } },
  { id: 'senior_data_engineer',       title: 'Senior Data Engineer',       loxoJobId: 3568889, budget: 1400000, techMinimums: { sql: 4, ssis: 3, ssas: 3, adf: 3, powerbi: 3 } },
  { id: 'senior_sql_developer',       title: 'Senior SQL Developer',       loxoJobId: 3568890, budget: 0,       techMinimums: { sql: 4, ssis: 2, ssas: 2, adf: 1, powerbi: 1 } },
  { id: 'senior_bi_developer',        title: 'Senior BI Developer',        loxoJobId: 3568891, budget: 1100000, techMinimums: { sql: 3, ssis: 2, ssas: 3, adf: 2, powerbi: 4 } },
]

// Core tech: pill text → scoring key
const TECH_PILL_MAP: Record<string, string> = {
  'SQL Server / T-SQL': 'sql',
  'SSIS':               'ssis',
  'SSAS':               'ssas',
  'SSAS Tabular':       'ssas',
  'Azure Data Factory': 'adf',
  'Power BI':           'powerbi',
}

// Competency: pill text → scoring key
const COMPETENCY_PILL_MAP: Record<string, string> = {
  'ETL / ELT':                              'etl',
  'Query Tuning / Indexing':                'query_tuning',
  'Data Modelling':                         'dw_modelling',
  'Reverse Engineering / Legacy Refactoring': 'reverse_engineering',
  'Production Monitoring & Debugging':      'prod_monitoring',
}

type FitLevel = 'strong' | 'possible' | 'under_review'

interface JobResult {
  jobId: string
  title: string
  loxoJobId: number
  score: number
  fitLevel: FitLevel
  breakdown: {
    tech: number
    competencies: number
    notice: number
    ctc: number
  }
}

const answers = reactive({
  // Step 1
  recruitment_preference: '' as string,
  recruitment_reason: '' as string,
  // Step 2
  preferred_roles: [] as string[],
  tech_stack: [] as string[],
  tech_ratings: {} as Record<string, number>,
  // Step 3
  ee_status: '' as string,
  id_number: '' as string,
  disabled: false as boolean,
  // Step 4
  residence: '' as string,
  remote_willing: '' as string,
  hybrid_willing: '' as string,
  // Step 5
  timezone_overlap: '' as string,
  // Step 6
  contract_terms: '' as string,
  // Step 7
  notice_period: '' as string,
  notice_considerations: '' as string,
  // Step 8
  current_ctc: null as number | null,
  previous_bonus: null as number | null,
  repayable_on_leaving: '' as string,
  annual_leave_days: 0 as number,
  expected_ctc: null as number | null,
})

onMounted(() => {
  const saved = localStorage.getItem('truffle_portal_form_v2')
  if (saved) {
    try {
      const state = JSON.parse(saved)
      if (state.answers) Object.assign(answers, state.answers)
      if (state.currentStep && state.currentStep >= 1 && state.currentStep <= 8) {
        currentStep.value = state.currentStep
      }
      restoredFromStorage.value = true
    } catch {}
  }
})

watch(
  [currentStep, answers],
  () => {
    localStorage.setItem('truffle_portal_form_v2', JSON.stringify({
      answers: { ...answers },
      currentStep: currentStep.value,
    }))
  },
  { deep: true }
)

const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1:
      if (!answers.recruitment_preference) return false
      if (answers.recruitment_preference !== 'not_looking' && answers.recruitment_reason.trim().length < 5) {
        return false
      }
      return true
    case 2:
      return answers.preferred_roles.length > 0
    case 3:
      return !!answers.ee_status
    case 4:
      if (!answers.residence.trim() || !answers.remote_willing) return false
      if (answers.remote_willing === 'yes' && !answers.hybrid_willing) return false
      return true
    case 5:
      return !!answers.timezone_overlap
    case 6:
      return !!answers.contract_terms
    case 7:
      return !!answers.notice_period
    case 8:
      return answers.current_ctc != null && answers.current_ctc >= 500000 && answers.current_ctc <= 1700000
    default:
      return false
  }
})

function onCtcChange(val: number | null) {
  answers.current_ctc = val
  if (val != null && (val < 500000 || val > 1700000)) {
    ctcError.value = 'Please enter an amount between R500,000 and R1,700,000'
  } else {
    ctcError.value = ''
  }
}

function goBack() {
  currentStep.value--
}

// ── Scoring helpers ──

function getRating(pill: string): number {
  return answers.tech_ratings[pill] ?? 0
}

// Get effective rating for a core tech key (handles multiple pills mapping to same key)
function getTechKeyRating(key: string): number {
  for (const [pill, k] of Object.entries(TECH_PILL_MAP)) {
    if (k === key && answers.tech_stack.includes(pill)) {
      return getRating(pill)
    }
  }
  return 0
}

function scoreForJob(job: JobConfig): JobResult {
  // Binary gates
  if (answers.timezone_overlap === 'no' || answers.contract_terms === 'no') {
    return {
      jobId: job.id, title: job.title, loxoJobId: job.loxoJobId,
      score: 0, fitLevel: 'under_review',
      breakdown: { tech: 0, competencies: 0, notice: 0, ctc: 0 },
    }
  }

  // 1. Core tech score (50 pts)
  let techScore = 50
  let disqualified = false
  for (const [key, minimum] of Object.entries(job.techMinimums)) {
    const rating = getTechKeyRating(key)
    if (rating === 0) {
      disqualified = true
      break
    }
    if (rating < minimum) {
      techScore -= 10
    }
  }
  if (disqualified) {
    return {
      jobId: job.id, title: job.title, loxoJobId: job.loxoJobId,
      score: 0, fitLevel: 'under_review',
      breakdown: { tech: 0, competencies: 0, notice: 0, ctc: 0 },
    }
  }
  techScore = Math.max(0, techScore)

  // 2. Competency score (20 pts max — sum of up to 5 × 4)
  let competencyScore = 0
  for (const pill of Object.keys(COMPETENCY_PILL_MAP)) {
    if (answers.tech_stack.includes(pill)) {
      competencyScore += getRating(pill)
    }
  }
  competencyScore = Math.min(20, competencyScore)

  // 3. Notice period (15 pts)
  let noticeScore = 0
  if (answers.notice_period === '1-2_weeks')       noticeScore = 15
  else if (answers.notice_period === '30_days')     noticeScore = 10
  else if (answers.notice_period === 'calendar_month') noticeScore = 10
  else if (answers.notice_period === '60_days')     noticeScore = 5
  // 90_days → 0

  // 4. CTC vs budget (15 pts) — skipped if budget = 0
  let ctcScore = 0
  if (job.budget > 0 && answers.expected_ctc) {
    const ratio = answers.expected_ctc / job.budget
    if (ratio >= 0.85 && ratio <= 0.95)       ctcScore = 15
    else if (ratio >= 0.75 && ratio < 0.85)   ctcScore = 10
    else if (ratio >= 0.65 && ratio < 0.75)   ctcScore = 5
    else if (ratio > 0.95)                    ctcScore = 8
    // < 0.65 → 0
  }

  const total = techScore + competencyScore + noticeScore + ctcScore
  const fitLevel: FitLevel = total >= 75 ? 'strong' : total >= 50 ? 'possible' : 'under_review'

  return {
    jobId: job.id,
    title: job.title,
    loxoJobId: job.loxoJobId,
    score: total,
    fitLevel,
    breakdown: { tech: techScore, competencies: competencyScore, notice: noticeScore, ctc: ctcScore },
  }
}

function calculateScores(): JobResult[] {
  const selectedJobs = JOBS.filter(j => answers.preferred_roles.includes(j.id))
  return selectedJobs.map(scoreForJob)
}

function goNext() {
  if (!canProceed.value) return

  // Validate reason on step 1
  if (currentStep.value === 1 && answers.recruitment_preference !== 'not_looking') {
    if (answers.recruitment_reason.trim().length < 5) {
      reasonError.value = 'Please provide at least a brief reason'
      return
    }
    reasonError.value = ''
  }

  // Final step — calculate per-job scores and navigate to Complete
  if (currentStep.value === 8) {
    const ctc = answers.current_ctc
    if (!ctc || ctc < 500000 || ctc > 1700000) {
      ctcError.value = 'Please enter an amount between R500,000 and R1,700,000'
      return
    }
    ctcError.value = ''

    const jobResults = calculateScores()

    // Best overall score / fit level across selected jobs
    const fitOrder: Record<FitLevel, number> = { strong: 3, possible: 2, under_review: 1 }
    const bestScore = jobResults.reduce((max, r) => Math.max(max, r.score), 0)
    const bestFitLevel = jobResults.reduce<FitLevel>(
      (best, r) => fitOrder[r.fitLevel] > fitOrder[best] ? r.fitLevel : best,
      'under_review'
    )

    sessionStorage.setItem('screening_result', JSON.stringify({
      answers: { ...answers },
      score: bestScore,
      fitLevel: bestFitLevel,
      jobResults,
    }))
    localStorage.removeItem('truffle_portal_form_v2')
    router.push('/complete')
    return
  }

  currentStep.value++
}
</script>
