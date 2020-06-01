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
    path: "/messages",
    component: () => import("../layouts/Dashboard"),
    children: [
      {
        path: "room",
        component: () => import("../layouts/Room"),
        children: [
          {
            path: "",
            name: "room-list",
            component: () => import("../pages/room/List"),
            meta: {
              breadcrumbs: [
                {
                  text: "Room List",
                  icon: "mdi-clipboard-list-outline",
                  to: { name: "room-list" },
                },
              ],
            },
          },

          {
            path: "create",
            name: "room-form",
            component: () => import("../pages/room/Form"),
            meta: {
              breadcrumbs: [
                {
                  text: "Room List",
                  icon: "mdi-clipboard-list-outline",
                  to: { name: "room-list" },
                },

                {
                  text: "Room Form",
                  icon: "mdi-form-select",
                  to: { name: "room-form" },
                },
              ],
            },
          },
        ],
      },
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
