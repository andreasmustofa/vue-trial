<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import NavBar from '@/components/NavBar.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import Footer from '@/components/Footer.vue'
import { ref } from 'vue'
import AnimatePanes from '@/components/AnimatePanes.vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const skillList = [
  { name: 'Vue.js', color: 'from-emerald-400 via-teal-500 to-cyan-600', icon: '⚡' },
  { name: 'Tailwind CSS', color: 'from-cyan-400 via-blue-500 to-indigo-600', icon: '🎨' },
  { name: 'JavaScript', color: 'from-yellow-400 via-orange-500 to-red-600', icon: '⚙️' },
  { name: 'HTML', color: 'from-orange-400 via-red-500 to-pink-600', icon: '📝' },
  { name: 'Git', color: 'from-purple-400 via-pink-500 to-rose-600', icon: '🔧' },
]

const projectList = [
  {
    title: 'Portfolio Website',
    description:
      'Portfolio pribadi untuk menunjukkan skill saya dengan desain modern dan responsif.',
    link: 'https://example.com',
    tech: ['Vue.js', 'Tailwind', 'TypeScript'],
    gradient: 'from-purple-500 via-indigo-500 to-blue-500',
    icon: '🌐',
  },
  {
    title: 'Aplikasi Catatan',
    description:
      'Aplikasi catatan dengan fitur dark mode, search, dan kategori yang mudah digunakan.',
    link: 'https://github.com/username/catatan',
    tech: ['JavaScript', 'CSS', 'LocalStorage'],
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    icon: '📱',
  },
  {
    title: 'Dashboard Analytics',
    description: 'Dashboard interaktif untuk visualisasi data dengan chart dan grafik real-time.',
    link: 'https://github.com/username/dashboard',
    tech: ['Vue.js', 'Chart.js', 'API'],
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
    icon: '📊',
  },
]

interface Project {
  title: string
  description: string
  link: string
  tech: string[]
  gradient: string
  icon: string
}
</script>

<template>
  <AnimatePanes>
    <!-- Navbar -->
    <NavBar :is-menu-open="isMenuOpen" @toggleMenu="toggleMenu" @closeMenu="closeMenu" />

    <!-- Hero Section -->
    <HeroSection />

    <!-- About Section -->
    <AboutSection />

    <!-- Skills Section -->
    <SkillsSection :skills="skillList" />

    <!-- Projects Section -->
    <ProjectsSection :projects="projectList" />

    <!-- Contact Section -->
    <ContactSection />

    <!-- Footer -->
    <Footer />
  </AnimatePanes>
</template>

<style scoped>
/* Optimized animations for better performance */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes float-delayed {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.4;
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
  animation-delay: 2s;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}

/* Reduce motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Mobile menu overlay fix */
@media (max-width: 768px) {
  .mobile-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 40;
  }
}
</style>
