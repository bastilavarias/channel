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

        <v-list-item v-if="description">
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
      <v-card-subtitle>{{ membersTitle }} </v-card-subtitle>
      <v-list>
        <template v-for="(member, index) in members">
          <chat-list-information-drawer-member-list-item
            :key="index"
            :member-id="member.id"
            :name="member.name"
            :username="member.username"
            :avatar-url="member.avatarUrl"
          ></chat-list-information-drawer-member-list-item>
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
import ChatListInformationDrawerMemberListItem from "./ChatListInformationDrawerMemberListItem";
export default {
  name: "chat-list-information-drawer",
  components: { ChatListInformationDrawerMemberListItem },
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

    members: {
      type: Array,
      required: true,
    },
  },

  computed: {
    membersTitle() {
      const members = this.members;
      return members.length <= 1
        ? `You're the only member in this chat group`
        : `${members.length} Members in this chat group`;
    },
  },
};
</script>
