<template>
  <div class="space-y-8">
    <!-- Role Selection -->
    <div>
      <h2 class="text-xl md:text-2xl font-semibold text-white leading-snug">
        Which opportunities are you interested in?
      </h2>
      <p class="text-lavender/50 text-sm mt-1">Select all that apply</p>

      <div class="space-y-3 mt-4">
        <button
          v-for="role in roles"
          :key="role.value"
          type="button"
          class="option-card"
          :class="{ selected: modelRoles.includes(role.value) }"
          @click="toggleRole(role.value)"
        >
          <span class="flex items-center gap-3">
            <span
              class="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors"
              :class="modelRoles.includes(role.value) ? 'border-cyclamen bg-cyclamen' : 'border-white/20'"
            >
            </span>
            {{ role.label }}
          </span>
        </button>
      </div>
    </div>

    <!-- Tech Stack + Skills -->
    <div>
      <h2 class="text-xl md:text-2xl font-semibold text-white leading-snug">
        Which of these technologies and skills do you have experience with?
      </h2>
      <p class="text-lavender/50 text-sm mt-1">Select all that apply</p>

      <div class="flex flex-wrap gap-2.5 mt-4">
        <button
          v-for="tech in techStack"
          :key="tech"
          type="button"
          class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border border-white/20"
          :class="
            modelTech.includes(tech)
              ? 'bg-gradient-to-r from-cyclamen to-veronica text-white'
              : 'text-lavender'
          "
          @click="toggleTech(tech)"
        >
          {{ tech }}
        </button>
      </div>
    </div>

    <!-- Proficiency Rating Grid — only selected items -->
    <div v-if="modelTech.length > 0">
      <h2 class="text-xl md:text-2xl font-semibold text-white leading-snug">
        Rate your proficiency
      </h2>
      <p class="text-lavender/50 text-sm mt-1">For each technology or skill you selected above</p>

      <div class="mt-4 space-y-3">
        <div
          v-for="tech in modelTech"
          :key="tech"
          class="bg-white/5 border border-white/10 rounded-xl px-4 py-3"
        >
          <p class="text-white text-sm font-medium mb-2.5">{{ tech }}</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="rating in ratingOptions"
              :key="rating.value"
              type="button"
              class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border"
              :class="
                (modelRatings[tech] ?? 0) === rating.value
                  ? 'bg-gradient-to-r from-cyclamen to-veronica text-white border-transparent'
                  : 'border-white/20 text-lavender/70 hover:border-white/40 hover:text-lavender'
              "
              @click="setRating(tech, rating.value)"
            >
              {{ rating.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const roles = [
  { label: 'Intermediate Data Engineer', value: 'intermediate_data_engineer' },
  { label: 'Senior Data Engineer', value: 'senior_data_engineer' },
  { label: 'Senior SQL Developer', value: 'senior_sql_developer' },
  { label: 'Senior BI Developer', value: 'senior_bi_developer' },
]

const techStack = [
  'APIs', 'Azure Data Factory', 'Azure Data Lake', 'Azure SQL',
  'Databricks', 'Data Modelling', 'DAX', 'DTS',
  'ETL / ELT', 'Excel', 'Git / GitHub', 'Microsoft Fabric',
  'Power BI', 'Power Query', 'Production Monitoring & Debugging', 'Python',
  'Query Tuning / Indexing', 'Reverse Engineering / Legacy Refactoring',
  'SAP HANA', 'Snowflake', 'SSAS', 'SSAS Tabular',
  'SSIS', 'SSRS', 'Stored Procedures', 'Teradata',
  'PBIRS', 'SQL Server / T-SQL',
]

const ratingOptions = [
  { label: 'None', value: 0 },
  { label: 'Beginner', value: 1 },
  { label: 'Intermediate', value: 2 },
  { label: 'Advanced', value: 3 },
  { label: 'Expert', value: 4 },
]

const props = defineProps<{
  modelRoles: string[]
  modelTech: string[]
  modelRatings: Record<string, number>
}>()

const emit = defineEmits<{
  'update:roles': [value: string[]]
  'update:tech': [value: string[]]
  'update:ratings': [value: Record<string, number>]
}>()

function toggleRole(value: string) {
  const updated = props.modelRoles.includes(value)
    ? props.modelRoles.filter((r) => r !== value)
    : [...props.modelRoles, value]
  emit('update:roles', updated)
}

function toggleTech(value: string) {
  const updated = props.modelTech.includes(value)
    ? props.modelTech.filter((t) => t !== value)
    : [...props.modelTech, value]

  // Clean up rating when tech is deselected
  if (props.modelTech.includes(value)) {
    const { [value]: _removed, ...rest } = props.modelRatings
    emit('update:ratings', rest)
  }

  emit('update:tech', updated)
}

function setRating(tech: string, value: number) {
  emit('update:ratings', { ...props.modelRatings, [tech]: value })
}
</script>
