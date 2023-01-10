<script setup lang="ts">import { ref } from '@vue/reactivity';

let emojis = ["🎉","😢"]

const props = defineProps<{
  // keyLetter: Letter;
  open: boolean,
  message: string,
  closeable: boolean,
  emojiID: number
}>();

let modalOpen: boolean = props.open;
</script>

<template>
    <!--Modal-->
        <div v-show="modalOpen" class="absolute inset-0 flex items-center justify-center z-10 ">
            <div class="max-w-2xl p-6 rounded-lg shadow-xl bg-slate-800 z-10 w-2/4 h-2/5">
                <div class="flex items-center justify-between w-full">
                    <h3 class="text-4xl flex-auto mx-auto text-center text-slate-100 px-auto">{{ message }}</h3>
                    <svg v-if="closeable" @click="modalOpen = false" xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6 flex-none text-red-900 cursor-pointer" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <h1 class="w-full h-full text-8xl text-center text pt-10 mx-auto px-auto">{{ emojis[emojiID] }}</h1>
                </div>
            </div>
        </div>
</template>
<style>

</style>
