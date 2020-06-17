<template>
  <v-card :class="`${className}`">
    <div class="d-flex justify-space-between">
      <div>
        <v-card-title>Repository Item ...</v-card-title>
        <v-card-text>
          <span class="d-block mb-3">
            Repository description here ...
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
      <v-btn small color="primary">
        <span class="text-capitalize mr-1">Source Code</span>
        <v-icon small>mdi-xml</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "profile-github-repository-list-slide-group-item",

  props: {
    className: {
      type: String,
      required: false,
    },
  },
};
</script>
