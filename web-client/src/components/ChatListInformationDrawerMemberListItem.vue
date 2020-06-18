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
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: "chat-list-information-drawer-member-list-item",

  props: {
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
};
</script>
