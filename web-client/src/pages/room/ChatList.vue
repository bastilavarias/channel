<template>
  <section style="height: 78vh;">
    <vue-headful title="Title from vue-headful"></vue-headful>
    <v-container class="fill-height" v-if="isFetchInitialChatsStart">
      <v-row justify="center" align-content="center">
        <custom-progress-circular
          text="Fetching initial chats from Channel server. Please wait..."
        ></custom-progress-circular>
      </v-row>
    </v-container>
    <div v-else>
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
      <div class="chats-holder" ref="chatHolder">
        <v-container>
          <template v-for="(chat, index) in chats">
            <chat-item
              :key="index"
              :chat-id="chat.id"
              :sender="chat.sender"
              :type="chat.type"
              :message="chat.message"
              :createdAt="chat.createdAt"
              class-name="mb-5"
            ></chat-item>
          </template>
          <template v-for="account in selectedTypingAccounts">
            <chat-list-account-typing-indicator
              :name="account.name"
              :avatar-url="account.avatarUrl"
              class-name="mb-2"
            ></chat-list-account-typing-indicator>
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
    </div>
    <chat-list-information-drawer
      :room-id="roomId"
      :name="information.name"
      :avatarUrl="information.avatarUrl"
      :description="information.description"
      :type="information.type"
      :admin="information.admin"
      :isGetInformationStart="isGetInformationStart"
      :members="members"
    ></chat-list-information-drawer>
    <v-dialog width="500" v-model="isDestroyedRoomAlertDialogShow">
      <v-card>
        <v-card-title>Oops</v-card-title>
        <v-card-text>
          <v-alert text type="info">
            It seems {{ information.admin.name }} destroyed this room. You will
            be redirected to room list.
          </v-alert>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="info" :to="{ name: 'room-list' }">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog width="500" v-model="isRemovedAlertDialogShow">
      <v-card>
        <v-card-title>You've been removed</v-card-title>
        <v-card-text>
          <v-alert text type="error">
            Sorry, {{ information.admin.name }} removed you in
            {{ information.name }} room.
          </v-alert>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="error" :to="{ name: 'room-list' }">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import ChatItem from "../../components/ChatItem";
import { ROOM_GET_INFORMATION } from "../../store/types/room";
import ChatListInformationDrawer from "../../components/ChatListInformationDrawer";
import {
  CHAT_FETCH,
  SET_CHATS,
  SET_TYPING_ACCOUNTS,
} from "../../store/types/chat";
import ChatListAccountTypingIndicator from "../../components/ChatIListAccountTypingIndicator";
import CustomProgressCircular from "../../components/custom/ProgressCircular";
export default {
  components: {
    CustomProgressCircular,
    ChatListAccountTypingIndicator,
    ChatListInformationDrawer,
    ChatItem,
  },

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
      isDestroyedRoomAlertDialogShow: false,
      isRemovedAlertDialogShow: false,
      isFetchInitialChatsStart: false,
    };
  },

  computed: {
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

    selectedTypingAccounts() {
      return this.typingAccounts.slice(0, 3);
    },

    recentChats() {
      const chats = this.$store.state.chat.recent;
      return chats ? chats : [];
    },

    titleNotifications() {
      console.log(this.recentChats);
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
        this.clearTypingAccounts();
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
      const chatsHolder = this.$refs.chatHolder;
      if (!this.isFetchInitialChatsStart) {
        chatsHolder.scrollTop = chatsHolder.scrollHeight;
      }
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
      this.isFetchInitialChatsStart = true;
      await this.$store.dispatch(CHAT_FETCH, {
        roomId: this.roomId,
        offset: 0,
      });
      this.isFetchInitialChatsStart = false;
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

    clearTypingAccounts() {
      this.$store.commit(SET_TYPING_ACCOUNTS, []);
    },
  },

  mounted() {
    this.textFieldAutofocus();
    this.scrollNewMessage();
  },

  updated() {
    this.scrollNewMessage();
  },

  async created() {
    this.$socket.client.emit("room_enter", this.roomId);
    await this.getInformation();
    await this.fetchChats();
    this.clearTypingAccounts();
  },

  destroyed() {
    this.$store.commit(SET_CHATS, []);
    this.$store.commit(SET_TYPING_ACCOUNTS, []);
  },

  sockets: {
    room_destroy() {
      this.isDestroyedRoomAlertDialogShow = true;
      setTimeout(() => {
        this.isDestroyedRoomAlertDialogShow = false;
        this.$router.push({ name: "room-list" });
      }, 5000);
    },

    room_remove(accountId) {
      if (this.currentAccount.id === accountId) {
        this.isRemovedAlertDialogShow = true;
        setTimeout(() => {
          this.isRemovedAlertDialogShow = false;
          this.$router.push({ name: "room-list" });
        }, 5000);
      }
    },
  },
};
</script>

<style scoped>
.chats-holder {
  flex: 1 0 100%;
  overflow: auto;
  height: 78vh;
}
</style>
