<template>
  <section>
    <v-toolbar flat color="white">
      <v-toolbar-title>
        <v-list-item-avatar :size="45">
          <v-img
            src="../assets/noah-halpert.png"
            lazy-src="../assets/noah-halpert.png"
          ></v-img>
        </v-list-item-avatar>
        <span class="font-weight-bold">CET - Developers</span>
      </v-toolbar-title>
    </v-toolbar>
    <div id="chat-messages" ref="chatMessages">
      <v-container>
        <template v-for="n in 100 + messages.length">
          <chat-message
            :key="n"
            :is-author-and-user-same="n % 2 === 1"
          ></chat-message>
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
    <v-navigation-drawer app right width="400">
      <v-card flat color="white">
        <v-card-title class="font-weight-bold">Members</v-card-title>
        <v-card-subtitle>5 Members in this room</v-card-subtitle>
        <v-list>
          <template v-for="n in 5">
            <v-list-item :key="n">
              <v-list-item-avatar :size="45">
                <v-img
                  src="../assets/noah-halpert.png"
                  lazy-src="../assets/noah-halpert.png"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <span class="font-weight-bold">User Name</span>
                </v-list-item-title>
                <v-list-item-subtitle>Username</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn color="error" outlined block>
            <span class="text-capitalize font-weight-bold mr-1">
              Leave Room
            </span>
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </section>
</template>

<script>
import ChatMessage from "../components/ChatMessage";
export default {
  components: { ChatMessage },

  data() {
    return {
      messages: [],
      message: "",
    };
  },

  computed: {
    chatMessagesDiv() {
      return this.$refs.chatMessages;
    },

    isMessageValid() {
      return this.message;
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
};
</script>

<style scoped>
#chat-messages {
  flex: 1 0 100%;
  overflow: auto;
  height: 85vh;
}
</style>
