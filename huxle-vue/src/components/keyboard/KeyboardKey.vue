<script setup lang="ts">
import type { KeyState } from "@/types";
import { useLetterBackground } from "@/utils/composables";
import { computed } from "vue";

const props = defineProps<{
  keyState: KeyState;
  keyLetter: string;
}>();
</script>
<template>
  <button
    class="h-12 mr-1 last-of-type:mr-0 font-bold rounded bg-slate-100 text-slate-800 flex-1 justify-center items-center uppercase"
    :class="[keyLetter.length > 1 && 'flex-[1.5_1_0%]']"
    @click="$emit('keyPressed', keyLetter, keyState)"
  >
    <span v-if="keyLetter !== 'Backspace'">{{ keyLetter }}</span>
    <span v-else>Undo</span>
  </button>
</template>
<style></style>
