<template>
  <v-card :class="`${className}`" min-width="200">
    <div class="d-flex pr-2 pt-2">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle class="primary--text font-weight-bold"
            >bradtraversy</v-list-item-subtitle
          >
          <v-list-item-title>Brad Traversy</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-avatar :size="80" tile>
        <v-img
          src="https://avatars2.githubusercontent.com/u/5550850?v=4"
          lazy-src="https://avatars2.githubusercontent.com/u/5550850?v=4"
        ></v-img>
      </v-avatar>
    </div>
    <v-card-text>
      <span class="d-block"></span>

      <v-btn small color="primary">
        <span class="text-capitalize mr-1">GitHub Profile</span>
        <v-icon small>mdi-github</v-icon>
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "profile-github-follower-list-slide-group-item",

  props: {
    className: {
      type: String,
      required: false,
    },
  },
};
</script>
