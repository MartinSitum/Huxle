<script setup lang="ts">
import { ref } from "vue";
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as crypto from "crypto-js";

let wordEn = ref("");
let wordDe = ref("");
let URL = ref("");
let modalOpen = ref(false);


//TODO: Change the types of the parameters and functions here
function validateWord(value: any) {
  if (!value) {
    return 'This field is required'
  }
  if (value.length !== 5) {
    return 'The word must be 5 letters long'
  }
  const regex = /^[A-Z]+$/i;
  if (!regex.test(value)) {
    return 'The word can only contain alphabetic characters';
  }

  return true;
}

function onSubmit(values: any) {
  let hashCode = crypto.AES.encrypt(values["word-en"]+"."+values["word-de"], 'values')
  console.log(hashCode.toString());
  URL.value=`http://127.0.0.1:5173/#${hashCode.toString()}`
  modalOpen.value = true;
}
</script>

<template>
  <div class="h-full mt-16">
    <Form @submit="onSubmit">
      <div class="mb-6">
        <label class="block" for="word-en">Word in English</label>
        <Field class="block bg-gray-50 border border-gray-300 text-gray-900 rounded w-full p-2" type="text" id="word-en"
          name="word-en" :rules="validateWord" />
        <ErrorMessage name="word-en" />
      </div>
      <div class="mb-6">
        <label class="block" for="word-de">Word in German</label>
        <Field class="block bg-gray-50 border border-gray-300 text-gray-900 rounded w-full p-2" type="text" id="word-de"
          name="word-de" :rules="validateWord" />
        <ErrorMessage name="word-de" />

      </div>
      <button type="submit"
        class="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Create Huxle
      </button>
    </Form>
  </div>

  <!--Modal-->
  <div class="flex justify-center">
    <div v-show="modalOpen" class="
            absolute
            inset-0
            flex
            items-center
            justify-center
            z-10">
      <div class="max-w-2xl p-6 rounded-md shadow-xl bg-slate-800 z-10">
        <div class="flex items-center justify-between">
          <h3 class="text-2xl">Huxle Created</h3>
          <svg @click="modalOpen = false" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-red-900 cursor-pointer"
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="mt-4">
          <p class="mb-4 text-sm">
            Use this link to share your huxle:
          </p>
          <p class="text-md">
            {{ URL }}
          </p>
          <button>Copy</button>
        </div>
      </div>
    </div>
  </div>
</template>
