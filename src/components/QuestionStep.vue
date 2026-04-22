<template>
  <div class="space-y-4">
    <h2 class="text-xl md:text-2xl font-semibold text-white leading-snug">{{ question }}</h2>

    <!-- Radio options -->
    <div v-if="options && options.length" class="space-y-3 mt-6">
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        class="w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyclamen/50"
        :class="
          modelValue === option.value
            ? 'border-cyclamen bg-cyclamen/10 text-white'
            : 'border-white/10 bg-white/5 text-lavender hover:border-white/30 hover:bg-white/8'
        "
        @click="$emit('update:modelValue', option.value)"
      >
        <span class="flex items-center gap-3">
          <span
            class="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors"
            :class="modelValue === option.value ? 'border-cyclamen bg-cyclamen' : 'border-lavender/40'"
          >
            <span v-if="modelValue === option.value" class="w-2 h-2 rounded-full bg-white" />
          </span>
          {{ option.label }}
        </span>
      </button>
    </div>

    <!-- Numeric text input (for CTC) -->
    <div v-if="type === 'number'" class="mt-6">
      <div class="relative">
        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-lavender/60 font-medium">R</span>
        <input
          type="text"
          inputmode="numeric"
          :value="displayValue"
          placeholder="0"
          class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 pl-8 text-white text-lg focus:outline-none focus:border-cyclamen/60 focus:ring-2 focus:ring-cyclamen/20 transition-colors"
          :class="{ 'border-red-500/60': validationError }"
          @input="handleNumberInput"
          @focus="(e: FocusEvent) => (e.target as HTMLInputElement).select()"
        />
      </div>
      <p v-if="validationError" class="mt-2 text-red-400 text-sm">{{ validationError }}</p>
      <p v-else class="mt-2 text-lavender/50 text-sm">Enter your monthly CTC in ZAR (R1 – R500,000)</p>
    </div>

    <!-- Textarea (for availability note) -->
    <div v-if="showTextarea" class="mt-4">
      <textarea
        :value="textareaValue"
        placeholder="Please explain..."
        rows="4"
        class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white resize-none focus:outline-none focus:border-cyclamen/60 focus:ring-2 focus:ring-cyclamen/20 transition-colors"
        :class="{ 'border-red-500/60': textareaError }"
        @input="$emit('update:textareaValue', ($event.target as HTMLTextAreaElement).value)"
      />
      <p v-if="textareaError" class="mt-2 text-red-400 text-sm">{{ textareaError }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Option {
  label: string
  value: string
}

const props = defineProps<{
  question: string
  options?: Option[]
  modelValue?: string | null
  type?: 'radio' | 'number'
  numericValue?: number | null
  showTextarea?: boolean
  textareaValue?: string
  textareaError?: string
  validationError?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:numericValue': [value: number | null]
  'update:textareaValue': [value: string]
}>()

const displayValue = computed(() => {
  if (props.numericValue == null || props.numericValue === 0) return ''
  return props.numericValue.toLocaleString('en-ZA')
})

function handleNumberInput(e: Event) {
  const raw = (e.target as HTMLInputElement).value.replace(/\D/g, '')
  const num = raw ? parseInt(raw, 10) : null
  emit('update:numericValue', num)

  // Reformat display
  if (num != null) {
    ;(e.target as HTMLInputElement).value = num.toLocaleString('en-ZA')
  }
}
</script>
