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
            :sender="chat.sender"
            :type="chat.type"
            :message="chat.message"
            :createdAt="chat.createdAt"
            :is-author-and-user-same="index % 2 === 1"
          ></chat-item>
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
            @keyup.enter="sendMessage"
            autofocus
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <div class="text-center">
            <v-btn
              color="primary"
              fab
              @click="sendMessage"
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
  },

  methods: {
    sendMessage() {
      if (this.isMessageValid) {
        const chatOptions = {
          roomId: this.roomId,
          message: this.message,
          accountId: this.currentAccount.id,
        };
        this.$socket.client.emit("chat_send", chatOptions);
        this.message = "";
      }
    },

    scrollNewMessage() {
      this.chatsHolderDiv.scrollTop = this.chatsHolderDiv.scrollHeight;
    },
  },

  mounted() {
    this.scrollNewMessage();
  },

  updated() {
    this.scrollNewMessage();
  },

  async created() {
    this.isGetInformationStart = true;
    this.information = await this.$store.dispatch(
      ROOM_GET_INFORMATION,
      this.roomId
    );
    this.isGetInformationStart = false;
    this.$socket.client.emit("room_join", this.roomId);
    this.$socket.client.emit("room_joined", this.currentAccount.id);
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
