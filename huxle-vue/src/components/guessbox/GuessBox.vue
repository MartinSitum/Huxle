<script setup lang="ts">
import GuessRow from "./GuessRow.vue";
import { useGuessBoxStore } from "@/stores/guessBoxStore";
import type { Letter } from "@/types";
import { ref } from "vue";
import { useRoute } from "vue-router";
import * as crypto from "crypto-js";

// Get store and initialize the Grid
const store = useGuessBoxStore();
store.initializeGuessBoxGrid();
const letterGrid = store.guessBoxGrid;

const route = useRoute();

let wordEn = ref("");
let wordDe = ref("");

let playQuery = route.query.play
let playString = ""

if(playQuery) {
  playString =  crypto.AES.decrypt(playQuery.toString(), 'values').toString(crypto.enc.Utf8)
  wordEn.value = playString.split(".")[0]
  wordDe.value = playString.split(".")[1]
}

</script>

<template>
  <div v-for="(row, index) in letterGrid" :key="'guessBoxRow-' + row.indexOf">
    <guess-row :row="row" :rowIndex="index"> </guess-row>
  </div>
</template>

<style>

</style>
