<template>
  <v-list-item two-line>
    <v-list-item-avatar :size="45">
      <v-img :src="avatarUrl" :lazy-src="avatarUrl"></v-img>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>
        <span class="font-weight-bold text-capitalize">{{
          name ? name : username
        }}</span>
      </v-list-item-title>
      <v-list-item-subtitle
        >{{ username ? username : "" }}
        <span
          :title="`${admin.name} is the admin of this room.`"
          v-if="isMemberAdmin"
        >
          <v-avatar :size="35">
            <v-img
              src="../assets/icons8/shield.png"
              lazy-src="../assets/icons8/shield.png"
            ></v-img>
          </v-avatar>
        </span>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item @click="goToProfile">Profile</v-list-item>
          <v-list-item
            @click="removeMember"
            v-if="!isMemberAdmin && isAccountAdmin"
            >Remove</v-list-item
          >
        </v-list>
      </v-menu>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: "chat-list-information-drawer-member-list-item",

  props: {
    admin: {
      type: Object,
      required: true,
    },

    memberId: {
      type: Number,
      required: true,
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
  },

  computed: {
    currentAccount() {
      const account = this.$store.state.account.current;
      return account ? account : {};
    },

    isMemberAdmin() {
      return this.admin.id === this.memberId;
    },

    isAccountAdmin() {
      return this.currentAccount.id === this.admin.id;
    },
  },

  methods: {
    goToProfile() {
      this.$router.push({
        name: "profile",
        params: { username: this.username },
      });
    },

    removeMember() {
      console.log(this.memberId);
    },
  },
};
</script>
