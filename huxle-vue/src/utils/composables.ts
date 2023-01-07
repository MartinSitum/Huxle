import { computed, ref, type ComputedRef } from "vue";
import { useRoute } from "vue-router";
import * as crypto from "crypto-js";
import { KeyState, type Letter } from "@/types";

export function useDecryptCurrentUrl() {
  const route = useRoute();

  const wordEn = ref("");
  const wordDe = ref("");
  const playQuery = route.query.play;
  console.log(playQuery);
  let playString = "";

  if (playQuery) {
    playString = crypto.AES.decrypt(playQuery.toString(), "values").toString(
      crypto.enc.Utf8
    );
    console.log(playString);
    wordEn.value = playString.split(".")[0];
    wordDe.value = playString.split(".")[1];
  }

  return { wordDe, wordEn };
}

export function useLetterBackground(keyLetter: ComputedRef) {
  const letterBackgroundColor = computed(() => ({
    "bg-green-500": keyLetter.value.state === KeyState.CORRECT,
    "bg-yellow-500": keyLetter.value.state === KeyState.EXISTING,
    "bg-red-500": keyLetter.value.state === KeyState.NONEXISTING,
  }));
  return letterBackgroundColor;
}