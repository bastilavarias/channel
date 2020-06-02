<template>
  <v-app>
    <v-navigation-drawer app width="400">
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
export default {
  name: "main-layout",

  components: { ProfileListItem, JoinedRoomList },
};
</script>
