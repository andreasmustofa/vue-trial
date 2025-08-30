<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useTetrisStore } from '@/stores/tetris'

const tetrisStore = useTetrisStore()
const gameInterval = ref<number | null>(null)

const startGame = () => {
  tetrisStore.initGame()
  startGameLoop()
}

const startGameLoop = () => {
  if (gameInterval.value) {
    clearInterval(gameInterval.value)
  }

  gameInterval.value = setInterval(
    () => {
      if (!tetrisStore.isPaused && !tetrisStore.gameOver && tetrisStore.isPlaying) {
        tetrisStore.movePiece('down')
      }
    },
    Math.max(50, 1000 - (tetrisStore.level - 1) * 50),
  ) as unknown as number
}

const handleKeyPress = (event: KeyboardEvent) => {
  if (!tetrisStore.isPlaying) return

  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      tetrisStore.movePiece('left')
      break
    case 'ArrowRight':
      event.preventDefault()
      tetrisStore.movePiece('right')
      break
    case 'ArrowDown':
      event.preventDefault()
      tetrisStore.movePiece('down')
      break
    case 'ArrowUp':
      event.preventDefault()
      tetrisStore.rotatePiece()
      break
    case ' ':
      event.preventDefault()
      if (tetrisStore.isPaused) {
        tetrisStore.togglePause()
      } else {
        tetrisStore.dropPiece()
      }
      break
    case 'p':
    case 'P':
      event.preventDefault()
      tetrisStore.togglePause()
      break
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyPress)
  if (gameInterval.value) {
    clearInterval(gameInterval.value)
  }
})
</script>

<template>
  <div class="tetris-container">
    <div class="game-header">
      <h1 class="game-title">🎮 TETRIS GAME</h1>
      <p class="developer-info">By Andreas Mustofa - Software Developer</p>
    </div>

    <div class="game-layout">
      <!-- Game Buttons -->
      <div class="game-buttons">
        <button
          v-if="!tetrisStore.isPlaying && !tetrisStore.gameOver"
          @click="startGame"
          class="btn btn-primary"
        >
          Start Game
        </button>
        <button
          v-if="tetrisStore.isPlaying && !tetrisStore.gameOver"
          @click="tetrisStore.togglePause"
          class="btn btn-secondary"
        >
          {{ tetrisStore.isPaused ? 'Resume' : 'Pause' }}
        </button>
        <button
          v-if="tetrisStore.isPlaying || tetrisStore.gameOver"
          @click="tetrisStore.resetGame"
          class="btn btn-danger"
        >
          Reset Game
        </button>
      </div>
      <!-- Game Board -->
      <div class="game-board-container">
        <div class="game-board" :class="{ 'game-over': tetrisStore.gameOver }">
          <div
            v-for="(row, rowIndex) in tetrisStore.boardWithCurrentPiece"
            :key="rowIndex"
            class="board-row"
          >
            <div
              v-for="(cell, colIndex) in row"
              :key="colIndex"
              class="board-cell"
              :class="{ filled: cell }"
              :style="{ backgroundColor: cell || '#1a1a2e' }"
            />
          </div>
        </div>

        <!-- Game Over Overlay -->
        <div v-if="tetrisStore.gameOver" class="game-over-overlay">
          <h2>GAME OVER!</h2>
          <p>Final Score: {{ tetrisStore.score }}</p>
          <button @click="tetrisStore.resetGame" class="btn btn-primary">Play Again</button>
        </div>

        <!-- Pause Overlay -->
        <div v-if="tetrisStore.isPaused && !tetrisStore.gameOver" class="pause-overlay">
          <h2>PAUSED</h2>
          <p>Press SPACE to continue</p>
        </div>
      </div>

      <!-- Game Info Panel -->
      <div class="game-info">
        <!-- Stats -->
        <div class="stats-panel">
          <div class="stat-item">
            <label>Score</label>
            <div class="stat-value">{{ tetrisStore.score.toLocaleString() }}</div>
          </div>
          <div class="stat-item">
            <label>Level</label>
            <div class="stat-value">{{ tetrisStore.level }}</div>
          </div>
          <div class="stat-item">
            <label>Lines</label>
            <div class="stat-value">{{ tetrisStore.lines }}</div>
          </div>
        </div>

        <!-- Next Piece -->
        <div class="next-piece-panel">
          <h3>Next Piece</h3>
          <div class="next-piece-container">
            <div v-if="tetrisStore.nextPiece" class="next-piece">
              <div
                v-for="(row, rowIndex) in tetrisStore.nextPiece.shape"
                :key="rowIndex"
                class="next-piece-row"
              >
                <div
                  v-for="(cell, colIndex) in row"
                  :key="colIndex"
                  class="next-piece-cell"
                  :class="{ filled: cell }"
                  :style="{ backgroundColor: cell ? tetrisStore.nextPiece.color : 'transparent' }"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Controls -->
        <div class="controls-panel">
          <h3>Controls</h3>
          <div class="control-item">← → Move</div>
          <div class="control-item">↓ Soft Drop</div>
          <div class="control-item">↑ Rotate</div>
          <div class="control-item">Space Hard Drop</div>
          <div class="control-item">P Pause</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tetris-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.game-header {
  text-align: center;
  margin-bottom: 30px;
}

.game-title {
  font-size: 3rem;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin: 0;
  animation: 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    text-shadow:
      0 0 20px #fff,
      0 0 30px #fff,
      0 0 40px #0ff;
  }
  to {
    text-shadow:
      0 0 10px #fff,
      0 0 20px #fff,
      0 0 30px #0ff;
  }
}

.developer-info {
  color: #e0e0e0;
  font-size: 1.1rem;
  margin: 10px 0;
}

.game-layout {
  display: flex;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: center;
  align-items: flex-start;
}

.game-board-container {
  position: relative;
}

.game-board {
  border: 3px solid #fff;
  border-radius: 8px;
  background: #0a0a0a;
  padding: 5px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
  transition: all 0.3s ease;
}

.game-board.game-over {
  filter: brightness(0.5);
}

.board-row {
  display: flex;
}

.board-cell {
  width: 25px;
  height: 25px;
  border: 1px solid #333;
  transition: all 0.1s ease;
}

.board-cell.filled {
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
}

.game-over-overlay,
.pause-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 8px;
}

.game-over-overlay h2,
.pause-overlay h2 {
  font-size: 2.5rem;
  margin: 0 0 20px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.game-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 200px;
}

.stats-panel,
.next-piece-panel,
.controls-panel {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stats-panel {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-item label {
  color: #e0e0e0;
  font-weight: bold;
}

.stat-value {
  color: #00ff88;
  font-size: 1.4rem;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
}

.next-piece-panel h3,
.controls-panel h3 {
  margin: 0 0 15px 0;
  color: white;
  font-size: 1.2rem;
}

.next-piece-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80px;
}

.next-piece-row {
  display: flex;
}

.next-piece-cell {
  width: 20px;
  height: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.next-piece-cell.filled {
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: inset 0 0 3px rgba(255, 255, 255, 0.2);
}

.control-item {
  color: #e0e0e0;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.game-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
}

.btn-primary {
  background: linear-gradient(45deg, #00ff88, #00d4aa);
  color: white;
}

.btn-primary:hover {
  background: linear-gradient(45deg, #00d4aa, #00ff88);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 255, 136, 0.4);
}

.btn-secondary {
  background: linear-gradient(45deg, #ffa500, #ff8c00);
  color: white;
}

.btn-secondary:hover {
  background: linear-gradient(45deg, #ff8c00, #ffa500);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 165, 0, 0.4);
}

.btn-danger {
  background: linear-gradient(45deg, #ff4757, #ff3838);
  color: white;
}

.btn-danger:hover {
  background: linear-gradient(45deg, #ff3838, #ff4757);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 71, 87, 0.4);
}

@media (max-width: 768px) {
  .game-layout {
    flex-direction: column;
    align-items: center;
  }

  .game-title {
    font-size: 2rem;
  }

  .board-cell {
    width: 20px;
    height: 20px;
  }
}
</style>
