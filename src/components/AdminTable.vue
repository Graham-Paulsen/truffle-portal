<template>
  <div class="overflow-x-auto">
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-white/10 text-lavender/60 text-left">
          <th class="pb-3 pr-4 font-medium">Name</th>
          <th class="pb-3 pr-4 font-medium">Email</th>
          <th class="pb-3 pr-4 font-medium text-center">Score</th>
          <th class="pb-3 pr-4 font-medium">Fit Level</th>
          <th class="pb-3 pr-4 font-medium">Date</th>
          <th class="pb-3 font-medium">Loxo ID</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in submissions"
          :key="row.id"
          class="border-b border-white/5 hover:bg-white/3 transition-colors"
        >
          <td class="py-3 pr-4 text-white font-medium">{{ row.name || '—' }}</td>
          <td class="py-3 pr-4 text-lavender">{{ row.email }}</td>
          <td class="py-3 pr-4 text-center">
            <span
              class="inline-block w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
              :class="scoreClass(row.score)"
            >
              {{ row.score }}
            </span>
          </td>
          <td class="py-3 pr-4">
            <span
              class="px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide"
              :class="fitClass(row.fit_level)"
            >
              {{ fitLabel(row.fit_level) }}
            </span>
          </td>
          <td class="py-3 pr-4 text-lavender/60 whitespace-nowrap">{{ formatDate(row.created_at) }}</td>
          <td class="py-3 text-lavender/40 font-mono text-xs">{{ row.loxoid || '—' }}</td>
        </tr>
        <tr v-if="!submissions.length">
          <td colspan="6" class="py-8 text-center text-lavender/40">No submissions yet.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
interface Submission {
  id: number
  name: string | null
  email: string
  score: number
  fit_level: string
  created_at: string
  loxoid: string | null
}

defineProps<{
  submissions: Submission[]
}>()

function scoreClass(score: number) {
  if (score >= 70) return 'bg-emerald-500/20 text-emerald-300'
  if (score >= 50) return 'bg-amber-500/20 text-amber-300'
  return 'bg-lavender/10 text-lavender/60'
}

function fitClass(level: string) {
  if (level === 'strong') return 'bg-emerald-500/20 text-emerald-300'
  if (level === 'possible') return 'bg-amber-500/20 text-amber-300'
  return 'bg-lavender/10 text-lavender/60'
}

function fitLabel(level: string) {
  if (level === 'strong') return 'Strong'
  if (level === 'possible') return 'Possible'
  return 'Under Review'
}

function formatDate(ts: string) {
  return new Date(ts).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>
