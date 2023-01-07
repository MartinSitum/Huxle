import { ref } from "vue";
import { useRoute } from "vue-router";
import * as crypto from "crypto-js";

export function useDecryptCurrentUrl() {
  const route = useRoute();

  const wordEn = ref("");
  const wordDe = ref("");
  const playQuery = route.query.play;
  let playString = "";

  if (playQuery) {
    playString = crypto.AES.decrypt(playQuery.toString(), "values").toString(
      crypto.enc.Utf8
    );
    wordEn.value = playString.split(".")[0];
    wordDe.value = playString.split(".")[1];
  }

  return { wordDe, wordEn };
}
