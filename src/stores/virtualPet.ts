import { defineStore } from 'pinia'

interface Pet {
  name: string
  type: 'cat' | 'dog' | 'bird' | 'rabbit'
  level: number
  experience: number
  happiness: number
  hunger: number
  energy: number
  cleanliness: number
  health: number
  age: number
  coins: number
  lastFed: number
  lastPlayed: number
  lastCleaned: number
  lastSlept: number
  mood: 'happy' | 'sad' | 'tired' | 'hungry' | 'sick' | 'dirty' | 'bored'
  items: string[]
  achievements: string[]
  created: number
}

interface Activity {
  id: string
  name: string
  icon: string
  description: string
  duration: number
  effects: {
    happiness?: number
    hunger?: number
    energy?: number
    cleanliness?: number
    health?: number
    experience?: number
    coins?: number
  }
  cost?: number
  cooldown?: number
  lastUsed?: number
}

const INITIAL_PET_STATS = {
  happiness: 80,
  hunger: 70,
  energy: 90,
  cleanliness: 85,
  health: 100,
  age: 0,
  level: 1,
  experience: 0,
  coins: 100,
  mood: 'happy' as const,
}

const PET_ACTIVITIES: Activity[] = [
  {
    id: 'feed',
    name: 'Feed',
    icon: '🍖',
    description: 'Give your pet some delicious food',
    duration: 2000,
    effects: { hunger: 25, happiness: 10, health: 5, experience: 5 },
    cost: 10,
    cooldown: 30000,
  },
  {
    id: 'play',
    name: 'Play',
    icon: '🎾',
    description: 'Play games with your pet',
    duration: 3000,
    effects: { happiness: 30, energy: -10, experience: 10, coins: 5 },
    cooldown: 60000,
  },
  {
    id: 'sleep',
    name: 'Sleep',
    icon: '😴',
    description: 'Let your pet take a nap',
    duration: 5000,
    effects: { energy: 40, happiness: 5, health: 10 },
    cooldown: 120000,
  },
  {
    id: 'bath',
    name: 'Bath',
    icon: '🛁',
    description: 'Clean your pet',
    duration: 3000,
    effects: { cleanliness: 35, happiness: -5, health: 15, experience: 5 },
    cost: 5,
    cooldown: 90000,
  },
  {
    id: 'medicine',
    name: 'Medicine',
    icon: '💊',
    description: 'Give medicine when sick',
    duration: 2000,
    effects: { health: 50, happiness: -10 },
    cost: 50,
    cooldown: 300000,
  },
  {
    id: 'exercise',
    name: 'Exercise',
    icon: '🏃',
    description: 'Exercise to stay healthy',
    duration: 4000,
    effects: { health: 20, energy: -15, happiness: 15, experience: 15, coins: 10 },
    cooldown: 180000,
  },
]

const ACHIEVEMENTS = [
  {
    id: 'first_feed',
    name: 'First Meal',
    description: 'Fed your pet for the first time',
    reward: 50,
  },
  { id: 'level_5', name: 'Growing Up', description: 'Reached level 5', reward: 100 },
  { id: 'level_10', name: 'Experienced', description: 'Reached level 10', reward: 200 },
  { id: 'happy_week', name: 'Week of Joy', description: 'Kept pet happy for 7 days', reward: 300 },
  { id: 'rich_pet', name: 'Wealthy Pet', description: 'Accumulated 1000 coins', reward: 500 },
  { id: 'clean_freak', name: 'Clean Freak', description: 'Bathed pet 50 times', reward: 150 },
]

export const useVirtualPetStore = defineStore('virtualPet', {
  state: () => ({
    pet: null as Pet | null,
    activities: [...PET_ACTIVITIES] as Activity[],
    currentActivity: null as Activity | null,
    activityProgress: 0,
    notifications: [] as string[],
    gameTime: Date.now(),
    autoSaveInterval: null as number | null,
    decayInterval: null as number | null,
  }),

  getters: {
    petMood: (state): string => {
      if (!state.pet) return 'neutral'

      const { happiness, hunger, energy, cleanliness, health } = state.pet

      if (health < 30) return 'sick'
      if (cleanliness < 30) return 'dirty'
      if (hunger < 20) return 'hungry'
      if (energy < 20) return 'tired'
      if (happiness < 30) return 'sad'
      if (happiness > 80) return 'happy'

      return 'bored'
    },

    petEmoji: (state): string => {
      if (!state.pet) return '🐾'

      const moodEmojis = {
        happy: '😊',
        sad: '😢',
        tired: '😴',
        hungry: '🤤',
        sick: '🤒',
        dirty: '🤢',
        bored: '😐',
      }

      const typeEmojis = {
        cat: '🐱',
        dog: '🐶',
        bird: '🐦',
        rabbit: '🐰',
      }

      return state.pet.health < 30
        ? moodEmojis[(state as any).petMood as keyof typeof moodEmojis]
        : typeEmojis[state.pet.type]
    },

    experienceToNextLevel: (state): number => {
      if (!state.pet) return 0
      return state.pet.level * 100 - state.pet.experience
    },

    canUseActivity:
      (state) =>
      (activityId: string): boolean => {
        if (!state.pet || state.currentActivity) return false

        const activity = state.activities.find((a) => a.id === activityId)
        if (!activity) return false

        const now = Date.now()
        const lastUsed = activity.lastUsed || 0
        const cooldownRemaining = lastUsed + (activity.cooldown || 0) - now

        if (cooldownRemaining > 0) return false
        if (activity.cost && state.pet.coins < activity.cost) return false

        return true
      },

    activityCooldowns: (state) => {
      const now = Date.now()
      return state.activities.reduce(
        (acc, activity) => {
          const lastUsed = activity.lastUsed || 0
          const cooldownTotal = activity.cooldown || 0
          const cooldownRemaining = Math.max(0, lastUsed + cooldownTotal - now)
          acc[activity.id] = {
            remaining: cooldownRemaining,
            total: cooldownTotal,
            canUse: cooldownRemaining === 0,
          }
          return acc
        },
        {} as Record<string, { remaining: number; total: number; canUse: boolean }>,
      )
    },
  },

  actions: {
    createPet(name: string, type: Pet['type']) {
      this.pet = {
        name,
        type,
        ...INITIAL_PET_STATS,
        items: [],
        achievements: [],
        created: Date.now(),
        lastFed: Date.now(),
        lastPlayed: Date.now(),
        lastCleaned: Date.now(),
        lastSlept: Date.now(),
        mood: 'happy',
      }

      this.addNotification(`${name} has been adopted! 🎉`)
      this.startGameLoop()
      this.savePet()
    },

    async performActivity(activityId: string) {
      if (!this.pet || !this.canUseActivity(activityId)) return

      const activity = this.activities.find((a) => a.id === activityId)
      if (!activity) return

      this.currentActivity = activity
      this.activityProgress = 0

      // Animate progress
      const progressInterval = setInterval(() => {
        this.activityProgress += 5
        if (this.activityProgress >= 100) {
          clearInterval(progressInterval)
          this.completeActivity(activity)
        }
      }, activity.duration / 20)
    },

    completeActivity(activity: Activity) {
      if (!this.pet) return

      // Apply effects
      Object.entries(activity.effects).forEach(([stat, value]) => {
        if (stat in this.pet!) {
          ;(this.pet as any)[stat] = Math.max(0, Math.min(100, (this.pet as any)[stat] + value))
        }
      })

      // Handle costs and experience
      if (activity.cost) {
        this.pet.coins -= activity.cost
      }

      // Update last used timestamp
      const activityIndex = this.activities.findIndex((a) => a.id === activity.id)
      if (activityIndex !== -1) {
        this.activities[activityIndex].lastUsed = Date.now()
      }

      // Check for level up
      this.checkLevelUp()

      // Check achievements
      this.checkAchievements(activity.id)

      this.addNotification(`${activity.name} completed! ${activity.icon}`)
      this.currentActivity = null
      this.activityProgress = 0
      this.savePet()
    },

    checkLevelUp() {
      if (!this.pet) return

      const requiredExp = this.pet.level * 100
      if (this.pet.experience >= requiredExp) {
        this.pet.level++
        this.pet.experience -= requiredExp
        this.pet.coins += this.pet.level * 20
        this.addNotification(`Level up! Now level ${this.pet.level}! 🌟`)
      }
    },

    checkAchievements(activityId: string) {
      if (!this.pet) return

      ACHIEVEMENTS.forEach((achievement) => {
        if (this.pet!.achievements.includes(achievement.id)) return

        let earned = false

        switch (achievement.id) {
          case 'first_feed':
            earned = activityId === 'feed'
            break
          case 'level_5':
            earned = this.pet!.level >= 5
            break
          case 'level_10':
            earned = this.pet!.level >= 10
            break
          case 'rich_pet':
            earned = this.pet!.coins >= 1000
            break
        }

        if (earned) {
          this.pet!.achievements.push(achievement.id)
          this.pet!.coins += achievement.reward
          this.addNotification(
            `Achievement unlocked: ${achievement.name}! +${achievement.reward} coins 🏆`,
          )
        }
      })
    },

    startGameLoop() {
      // Auto-save every 30 seconds
      this.autoSaveInterval = setInterval(() => {
        this.savePet()
      }, 30000) as unknown as number

      // Decay stats over time
      this.decayInterval = setInterval(() => {
        this.decayStats()
      }, 60000) as unknown as number // Every minute
    },

    decayStats() {
      if (!this.pet || this.currentActivity) return

      const now = Date.now()
      const timeSinceLastUpdate = now - this.gameTime
      const hoursElapsed = timeSinceLastUpdate / (1000 * 60 * 60)

      // Gradual stat decay
      this.pet.hunger = Math.max(0, this.pet.hunger - hoursElapsed * 2)
      this.pet.happiness = Math.max(0, this.pet.happiness - hoursElapsed * 1.5)
      this.pet.energy = Math.max(0, this.pet.energy - hoursElapsed * 1)
      this.pet.cleanliness = Math.max(0, this.pet.cleanliness - hoursElapsed * 0.5)

      // Health decay if other stats are low
      if (this.pet.hunger < 20 || this.pet.happiness < 20) {
        this.pet.health = Math.max(0, this.pet.health - hoursElapsed * 3)
      }

      // Age increases
      this.pet.age += hoursElapsed / 24 // Age in days

      this.gameTime = now

      // Check for urgent needs
      this.checkUrgentNeeds()
    },

    checkUrgentNeeds() {
      if (!this.pet) return

      if (this.pet.hunger < 20) {
        this.addNotification(`${this.pet.name} is very hungry! 🍖`)
      }
      if (this.pet.happiness < 20) {
        this.addNotification(`${this.pet.name} is feeling sad! 😢`)
      }
      if (this.pet.health < 30) {
        this.addNotification(`${this.pet.name} is feeling sick! 🤒`)
      }
    },

    addNotification(message: string) {
      this.notifications.unshift(message)
      if (this.notifications.length > 5) {
        this.notifications.pop()
      }

      // Auto-remove after 5 seconds
      setTimeout(() => {
        const index = this.notifications.indexOf(message)
        if (index > -1) {
          this.notifications.splice(index, 1)
        }
      }, 5000)
    },

    savePet() {
      if (this.pet) {
        const petData = {
          ...this.pet,
          lastSaved: Date.now(),
        }
        // In real implementation, save to localStorage or API
        // localStorage.setItem('virtualPet', JSON.stringify(petData))
        console.log('Pet saved:', petData)
      }
    },

    loadPet() {
      // In real implementation, load from localStorage or API
      // const saved = localStorage.getItem('virtualPet')
      // if (saved) {
      //   this.pet = JSON.parse(saved)
      //   this.handleOfflineTime()
      //   this.startGameLoop()
      // }
    },

    handleOfflineTime() {
      if (!this.pet) return

      const now = Date.now()
      const lastSaved = (this.pet as any).lastSaved || this.pet.created
      const offlineTime = now - lastSaved

      if (offlineTime > 60000) {
        // More than 1 minute offline
        const hoursOffline = offlineTime / (1000 * 60 * 60)

        // Apply offline decay
        this.pet.hunger = Math.max(0, this.pet.hunger - hoursOffline * 5)
        this.pet.happiness = Math.max(0, this.pet.happiness - hoursOffline * 3)
        this.pet.cleanliness = Math.max(0, this.pet.cleanliness - hoursOffline * 2)

        this.addNotification(
          `Welcome back! ${this.pet.name} missed you for ${Math.floor(hoursOffline)} hours`,
        )
      }
    },

    resetPet() {
      this.pet = null
      if (this.autoSaveInterval) {
        clearInterval(this.autoSaveInterval)
      }
      if (this.decayInterval) {
        clearInterval(this.decayInterval)
      }
      this.notifications = []
      // localStorage.removeItem('virtualPet')
    },

    buyItem(itemId: string, cost: number) {
      if (!this.pet || this.pet.coins < cost) return false

      this.pet.coins -= cost
      this.pet.items.push(itemId)
      this.addNotification(`Purchased ${itemId}! 💰`)
      this.savePet()
      return true
    },
  },
})
