import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreateView from "../views/CreateView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Play",
      component: HomeView,
    },
    {
      path: "/create",
      name: "Create new Huxle",
      component: CreateView,
    },
  ],
});

export default router;
