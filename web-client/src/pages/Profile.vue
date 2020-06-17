<template>
  <v-container>
    <custom-breadcrumbs :routes="breadcrumbs"></custom-breadcrumbs>
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
            <v-tab :key="index" style="padding-left: 0 !important;">
              <v-icon class="mr-2">{{ tabItem.icon }}</v-icon>
              <span class="text-capitalize font-weight-bold">
                {{ tabItem.text }}
              </span>
            </v-tab>
          </template>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <div class="py-10">
            <div class="mb-5">
              <custom-label icon="mdi-source-repository"
                >Repositories</custom-label
              >
              <v-slide-group v-model="repositoriesSlidGroupState">
                <template v-for="n in 3">
                  <profile-repository-list-slide-group-item
                    class="ma-1"
                    class-name="ma-1"
                  ></profile-repository-list-slide-group-item>
                </template>
              </v-slide-group>
            </div>
            <div class="mb-5">
              <custom-label icon="mdi-account-multiple-check"
                >Followers(6)</custom-label
              >
              <v-slide-group v-model="followersSlidGroupState">
                <template v-for="n in 3">
                  <profile-account-list-slide-group-item class-name="ma-1">
                  </profile-account-list-slide-group-item>
                </template>
              </v-slide-group>
            </div>
            <div>
              <custom-label icon="mdi-account-multiple-plus"
                >Following(6)</custom-label
              >
              <v-slide-group v-model="followersSlidGroupState">
                <template v-for="n in 3">
                  <profile-account-list-slide-group-item class-name="ma-1">
                  </profile-account-list-slide-group-item>
                </template>
              </v-slide-group>
            </div>
          </div>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProfileRepositoryListSlideGroupItem from "../components/ProfileRepositoryListSlideGroupItem";
import ProfileAccountListSlideGroupItem from "../components/ProfileAccountListSlideGroupItem";
import CustomBreadcrumbs from "../components/custom/Breadcrumbs";
import CustomLabel from "../components/custom/Label";
import { GET_BASIC_PROFILE_INFORMATION } from "../store/types/profile";
export default {
  components: {
    CustomLabel,
    CustomBreadcrumbs,
    ProfileAccountListSlideGroupItem,
    ProfileRepositoryListSlideGroupItem,
  },
  data() {
    return {
      tab: null,
      tabItems: [
        {
          text: "GitHub",
          icon: "mdi-github",
        },
      ],
      repositoriesSlidGroupState: null,
      followersSlidGroupState: null,
    };
  },

  computed: {
    currentAccount() {
      const account = this.$store.state.account.current;
      return account ? account : {};
    },

    username() {
      const username = this.$route.params.username;
      return username ? username : "";
    },

    breadcrumbs() {
      return this.$route.meta.breadcrumbs;
    },
  },

  created() {
    this.$store.dispatch(GET_BASIC_PROFILE_INFORMATION, this.username);
  },
};
</script>
