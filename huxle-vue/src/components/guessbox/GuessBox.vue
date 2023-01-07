<script setup lang="ts">
import GuessRow from "./GuessRow.vue";
import { useGuessBoxStore } from "@/stores/guessBoxStore";
import type { Letter } from "@/types";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useDecryptCurrentUrl } from "@/utils/composables";

// Get store and initialize the Grid
const store = useGuessBoxStore();
store.initializeGuessBoxGrid();
const letterGrid = store.guessBoxGrid;

const route = useRoute();

const { wordDe, wordEn } = useDecryptCurrentUrl();
</script>

<template>
  <div v-for="(row, index) in letterGrid" :key="'guessBoxRow-' + row.indexOf">
    <guess-row :row="row" :rowIndex="index"> </guess-row>
  </div>
</template>

<style></style>
