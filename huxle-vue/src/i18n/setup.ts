import { createI18n } from "vue-i18n";
import { messages } from "./messages";

const availableLocales = ["de", "en"];

export const instance = createI18n({
  legacy: false,
  locale: "de",
  fallbackLocale: "en",
  availableLocales,
  messages,
});

export default instance;

export const i18n = instance.global;