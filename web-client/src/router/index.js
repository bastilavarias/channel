import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../pages/Login"),
  },

  {
    path: "/dashboard",
    component: () => import("../layouts/Dashboard"),
    children: [
      {
        path: ":chatId",
        name: "chat-window",
        component: () => import("../pages/ChatWindow"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
