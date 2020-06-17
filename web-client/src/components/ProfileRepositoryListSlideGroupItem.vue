<template>
  <v-card :class="`${className}`" min-width="400">
    <div class="d-flex justify-space-between">
      <div>
        <v-card-title class="text-capitalize">{{
          name ? name : "No name."
        }}</v-card-title>
        <v-card-text>
          <span class="d-block mb-3 text-capitalize">
            {{ description ? truncate(description) : "No description." }}
          </span>
        </v-card-text>
      </div>
      <v-avatar :size="100">
        <v-img
          src="../assets/icons8/repository.png"
          lazy-src="../assets/icons8/repository.png"
        ></v-img>
      </v-avatar>
    </div>
    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn small color="primary" :href="githubUrl" target="_blank">
        <span class="text-capitalize mr-1">Source Code</span>
        <v-icon small>mdi-xml</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import customUtilities from "../common/customUtilities";

export default {
  name: "profile-repository-list-slide-group-item",

  props: {
    className: {
      type: String,
      required: false,
    },

    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    githubUrl: {
      type: String,
      required: true,
    },

    stars: {
      type: Number,
      required: true,
    },
  },

  mixins: [customUtilities],
};
</script>
