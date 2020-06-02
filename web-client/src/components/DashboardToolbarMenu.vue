<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn color="primary" depressed v-on="on">
        <v-avatar :size="35">
          <v-img
            :src="currentAccount.avatarUrl"
            :lazy-src="currentAccount.avatarUrl"
          ></v-img>
        </v-avatar>
      </v-btn>
    </template>
    <v-list>
      <v-list-item>Profile</v-list-item>
      <v-list-item>Logout</v-list-item>
    </v-list>
  </v-menu></template
>

<script>
export default {
  name: "dashboard-app-bar-menu",

  computed: {
    currentAccount() {
      return this.$store.state.account.current;
    },
  },
};
</script>
