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
  const isAuthenticated = store.state.account.isAuthenticated;
  const isProtectedRoute = to.matched.some(
    (record) => record.meta.requiresAuth
  );
  if (isProtectedRoute && !isAuthenticated) return next({ name: "login" });
  if (to.name === "login" && isAuthenticated) {
    const joinedRooms = store.state.room.joined;
    next({ name: "chat-list", params: { roomId: joinedRooms[0].id } });
  }
  if (to.name === "github-login" && isAuthenticated) {
    const joinedRooms = store.state.room.joined;
    next({ name: "chat-list", params: { roomId: joinedRooms[0].id } });
  }
  next();
});

export default router;
