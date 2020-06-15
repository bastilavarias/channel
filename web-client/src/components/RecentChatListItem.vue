<template>
  <v-list-item @click="goToRoom(chat.room.id)">
    <v-list-item-avatar :size="45">
      <v-img :src="chat.room.avatarUrl" :lazy-src="chat.room.avatarUrl"></v-img>
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

<script>
import customUtilities from "../common/customUtilities";

export default {
  name: "recent-chat-list-item",

  mixins: [customUtilities],

  props: {
    chat: {
      type: Object,
      required: true,
    },
  },

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
