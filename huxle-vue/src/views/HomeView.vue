<script setup lang="ts">
import { ref } from "vue";
import Keyboard from "../components/keyboard/Keyboard.vue";
import GuessBox from "@/components/guessbox/GuessBox.vue";
import type { KeyState } from "@/types";

const keyStates: Record<string, KeyState> = ref({});
</script>

<template>
  <div>
    <guess-box></guess-box>
    <Keyboard :key-states="keyStates" />
  </div>
</template>
