<template>
  <v-list-item @click="openRecentChat">
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
        <span :class="`${!chat.isRead ? 'font-weight-bold black--text' : ''}`">
          {{ previewMessage(chat) }}
        </span>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action-text v-if="!chat.isRead">
      <v-icon color="primary" x-small>mdi-moon-full</v-icon>
    </v-list-item-action-text>
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
    async openRecentChat() {
      const { id, room } = this.chat;
      await this.goToRoom(room.id);
      const readRecentChatParams = {
        chatId: id,
        roomId: room.id,
        accountId: this.currentAccount.id,
      };
      this.readRecentChat(readRecentChatParams);
    },

    async goToRoom(roomId) {
      await this.$router.push({
        name: "chat-list",
        params: {
          roomId,
        },
      });
    },

    readRecentChat({ chatId, accountId, roomId }) {
      this.$socket.client.emit("chat_read_recent", {
        chatId,
        accountId,
        roomId,
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
