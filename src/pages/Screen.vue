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
      <StepProgress :current-step="currentStep" :total-steps="8" />
    </div>

    <!-- Form area -->
    <div class="flex-1 flex flex-col justify-center px-6 py-8">
      <div class="max-w-xl mx-auto w-full relative" style="min-height: 320px;">
        <Transition :name="transitionName">
          <div :key="currentStep" class="absolute inset-0 overflow-y-auto pr-1">
            <!-- Step 1: Recruitment Preference -->
            <Step1Recruitment
              v-if="currentStep === 1"
              :model-preference="answers.recruitment_preference"
              :model-reason="answers.recruitment_reason"
              :reason-error="reasonError"
              @update:preference="answers.recruitment_preference = $event"
              @update:reason="answers.recruitment_reason = $event"
            />

            <!-- Step 2: Preferred Opportunity -->
            <Step2Opportunity
              v-else-if="currentStep === 2"
              :model-roles="answers.preferred_roles"
              :model-tech="answers.tech_stack"
              @update:roles="answers.preferred_roles = $event"
              @update:tech="answers.tech_stack = $event"
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
const transitionName = ref('slide-left')
const ctcError = ref('')
const reasonError = ref('')
const restoredFromStorage = ref(false)

const answers = reactive({
  // Step 1
  recruitment_preference: '' as string,
  recruitment_reason: '' as string,
  // Step 2
  preferred_roles: [] as string[],
  tech_stack: [] as string[],
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
      return answers.residence.trim().length > 0 && !!answers.remote_willing && !!answers.hybrid_willing
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
  transitionName.value = 'slide-right'
  currentStep.value--
}

type FitLevel = 'strong' | 'possible' | 'under_review'

function calculateScore(): { score: number; fitLevel: FitLevel } {
  // Hard fails
  if (answers.timezone_overlap === 'no' || answers.contract_terms === 'no') {
    return { score: 0, fitLevel: 'under_review' }
  }

  let score = 0

  // Recruitment preference (10)
  if (answers.recruitment_preference === 'actively_pursuing') score += 10
  else if (answers.recruitment_preference === 'open_to_exceptional') score += 7
  else score += 2

  // Role match — any selection counts (5)
  if (answers.preferred_roles.length > 0) score += 5

  // Tech stack depth (15 max)
  const techCount = answers.tech_stack.length
  if (techCount >= 10) score += 15
  else if (techCount >= 6) score += 10
  else if (techCount >= 3) score += 5

  // EE / Right to work (5)
  if (answers.ee_status) score += 5

  // Remote willingness (10)
  if (answers.remote_willing === 'yes') score += 10

  // Hybrid willingness (5)
  if (answers.hybrid_willing === 'yes') score += 5

  // Timezone overlap (20)
  if (answers.timezone_overlap === 'yes') score += 20

  // Contract terms (10)
  if (answers.contract_terms === 'yes') score += 10

  // Notice period (10)
  if (['1-2_weeks', '30_days'].includes(answers.notice_period)) score += 10
  else if (answers.notice_period === 'calendar_month') score += 8
  else if (answers.notice_period === '60_days') score += 5
  else if (answers.notice_period === '90_days') score += 2

  // CTC range (10)
  const ctc = answers.current_ctc || 0
  if (ctc >= 500000 && ctc <= 900000) score += 10
  else if (ctc > 900000 && ctc <= 1200000) score += 7
  else if (ctc > 1200000) score += 3

  let fitLevel: FitLevel
  if (score >= 75) {
    fitLevel = 'strong'
  } else if (score >= 50) {
    fitLevel = 'possible'
  } else {
    fitLevel = 'under_review'
  }

  return { score, fitLevel }
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

  // Validate CTC on step 8
  if (currentStep.value === 8) {
    const ctc = answers.current_ctc
    if (!ctc || ctc < 500000 || ctc > 1700000) {
      ctcError.value = 'Please enter an amount between R500,000 and R1,700,000'
      return
    }
    ctcError.value = ''

    const result = calculateScore()
    sessionStorage.setItem('screening_result', JSON.stringify({
      answers: { ...answers },
      score: result.score,
      fitLevel: result.fitLevel,
    }))
    localStorage.removeItem('truffle_portal_form_v2')
    router.push('/complete')
    return
  }

  transitionName.value = 'slide-left'
  currentStep.value++
}
</script>
