<template>
  <v-list-item>
    <v-list-item-avatar :size="45">
      <v-img :src="avatarUrl" :lazy-src="avatarUrl"></v-img>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>
        <span class="font-weight-bold text-capitalize">{{
          name ? name : username
        }}</span>
      </v-list-item-title>
      <v-list-item-subtitle>{{
        username ? username : ""
      }}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item @click="goToProfile">Profile</v-list-item>
        </v-list>
      </v-menu>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: "chat-list-information-drawer-member-list-item",

  props: {
    memberId: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    avatarUrl: {
      type: String,
      required: true,
    },
  },

  methods: {
    goToProfile() {
      this.$router.push({
        name: "profile",
        params: { username: this.username },
      });
    },
  },
};
</script>
