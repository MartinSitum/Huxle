<script setup lang="ts">
import { ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as crypto from "crypto-js";

let wordEn = ref("");
let wordDe = ref("");
let URL = ref("");
let modalOpen = ref(false);

//TODO: Change the types of the parameters and functions here
function validateWord(value: any) {
  if (!value) {
    return "This field is required";
  }
  if (value.length !== 5) {
    return "The word must be 5 letters long";
  }
  const regex = /^[A-Z]+$/i;
  if (!regex.test(value)) {
    return "The word can only contain alphabetic characters";
  }

  return true;
}

function onSubmit(values: any) {
  let valueString = values["word-en"].toUpperCase() + "." + values["word-de"].toUpperCase()
  let hashCode = crypto.AES.encrypt(
    valueString,
    "values"
  );
  URL.value = `http://localhost:5173/?play=${hashCode.toString()}`;
  modalOpen.value = true;
}

function copy() {
  navigator.clipboard.writeText(URL.value);
}
</script>

<template>
  <div class="h-full mt-16">
    <Form @submit="onSubmit">
      <div class="mb-6">
        <label class="block" for="word-en">{{ $t("create.wordEn") }}</label>
        <Field
          class="block bg-gray-50 border border-gray-300 text-gray-900 rounded w-full p-2 uppercase"
          type="text"
          id="word-en"
          name="word-en"
          :rules="validateWord"
        />
        <ErrorMessage name="word-en" />
      </div>
      <div class="mb-6">
        <label class="block" for="word-de">{{ $t("create.wordDe") }}</label>
        <Field
          class="block bg-gray-50 border border-gray-300 text-gray-900 rounded w-full p-2 uppercase"
          type="text"
          id="word-de"
          name="word-de"
          :rules="validateWord"
        />
        <ErrorMessage name="word-de" />
      </div>
      <button
        type="submit"
        class="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
      {{ $t("create.createHuxle") }}
      </button>
    </Form>
  </div>

  <!--Modal-->
  <div class="flex justify-center">
    <div
      v-show="modalOpen"
      class="absolute inset-0 flex items-center justify-center z-10"
    >
      <div class="max-w-2xl p-6 rounded-lg shadow-xl bg-slate-800 z-10">
        <div class="flex items-center justify-between">
          <h3 class="text-2xl">Huxle Created</h3>
          <svg
            @click="modalOpen = false"
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8 text-red-900 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div class="mt-4">
          <p class="mb-4 text-sm">Use this link to share your huxle:</p>
          <div class="flex">
            <input
              ref="clone"
              readonly
              :value="URL"
              class="text-md overflow-clip break-all w-72 h-8 flex-initial border-2 rounded bg-slate-900 border-slate-400 px-2 py-0.5"
            />
            <button flex-none @click="copy">Copy</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
