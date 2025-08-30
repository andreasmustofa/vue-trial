<script setup lang="ts">
import { ref } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import NavBar from '@/components/NavBar.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import Footer from '@/components/Footer.vue'
import AnimatePanes from '@/components/AnimatePanes.vue'
import PetView from './PetView.vue'

const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

const skills = [
  { name: 'Vue.js', color: 'from-emerald-400 via-teal-500 to-cyan-600', icon: '⚡' },
  { name: 'Tailwind CSS', color: 'from-cyan-400 via-blue-500 to-indigo-600', icon: '🎨' },
  { name: 'JavaScript', color: 'from-yellow-400 via-orange-500 to-red-600', icon: '⚙️' },
  { name: 'HTML', color: 'from-orange-400 via-red-500 to-pink-600', icon: '📝' },
  { name: 'Git', color: 'from-purple-400 via-pink-500 to-rose-600', icon: '🔧' },
]

const projects = [
  {
    title: 'Rumah Sakit',
    description: 'Description of Project 1',
    link: 'https://github.com/yourusername/project1',
    gradient: 'from-blue-400 via-red-500 to-teal-600',
    icon: '',
    tech: ['Vue.js', 'Tailwind CSS', 'JavaScript'],
  },
  {
    title: 'Project 2',
    description: 'Description of Project 1',
    link: 'https://github.com/yourusername/project1',
    gradient: 'from-blue-400 via-cyan-500 to-teal-600',
    icon: '🎨',
    tech: ['Golang', 'Bootstrap', 'MySQL'],
  },
]
</script>

<template>
  <AnimatePanes>
    <NavBar :is-menu-open="isMenuOpen" @toggleMenu="toggleMenu" @closeMenu="closeMenu" @play="$router.push('/tetris')" />
    <HeroSection />
    <SkillsSection :skills="skills" />
    <ProjectsSection :projects="projects" />
    <ContactSection />
    <Footer />
    <PetView />
  </AnimatePanes>
</template>

<style scoped>
@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.4;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}
</style>
