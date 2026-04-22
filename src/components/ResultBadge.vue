<template>
  <div class="text-center space-y-4">
    <div
      class="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-widest"
      :class="badgeClass"
    >
      <span class="w-2 h-2 rounded-full" :class="dotClass" />
      {{ badgeLabel }}
    </div>
    <p class="text-lavender text-lg leading-relaxed max-w-md mx-auto">{{ message }}</p>
    <p class="text-lavender/60 text-sm">{{ subMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  fitLevel: 'strong' | 'possible' | 'under_review'
}>()

const badgeClass = computed(() => ({
  'strong': 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  'possible': 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
  'under_review': 'bg-lavender/10 text-lavender border border-lavender/20',
}[props.fitLevel]))

const dotClass = computed(() => ({
  'strong': 'bg-emerald-400',
  'possible': 'bg-amber-400',
  'under_review': 'bg-lavender/60',
}[props.fitLevel]))

const badgeLabel = computed(() => ({
  'strong': 'Strong Match',
  'possible': 'Possible Match',
  'under_review': 'Under Review',
}[props.fitLevel]))

const message = computed(() => ({
  'strong': 'Your profile is a strong fit for this role. Our recruitment team will be in touch shortly to discuss next steps.',
  'possible': 'Your profile shows potential for this role. Our team will review your details and reach out if there\'s a good fit.',
  'under_review': 'Thank you for completing the screening. A member of our team will review your profile carefully before making contact.',
}[props.fitLevel]))

const subMessage = computed(() => ({
  'strong': 'Our team will be in touch shortly.',
  'possible': 'We\'ll be in touch within 3–5 business days.',
  'under_review': 'A member of our team will review your profile.',
}[props.fitLevel]))
</script>
