<template>
  <div class="space-y-6">
    <h2 class="text-xl md:text-2xl font-semibold text-white leading-snug">
      Location and Work Arrangement
    </h2>

    <!-- Current Residence -->
    <div>
      <label class="block text-sm font-medium text-lavender/70 mb-1.5">Where do you currently reside?</label>
      <input
        :value="modelResidence"
        type="text"
        placeholder="e.g. Cape Town, Johannesburg, Durban"
        class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-lavender/30 focus:outline-none focus:border-cyclamen/60 focus:ring-2 focus:ring-cyclamen/20 transition-colors"
        @input="$emit('update:residence', ($event.target as HTMLInputElement).value)"
      />
    </div>

    <!-- Remote Willingness -->
    <div>
      <p class="text-sm font-medium text-lavender/70 mb-3">Are you willing to work remotely?</p>
      <div class="space-y-3">
        <button
          v-for="option in remoteOptions"
          :key="option.value"
          type="button"
          class="w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyclamen/50"
          :class="
            modelRemote === option.value
              ? 'border-cyclamen bg-cyclamen/10 text-white'
              : 'border-white/10 bg-white/5 text-lavender hover:border-white/30 hover:bg-white/8'
          "
          @click="$emit('update:remote', option.value)"
        >
          <span class="flex items-center gap-3">
            <span
              class="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors"
              :class="modelRemote === option.value ? 'border-cyclamen bg-cyclamen' : 'border-lavender/40'"
            >
              <span v-if="modelRemote === option.value" class="w-2 h-2 rounded-full bg-white" />
            </span>
            {{ option.label }}
          </span>
        </button>
      </div>
    </div>

    <!-- Hybrid Willingness -->
    <div>
      <p class="text-sm font-medium text-lavender/70 mb-3">
        Would you be open to a hybrid arrangement in the Cape Town Northern suburbs, should the client require it?
      </p>
      <div class="space-y-3">
        <button
          v-for="option in hybridOptions"
          :key="option.value"
          type="button"
          class="w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyclamen/50"
          :class="
            modelHybrid === option.value
              ? 'border-cyclamen bg-cyclamen/10 text-white'
              : 'border-white/10 bg-white/5 text-lavender hover:border-white/30 hover:bg-white/8'
          "
          @click="$emit('update:hybrid', option.value)"
        >
          <span class="flex items-center gap-3">
            <span
              class="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors"
              :class="modelHybrid === option.value ? 'border-cyclamen bg-cyclamen' : 'border-lavender/40'"
            >
              <span v-if="modelHybrid === option.value" class="w-2 h-2 rounded-full bg-white" />
            </span>
            {{ option.label }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const remoteOptions = [
  { label: 'Yes — fully remote is fine', value: 'yes' },
  { label: 'No — I prefer on-site or hybrid', value: 'no' },
]

const hybridOptions = [
  { label: 'Yes — I am open to hybrid in Cape Town Northern suburbs', value: 'yes' },
  { label: 'No — I would prefer to stay fully remote', value: 'no' },
]

defineProps<{
  modelResidence: string
  modelRemote: string
  modelHybrid: string
}>()

defineEmits<{
  'update:residence': [value: string]
  'update:remote': [value: string]
  'update:hybrid': [value: string]
}>()
</script>
