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
      <template v-for="n in 3">
        <v-list-item :key="n" @click="viewMessages">
          <v-list-item-avatar :size="45">
            <v-img
              src="../assets/noah-halpert.png"
              lazy-src="../assets/noah-halpert.png"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              <span class="title font-weight-bold">CET - Developers</span>
            </v-list-item-title>
            <v-list-item-subtitle>
              <span class="font-weight-bold">Basti Sent a message</span>
              <span class="mx-1">·</span> 7:48 PM</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-list-item-action-text>
            <v-chip color="primary" dark small>99+</v-chip>
          </v-list-item-action-text>
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
  },

  methods: {
    viewMessages() {
      this.$router.push({
        name: "chat-window",
        params: {
          chatId: "1002323230909vhuh93232",
        },
      });
    },
  },
};
</script>
