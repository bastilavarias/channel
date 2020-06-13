<template>
  <v-card flat color="white">
    <v-card-title class="font-weight-bold">Your Rooms</v-card-title>
    <v-list rounded dense>
      <v-text-field
        dense
        rounded
        filled
        single-line
        label="Search Room"
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>
      <template v-for="(room, index) in joinedRooms">
        <v-list-item :key="index" @click="goToRoom(room.id)">
          <v-list-item-avatar :size="45">
            <v-img :src="room.avatarUrl" :lazy-src="room.avatarUrl"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              <div class="d-flex align-center">
                <span class="title font-weight-bold">{{ room.name }}</span>
                <span> <span class="mx-1">·</span> 7:48 PM </span>
              </div>
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ previewMessage(room.recentChat) }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import customUtilities from "../common/customUtilities";

export default {
  name: "joined-room-list",

  mixins: [customUtilities],

  computed: {
    currentAccount() {
      return this.$store.state.account.current;
    },

    joinedRooms() {
      const rooms = this.$store.state.room.joined;
      return rooms;
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
