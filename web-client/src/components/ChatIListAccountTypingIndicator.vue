<template>
  <div :class="`text-center ${className}`">
    <v-chip>
      <v-avatar left>
        <v-img :src="avatarUrl" :lazy-src="avatarUrl"></v-img>
      </v-avatar>
      <span>{{ getFirstName(name) }} is typing a message ...</span>
    </v-chip>
  </div>
</template>

<script>
import customUtilities from "../common/customUtilities";

export default {
  name: "chat-list-account-typing-indicator",

  mixins: [customUtilities],

  props: {
    name: {
      type: String,
      required: true,
    },

    avatarUrl: {
      type: String,
      required: true,
    },

    className: {
      type: String,
      required: true,
    },
  },
};
</script>
