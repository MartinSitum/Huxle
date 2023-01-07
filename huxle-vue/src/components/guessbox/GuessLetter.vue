<script setup lang="ts">
import { useGuessBoxStore } from "@/stores/guessBoxStore";
import { KeyState, type GuessLetterPosition, type Letter } from "@/types";
import { useLetterBackground } from "@/utils/composables";
import { computed } from "vue";

const guessBoxStore = useGuessBoxStore();

const props = defineProps<{
  // keyLetter: Letter;
  position: GuessLetterPosition;
}>();

const keyLetter = computed(() => {
  return guessBoxStore.getBoxGridCellByPosition(props.position);
});

const letterBackgroundColor = useLetterBackground(keyLetter);
</script>
<template>
  <div
    class="flex items-center justify-center border-2 border-gray-400 h-20 uppercase"
    :class="letterBackgroundColor"
  >
    {{ keyLetter.letter }}
  </div>
</template>
<style></style>
