<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import LanguagePicker from "./components/LanguagePicker.vue";

const route = useRoute();
const routeName = computed(() => {
  return route.name;
});
</script>

<template>
  <div class="h-screen">
    <header class="flex justify-end items-center w-full bg-green-400 h-10">
      <div>HUXLE - {{ routeName }}</div>
      <language-picker class="mx-10"></language-picker>
    </header>
    <main class="flex flex-col max-w-md mx-auto justify-evenly ">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
