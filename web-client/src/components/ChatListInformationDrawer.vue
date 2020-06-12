<template>
  <v-navigation-drawer app right clipped width="400">
    <v-card flat color="white">
      <v-card-title>
        <span class="font-weight-bold">
          Room Information
        </span>
        <div class="flex-grow-1"></div>
        <v-icon>mdi-information</v-icon>
      </v-card-title>
      <div class="text-center">
        <v-avatar :size="95">
          <v-img :src="avatarUrl" :lazy-src="avatarUrl"></v-img>
        </v-avatar>
      </div>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>Room Name</v-list-item-subtitle>
            <v-list-item-title class="font-weight-bold">{{
              name
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>Description</v-list-item-subtitle>
            <v-list-item-title>{{ description }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>Room Type</v-list-item-subtitle>
            <v-list-item-title>
              <span
                :class="`${
                  type === 'public' ? 'success--text' : 'error--text'
                } text-capitalize`"
              >
                {{ type }}
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle class="mb-1">Admin</v-list-item-subtitle>
            <v-list-item-title>
              <div class="d-flex align-center">
                <v-avatar :size="30" class="mr-2">
                  <v-img
                    :src="admin.avatarUrl"
                    :lazy-src="admin.avatarUrl"
                  ></v-img>
                </v-avatar>
                <span class="text-capitalize">{{ admin.name }}</span>
              </div>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-card-title class="font-weight-bold">Members</v-card-title>
      <v-card-subtitle>5 Members in this room</v-card-subtitle>
      <v-list>
        <template v-for="n in 5">
          <v-list-item :key="n">
            <v-list-item-avatar :size="45">
              <v-img
                src="../assets/noah-halpert.png"
                lazy-src="../assets/noah-halpert.png"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <span class="font-weight-bold">User Name</span>
              </v-list-item-title>
              <v-list-item-subtitle>Username</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
    <v-card flat color="white"> </v-card>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn color="error" outlined block>
          <span class="text-capitalize font-weight-bold mr-1">
            Leave Room
          </span>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "chat-list-information-drawer",

  props: {
    name: {
      type: String,
      required: true,
    },

    avatarUrl: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    admin: {
      type: Object,
      required: true,
    },

    isGetInformationStart: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
