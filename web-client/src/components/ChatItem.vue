<template>
  <div :class="className">
    <template v-if="isSystemMessage">
      <div class="text-center">
        <div class="caption mb-1">{{ formatTimestamp(createdAt) }}</div>
        <v-chip>
          <v-avatar left>
            <v-img :src="sender.avatarUrl" :lazy-src="sender.avatarUrl"></v-img>
          </v-avatar>
          <span>{{ message }}</span>
        </v-chip>
      </div>
    </template>
    <template v-else>
      <div
        class="d-flex justify-space-between"
        v-if="isCurrentAccountAndSenderSame"
      >
        <div class="flex-grow-1"></div>
        <div>
          <v-card color="primary" flat min-width="200" max-width="600" shaped>
            <v-card-text>
              <span class="body-1 white--text">
                {{ message }}
              </span>
            </v-card-text>
          </v-card>
          <div class="d-flex mt-1">
            <div class="flex-grow-1"></div>
            <span class="caption grey--text"
              >Sent · {{ formatTimestamp(createdAt) }}</span
            >
          </div>
        </div>
      </div>

      <div class="d-flex" v-else>
        <v-avatar :size="40" class="mr-3 align-self-end">
          <v-img :src="sender.avatarUrl" :lazy-src="sender.avatarUrl"></v-img>
        </v-avatar>
        <div>
          <v-card color="#ECD4EA" flat min-width="200" max-width="600" shaped>
            <v-card-text>
              <span
                class="subtitle-1 font-weight-bold black--text d-block text-capitalize"
                >{{ sender.name }}
              </span>
              <span class="body-1 black--text">
                {{ message }}
              </span>
            </v-card-text>
          </v-card>
          <div class="d-flex mt-1">
            <span class="caption grey--text"
              >Sent · {{ formatTimestamp(createdAt) }}</span
            >
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import customUtilities from "../common/customUtilities";

export default {
  name: "chat-item",

  mixins: [customUtilities],

  props: {
    chatId: {
      type: Number,
      required: true,
    },

    sender: {
      type: Object,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    createdAt: {
      type: String,
      required: true,
    },

    className: {
      type: String,
      required: true,
    },
  },

  computed: {
    currentAccount() {
      const account = this.$store.state.account.current;
      return account ? account : {};
    },

    isCurrentAccountAndSenderSame() {
      return this.currentAccount.id === this.sender.id;
    },

    isSystemMessage() {
      return this.type === "system";
    },

    roomId() {
      const roomId = this.$route.params.roomId;
      return roomId ? roomId : "";
    },
  },

  methods: {
    readRecentChat() {
      const readRecentChatParams = {
        chatId: this.chatId,
        roomId: this.roomId,
        accountId: this.currentAccount.id,
      };
      this.$socket.client.emit("chat_read_recent", readRecentChatParams);
    },
  },

  mounted() {
    this.readRecentChat();
  },
};
</script>
