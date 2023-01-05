import type { Letter, GuessLetterPosition } from "@/types";
import { KeyState } from "@/types";
import constants from "@/utils/constants";
import { defineStore } from "pinia";

interface GuessBoxState {
  currentRow: number; // current row in the grid
  currentIndex: number; // current cell on the current row
  guessBoxGrid: Letter[][];
}

export const useGuessBoxStore = defineStore("guessBox", {
  state: (): GuessBoxState => {
    return {
      currentRow: 0,
      currentIndex: 0,
      guessBoxGrid: [],
    };
  },
  actions: {
    incrementCurrentRow() {
      if (this.currentRow < constants.maxRows) this.currentRow++;
    },
    decrementCurrentRow() {
      if (this.currentRow > 1) this.currentRow--;
    },
    incrementCurrentIndex() {
      if (this.currentIndex < constants.maxIndex) this.currentIndex++;
    },
    decrementCurrentIndex() {
      if (this.currentIndex > 0) this.currentIndex--;
    },
    resetCurrentIndex() {
      this.currentIndex = 0;
    },
    initializeGuessBoxGrid() {
      this.guessBoxGrid = [...Array(6)].map(() =>
        Array(5).fill({ letter: "", state: KeyState.INITIAL })
      );
    },
    updateBoxGridCell(row: number, index: number, letter: Letter) {
      this.guessBoxGrid[row][index] = letter;
    },
  },
  getters: {
    getBoxGridCellByPosition(state) {
      return (position: GuessLetterPosition) =>
        state.guessBoxGrid[position.row][position.index];
    },
  },
});
