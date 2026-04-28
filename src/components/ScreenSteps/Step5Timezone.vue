<template>
  <div class="space-y-6">
    <h2 class="text-xl md:text-2xl font-semibold text-white leading-snug">
      Are you available for a 4pm to 9pm SAST window?*
    </h2>
    <p class="text-lavender/50 text-sm -mt-4">
      This provides up to 5 hours overlap with our US Arizona team (UTC-7).
    </p>

    <div class="space-y-3 mt-4">
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

    <div class="mt-4 px-4 py-3 rounded-lg bg-white/5 border border-white/10">
      <p class="text-lavender/60 text-xs leading-relaxed">
        * A normal work week is 40 hours. Overlap hours are about scheduling, not overtime. There is no requirement for a roster or uptime monitoring.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const options = [
  { label: 'Yes — I can work 4pm to 9pm SAST', value: 'yes' },
  { label: 'No — I cannot accommodate this', value: 'no' },
]

defineProps<{
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
