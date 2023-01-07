<script setup lang="ts">
import { useGuessBoxStore } from "@/stores/guessBoxStore";
import constants from "@/utils/constants";
import type { KeyState, Letter } from "../../types";
import KeyboardKey from "./KeyboardKey.vue";

const guessBoxStore = useGuessBoxStore();

defineProps<{
  keyStates: Record<string, KeyState>;
}>();

const rows = [
  "qwertyuiop".split(""),
  "asdfghjkl".split(""),
  ["Enter", ..."zxcvbnm".split(""), "Backspace"],
];

function keyPressed(letter: string, state: KeyState) {
  if (letter === "Backspace") {
    // Delete letter on Backspace click
    guessBoxStore.updateBoxGridCell(
      guessBoxStore.currentRow,
      guessBoxStore.currentIndex - 1,
      { letter: "", state }
    );

    guessBoxStore.decrementCurrentIndex();
  } else if (letter === "Enter") {
    // Jump to new row on Enter click
    if (guessBoxStore.currentIndex === constants.maxIndex) {
      guessBoxStore.checkCurrentBoxGridRow();
      guessBoxStore.incrementCurrentRow();
      guessBoxStore.resetCurrentIndex();
    }
  } else {
    // Add letter on any Button click
    if (guessBoxStore.currentIndex < constants.maxIndex) {
      guessBoxStore.updateBoxGridCell(
        guessBoxStore.currentRow,
        guessBoxStore.currentIndex,
        { letter, state }
      );
    }

    guessBoxStore.incrementCurrentIndex();
  }
}
</script>

<template>
  <div id="keyboard">
    <div class="flex w-full mb-2" :key="row.indexOf" v-for="(row, i) in rows">
      <div class="flex-[0.5_1_0%]" v-if="i === 1"></div>
      <keyboard-key
        @key-pressed="keyPressed"
        :key="key"
        v-for="key in row"
        :keyState="keyStates[key]"
        :keyLetter="key"
      >
      </keyboard-key>
      <div class="flex-[0.5_1_0%]" v-if="i === 1"></div>
    </div>
  </div>
</template>

<style scoped>
#keyboard {
  user-select: none;
}
</style>
