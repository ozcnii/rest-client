import { createRouter, createWebHistory } from "vue-router";
import BodyVue from "../components/options/Body.vue";
import HeadersVue from "../components/options/Headers.vue";
import QueryParamsVue from "../components/options/QueryParams.vue";

const router = createRouter({
  routes: [
    {
      path: "/body",
      component: BodyVue,
    },
    {
      path: "/params",
      component: QueryParamsVue,
    },
    {
      path: "/headers",
      component: HeadersVue,
    },
  ],
  history: createWebHistory(),
});

export { router };
