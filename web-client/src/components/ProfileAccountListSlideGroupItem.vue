<template>
  <v-card :class="`${className}`" min-width="250">
    <div class="d-flex pt-2 pl-2">
      <v-avatar :size="80" tile>
        <v-img :src="avatarUrl" :lazy-src="avatarUrl"></v-img>
      </v-avatar>
      <div>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle class="primary--text font-weight-bold">{{
              username
            }}</v-list-item-subtitle>
            <v-list-item-title class="text-capitalize">{{
              name
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-card-text>
          <div>
            <v-icon small color="primary" class="mr-1">mdi-github</v-icon>
            <a
              :href="githubUrl"
              target="_blank"
              class="primary--text caption"
              style="text-decoration: underline;"
              v-if="githubUrl"
              >{{ githubUrl }}</a
            >
          </div>
          <div>
            <v-icon small color="primary" class="mr-1">mdi-web</v-icon>
            <span class="primary--text caption">
              <a
                :href="websiteUrl"
                target="_blank"
                style="text-decoration: underline;"
                v-if="websiteUrl"
                >{{ websiteUrl }}</a
              >
              <span v-else>No website included.</span>
            </span>
          </div>
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "profile-account-list-slide-group-item",

  props: {
    className: {
      type: String,
      required: false,
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

    websiteUrl: {
      type: String,
      required: true,
    },

    githubUrl: {
      type: String,
      required: true,
    },
  },
};
</script>
