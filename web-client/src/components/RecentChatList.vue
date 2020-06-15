<template>
  <v-card flat color="white">
    <v-card-title class="font-weight-bold">Recent Chats</v-card-title>
    <v-list rounded dense>
      <v-text-field
        dense
        rounded
        filled
        single-line
        label="Search room name"
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>
      <template v-for="(chat, index) in recentChats">
        <v-list-item :key="index" @click="goToRoom(chat.room.id)">
          <v-list-item-avatar :size="45">
            <v-img
              :src="chat.room.avatarUrl"
              :lazy-src="chat.room.avatarUrl"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              <div class="d-flex align-center">
                <span class="title font-weight-bold">{{ chat.room.name }}</span>
                <span>
                  <span class="mx-1">·</span>
                  {{ formatTimestamp(chat.createdAt) }}
                </span>
              </div>
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ previewMessage(chat) }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <div class="text-center" v-if="recentChats.length === 0">
      <v-avatar :size="100">
        <v-img
          src="../assets/icons8/chat-messages.png"
          lazy-src="../assets/icons8/chat-messages.png"
        ></v-img>
      </v-avatar>
      <h1 class="title mb-1">No recent chats</h1>
      <h2 class="subtitle-2">Lorem ipsum dolor sit amet.</h2>
    </div>
  </v-card>
</template>

<script>
import customUtilities from "../common/customUtilities";

export default {
  name: "recent-chat-list",

  mixins: [customUtilities],

  computed: {
    currentAccount() {
      return this.$store.state.account.current;
    },

    recentChats() {
      const chats = this.$store.state.chat.recent;
      return chats ? chats : [];
    },
  },

  methods: {
    goToRoom(roomId) {
      this.$router.push({
        name: "chat-list",
        params: {
          roomId,
        },
      });
    },

    previewMessage({ type, message, account }) {
      const gotFirstName = this.getFirstName(account.name);
      let customMessage = "";
      switch (type) {
        case "regular":
          customMessage = `${gotFirstName}: ${message}`;
          break;

        case "system":
          customMessage = message;
          break;

        default:
          customMessage = "Something went wrong.";
      }
      return customMessage;
    },
  },
};
</script>
