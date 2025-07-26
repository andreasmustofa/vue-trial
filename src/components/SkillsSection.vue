<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  skills: {
    type: Array as PropType<Skill[]>,
    required: true,
  },
})

interface Skill {
  name: string
  icon?: any
  color?: string
}
</script>

<template>
  <section
    id="skills"
    class="py-16 sm:py-20 bg-gradient-to-br from-purple-50/60 via-blue-50/60 to-cyan-50/60 relative z-10"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <div class="text-center mb-12 sm:mb-16">
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-800 via-blue-700 to-cyan-800 bg-clip-text text-transparent"
        >
          🛠️ Skills & Technologies
        </h2>
        <div
          class="w-24 sm:w-32 h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 mx-auto rounded-full"
        ></div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
        <div
          v-for="(skill, index) in skills"
          :key="index"
          class="group transform hover:-translate-y-2 hover:rotate-1 transition-all duration-300"
        >
          <div
            class="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl px-4 sm:px-6 py-4 sm:py-6 shadow-lg border border-white/50 group-hover:shadow-xl group-hover:scale-105 transition-all duration-300"
          >
            <div class="text-center">
              <div class="text-2xl sm:text-3xl mb-2">{{ skill.icon }}</div>
              <span
                class="text-sm sm:text-base lg:text-lg font-bold bg-gradient-to-r bg-clip-text text-transparent"
                :class="skill.color"
              >
                {{ skill.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
