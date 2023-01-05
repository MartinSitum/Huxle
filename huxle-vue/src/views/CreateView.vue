<script setup lang="ts">
import { ref } from "vue";
import { Form, Field, ErrorMessage } from 'vee-validate';

let wordEn = ref("");
let wordDe = ref("");

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
  console.log(values)
}
</script>

<template>
  <div>
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
</template>
