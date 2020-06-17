<template>
  <v-card :class="`${className}`" min-width="250">
    <div class="d-flex pt-2 pl-2">
      <v-avatar :size="80" tile>
        <v-img
          src="https://avatars2.githubusercontent.com/u/5550850?v=4"
          lazy-src="https://avatars2.githubusercontent.com/u/5550850?v=4"
        ></v-img>
      </v-avatar>
      <div>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle class="primary--text font-weight-bold"
              >bradtraversy</v-list-item-subtitle
            >
            <v-list-item-title>Brad Traversy</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-card-text>
          <div>
            <v-icon small color="primary" class="mr-1">mdi-github</v-icon>
            <a
              href="https://github.com/bradtraversy"
              target="_blank"
              class="primary--text caption"
              style="text-decoration: underline;"
              >https://github.com/bradtraversy</a
            >
          </div>
          <div>
            <v-icon small color="primary" class="mr-1">mdi-web</v-icon>
            <a
              class="primary--text caption"
              style="text-decoration: underline;"
              href="https://www.traversymedia.com"
              target="_blank"
              >https://www.traversymedia.com</a
            >
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
  },
};
</script>
