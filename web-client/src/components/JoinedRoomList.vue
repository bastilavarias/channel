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
        <v-list-item :key="index">
          <v-list-item-avatar :size="45">
            <v-img :src="room.avatarUrl" :lazy-src="room.avatarUrl"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              <span class="title font-weight-bold">{{ room.name }}</span>
            </v-list-item-title>
            <v-list-item-subtitle>
              <span class="font-weight-bold">Basti Sent a message</span>
              <span class="mx-1">·</span> 7:48 PM</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "joined-room-list",

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
    viewMessages() {
      this.$router.push({
        name: "chat-list",
        params: {
          chatId: "1002323230909vhuh93232",
        },
      });
    },
  },
};
</script>
