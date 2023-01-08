import GuessLetterVue from "@/components/guessbox/GuessLetter.vue";
import type { Letter, GuessLetterPosition } from "@/types";
import { KeyState } from "@/types";
import constants from "@/utils/constants";
import { defineStore } from "pinia";

interface KeyboardState {
  keyStates: Record<string, KeyState>;
}

export const useKeyboardStore = defineStore("keyboard", {
  state: (): KeyboardState => {
    return {
      keyStates: {},
    };
  },
  actions: {
    setKeyState(key: string, state: KeyState) {
      this.keyStates[key] = state;
    },
    setInitialKeyStates(keys: string[]) {
      keys.forEach((key) => {
        this.keyStates[key] = KeyState.INITIAL;
      });
    },
  },
  getters: {
    getKeyState(state) {
      return (key: string): KeyState => state.keyStates[key];
    },
  },
});
