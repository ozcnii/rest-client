import { createRouter, createWebHistory } from "vue-router";
import BodyVue from "../components/CenterBar/Options/Body.vue";
import HeadersVue from "../components/CenterBar/Options/Headers.vue";
import QueryParamsVue from "../components/CenterBar/Options/QueryParams.vue";

const router = createRouter({
  routes: [
    {
      path: "/",
      redirect: "/body",
      meta: { keepAlive: true },
    },
    {
      path: "/body",
      component: BodyVue,
      meta: { keepAlive: true },
    },
    {
      path: "/params",
      component: QueryParamsVue,
      meta: { keepAlive: true },
    },
    {
      path: "/headers",
      component: HeadersVue,
      meta: { keepAlive: true },
    },
  ],
  history: createWebHistory(),
});

export { router };
