<script setup lang="ts">
import { ref } from "vue";
import Keyboard from "../components/keyboard/Keyboard.vue";
import type { KeyState } from "@/types";

const keyStates: Record<string, KeyState> = ref({});
</script>

<template>
  <main>
    <div class="flex flex-col h-screen max-w-md">
      <Keyboard :key-states="keyStates" />
    </div>
  </main>
</template>
