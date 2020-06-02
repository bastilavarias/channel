import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import { ACCOUNT_CHECK_AUTHENTICATION } from "../store/types/account";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../pages/Login"),
  },

  {
    path: "/chats",
    component: () => import("../layouts/ChatWindow"),
    meta: {
      requiresAuth: true,
    },
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
        path: ":roomId",
        name: "chat-list",
        component: () => import("../pages/ChatList"),
      },
    ],
  },

  {
    path: "/github-login-callback",
    name: "github-login",
    component: () => import("../pages/GithubLoginCallback"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  await store.dispatch(ACCOUNT_CHECK_AUTHENTICATION);
  const isAuthenticated = store.state.account.isAuthenticated;
  const isProtectedRoute = to.matched.some(
    (record) => record.meta.requiresAuth
  );
  if (isProtectedRoute && !isAuthenticated) return next({ name: "login" });
  if (to.name === "login" && isAuthenticated) {
    next({ name: "chat-list", params: { roomId: "123456789" } });
  }
  if (to.name === "github-login" && isAuthenticated) {
    next({ name: "chat-list", params: { roomId: "123456789" } });
  }
  next();
});

export default router;
