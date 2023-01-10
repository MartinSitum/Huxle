import GuessLetterVue from "@/components/guessbox/GuessLetter.vue";
import type { Letter, GuessLetterPosition } from "@/types";
import { KeyState } from "@/types";
import constants from "@/utils/constants";
import { defineStore } from "pinia";
import { useKeyboardStore } from "@/stores/keyboardStore";
import { useI18n } from "vue-i18n";
import { i18n } from "../i18n/setup";

interface GuessBoxState {
  currentRow: number; // current row in the grid
  currentIndex: number; // current cell on the current row
  guessBoxGrid: Letter[][];
  currLang: string;
  wordDe: string;
  wordEn: string;
  winState: number;
}

export const useGuessBoxStore = defineStore("guessBox", {
  state: (): GuessBoxState => {
    return {
      currentRow: 0,
      currentIndex: 0,
      guessBoxGrid: [],
      currLang: "",
      wordDe: "",
      wordEn: "",
      winState: 0
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
    initializeGuessBoxGrid(locale: string): void {
      this.guessBoxGrid = [...Array(6)].map(() =>
        Array(5).fill({ letter: "", state: KeyState.INITIAL })
      );
      this.currLang = locale;
    },
    updateBoxGridCell(row: number, index: number, letter: Letter): void {
      this.guessBoxGrid[row][index] = letter;
    },
    checkCurrentBoxGridRow() {
      const currRow: Letter[] = this.getCurrentBoxGridRow;
      const keyboardStore = useKeyboardStore();
      const keyStates = keyboardStore.keyStates;
      let correctLetterCount = 0;
      let solutionLetters: (string | null)[] = [];
      if (this.currLang === "de") {
        solutionLetters = this.wordDe.split("");
      } else {
        solutionLetters = this.wordEn.split("");
      }

      // Check for correct letters
      currRow.forEach((letter, i) => {
        if (letter.letter === solutionLetters[i]) {
          letter.state = KeyState.CORRECT;
          keyStates[letter.letter] = KeyState.CORRECT;
          solutionLetters[i] = null;
          correctLetterCount++;
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

      // Reveal
      currRow.forEach((letter) => {
        letter.revealed = true;
      });

      //Check for end condition
      if(correctLetterCount === 5) {
        this.winState = 1;
      } else if((this.currentRow+1) >= constants.maxRows){
        this.winState = 2;
      }
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
    getWinState(state) : number {
      return state.winState;
    }
  },
});
