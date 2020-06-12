<template>
  <section>
    <v-toolbar flat color="white">
      <v-toolbar-title>
        <v-list-item-avatar :size="45">
          <v-img
            src="../../assets/noah-halpert.png"
            lazy-src="../../assets/noah-halpert.png"
          ></v-img>
        </v-list-item-avatar>
        <span class="font-weight-bold">CET - Developers</span>
      </v-toolbar-title>
    </v-toolbar>
    <div id="chat-messages" ref="chatMessages">
      <v-container>
        <template v-for="n in 100 + messages.length">
          <chat-item
            :key="n"
            :is-author-and-user-same="n % 2 === 1"
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
      messages: [],
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
    chatMessagesDiv() {
      return this.$refs.chatMessages;
    },

    isMessageValid() {
      return this.message;
    },

    roomId() {
      const roomId = this.$route.params.roomId;
      return roomId ? roomId : "";
    },
  },

  methods: {
    sendMessage() {
      if (this.isMessageValid) {
        this.messages = [...this.messages, this.message];
        this.message = "";
      }
    },

    scrollNewMessage() {
      this.chatMessagesDiv.scrollTop = this.chatMessagesDiv.scrollHeight;
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
