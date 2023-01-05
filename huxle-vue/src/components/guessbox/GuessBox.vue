<script setup lang="ts">
import GuessRow from "./GuessRow.vue";
import { useGuessBoxStore } from "@/stores/guessBoxStore";
import type { Letter } from "@/types";

// Get store and initialize the Grid
const store = useGuessBoxStore();
store.initializeGuessBoxGrid();
const letterGrid = store.guessBoxGrid;
</script>
<template>
  <div v-for="(row, index) in letterGrid" :key="'guessBoxRow-' + row.indexOf">
    <guess-row :row="row" :rowIndex="index"> </guess-row>
  </div>
</template>
<style></style>
