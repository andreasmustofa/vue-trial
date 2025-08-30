<script setup lang="ts">
import { ref } from 'vue'
import Pet from '../components/Pet.vue'

const showPetWidget = ref(false)
const isMinimized = ref(false)

const togglePetWidget = () => {
  showPetWidget.value = !showPetWidget.value
  if (showPetWidget.value) {
    isMinimized.value = false
  }
}

const toggleMinimize = () => {
  isMinimized.value = !isMinimized.value
}
</script>

<template>
  <button
    @click="togglePetWidget"
    class="pet-toggle-btn"
    :class="{ active: showPetWidget }"
    :title="showPetWidget ? 'Close Pet Widget' : 'Open Pet Widget'"
  >
    🐾
  </button>

  <!-- Floating Pet Widget -->
  <Transition name="pet-widget">
    <div v-if="showPetWidget" class="floating-pet-widget" :class="{ minimized: isMinimized }">
      <!-- Widget Header -->
      <div class="widget-header">
        <div class="widget-title">
          <span class="pet-icon">🐾</span>
          <span>Virtual Pet</span>
        </div>
        <div class="widget-controls">
          <button
            @click="toggleMinimize"
            class="control-btn"
            :title="isMinimized ? 'Maximize' : 'Minimize'"
          >
            {{ isMinimized ? '📖' : '📕' }}
          </button>
          <button @click="togglePetWidget" class="control-btn close" title="Close Widget">
            ✖️
          </button>
        </div>
      </div>

      <!-- Widget Content -->
      <Transition name="minimize">
        <div v-if="!isMinimized" class="widget-content">
          <!-- Virtual Pet Game Component -->
          <Pet />
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }
}

.about {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 20px;
}

/* Transition Animations */
.pet-widget-enter-active,
.pet-widget-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.pet-widget-enter-from {
  transform: translateY(100%) scale(0.8);
  opacity: 0;
}

.pet-widget-leave-to {
  transform: translateY(100%) scale(0.8);
  opacity: 0;
}

.minimize-enter-active,
.minimize-leave-active {
  transition: all 0.3s ease;
}

.minimize-enter-from,
.minimize-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: top;
}

/* Floating Pet Toggle Button */
.pet-toggle-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(45deg, #ff6b9d, #ffa8c8);
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(255, 107, 157, 0.4);
  transition: all 0.3s ease;
  z-index: 1000;
  animation: petPulse 2s ease-in-out infinite;
  user-select: none;
}

@keyframes petPulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.pet-toggle-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 12px 30px rgba(255, 107, 157, 0.6);
}

.pet-toggle-btn:active {
  transform: scale(0.95);
}

.pet-toggle-btn.active {
  background: linear-gradient(45deg, #667eea, #764ba2);
  animation: none;
}

/* Floating Pet Widget */
.floating-pet-widget {
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 350px;
  max-height: 80vh;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.3);
  z-index: 999;
  overflow: hidden;
  transition: all 0.3s ease;
}

.floating-pet-widget.minimized {
  height: auto;
  max-height: 60px;
}

/* Widget Header */
.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: linear-gradient(45deg, #ff6b9d, #ffa8c8);
  color: white;
  border-radius: 20px 20px 0 0;
  user-select: none;
}

.widget-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
}

.pet-icon {
  font-size: 1.2rem;
}

.widget-controls {
  display: flex;
  gap: 10px;
}

.control-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 8px;
  padding: 5px 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  user-select: none;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.control-btn:active {
  transform: scale(0.95);
}

/* Widget Content */
.widget-content {
  max-height: 70vh;
  overflow-y: auto;
  padding: 0;
}

/* Custom scrollbar for widget */
.widget-content::-webkit-scrollbar {
  width: 6px;
}

.widget-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.widget-content::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #ff6b9d, #ffa8c8);
  border-radius: 3px;
}

.widget-content::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #e55a87, #ff8fa3);
}

/* Responsive Design for Floating Widget */
@media (max-width: 768px) {
  .floating-pet-widget {
    width: calc(100vw - 40px);
    right: 20px;
    left: 20px;
    bottom: 100px;
  }

  .pet-toggle-btn {
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .floating-pet-widget {
    width: calc(100vw - 20px);
    right: 10px;
    left: 10px;
    bottom: 80px;
  }

  .pet-toggle-btn {
    bottom: 15px;
    right: 15px;
    width: 45px;
    height: 45px;
    font-size: 1.1rem;
  }

  .widget-header {
    padding: 12px 15px;
  }

  .widget-title {
    font-size: 0.9rem;
  }

  .control-btn {
    padding: 4px 6px;
    font-size: 0.8rem;
  }
}

/* Height adjustments for mobile landscape */
@media (max-height: 600px) {
  .floating-pet-widget {
    max-height: 60vh;
  }

  .widget-content {
    max-height: 50vh;
  }
}

/* Ensure widget doesn't interfere with page content */
.about h1,
.about h2 {
  z-index: 1;
  position: relative;
  text-align: center;
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .pet-toggle-btn {
    animation: none;
  }

  .pet-widget-enter-active,
  .pet-widget-leave-active,
  .minimize-enter-active,
  .minimize-leave-active {
    transition: none;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .floating-pet-widget {
    background: rgba(30, 30, 30, 0.95);
    border: 2px solid rgba(255, 255, 255, 0.1);
  }

  .widget-content::-webkit-scrollbar-track {
    background: #333;
  }
}
</style>
