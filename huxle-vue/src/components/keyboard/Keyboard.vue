<script setup lang="ts">
import type { KeyState } from "../../types";
import KeyboardKey from "./KeyboardKey.vue";

defineProps<{
  keyStates: Record<string, KeyState>;
}>();

const rows = [
  "qwertyuiop".split(""),
  "asdfghjkl".split(""),
  ["Enter", ..."zxcvbnm".split(""), "Backspace"],
];

function keyPressed(key: string) {
  console.log(key);
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
