import { createI18n } from "vue-i18n";
import { messages } from "./messages";

const availableLocales = ["de", "en"];

export const i18n = createI18n({
  locale: "de",
  fallbackLocale: "en",
  availableLocales,
  messages,
});
