import { createApp } from "vue";
import { createPinia } from "pinia";
import { i18n } from "./i18n/setup";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import "./assets/tailwind.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount("#app");
