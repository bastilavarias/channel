<template>
  <v-list-item two-line>
    <v-list-item-avatar :size="45">
      <v-img
        :src="currentAccount.avatarUrl"
        :lazy-src="currentAccount.avatarUrl"
      ></v-img>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title
        ><h1 style="font-size: 1.5rem;" class="text-truncate text-capitalize">
          {{ currentAccount.name }}
        </h1>
      </v-list-item-title>
      <v-list-item-subtitle class="subtitle-2 grey--text">{{
        currentAccount.username
      }}</v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn icon><v-icon>mdi-refresh</v-icon></v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: "profile-list-item",

  computed: {
    currentAccount() {
      return this.$store.state.account.current;
    },
  },
};
</script>
