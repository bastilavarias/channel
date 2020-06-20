<template>
  <v-card flat color="white">
    <v-card-title class="font-weight-bold">
      <span>Recent Chats</span>
      <div class="flex-grow-1"></div>
      <v-btn color="primary" rounded :to="{ name: 'room-list' }">
        <v-icon class="mr-1">mdi-magnify</v-icon>
        <span class="text-capitalize">Discover Rooms</span>
      </v-btn>
    </v-card-title>
    <v-list rounded dense>
      <v-text-field
        dense
        rounded
        filled
        single-line
        label="Search room name"
        prepend-inner-icon="mdi-magnify"
        v-model="query"
      ></v-text-field>
      <template v-for="(chat, index) in filteredRecentChats">
        <recent-chat-list-item
          :chat="chat"
          :key="index"
        ></recent-chat-list-item>
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
import RecentChatListItem from "./RecentChatListItem";

export default {
  name: "recent-chat-list",

  components: { RecentChatListItem },

  data() {
    return {
      query: "",
    };
  },

  computed: {
    recentChats() {
      const chats = this.$store.state.chat.recent;
      return chats ? chats : [];
    },

    filteredRecentChats() {
      let chats = [];
      if (this.query) {
        return this.recentChats.filter((chat) => {
          const trimmedQuery = this.query.trim().toLowerCase();
          const toMatch = chat.room.nameSlug.trim().toLowerCase();
          return toMatch.indexOf(trimmedQuery) > -1;
        });
      }
      chats = this.recentChats;
      return chats;
    },
  },
};
</script>
