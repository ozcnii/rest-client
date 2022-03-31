import { createRouter, createWebHistory } from "vue-router";
import BodyVue from "../components/options/Body.vue";
import HeadersVue from "../components/options/Headers.vue";
import QueryVue from "../components/options/Query.vue";

const router = createRouter({
  routes: [
    {
      path: "/body",
      component: BodyVue,
    },
    {
      path: "/query",
      component: QueryVue,
    },
    {
      path: "/headers",
      component: HeadersVue,
    },
  ],
  history: createWebHistory(),
});

export { router };
