import GuessLetterVue from "@/components/guessbox/GuessLetter.vue";
import type { Letter, GuessLetterPosition } from "@/types";
import { KeyState } from "@/types";
import constants from "@/utils/constants";
import { defineStore } from "pinia";
import { useKeyboardStore } from "@/stores/keyboardStore";

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
      const keyboardStore = useKeyboardStore();
      const keyStates = keyboardStore.keyStates;
      const solutionLetters: (string | null)[] = this.wordDe.split("");

      // Check for correct letters
      currRow.forEach((letter, i) => {
        if (letter.letter === solutionLetters[i]) {
          letter.state = KeyState.CORRECT;
          keyStates[letter.letter] = KeyState.CORRECT;
          solutionLetters[i] = null;
        }
      });

      // Check for existing letters
      currRow.forEach((letter) => {
        if (
          solutionLetters.includes(letter.letter) &&
          letter.state === KeyState.INITIAL
        ) {
          letter.state = KeyState.EXISTING;
          solutionLetters[solutionLetters.indexOf(letter.letter)] = null;
          if (!keyStates[letter.letter]) {
            keyboardStore.setKeyState(letter.letter, KeyState.EXISTING);
          }
        }
      });

      // Check for non-exisiting letters
      currRow.forEach((letter) => {
        if (letter.state === KeyState.INITIAL) {
          letter.state = KeyState.NONEXISTING;
          if (!keyStates[letter.letter])
            keyStates[letter.letter] = KeyState.NONEXISTING;
        }
      });

      currRow.forEach((letter) => {
        letter.revealed = true;
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
