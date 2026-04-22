<template>
  <div class="w-full">
    <div class="flex items-center justify-between mb-2">
      <span class="text-sm text-lavender/70">Step {{ currentStep }} of {{ totalSteps }}</span>
      <span class="text-sm text-lavender/70">{{ Math.round((currentStep / totalSteps) * 100) }}%</span>
    </div>
    <div class="flex gap-1.5">
      <div
        v-for="i in totalSteps"
        :key="i"
        class="h-1.5 flex-1 rounded-full transition-all duration-300"
        :class="i <= currentStep ? 'bg-gradient-to-r from-cyclamen to-veronica' : 'bg-white/10'"
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
