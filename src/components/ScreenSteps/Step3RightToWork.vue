<template>
  <div class="space-y-6">
    <h2 class="text-xl md:text-2xl font-semibold text-white leading-snug">
      Right to Work in South Africa and Employment Equity Status
    </h2>

    <!-- EE / Non-EE Segmented Control -->
    <div class="relative flex rounded-full bg-white/5 p-1 border border-white/10">
      <div
        class="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-cyclamen to-veronica transition-all duration-200 ease-in-out"
        :style="{ left: activeTab === 'ee' ? '4px' : '50%', width: 'calc(50% - 4px)' }"
      />
      <button
        type="button"
        class="relative z-10 flex-1 px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200"
        :class="activeTab === 'ee' ? 'text-white' : 'text-lavender/60'"
        @click="activeTab = 'ee'"
      >
        EE
      </button>
      <button
        type="button"
        class="relative z-10 flex-1 px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200"
        :class="activeTab === 'non-ee' ? 'text-white' : 'text-lavender/60'"
        @click="activeTab = 'non-ee'"
      >
        Non-EE
      </button>
    </div>

    <!-- EE Options -->
    <div v-if="activeTab === 'ee'" class="space-y-3">
      <button
        v-for="option in eeOptions"
        :key="option.value"
        type="button"
        class="option-card"
        :class="{ selected: modelStatus === option.value }"
        @click="$emit('update:status', option.value)"
      >
        <span class="flex items-center gap-3">
          <span
            class="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors"
            :class="modelStatus === option.value ? 'border-white bg-white' : 'border-lavender/40'"
          >
          </span>
          {{ option.label }}
        </span>
      </button>
    </div>

    <!-- Non-EE Options -->
    <div v-if="activeTab === 'non-ee'" class="space-y-3">
      <button
        v-for="option in nonEeOptions"
        :key="option.value"
        type="button"
        class="option-card"
        :class="{ selected: modelStatus === option.value }"
        @click="$emit('update:status', option.value)"
      >
        <span class="flex items-center gap-3">
          <span
            class="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors"
            :class="modelStatus === option.value ? 'border-white bg-white' : 'border-lavender/40'"
          >
          </span>
          {{ option.label }}
        </span>
      </button>
    </div>

    <!-- ID Number (dynamic) -->
    <div v-if="showIdField" class="mt-4">
      <label class="block text-sm font-medium text-lavender/70 mb-1.5">South African ID Number</label>
      <input
        :value="modelIdNumber"
        type="text"
        placeholder="e.g. 9001015800089"
        maxlength="13"
        class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-lavender/30 focus:outline-none focus:border-cyclamen/60 focus:ring-2 focus:ring-cyclamen/20 transition-colors"
        @input="$emit('update:idNumber', ($event.target as HTMLInputElement).value)"
      />
    </div>

    <!-- Disabled Toggle -->
    <div class="mt-6 flex items-center justify-between px-5 py-4 rounded-xl border border-white/10 bg-white/5">
      <span class="text-lavender">Do you have a disability?</span>
      <button
        type="button"
        class="relative w-12 h-7 rounded-full transition-colors duration-200"
        :class="modelDisabled ? 'bg-gradient-to-r from-cyclamen to-veronica' : 'bg-white/20'"
        @click="$emit('update:disabled', !modelDisabled)"
      >
        <span
          class="absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white transition-transform duration-200"
          :class="modelDisabled ? 'translate-x-5' : 'translate-x-0'"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const eeOptions = [
  { label: 'African Black', value: 'african_black' },
  { label: 'Coloured', value: 'coloured' },
  { label: 'Indian', value: 'indian' },
  { label: 'Asian', value: 'asian' },
]

const nonEeOptions = [
  { label: 'White South African', value: 'white_sa' },
  { label: 'Foreign with citizenship after 1994', value: 'foreign_citizen_post1994' },
  { label: 'Foreign with permanent residency', value: 'foreign_permanent_residency' },
  { label: 'Foreign with work permit', value: 'foreign_work_permit' },
  { label: 'Foreign with no right to work', value: 'foreign_no_right' },
]

const idRequiredValues = new Set([
  'african_black', 'coloured', 'indian', 'asian',
  'white_sa', 'foreign_citizen_post1994', 'foreign_permanent_residency',
])

const props = defineProps<{
  modelStatus: string
  modelIdNumber: string
  modelDisabled: boolean
}>()

defineEmits<{
  'update:status': [value: string]
  'update:idNumber': [value: string]
  'update:disabled': [value: boolean]
}>()

const activeTab = ref<'ee' | 'non-ee'>('ee')

const showIdField = computed(() => idRequiredValues.has(props.modelStatus))
</script>
