<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  projects: {
    type: Array as PropType<Project[]>,
    required: true,
  },
})

interface Project {
  title: string
  description: string
  link: string
  gradient?: string
  icon?: string
  tech?: string[]
}
</script>

<template>
  <section
    id="projects"
    class="py-16 sm:py-20 bg-gradient-to-r from-white/60 via-cyan-50/60 to-blue-50/60 backdrop-blur-sm relative z-10"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <div class="text-center mb-12 sm:mb-16">
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-800 via-cyan-700 to-teal-800 bg-clip-text text-transparent"
        >
          🚀 Projects Terbaru
        </h2>
        <div
          class="w-24 sm:w-32 h-1 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 mx-auto rounded-full"
        ></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="group bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border border-white/50 transform hover:-translate-y-2 hover:rotate-1 transition-all duration-300"
        >
          <!-- Project Header -->
          <div class="h-2 sm:h-3 bg-gradient-to-r" :class="project.gradient"></div>

          <div class="p-4 sm:p-6">
            <!-- Project Icon -->
            <div class="text-3xl sm:text-4xl mb-3 sm:mb-4">{{ project.icon }}</div>

            <h3
              class="font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-gray-800 group-hover:text-purple-600 transition-colors duration-300"
            >
              {{ project.title }}
            </h3>
            <p class="text-gray-600 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
              {{ project.description }}
            </p>

            <!-- Tech Stack -->
            <div class="flex flex-wrap gap-2 mb-3 sm:mb-4">
              <span
                v-for="(tech, techIndex) in project.tech"
                :key="tech"
                class="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-white"
                :class="
                  techIndex === 0
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                    : techIndex === 1
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500'
                "
              >
                {{ tech }}
              </span>
            </div>

            <a
              :href="project.link"
              target="_blank"
              class="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold transition-all duration-300 group-hover:scale-105 transform text-sm sm:text-base"
            >
              🔗 Lihat Project
              <svg
                class="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
