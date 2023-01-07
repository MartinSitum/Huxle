<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

function changeLanguage(newLang: string) {
  locale.value = newLang;
}

</script>
<template>
  <div>
    <button
      v-for="locale in $i18n.availableLocales"
      :key="'locale-' + locale"
      class="text-white hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-200 font-medium rounded-lg text-sm w-full sm:w-auto px-2.5 py-1.5 mx-1 text-center uppercase"
      :class="locale === $i18n.locale ? 'bg-slate-700' : ''"
      @click="changeLanguage(locale)"
    >
      {{ locale }}
    </button>
  </div>
</template>
<style></style>
