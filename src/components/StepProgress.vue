<template>
  <div class="w-full">
    <div class="flex items-center justify-between mb-2">
      <span class="text-sm text-lavender/70">Step {{ currentStep }} of {{ totalSteps }}</span>
      <span class="text-sm text-lavender/70">{{ Math.round((currentStep / totalSteps) * 100) }}%</span>
    </div>
    <div class="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
      <div
        class="h-full rounded-full bg-gradient-to-r from-cyclamen to-veronica transition-all duration-300 ease-out"
        :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentStep: number
  totalSteps: number
}>()
</script>
