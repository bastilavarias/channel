<template>
  <section>
    <v-toolbar flat color="white">
      <v-toolbar-title>
        <v-list-item-avatar :size="45">
          <v-img
            :src="information.avatarUrl"
            :lazy-src="information.avatarUrl"
          ></v-img>
        </v-list-item-avatar>
        <span class="font-weight-bold">{{ information.name }}</span>
      </v-toolbar-title>
    </v-toolbar>
    <div id="chat-messages" ref="chatsHolder">
      <v-container>
        <template v-for="(chat, index) in chats">
          <chat-item
            :key="index"
            :chat-id="chat.id"
            :sender="chat.sender"
            :type="chat.type"
            :message="chat.message"
            :createdAt="chat.createdAt"
            :is-author-and-user-same="index % 2 === 1"
          ></chat-item>
        </template>
        <template v-for="account in typingAccounts">
          <span :key="account.id">{{ account.name }} is typing</span>
        </template>
      </v-container>
    </div>
    <div>
      <v-row no-gutters>
        <v-col cols="11">
          <v-text-field
            class="ml-5"
            placeholder="Write a message..."
            filled
            rounded
            v-model="message"
            @keyup.enter="sendChat"
            id="message-text-field"
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <div class="text-center">
            <v-btn
              color="primary"
              fab
              @click="sendChat"
              :disabled="!isMessageValid"
            >
              <v-icon>mdi-send</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
    <chat-list-information-drawer
      :name="information.name"
      :avatarUrl="information.avatarUrl"
      :description="information.description"
      :type="information.type"
      :admin="information.admin"
      :isGetInformationStart="isGetInformationStart"
      :members="members"
    ></chat-list-information-drawer>
  </section>
</template>

<script>
import ChatItem from "../../components/ChatItem";
import { ROOM_GET_INFORMATION } from "../../store/types/room";
import ChatListInformationDrawer from "../../components/ChatListInformationDrawer";
import { FETCH_CHATS } from "../../store/types/chat";
export default {
  components: { ChatListInformationDrawer, ChatItem },

  data() {
    return {
      message: "",
      information: {
        name: "",
        description: "",
        type: "",
        avatarUrl: "",
        admin: {
          avatarUrl: "",
          name: "",
          id: null,
        },
      },
      isGetInformationStart: false,
    };
  },

  computed: {
    chatsHolderDiv() {
      return this.$refs.chatsHolder;
    },

    isMessageValid() {
      return this.message;
    },

    roomId() {
      const roomId = this.$route.params.roomId;
      return roomId ? roomId : "";
    },

    members() {
      const members = this.$store.state.room.members;
      return members ? members : [];
    },

    chats() {
      const chats = this.$store.state.chat.list;
      return chats ? chats : [];
    },

    currentAccount() {
      const account = this.$store.state.account.current;
      return account ? account : {};
    },

    typingAccounts() {
      const accounts = this.$store.state.chat.typingAccounts;
      return accounts ? accounts : [];
    },
  },

  watch: {
    async roomId(id) {
      if (id) {
        this.$socket.client.emit("room_enter", id);
        await this.getInformation();
        await this.fetchChats();
        this.textFieldAutofocus();
        this.removeAccountTypingIndicator();
      }
    },

    message(value) {
      if (value.length > 0) {
        this.showAccountTypingIndicator();
      } else {
        this.removeAccountTypingIndicator();
      }
    },
  },

  methods: {
    sendChat() {
      if (this.isMessageValid) {
        const chatOptions = {
          roomId: this.roomId,
          message: this.message,
          accountId: this.currentAccount.id,
          type: "regular",
        };
        this.$socket.client.emit("chat_send", chatOptions);
        this.message = "";
      }
    },

    scrollNewMessage() {
      this.chatsHolderDiv.scrollTop = this.chatsHolderDiv.scrollHeight;
    },

    async getInformation() {
      this.isGetInformationStart = true;
      this.$socket.client.emit("room_members", this.roomId);
      this.information = await this.$store.dispatch(
        ROOM_GET_INFORMATION,
        this.roomId
      );
      this.isGetInformationStart = false;
    },

    async fetchChats() {
      await this.$store.dispatch(FETCH_CHATS, {
        roomId: this.roomId,
        offset: 0,
      });
    },

    textFieldAutofocus() {
      document.getElementById("message-text-field").focus();
    },

    showAccountTypingIndicator() {
      this.$socket.client.emit("chat_add_typing_account_indicator", {
        roomId: this.roomId,
        account: this.currentAccount,
      });
    },

    removeAccountTypingIndicator() {
      this.$socket.client.emit("chat_remove_typing_account_indicator", {
        roomId: this.roomId,
        accountId: this.currentAccount.id,
      });
    },
  },

  mounted() {
    this.scrollNewMessage();
    this.textFieldAutofocus();
  },

  updated() {
    this.scrollNewMessage();
  },

  async created() {
    this.$socket.client.emit("room_enter", this.roomId);
    await this.getInformation();
    await this.fetchChats();
  },

  sockets: {
    chat_recent_refresh() {
      this.$socket.client.emit("chat_recent", this.currentAccount.id);
    },
  },
};
</script>

<style scoped>
#chat-messages {
  flex: 1 0 100%;
  overflow: auto;
  height: 78vh;
}
</style>
