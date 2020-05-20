import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/debates",
  },
  {
    path: "/debates",
    name: "Debates",
    component: () => import("../views/Debates.vue"),
  },
  {
    path: "/arguments",
    name: "Arguments",
    component: () => import("../views/Arguments.vue"),
  },
  {
    path: "/argument",
    name: "Argument",
    component: () => import("../views/Argument.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
