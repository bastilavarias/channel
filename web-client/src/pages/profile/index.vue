<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="2">
        <div class="mb-10">
          <v-avatar color="primary" tile size="100%" height="100%">
            <v-img
              :src="currentAccount.avatarUrl"
              :lazy-src="currentAccount.avatarUrl"
            ></v-img>
          </v-avatar>
        </div>
        <custom-label>Joined Rooms</custom-label>
      </v-col>
      <v-col cols="12" md="9">
        <div class="flex-grow-1 mb-10">
          <div>
            <h2>{{ currentAccount.name }}</h2>
            <h3 class="primary--text font-weight-bold">
              {{ currentAccount.username }}
            </h3>
          </div>
        </div>
        <v-tabs v-model="tab">
          <template v-for="(tabItem, index) in tabItems">
            <v-tab
              :key="index"
              style="padding-left: 0 !important;"
              :to="tabItem.to"
            >
              <v-icon class="mr-2">{{ tabItem.icon }}</v-icon>
              <span class="text-capitalize font-weight-bold">
                {{ tabItem.text }}
              </span>
            </v-tab>
          </template>
        </v-tabs>
        <v-tabs-items>
          <router-view></router-view>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CustomLabel from "../../components/custom/Label";
export default {
  components: { CustomLabel },
  data() {
    return {
      tab: null,
      tabItems: [
        {
          text: "GitHub",
          icon: "mdi-github",
          to: {
            name: "profile-github",
            params: { username: "bastilavarias" },
          },
        },

        {
          text: "About",
          icon: "mdi-account",
          to: { name: "profile-about" },
        },
      ],
    };
  },

  computed: {
    currentAccount() {
      const account = this.$store.state.account.current;
      return account ? account : {};
    },
  },
};
</script>
