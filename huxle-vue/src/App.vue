<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <main class="flex flex-col h-screen max-w-md mx-auto justify-evenly">
    <RouterView />
  </main>
</template>

<style scoped></style>
