import GuessLetterVue from "@/components/guessbox/GuessLetter.vue";
import type { Letter, GuessLetterPosition } from "@/types";
import { KeyState } from "@/types";
import constants from "@/utils/constants";
import { defineStore } from "pinia";

interface GuessBoxState {
  currentRow: number; // current row in the grid
  currentIndex: number; // current cell on the current row
  guessBoxGrid: Letter[][];
  wordDe: string;
  wordEn: string;
}

export const useGuessBoxStore = defineStore("guessBox", {
  state: (): GuessBoxState => {
    return {
      currentRow: 0,
      currentIndex: 0,
      guessBoxGrid: [],
      wordDe: "",
      wordEn: "",
    };
  },
  actions: {
    incrementCurrentRow(): void {
      if (this.currentRow < constants.maxRows) this.currentRow++;
    },
    decrementCurrentRow(): void {
      if (this.currentRow > 1) this.currentRow--;
    },
    incrementCurrentIndex(): void {
      if (this.currentIndex < constants.maxIndex) this.currentIndex++;
    },
    decrementCurrentIndex(): void {
      if (this.currentIndex > 0) this.currentIndex--;
    },
    resetCurrentIndex(): void {
      this.currentIndex = 0;
    },
    initializeGuessBoxGrid(): void {
      this.guessBoxGrid = [...Array(6)].map(() =>
        Array(5).fill({ letter: "", state: KeyState.INITIAL })
      );
    },
    updateBoxGridCell(row: number, index: number, letter: Letter): void {
      this.guessBoxGrid[row][index] = letter;
    },
    checkCurrentBoxGridRow() {
      const currRow: Letter[] = this.getCurrentBoxGridRow;

      const solutionLetters: (string | null)[] = this.wordDe.split("");
      currRow.forEach((letter, i) => {
        if (letter.letter === solutionLetters[i]) {
          letter.state = KeyState.CORRECT;
          solutionLetters[i] = null;
        }
      });

      currRow.forEach((letter, i) => {
        if (
          solutionLetters.includes(letter.letter) &&
          letter.state === KeyState.INITIAL
        ) {
          letter.state = KeyState.EXISTING;
          solutionLetters[solutionLetters.indexOf(letter.letter)] = null;
        }
      });
    },
  },
  getters: {
    getBoxGridCellByPosition(state) {
      return (position: GuessLetterPosition): Letter =>
        state.guessBoxGrid[position.row][position.index];
    },
    getCurrentBoxGridRow(state): Letter[] {
      return state.guessBoxGrid[this.currentRow];
    },
  },
});
