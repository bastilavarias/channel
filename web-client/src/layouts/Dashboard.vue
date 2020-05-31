<template>
  <v-app>
    <v-navigation-drawer app width="400">
      <v-list-item two-line>
        <v-list-item-avatar :size="45">
          <v-img
            src="../assets/noah-halpert.png"
            lazy-src="../assets/noah-halpert.png"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            ><h1 style="font-size: 1.5rem;" class="text-truncate">
              Noah Halpert
            </h1>
          </v-list-item-title>
          <v-list-item-subtitle class="subtitle-2 grey--text"
            >noahhalpert</v-list-item-subtitle
          >
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon><v-icon>mdi-cog</v-icon></v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-divider></v-divider>
      <v-card flat color="white">
        <v-card-title class="font-weight-bold">Your Rooms</v-card-title>
        <v-list rounded dense>
          <v-text-field
            dense
            rounded
            filled
            single-line
            label="Search Room"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
          <template v-for="n in 35">
            <v-list-item :key="n">
              <v-list-item-avatar :size="45">
                <v-img
                  src="../assets/noah-halpert.png"
                  lazy-src="../assets/noah-halpert.png"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <span class="title font-weight-bold">CET - Developers</span>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <span class="font-weight-bold">Basti Sent a message</span>
                  <span class="mx-1">·</span> 7:48 PM</v-list-item-subtitle
                >
              </v-list-item-content>
              <v-list-item-action-text>
                <v-chip color="primary" dark small>99+</v-chip>
              </v-list-item-action-text>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-navigation-drawer>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "main-layout",
};
</script>
