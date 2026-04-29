<template>
  <div class="space-y-6">
    <h2 class="text-xl md:text-2xl font-semibold text-white leading-snug">
      What would best describe your current recruitment preference?
    </h2>

    <div class="space-y-3 mt-4">
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        class="option-card"
        :class="{ selected: modelPreference === option.value }"
        @click="$emit('update:preference', option.value)"
      >
        <span class="flex items-center gap-3">
          <span
            class="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors"
            :class="modelPreference === option.value ? 'border-cyclamen bg-cyclamen' : 'border-white/20'"
          >
          </span>
          {{ option.label }}
        </span>
      </button>
    </div>

    <div v-if="modelPreference && modelPreference !== 'not_looking'" class="mt-6">
      <label class="block text-sm font-medium text-lavender/70 mb-1.5">
        Please explain the reason for wanting to leave your current employer in a few words
      </label>
      <textarea
        :value="modelReason"
        placeholder="Brief reason..."
        rows="3"
        class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white resize-none focus:outline-none focus:border-cyclamen/60 focus:ring-2 focus:ring-cyclamen/20 transition-colors"
        :class="{ 'border-red-500/60': reasonError }"
        @input="$emit('update:reason', ($event.target as HTMLTextAreaElement).value)"
      />
      <p v-if="reasonError" class="mt-1 text-red-400 text-sm">{{ reasonError }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const options = [
  { label: 'Actively pursuing opportunities', value: 'actively_pursuing' },
  { label: 'Happy where I am, but open to exceptional opportunities', value: 'open_to_exceptional' },
  { label: 'Not looking to make a move right now', value: 'not_looking' },
]

defineProps<{
  modelPreference: string
  modelReason: string
  reasonError?: string
}>()

defineEmits<{
  'update:preference': [value: string]
  'update:reason': [value: string]
}>()
</script>
