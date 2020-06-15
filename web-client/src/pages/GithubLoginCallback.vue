<template>
  <v-app>
    <v-container class="fill-height">
      <v-row justify="center" align-content="center">
        <div class="text-center">
          <v-icon :size="150" color="primary">mdi-github</v-icon>
          <div style="margin-bottom: 2rem;"></div>
          <h1 class="display-1 mb-5 font-weight-bold primary--text">
            Connecting to GitHub...
          </h1>
          <v-progress-circular
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { ACCOUNT_LOGIN } from "../store/types/account";
import store from "../store";

export default {
  computed: {
    recentChats() {
      const chats = this.$store.state.chat.recent;
      return chats ? chats : [];
    },
  },

  async created() {
    const { code } = this.$route.query;
    await this.$store.dispatch(ACCOUNT_LOGIN, code);
    const recentChats = store.state.chat.recent;
    const redirectRouteName =
      recentChats.length > 0
        ? { name: "chat-list", params: { roomId: recentChats[0].room.id } }
        : { name: "room-list" };
    await this.$router.push(redirectRouteName);
  },
};
</script>
