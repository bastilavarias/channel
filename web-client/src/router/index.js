import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import { ACCOUNT_CHECK_AUTHENTICATION } from "../store/types/account";
import $socket from "../socket-io-client";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../pages/Login"),
  },

  {
    path: "/room",
    component: () => import("../layouts/RoomChatWindow"),
    meta: {
      requiresAuth: true,
    },
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

      {
        path: "chats/:roomId",
        name: "chat-list",
        component: () => import("../pages/room/ChatList"),
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
  const currentAccount = store.state.account.current;
  $socket.emit("chat_recent", currentAccount.id);
  const isProtectedRoute = to.matched.some(
    (record) => record.meta.requiresAuth
  );
  // if (isProtectedRoute && !currentAccount.isAuthenticated)
  //   return next({ name: "login" });
  // if (to.name === "login" && currentAccount.isAuthenticated) {
  //   next({ name: "room-list" });
  // }
  // if (to.name === "github-login" && currentAccount.isAuthenticated) {
  //   next({ name: "room-list" });
  // }
  next();
});

export default router;
