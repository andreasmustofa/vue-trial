<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useVirtualPetStore } from '@/stores/virtualPet'

const petStore = useVirtualPetStore()

const newPetName = ref('')
const newPetType = ref<'cat' | 'dog' | 'bird' | 'rabbit'>('cat')

const petTypes = [
  { id: 'cat', name: 'Cat', emoji: '🐱' },
  { id: 'dog', name: 'Dog', emoji: '🐶' },
  { id: 'bird', name: 'Bird', emoji: '🐦' },
  { id: 'rabbit', name: 'Rabbit', emoji: '🐰' },
] as const

const createPet = () => {
  if (newPetName.value.trim()) {
    petStore.createPet(newPetName.value.trim(), newPetType.value)
  }
}

const resetPet = () => {
  if (confirm('Apakah anda yakin ingin mereset pet, semua data akan hilang!')) {
    petStore.resetPet()
    newPetName.value = ''
    newPetType.value = 'cat'
  }
}

const currentView = ref<'pet' | 'stats' | 'activities'>('pet')

let cooldownInterval: number | null = null

onMounted(() => {
  petStore.loadPet()
  cooldownInterval = setInterval(() => {}, 1000) as unknown as number
})

onUnmounted(() => {
  if (cooldownInterval) {
    clearInterval(cooldownInterval)
  }
})
</script>

<template>
  <div class="floating-pet-container">
    <!-- Pet Creation -->
    <div v-if="!petStore.pet" class="pet-creation">
      <div class="creation-header">
        <h2>🎉 Adopt Pet</h2>
      </div>

      <form @submit.prevent="createPet" class="creation-form">
        <div class="input-group">
          <input
            v-model="newPetName"
            type="text"
            placeholder="Pet name..."
            maxlength="15"
            required
            class="pet-name-input"
          />
        </div>

        <div class="pet-types-compact">
          <div
            v-for="type in petTypes"
            :key="type.id"
            @click="newPetType = type.id"
            class="type-option-compact"
            :class="{ active: newPetType === type.id }"
          >
            <div class="type-emoji">{{ type.emoji }}</div>
            <div class="type-name">{{ type.name }}</div>
          </div>
        </div>

        <button type="submit" class="btn-adopt">Adopt! 🏠</button>
      </form>
    </div>

    <!-- Main Game -->
    <div v-else class="pet-game-floating">
      <!-- Navigation Tabs -->
      <div class="nav-tabs">
        <button
          @click="currentView = 'pet'"
          class="nav-tab"
          :class="{ active: currentView === 'pet' }"
        >
          🐾 Pet
        </button>
        <button
          @click="currentView = 'stats'"
          class="nav-tab"
          :class="{ active: currentView === 'stats' }"
        >
          📊 Stats
        </button>
        <button
          @click="currentView = 'activities'"
          class="nav-tab"
          :class="{ active: currentView === 'activities' }"
        >
          🎮 Play
        </button>
      </div>

      <!-- Pet View -->
      <div v-if="currentView === 'pet'" class="view-content">
        <!-- Pet Header Info -->
        <div class="pet-header-compact">
          <div class="pet-basic-info">
            <h3>{{ petStore.pet.name }}</h3>
            <div class="pet-meta">
              <span class="pet-level">Lv.{{ petStore.pet.level }}</span>
              <span class="pet-coins">💰{{ petStore.pet.coins }}</span>
            </div>
          </div>
        </div>

        <!-- Pet Avatar -->
        <div class="pet-display-compact">
          <div
            class="pet-avatar-compact"
            :class="[`pet-${petStore.pet.type}`, `mood-${petStore.petMood}`]"
          >
            <div class="pet-emoji">{{ petStore.petEmoji }}</div>

            <!-- Activity Animation -->
            <div v-if="petStore.currentActivity" class="activity-badge">
              <span class="activity-icon">{{ petStore.currentActivity.icon }}</span>
              <div class="activity-progress-mini">
                <div class="progress-fill" :style="{ width: `${petStore.activityProgress}%` }" />
              </div>
            </div>
          </div>

          <!-- Quick Mood Display -->
          <div class="mood-compact">
            <span class="mood-emoji">
              {{
                petStore.petMood === 'happy'
                  ? '😊'
                  : petStore.petMood === 'sad'
                    ? '😢'
                    : petStore.petMood === 'tired'
                      ? '😴'
                      : petStore.petMood === 'hungry'
                        ? '🤤'
                        : petStore.petMood === 'sick'
                          ? '🤒'
                          : petStore.petMood === 'dirty'
                            ? '🤢'
                            : '😐'
              }}
            </span>
            <span class="mood-text">{{ petStore.petMood }}</span>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="quick-stats">
          <div class="quick-stat" :class="{ critical: petStore.pet.happiness < 30 }">
            <span class="stat-icon">❤️</span>
            <div class="stat-bar-mini">
              <div
                class="stat-fill-mini happiness"
                :style="{ width: `${petStore.pet.happiness}%` }"
              ></div>
            </div>
            <span class="stat-value-mini">{{ Math.round(petStore.pet.happiness) }}</span>
          </div>

          <div class="quick-stat" :class="{ critical: petStore.pet.hunger < 30 }">
            <span class="stat-icon">🍖</span>
            <div class="stat-bar-mini">
              <div
                class="stat-fill-mini hunger"
                :style="{ width: `${petStore.pet.hunger}%` }"
              ></div>
            </div>
            <span class="stat-value-mini">{{ Math.round(petStore.pet.hunger) }}</span>
          </div>

          <div class="quick-stat" :class="{ critical: petStore.pet.energy < 30 }">
            <span class="stat-icon">⚡</span>
            <div class="stat-bar-mini">
              <div
                class="stat-fill-mini energy"
                :style="{ width: `${petStore.pet.energy}%` }"
              ></div>
            </div>
            <span class="stat-value-mini">{{ Math.round(petStore.pet.energy) }}</span>
          </div>
        </div>
      </div>

      <!-- Stats View -->
      <div v-if="currentView === 'stats'" class="view-content">
        <div class="stats-detailed">
          <div class="stat-item-compact">
            <div class="stat-header">
              <span class="stat-icon">❤️</span>
              <span class="stat-label">Happiness</span>
              <span class="stat-value">{{ Math.round(petStore.pet.happiness) }}%</span>
            </div>
            <div class="stat-bar">
              <div
                class="stat-fill happiness"
                :style="{ width: `${petStore.pet.happiness}%` }"
              ></div>
            </div>
          </div>

          <div class="stat-item-compact">
            <div class="stat-header">
              <span class="stat-icon">🍖</span>
              <span class="stat-label">Hunger</span>
              <span class="stat-value">{{ Math.round(petStore.pet.hunger) }}%</span>
            </div>
            <div class="stat-bar">
              <div class="stat-fill hunger" :style="{ width: `${petStore.pet.hunger}%` }"></div>
            </div>
          </div>

          <div class="stat-item-compact">
            <div class="stat-header">
              <span class="stat-icon">⚡</span>
              <span class="stat-label">Energy</span>
              <span class="stat-value">{{ Math.round(petStore.pet.energy) }}%</span>
            </div>
            <div class="stat-bar">
              <div class="stat-fill energy" :style="{ width: `${petStore.pet.energy}%` }"></div>
            </div>
          </div>

          <div class="stat-item-compact">
            <div class="stat-header">
              <span class="stat-icon">🛁</span>
              <span class="stat-label">Cleanliness</span>
              <span class="stat-value">{{ Math.round(petStore.pet.cleanliness) }}%</span>
            </div>
            <div class="stat-bar">
              <div
                class="stat-fill cleanliness"
                :style="{ width: `${petStore.pet.cleanliness}%` }"
              ></div>
            </div>
          </div>

          <div class="stat-item-compact">
            <div class="stat-header">
              <span class="stat-icon">💚</span>
              <span class="stat-label">Health</span>
              <span class="stat-value">{{ Math.round(petStore.pet.health) }}%</span>
            </div>
            <div class="stat-bar">
              <div class="stat-fill health" :style="{ width: `${petStore.pet.health}%` }"></div>
            </div>
          </div>

          <!-- Experience -->
          <div class="exp-section-compact">
            <div class="exp-header">
              <span>Experience</span>
              <span
                >{{ petStore.pet.experience % (petStore.pet.level * 100) }} /
                {{ petStore.pet.level * 100 }}</span
              >
            </div>
            <div class="exp-bar">
              <div
                class="exp-fill"
                :style="{
                  width: `${((petStore.pet.experience % (petStore.pet.level * 100)) / (petStore.pet.level * 100)) * 100}%`,
                }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Pet Info -->
        <div class="pet-info-compact">
          <div class="info-row">
            <span>Age:</span>
            <span>{{ Math.floor(petStore.pet.age) }} days</span>
          </div>
          <div class="info-row">
            <span>Type:</span>
            <span>{{ petStore.pet.type }}</span>
          </div>
          <div class="info-row">
            <span>Achievements:</span>
            <span>{{ petStore.pet.achievements.length }}</span>
          </div>
        </div>

        <button @click="resetPet" class="btn-reset">Reset Pet 🔄</button>
      </div>

      <!-- Activities View -->
      <div v-if="currentView === 'activities'" class="view-content">
        <div class="activities-compact">
          <button
            v-for="activity in petStore.activities"
            :key="activity.id"
            @click="petStore.performActivity(activity.id)"
            class="activity-btn-compact"
            :class="{
              disabled: !petStore.canUseActivity(activity.id),
              'on-cooldown': petStore.activityCooldowns[activity.id]?.remaining > 0,
            }"
            :disabled="!petStore.canUseActivity(activity.id) || !!petStore.currentActivity"
          >
            <div class="activity-content">
              <div class="activity-icon">{{ activity.icon }}</div>
              <div class="activity-details">
                <div class="activity-name">{{ activity.name }}</div>
                <div v-if="activity.cost" class="activity-cost">💰 {{ activity.cost }}</div>
              </div>
            </div>

            <!-- Cooldown Timer -->
            <div
              v-if="petStore.activityCooldowns[activity.id]?.remaining > 0"
              class="cooldown-overlay"
            >
              <span class="cooldown-text">
                {{ Math.ceil(petStore.activityCooldowns[activity.id].remaining / 1000) }}s
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Floating Notifications -->
    <div class="notifications-floating">
      <div
        v-for="(notification, index) in petStore.notifications.slice(0, 2)"
        :key="index"
        class="notification-floating"
      >
        {{ notification }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.floating-pet-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #ea66e3 0%, #764ba2 100%);
  border-radius: 0 0 18px 18px;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  position: relative;
}

/* Pet Creation */
.pet-creation {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.creation-header h2 {
  color: white;
  text-align: center;
  margin: 0 0 20px 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.creation-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
}

.pet-name-input {
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

.pet-name-input:focus {
  outline: 2px solid #ff6b9d;
}

.pet-types-compact {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.type-option-compact {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 12px 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.type-option-compact.active {
  border-color: #ff6b9d;
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.type-emoji {
  font-size: 2rem;
  margin-bottom: 4px;
}

.type-name {
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
}

.btn-adopt {
  background: linear-gradient(45deg, #ff6b9d, #ffa8c8);
  border: none;
  border-radius: 12px;
  padding: 12px;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
}

.btn-adopt:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 107, 157, 0.4);
}

/* Main Game */
.pet-game-floating {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.nav-tabs {
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.nav-tab {
  flex: 1;
  background: none;
  border: none;
  padding: 12px 8px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-tab.active {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

.view-content {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}

/* Pet View */
.pet-header-compact {
  text-align: center;
  margin-bottom: 16px;
}

.pet-basic-info h3 {
  color: white;
  margin: 0 0 8px 0;
  font-size: 1.4rem;
  font-weight: 600;
}

.pet-meta {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.pet-level,
.pet-coins {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 12px;
  border-radius: 20px;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
}

.pet-display-compact {
  text-align: center;
  margin-bottom: 20px;
}

.pet-avatar-compact {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 12px;
  border-radius: 50%;
  background: linear-gradient(45deg, #ffd89b, #19547b);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  animation: petFloat 3s ease-in-out infinite;
}

@keyframes petFloat {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
}

.pet-avatar-compact.mood-happy {
  background: linear-gradient(45deg, #56ab2f, #a8e6cf);
}

.pet-avatar-compact.mood-sad {
  background: linear-gradient(45deg, #667eea, #764ba2);
  filter: saturate(0.7);
}

.pet-avatar-compact.mood-hungry {
  background: linear-gradient(45deg, #ff7300, #feb47b);
  animation: petShake 0.5s ease-in-out infinite;
}

@keyframes petShake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-2px);
  }
  75% {
    transform: translateX(2px);
  }
}

.pet-emoji {
  font-size: 3.5rem;
}

.activity-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: rgba(255, 255, 255, 0.95);
  padding: 4px 8px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 4px;
}

.activity-icon {
  font-size: 1rem;
}

.activity-progress-mini {
  width: 30px;
  height: 3px;
  background: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(45deg, #ff6b9d, #ffa8c8);
  transition: width 0.3s ease;
}

.mood-compact {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 20px;
  color: white;
  font-weight: 500;
}

.mood-emoji {
  font-size: 1.5rem;
}

.mood-text {
  text-transform: capitalize;
  font-size: 0.9rem;
}

.quick-stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.quick-stat {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 12px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.quick-stat.critical {
  background: rgba(255, 107, 107, 0.2);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.stat-icon {
  font-size: 1.2rem;
  width: 20px;
}

.stat-bar-mini {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  overflow: hidden;
}

.stat-fill-mini {
  height: 100%;
  border-radius: 3px;
  transition: width 0.5s ease;
}

.stat-fill-mini.happiness {
  background: linear-gradient(45deg, #ff6b9d, #ffa8c8);
}
.stat-fill-mini.hunger {
  background: linear-gradient(45deg, #ff9500, #ffad33);
}
.stat-fill-mini.energy {
  background: linear-gradient(45deg, #00d4ff, #5ac8fa);
}

.stat-value-mini {
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  min-width: 30px;
  text-align: right;
}

/* Stats View */
.stats-detailed {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}

.stat-item-compact {
  background: rgba(255, 255, 255, 0.1);
  padding: 12px;
  border-radius: 12px;
}

.stat-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.stat-label {
  flex: 1;
  color: white;
  font-weight: 500;
  font-size: 0.9rem;
}

.stat-value {
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
}

.stat-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease;
}

.stat-fill.happiness {
  background: linear-gradient(45deg, #ff6b9d, #ffa8c8);
}
.stat-fill.hunger {
  background: linear-gradient(45deg, #ff9500, #ffad33);
}
.stat-fill.energy {
  background: linear-gradient(45deg, #00d4ff, #5ac8fa);
}
.stat-fill.cleanliness {
  background: linear-gradient(45deg, #36d1dc, #5b86e5);
}
.stat-fill.health {
  background: linear-gradient(45deg, #56ab2f, #a8e6cf);
}

.exp-section-compact {
  background: rgba(255, 255, 255, 0.1);
  padding: 12px;
  border-radius: 12px;
  margin-top: 8px;
}

.exp-header {
  display: flex;
  justify-content: space-between;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 8px;
}

.exp-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
}

.exp-fill {
  height: 100%;
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.pet-info-compact {
  background: rgba(255, 255, 255, 0.1);
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 16px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  color: white;
  font-size: 0.9rem;
  padding: 4px 0;
}

.btn-reset {
  width: 100%;
  background: linear-gradient(45deg, #ff6b6b, #ee5a52);
  border: none;
  border-radius: 12px;
  padding: 10px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-reset:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
}

/* Activities View */
.activities-compact {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.activity-btn-compact {
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.activity-btn-compact:hover:not(.disabled) {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.activity-btn-compact.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.activity-btn-compact.on-cooldown {
  background: rgba(255, 107, 107, 0.2);
}

.activity-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.activity-icon {
  font-size: 1.8rem;
  width: 40px;
  text-align: center;
}

.activity-details {
  flex: 1;
}

.activity-name {
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 2px;
}

.activity-cost {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.8rem;
}

.cooldown-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.cooldown-text {
  color: white;
  font-weight: 600;
  font-size: 1rem;
}

/* Notifications */
.notifications-floating {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  z-index: 100;
  pointer-events: none;
}

.notification-floating {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  color: #333;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: slideInDown 0.3s ease-out;
}

@keyframes slideInDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Custom scrollbar */
.view-content::-webkit-scrollbar {
  width: 4px;
}

.view-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.view-content::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

.view-content::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>
