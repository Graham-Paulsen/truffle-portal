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
          class="w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyclamen/50"
          :class="
            modelRoles.includes(role.value)
              ? 'border-cyclamen bg-cyclamen/10 text-white'
              : 'border-white/10 bg-white/5 text-lavender hover:border-white/30 hover:bg-white/8'
          "
          @click="toggleRole(role.value)"
        >
          <span class="flex items-center gap-3">
            <span
              class="w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors"
              :class="modelRoles.includes(role.value) ? 'border-cyclamen bg-cyclamen' : 'border-lavender/40'"
            >
              <svg v-if="modelRoles.includes(role.value)" class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            {{ role.label }}
          </span>
        </button>
      </div>
    </div>

    <!-- Tech Stack -->
    <div>
      <h2 class="text-xl md:text-2xl font-semibold text-white leading-snug">
        Which technologies are you proficient with?
      </h2>
      <p class="text-lavender/50 text-sm mt-1">Select all that apply</p>

      <div class="flex flex-wrap gap-2.5 mt-4">
        <button
          v-for="tech in techStack"
          :key="tech"
          type="button"
          class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border"
          :class="
            modelTech.includes(tech)
              ? 'bg-gradient-to-r from-cyclamen to-veronica text-white border-transparent'
              : 'bg-oxford-blue text-transparent bg-clip-text gradient-text border-transparent'
          "
          :style="!modelTech.includes(tech) ? { borderImage: 'linear-gradient(135deg, #FF6AA1, #A123E7) 1', color: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text', background: 'linear-gradient(135deg, #FF6AA1, #A123E7)', WebkitTextFillColor: 'transparent', borderWidth: '1px', borderStyle: 'solid', borderColor: '' } : {}"
          @click="toggleTech(tech)"
        >
          <span :class="modelTech.includes(tech) ? 'text-white' : ''" :style="!modelTech.includes(tech) ? {} : {}">{{ tech }}</span>
        </button>
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
  // Data & Databases
  'SQL Server / T-SQL', 'Stored Procedures', 'SSIS', 'SSRS', 'SSAS', 'SSAS Tabular',
  'Azure SQL', 'Snowflake', 'SAP HANA', 'Data Modelling', 'Query Tuning / Indexing',
  // Cloud & Modern
  'Azure Data Factory', 'Microsoft Fabric', 'Azure Data Lake', 'Databricks',
  'Power BI', 'DAX', 'Power Query', 'APIs',
  // General
  'Python', 'Git / GitHub', 'Excel', 'ETL / ELT',
  // Legacy
  'Teradata', 'DTS', 'PBIRS',
]

const props = defineProps<{
  modelRoles: string[]
  modelTech: string[]
}>()

const emit = defineEmits<{
  'update:roles': [value: string[]]
  'update:tech': [value: string[]]
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
  emit('update:tech', updated)
}
</script>
