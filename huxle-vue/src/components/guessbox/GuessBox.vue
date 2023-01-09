<script setup lang="ts">
import GuessRow from "./GuessRow.vue";
import { useInitializeGuessBox } from "@/utils/composables";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

// Get store and initialize the grid
const letterGrid = useInitializeGuessBox(locale.value);
</script>

<template>
  <div v-for="(row, index) in letterGrid" :key="'guessBoxRow-' + row.indexOf">
    <guess-row :row="row" :rowIndex="index"> </guess-row>
  </div>
</template>

<style>

</style>
