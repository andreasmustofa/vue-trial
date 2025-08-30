<script setup lang="ts">
defineOptions({ name: 'HeroSection' })
</script>

<template>
  <section
    class="min-h-screen flex flex-col justify-center items-center text-center pt-20 px-4 relative z-10"
  >
    <!-- Content hero -->
    <div class="absolute inset-0 overflow-hidden -z-10">
      <!-- Blob 1 - Purple Blue -->
      <div
        class="absolute top-20 right-10 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-r from-blue-300 via-cyan-300 to-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-slow"
      ></div>

      <!-- Blob 2 - Yellow Orange -->
      <div
        class="absolute bottom-20 left-10 w-40 h-40 sm:w-60 sm:h-60 bg-gradient-to-r from-orange-300 via-yellow-400 to-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-slow"
      ></div>

      <!-- Blob 3 - Blue Cyan (Center) -->
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 sm:w-80 sm:h-80 bg-gradient-to-r from-teal-300 via-blue-300 to-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse-slow"
      ></div>
    </div>

    <!-- Profile picture ---------->
    <div class="relative z-10 max-width-4xl mx-auto">
      <div class="relative group mb-6 sm:mb-8">
        <!-- Outer glow ring -->
        <div
          class="absolute -inset-4 sm:-inset-6 bg-gradient-to-r from-blue-600 via-red-600 via-teal-600 to-cyan-600 rounded-full blur opacity-30 group-hover:opacity-40 transition duration-500"
        ></div>

        <!-- Main profile circle -->
        <div
          class="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full p-1 transform group-hover:scale-105 transition-all duration-300"
        >
          <!-- Inner white circle -->
          <div
            class="w-full h-full bg-white rounded-full flex items-center justify-center shadow-xl"
          >
            <!-- Avatar container -->
            <div
              class="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full flex items-center justify-center"
            >
              <span class="text-2xl sm:text-3xl lg:text-4xl">👨‍💻</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h1
        class="text-3xl sm:text-4xl lg:text-6xl decoration-dashed font-bold mb-4 bg-gradient-to-r from-gray-600 via-red-600 via-purple-300 to-rose-600 bg-clip-text text-transparent"
      >
        Salam Kenal, Saya
        <a href="https://github.com/andreasmustofa">
          <span class="text-yellow-900 underline">Andreas</span>
        </a>
      </h1>
      <p class="text-green-800 underline italic">sang Frontend Developer</p>
      <p
        class="font-semibold text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4"
      >
        Frontend Developer yang passionate dalam menciptakan UI yang
        <span class="text-rose-600 font-semibold">bersih</span>,
        <span class="text-red-600 font-semibold">rapi</span>, dan
        <span class="text-orange-600 font-semibold">modern</span>
      </p>
    </div>

    <div class="flex flex-col sm:flex-row gap-4 justify-center mt-6 sm:mt-8 px-4">
      <!-- Primary CTA -->
      <a
        href="#projects"
        class="group bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-6 sm:px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
      >
        <span>🚀 Lihat Projects</span>
      </a>

      <!-- Secondary CTA -->
      <a
        href="#contact"
        class="group bg-white text-gray-700 px-6 sm:px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 border-2 border-purple-200"
      >
        <span>📄 Download CV</span>
      </a>
    </div>
  </section>
</template>

<style scoped></style>
