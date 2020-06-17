<template>
  <v-container>
    <custom-breadcrumbs :routes="breadcrumbs"></custom-breadcrumbs>
    <v-row>
      <v-col cols="12" md="2">
        <div class="mb-10">
          <v-skeleton-loader
            type="image"
            v-if="isGetBasicProfileInformationStart"
          ></v-skeleton-loader>
          <v-avatar color="primary" tile size="100%" height="100%" v-else>
            <v-img
              :src="basicInformation.avatarUrl"
              :lazy-src="basicInformation.avatarUrl"
            ></v-img>
          </v-avatar>
        </div>
        <custom-label>Joined Rooms</custom-label>
      </v-col>
      <v-col cols="12" md="9">
        <div class="flex-grow-1 mb-10">
          <v-skeleton-loader
            type="list-item-two-line"
            v-if="isGetBasicProfileInformationStart"
          ></v-skeleton-loader>
          <div v-else>
            <h2>{{ basicInformation.name }}</h2>
            <h3 class="primary--text font-weight-bold">
              {{ basicInformation.username }}
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
            <div class="text-center" v-if="isGetGithubProfileInformationStart">
              <v-progress-circular
                color="primary"
                indeterminate
              ></v-progress-circular>
            </div>
            <div v-else>
              <div class="mb-5">
                <custom-label icon="mdi-web">Website</custom-label>
                <h1 class="body-2 primary--text">
                  <a
                    :href="githubInformation.websiteUrl"
                    target="_blank"
                    v-if="githubInformation.websiteUrl"
                    >{{ githubInformation.websiteUrl }}</a
                  >
                  <span v-else>No website included.</span>
                </h1>
              </div>
              <div class="mb-5">
                <custom-label icon="mdi-email">E-Mail</custom-label>
                <h1 class="body-2 primary--text">
                  {{
                    githubInformation.email
                      ? githubInformation.email
                      : "No E-Mail included."
                  }}
                </h1>
              </div>
              <div class="mb-5">
                <custom-label>Bio</custom-label>
                <h1 class="body-2 primary--text">
                  {{
                    githubInformation.bio
                      ? githubInformation.bio
                      : "No bio included."
                  }}
                </h1>
              </div>
              <div class="mb-5">
                <custom-label icon="mdi-source-repository"
                  >Repositories({{ repositoryCount }})</custom-label
                >
                <v-slide-group v-model="repositoriesSlidGroupState">
                  <template v-for="(repository, index) in sortedRepositories">
                    <profile-repository-list-slide-group-item
                      :key="index"
                      class-name="ma-1"
                      :name="repository.name"
                      :description="repository.description"
                      :githubUrl="repository.githubUrl"
                      :stars="repository.stars"
                    ></profile-repository-list-slide-group-item>
                  </template>
                </v-slide-group>
              </div>
              <div class="mb-5">
                <custom-label icon="mdi-account-multiple-check"
                  >Followers({{ followingCount }})</custom-label
                >
                <v-slide-group v-model="followersSlidGroupState">
                  <template
                    v-for="(account, index) in githubInformation.following"
                  >
                    <profile-account-list-slide-group-item
                      class-name="ma-1"
                      :key="index"
                      :name="account.name"
                      :username="account.username"
                      :avatar-url="account.avatarUrl"
                      :websiteUrl="account.websiteUrl"
                      :githubUrl="account.githubUrl"
                    >
                    </profile-account-list-slide-group-item>
                  </template>
                </v-slide-group>
              </div>
              <div>
                <custom-label icon="mdi-account-multiple-plus"
                  >Following(6)</custom-label
                >
                <v-slide-group v-model="followersSlidGroupState">
                  <template
                    v-for="(account, index) in githubInformation.followers"
                  >
                    <profile-account-list-slide-group-item
                      class-name="ma-1"
                      :key="index"
                      :name="account.name"
                      :username="account.username"
                      :avatar-url="account.avatarUrl"
                      :websiteUrl="account.websiteUrl"
                      :githubUrl="account.githubUrl"
                    >
                    </profile-account-list-slide-group-item>
                  </template>
                </v-slide-group>
              </div>
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
import {
  GET_BASIC_PROFILE_INFORMATION,
  GET_GITHUB_PROFILE_INFORMATION,
} from "../store/types/profile";

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
      basicInformation: {
        name: "",
        username: "",
        avatarUrl: "",
      },
      isGetBasicProfileInformationStart: false,
      githubInformation: {
        bio: "",
        email: "",
        followers: [],
        following: [],
        githubUrl: "",
        repositories: [],
        websiteUrl: "",
      },
      isGetGithubProfileInformationStart: false,
    };
  },

  computed: {
    username() {
      const username = this.$route.params.username;
      return username ? username : "";
    },

    breadcrumbs() {
      return this.$route.meta.breadcrumbs;
    },

    sortedRepositories() {
      const repositories = this.githubInformation.repositories.sort(
        (current, next) =>
          new Date(next.createdAt) - new Date(current.createdAt)
      );
      return repositories ? repositories : [];
    },

    repositoryCount() {
      return this.githubInformation.repositories.length;
    },

    followingCount() {
      return this.githubInformation.following.length;
    },

    followersCount() {
      return this.githubInformation.followers.length;
    },
  },

  methods: {
    async getBasicInformation() {
      this.isGetBasicProfileInformationStart = true;
      this.basicInformation = await this.$store.dispatch(
        GET_BASIC_PROFILE_INFORMATION,
        this.username
      );
      this.isGetBasicProfileInformationStart = false;
    },

    async getGithubInformation() {
      this.isGetGithubProfileInformationStart = true;
      this.githubInformation = await this.$store.dispatch(
        GET_GITHUB_PROFILE_INFORMATION,
        this.username
      );
      this.isGetGithubProfileInformationStart = false;
    },
  },

  async created() {
    await this.getBasicInformation();
    await this.getGithubInformation();
  },
};
</script>
