<script setup lang="ts">
import type { KeyState } from "@/types";
import { useLetterBackground } from "@/utils/composables";
import { computed, type ComputedRef } from "vue";
import { useKeyboardStore } from "@/stores/keyboardStore";

const props = defineProps<{
  keyState: KeyState;
  keyLetter: string;
}>();

const keyboardStore = useKeyboardStore();

const keyState: ComputedRef<KeyState> = computed(() => {
  return keyboardStore.getKeyState(props.keyLetter);
});

const letterBackgroundColor = useLetterBackground(keyState);
</script>
<template>
  <button
    class="h-12 mr-1 last-of-type:mr-0 font-bold rounded text-slate-800 flex-1 justify-center items-center uppercase"
    :class="[keyLetter.length > 1 && 'flex-[1.5_1_0%]', letterBackgroundColor]"
    @click="$emit('keyPressed', keyLetter, keyState)">
    <span v-if="keyLetter !== 'Backspace'">{{ keyLetter }}</span>
    <span v-else>Undo</span>
  </button>
</template>
<style>

</style>
