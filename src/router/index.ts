import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { authGuard } from "../auth/authGuard";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/debates",
  },
  {
    path: "/debates",
    name: "Debates",
    beforeEnter: authGuard,
    component: () => import("../views/Debates.vue"),
  },
  {
    path: "/arguments",
    name: "Arguments",
    beforeEnter: authGuard,
    component: () => import("../views/Arguments.vue"),
  },
  {
    path: "/argument",
    name: "Argument",
    beforeEnter: authGuard,
    component: () => import("../views/Argument.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
