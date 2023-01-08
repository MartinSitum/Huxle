<script setup lang="ts">
import { useGuessBoxStore } from "@/stores/guessBoxStore";
import { KeyState, type GuessLetterPosition, type Letter } from "@/types";
import { useLetterBackground } from "@/utils/composables";
import { computed, type ComputedRef } from "vue";

const guessBoxStore = useGuessBoxStore();

const props = defineProps<{
  // keyLetter: Letter;
  position: GuessLetterPosition;
}>();

const keyLetter: ComputedRef<Letter> = computed(() => {
  return guessBoxStore.getBoxGridCellByPosition(props.position);
});

const letterState: ComputedRef<KeyState> = computed(() => {
  return keyLetter.value.state;
});

const letterBackgroundColor = useLetterBackground(letterState);
</script>
<template>
  <div class="flex items-center justify-center border-2 border-gray-400 h-20 uppercase"
    :class="keyLetter.revealed ? letterBackgroundColor : ''">
    {{ keyLetter.letter }}
  </div>
</template>
<style>

</style>
