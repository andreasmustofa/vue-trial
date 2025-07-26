<script setup lang="ts">
defineProps({
  isMenuOpen: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggleMenu', 'closeMenu'])
</script>

<template>
  <nav class="bg-white/80 backdrop-blur-xl shadow-lg fixed w-full z-50 border-b border-purple-100">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="flex justify-between items-center py-4">
        <!-- Logo -->
        <div class="flex items-center gap-2 sm:gap-3 group cursor-pointer">
          <div class="relative">
            <div
              class="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-300"
            ></div>
            <div
              class="relative w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-all duration-300"
            >
              <span class="text-white font-bold text-sm sm:text-lg">A</span>
            </div>
          </div>
          <h1
            class="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
          >
            Portfolio
          </h1>
        </div>

        <!-- Desktop Menu -->
        <ul class="hidden md:flex gap-6 lg:gap-8">
          <li>
            <a
              href="#about"
              class="text-gray-700 hover:text-purple-600 transition-colors duration-300 font-medium"
              >About</a
            >
          </li>
          <li>
            <a
              href="#skills"
              class="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
              >Skills</a
            >
          </li>
          <li>
            <a
              href="#projects"
              class="text-gray-700 hover:text-pink-600 transition-colors duration-300 font-medium"
              >Projects</a
            >
          </li>
          <li>
            <a
              href="#contact"
              class="text-gray-700 hover:text-cyan-600 transition-colors duration-300 font-medium"
              >Contact</a
            >
          </li>
        </ul>

        <!-- Mobile Menu Button -->
        <button
          @click="emit('toggleMenu')"
          class="md:hidden relative w-8 h-8 flex flex-col justify-center items-center space-y-1 z-50"
        >
          <span
            class="w-6 h-0.5 bg-gray-700 transition-all duration-300 transform"
            :class="isMenuOpen ? 'rotate-45 translate-y-1.5' : ''"
          ></span>
          <span
            class="w-6 h-0.5 bg-gray-700 transition-all duration-300"
            :class="isMenuOpen ? 'opacity-0' : ''"
          ></span>
          <span
            class="w-6 h-0.5 bg-gray-700 transition-all duration-300 transform"
            :class="isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''"
          ></span>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div
        class="md:hidden transition-all duration-300 ease-in-out overflow-hidden"
        :class="isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'"
      >
        <ul class="pb-4 space-y-2">
          <li>
            <a
              href="#about"
              @click="emit('closeMenu')"
              class="block py-2 px-4 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-300 font-medium"
              >About</a
            >
          </li>
          <li>
            <a
              href="#skills"
              @click="emit('closeMenu')"
              class="block py-2 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium"
              >Skills</a
            >
          </li>
          <li>
            <a
              href="#projects"
              @click="emit('closeMenu')"
              class="block py-2 px-4 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-300 font-medium"
              >Projects</a
            >
          </li>
          <li>
            <a
              href="#contact"
              @click="emit('closeMenu')"
              class="block py-2 px-4 text-gray-700 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-all duration-300 font-medium"
              >Contact</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
