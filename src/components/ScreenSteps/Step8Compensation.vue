<template>
  <div class="space-y-6">
    <h2 class="text-xl md:text-2xl font-semibold text-white leading-snug">
      Compensation & Benefits
    </h2>
    <p class="text-lavender/50 text-sm -mt-4">All figures in ZAR per annum</p>

    <!-- Current CTC -->
    <div>
      <label class="block text-sm font-medium text-lavender/70 mb-1.5">
        Current CTC per annum <span class="text-cyclamen">*</span>
      </label>
      <div class="relative">
        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-lavender/60 font-medium">R</span>
        <input
          type="text"
          inputmode="numeric"
          :value="formatNumber(modelCurrentCtc)"
          placeholder="e.g. 850,000"
          class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-8 text-white placeholder-lavender/30 focus:outline-none focus:border-cyclamen/60 focus:ring-2 focus:ring-cyclamen/20 transition-colors"
          :class="{ 'border-red-500/60': ctcError }"
          @input="handleNumberInput($event, 'update:currentCtc')"
          @focus="($event.target as HTMLInputElement).select()"
        />
      </div>
      <p v-if="ctcError" class="mt-1 text-red-400 text-sm">{{ ctcError }}</p>
      <p v-else class="mt-1 text-lavender/40 text-xs">R500,000 – R1,700,000</p>
    </div>

    <!-- Previous Bonus -->
    <div>
      <label class="block text-sm font-medium text-lavender/70 mb-1.5">Previous annual bonus</label>
      <div class="relative">
        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-lavender/60 font-medium">R</span>
        <input
          type="text"
          inputmode="numeric"
          :value="formatNumber(modelBonus)"
          placeholder="e.g. 120,000"
          class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-8 text-white placeholder-lavender/30 focus:outline-none focus:border-cyclamen/60 focus:ring-2 focus:ring-cyclamen/20 transition-colors"
          @input="handleNumberInput($event, 'update:bonus')"
          @focus="($event.target as HTMLInputElement).select()"
        />
      </div>
    </div>

    <!-- Repayable on Leaving -->
    <div>
      <label class="block text-sm font-medium text-lavender/70 mb-1.5">
        Is there anything repayable on leaving your current employer?
      </label>
      <textarea
        :value="modelRepayable"
        placeholder="e.g. study loan, relocation costs..."
        rows="2"
        class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white resize-none focus:outline-none focus:border-cyclamen/60 focus:ring-2 focus:ring-cyclamen/20 transition-colors"
        @input="$emit('update:repayable', ($event.target as HTMLTextAreaElement).value)"
      />
    </div>

    <!-- Annual Leave Days -->
    <div>
      <label class="block text-sm font-medium text-lavender/70 mb-1.5">Annual leave days (current entitlement)</label>
      <input
        :value="modelLeaveDays"
        type="number"
        min="0"
        max="40"
        placeholder="e.g. 20"
        class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-lavender/30 focus:outline-none focus:border-cyclamen/60 focus:ring-2 focus:ring-cyclamen/20 transition-colors"
        @input="$emit('update:leaveDays', Number(($event.target as HTMLInputElement).value) || 0)"
      />
    </div>

    <!-- Expected CTC -->
    <div>
      <label class="block text-sm font-medium text-lavender/70 mb-1.5">Expected CTC per annum</label>
      <div class="relative">
        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-lavender/60 font-medium">R</span>
        <input
          type="text"
          inputmode="numeric"
          :value="formatNumber(modelExpectedCtc)"
          placeholder="e.g. 1,000,000"
          class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-8 text-white placeholder-lavender/30 focus:outline-none focus:border-cyclamen/60 focus:ring-2 focus:ring-cyclamen/20 transition-colors"
          @input="handleNumberInput($event, 'update:expectedCtc')"
          @focus="($event.target as HTMLInputElement).select()"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelCurrentCtc: number | null
  modelBonus: number | null
  modelRepayable: string
  modelLeaveDays: number
  modelExpectedCtc: number | null
  ctcError?: string
}>()

const emit = defineEmits<{
  'update:currentCtc': [value: number | null]
  'update:bonus': [value: number | null]
  'update:repayable': [value: string]
  'update:leaveDays': [value: number]
  'update:expectedCtc': [value: number | null]
}>()

function formatNumber(val: number | null): string {
  if (val == null || val === 0) return ''
  return val.toLocaleString('en-ZA')
}

function handleNumberInput(e: Event, eventName: string) {
  const raw = (e.target as HTMLInputElement).value.replace(/\D/g, '')
  const num = raw ? parseInt(raw, 10) : null
  ;(emit as any)(eventName, num)
  if (num != null) {
    ;(e.target as HTMLInputElement).value = num.toLocaleString('en-ZA')
  }
}
</script>
