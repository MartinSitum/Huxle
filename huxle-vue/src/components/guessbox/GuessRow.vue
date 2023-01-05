<script setup lang="ts">
import GuessLetter from "./GuessLetter.vue";
import type { Letter } from "@/types";

defineProps<{
  row: Letter[];
  rowIndex: number;
}>();
</script>
<template>
  <div class="grid max-w-md grid-cols-5 gap-1 mx-auto mb-1">
    <guess-letter
      v-for="(item, index) in row"
      :key="item.letter"
      :keyLetter="item"
      :position="{ row: rowIndex, index }"
    >
    </guess-letter>
  </div>
</template>
<style></style>
