<script setup lang="ts">
import { ref } from "vue";

let wordEn = ref("");
let wordDe = ref("");
</script>

<template>
  <div>
    <form action="">
      <div class="mb-6">
        <label class="block" for="word-en">Word in English</label>
        <input
          class="block bg-gray-50 border border-gray-300 text-gray-900 rounded w-full p-2"
          type="text"
          id="word-en"
          name="word-en"
        />
      </div>
      <div class="mb-6">
        <label class="block" for="word-de">Word in German</label>
        <input
          class="block bg-gray-50 border border-gray-300 text-gray-900 rounded w-full p-2"
          type="text"
          id="word-de"
          name="word-de"
        />
      </div>
      <button
        type="submit"
        class="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Create Huxle
      </button>
    </form>
  </div>
</template>
