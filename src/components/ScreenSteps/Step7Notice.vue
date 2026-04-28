<template>
  <div class="space-y-6">
    <h2 class="text-xl md:text-2xl font-semibold text-white leading-snug">
      How soon are you available to start on project?
    </h2>

    <div class="space-y-3 mt-4">
      <button
        v-for="option in noticeOptions"
        :key="option.value"
        type="button"
        class="w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyclamen/50"
        :class="
          modelNotice === option.value
            ? 'border-cyclamen bg-cyclamen/10 text-white'
            : 'border-white/10 bg-white/5 text-lavender hover:border-white/30 hover:bg-white/8'
        "
        @click="$emit('update:notice', option.value)"
      >
        <span class="flex items-center gap-3">
          <span
            class="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors"
            :class="modelNotice === option.value ? 'border-cyclamen bg-cyclamen' : 'border-lavender/40'"
          >
            <span v-if="modelNotice === option.value" class="w-2 h-2 rounded-full bg-white" />
          </span>
          {{ option.label }}
          <span v-if="option.value === '1-2_weeks'" class="ml-auto text-xs text-cyclamen/70 bg-cyclamen/10 px-2 py-0.5 rounded-full">Default</span>
        </span>
      </button>
    </div>

    <div class="mt-6">
      <label class="block text-sm font-medium text-lavender/70 mb-1.5">
        Are there any additional considerations we should be aware of?
      </label>
      <textarea
        :value="modelConsiderations"
        placeholder="e.g. study commitments, planned leave, visa processing..."
        rows="3"
        class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white resize-none focus:outline-none focus:border-cyclamen/60 focus:ring-2 focus:ring-cyclamen/20 transition-colors"
        @input="$emit('update:considerations', ($event.target as HTMLTextAreaElement).value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const noticeOptions = [
  { label: '1–2 Weeks', value: '1-2_weeks' },
  { label: '30 Days', value: '30_days' },
  { label: '60 Days', value: '60_days' },
  { label: '90 Days', value: '90_days' },
  { label: 'Calendar Month', value: 'calendar_month' },
]

defineProps<{
  modelNotice: string
  modelConsiderations: string
}>()

defineEmits<{
  'update:notice': [value: string]
  'update:considerations': [value: string]
}>()
</script>
