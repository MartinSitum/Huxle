<script setup lang="ts">
import GuessRow from "./GuessRow.vue";
import { useInitializeGuessBox } from "@/utils/composables";
import { useGuessBoxStore } from "@/stores/guessBoxStore";
import { useI18n } from "vue-i18n";
import Modal from "@/components/Modal.vue"
import { computed, ref } from "@vue/reactivity";

const { locale } = useI18n();

// Get store and initialize the grid
const letterGrid = useInitializeGuessBox(locale.value);

const guessBoxStore = useGuessBoxStore();

function isModalOpen() : boolean {
  console.log(guessBoxStore.getWinState)
  console.log(guessBoxStore.getWinState !== 0)
  return guessBoxStore.getWinState !== 0;
}


const modalOpen = computed(() => {
  console.log(guessBoxStore.getWinState !== 0)
  return guessBoxStore.getWinState !== 0
})

const modalMessage = computed(() => {
  let messages = [
    "You win!",
    "You lose!"
  ]

  return messages[guessBoxStore.getWinState-1]
})

const modalEmoji = computed(() => {
  return guessBoxStore.getWinState-1
})
</script>

<template>
  <div v-for="(row, index) in letterGrid" :key="'guessBoxRow-' + row.indexOf">
    <guess-row :row="row" :rowIndex="index"> </guess-row>
  </div>

  <Modal v-if="modalOpen" :closeable=false :message="modalMessage" :emojiID="modalEmoji"></Modal>

</template>

<style>

</style>
