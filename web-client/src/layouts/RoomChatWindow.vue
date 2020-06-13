<template>
  <v-app>
    <v-app-bar app clipped-left clipped-right flat color="primary" dark>
      <v-toolbar-title>
        <div class="d-flex">
          <span class="mr-2 text-uppercase font-weight-bold">Channel</span>
          <v-icon>mdi-access-point-network</v-icon>
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <dashboard-app-bar-menu></dashboard-app-bar-menu>
    </v-app-bar>
    <v-navigation-drawer app clipped width="400">
      <profile-list-item></profile-list-item>
      <v-divider></v-divider>
      <joined-room-list></joined-room-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            color="primary"
            rounded
            outlined
            block
            :to="{ name: 'room-list' }"
            exact
          >
            <v-icon class="mr-1">mdi-magnify</v-icon>
            <span class="text-capitalize font-weight-bold">
              Discover more room
            </span>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import JoinedRoomList from "../components/JoinedRoomList";
import ProfileListItem from "../components/ProfileListItem";
import DashboardAppBarMenu from "../components/DashboardToolbarMenu";
export default {
  name: "main-layout",

  components: { DashboardAppBarMenu, ProfileListItem, JoinedRoomList },

  computed: {
    currentAccount() {
      const account = this.$store.state.account.current;
      return account ? account : {};
    },
  },

  created() {
    this.$socket.client.emit("room_joined", this.currentAccount.id);
  },
};
</script>
