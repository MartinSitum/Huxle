<script setup lang="ts">
import Keyboard from "../components/keyboard/Keyboard.vue";
import GuessBox from "@/components/guessbox/GuessBox.vue";
import Modal from "@/components/Modal.vue"
import { ref } from "@vue/reactivity";

let modalOpen = ref(false);
</script>

<template>
  <div>
    <guess-box></guess-box>
    <Keyboard />
    <Modal :open="modalOpen" :closeable=false message="You win!" :emojiID=0></Modal>
  </div>
</template>
