<script setup lang="ts">
import GuessRow from "./GuessRow.vue";
import { useGuessBoxStore } from "@/stores/guessBoxStore";
import type { Letter } from "@/types";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useDecryptCurrentUrl } from "@/utils/composables";

// Get store and initialize the grid
const store = useGuessBoxStore();
store.initializeGuessBoxGrid();
const letterGrid = store.guessBoxGrid;

// Get words from url param
const { wordDe, wordEn } = useDecryptCurrentUrl();
store.wordDe = wordDe.value;
store.wordEn = wordEn.value;
</script>

<template>
  <div v-for="(row, index) in letterGrid" :key="'guessBoxRow-' + row.indexOf">
    <guess-row :row="row" :rowIndex="index"> </guess-row>
  </div>
</template>

<style></style>
