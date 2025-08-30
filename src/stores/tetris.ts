import { defineStore } from 'pinia'

const TETROMINOES = {
  I: { shape: [[1, 1, 1, 1]], color: '#096a6eff' },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: '#ffff00',
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: '#a000f0',
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: '#00ff00',
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: '#ff0000',
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: '#0000ff',
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: '#ffa500',
  },
}

const BOARD_WIDTH = 10
const BOARD_HEIGHT = 20

interface Tetromino {
  shape: number[][]
  color: string
  x: number
  y: number
}

export const useTetrisStore = defineStore('tetris', {
  state: () => ({
    board: Array(BOARD_HEIGHT)
      .fill(null)
      .map(() => Array(BOARD_WIDTH).fill(0)),
    currentPiece: null as Tetromino | null,
    nextPiece: null as Tetromino | null,
    score: 0,
    level: 1,
    lines: 0,
    gameOver: false,
    isPaused: false,
    isPlaying: false,
  }),

  getters: {
    boardWithCurrentPiece: (state) => {
      if (!state.currentPiece) return state.board

      const board = state.board.map((row) => [...row])
      const { shape, x, y, color } = state.currentPiece

      for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
          if (
            shape[row][col] &&
            y + row >= 0 &&
            y + row < BOARD_HEIGHT &&
            x + col >= 0 &&
            x + col < BOARD_WIDTH
          ) {
            board[y + row][x + col] = color
          }
        }
      }

      return board
    },
  },

  actions: {
    initGame() {
      this.board = Array(BOARD_HEIGHT)
        .fill(null)
        .map(() => Array(BOARD_WIDTH).fill(0))
      this.score = 0
      this.level = 1
      this.lines = 0
      this.gameOver = false
      this.isPaused = false
      this.isPlaying = true
      this.spawnNewPiece()
      this.generateNextPiece()
    },

    spawnNewPiece() {
      if (this.nextPiece) {
        this.currentPiece = this.nextPiece
      } else {
        this.currentPiece = this.createRandomPiece()
      }

      this.currentPiece.x =
        Math.floor(BOARD_WIDTH / 2) - Math.floor(this.currentPiece.shape[0].length / 2)
      this.currentPiece.y = 0

      this.generateNextPiece()

      if (this.checkCollision(this.currentPiece)) {
        this.gameOver = true
        this.isPlaying = false
      }
    },

    generateNextPiece() {
      this.nextPiece = this.createRandomPiece()
    },

    createRandomPiece(): Tetromino {
      const pieces = Object.keys(TETROMINOES)
      const randomPiece = pieces[Math.floor(Math.random() * pieces.length)]
      const { shape, color } = TETROMINOES[randomPiece as keyof typeof TETROMINOES]

      return {
        shape: shape.map((row) => [...row]),
        color,
        x: 0,
        y: 0,
      }
    },

    movePiece(direction: 'left' | 'right' | 'down') {
      if (!this.currentPiece || this.gameOver || this.isPaused) return

      const newPiece = { ...this.currentPiece }

      switch (direction) {
        case 'left':
          newPiece.x--
          break
        case 'right':
          newPiece.x++
          break
        case 'down':
          newPiece.y++
          break
      }

      if (!this.checkCollision(newPiece)) {
        this.currentPiece = newPiece
      } else if (direction === 'down') {
        this.lockPiece()
      }
    },

    rotatePiece() {
      if (!this.currentPiece || this.gameOver || this.isPaused) return

      const rotated = this.rotateMatrix(this.currentPiece.shape)
      const newPiece = { ...this.currentPiece, shape: rotated }

      if (!this.checkCollision(newPiece)) {
        this.currentPiece = newPiece
      }
    },

    rotateMatrix(matrix: number[][]): number[][] {
      const rows = matrix.length
      const cols = matrix[0].length
      const rotated = Array(cols)
        .fill(null)
        .map(() => Array(rows).fill(0))

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          rotated[col][rows - 1 - row] = matrix[row][col]
        }
      }

      return rotated
    },

    checkCollision(piece: Tetromino): boolean {
      const { shape, x, y } = piece

      for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
          if (shape[row][col]) {
            const newX = x + col
            const newY = y + row

            if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
              return true
            }

            if (newY >= 0 && this.board[newY][newX]) {
              return true
            }
          }
        }
      }

      return false
    },

    lockPiece() {
      if (!this.currentPiece) return

      const { shape, x, y, color } = this.currentPiece

      for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
          if (shape[row][col] && y + row >= 0) {
            this.board[y + row][x + col] = color
          }
        }
      }

      this.clearLines()
      this.spawnNewPiece()
    },

    clearLines() {
      let linesCleared = 0

      for (let row = BOARD_HEIGHT - 1; row >= 0; row--) {
        if (this.board[row].every((cell) => cell !== 0)) {
          this.board.splice(row, 1)
          this.board.unshift(Array(BOARD_WIDTH).fill(0))
          linesCleared++
          row++ // Check the same row again
        }
      }

      if (linesCleared > 0) {
        this.lines += linesCleared
        this.score += this.calculateScore(linesCleared)
        this.level = Math.floor(this.lines / 10) + 1
      }
    },

    calculateScore(linesCleared: number): number {
      const baseScore = [0, 40, 100, 300, 1200]
      return baseScore[linesCleared] * this.level
    },

    dropPiece() {
      if (!this.currentPiece || this.gameOver || this.isPaused) return

      while (!this.checkCollision({ ...this.currentPiece, y: this.currentPiece.y + 1 })) {
        this.currentPiece.y++
      }

      this.lockPiece()
    },

    togglePause() {
      if (!this.gameOver) {
        this.isPaused = !this.isPaused
      }
    },

    resetGame() {
      this.initGame()
    },
  },
})
