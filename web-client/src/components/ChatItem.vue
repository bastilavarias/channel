<template>
  <div class="mb-5">
    <div class="d-flex justify-space-between" v-if="isAuthorAndUserSame">
      <div class="flex-grow-1"></div>
      <div>
        <v-card color="primary" flat min-width="200" max-width="600" shaped>
          <v-card-text>
            <span class="body-1 white--text">
              {{ message }}
            </span>
          </v-card-text>
        </v-card>
        <div class="d-flex mt-1">
          <div class="flex-grow-1"></div>
          <span class="caption grey--text"
            >Sent · {{ formatTimestamp(createdAt) }}</span
          >
        </div>
      </div>
    </div>

    <div class="d-flex" v-else>
      <v-avatar :size="40" class="mr-3 align-self-end">
        <v-img :src="sender.avatarUrl" :lazy-src="sender.avatarUrl"></v-img>
      </v-avatar>
      <div>
        <v-card color="#ECD4EA" flat min-width="200" max-width="600" shaped>
          <v-card-text>
            <span
              class="subtitle-1 font-weight-bold black--text d-block text-capitalize"
              >{{ sender.name }}
            </span>
            <span class="body-1 black--text">
              {{ message }}
            </span>
          </v-card-text>
        </v-card>
        <div class="d-flex mt-1">
          <span class="caption grey--text"
            >Sent · {{ formatTimestamp(createdAt) }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import customUtilities from "../common/customUtilities";

export default {
  name: "chat-item",

  mixins: [customUtilities],

  props: {
    isAuthorAndUserSame: {
      type: Boolean,
      required: false,
    },

    sender: {
      type: Object,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    createdAt: {
      type: String,
      required: true,
    },
  },
};
</script>
