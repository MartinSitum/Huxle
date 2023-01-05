<script setup lang="ts">
import { useGuessBoxStore } from "@/stores/guessBoxStore";
import type { GuessLetterPosition, Letter } from "@/types";
import { computed } from "vue";

const guessBoxStore = useGuessBoxStore();

const props = defineProps<{
  // keyLetter: Letter;
  position: GuessLetterPosition;
}>();

const keyLetter = computed(() => {
  return guessBoxStore.getBoxGridCellByPosition(props.position);
});
</script>
<template>
  <div
    class="flex items-center justify-center border-2 border-gray-400 h-20 uppercase"
  >
    {{ keyLetter.letter }}
  </div>
</template>
<style></style>
