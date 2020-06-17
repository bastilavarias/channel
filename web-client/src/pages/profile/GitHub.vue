<template>
  <div class="py-10">
    <div class="mb-5">
      <custom-label icon="mdi-source-repository">Repositories</custom-label>
      <v-slide-group v-model="repositoriesSlidGroupState">
        <template v-for="n in 3">
          <profile-github-repository-list-slide-group-item class="ma-1">
            class-name="ma-1" ></profile-github-repository-list-slide-group-item
          >
        </template>
      </v-slide-group>
    </div>
    <div class="mb-5">
      <custom-label icon="mdi-account-multiple-check"
        >Followers(6)</custom-label
      >
      <v-slide-group v-model="followersSlidGroupState">
        <template v-for="n in 3">
          <profile-github-account-list-slide-group-item class-name="ma-1">
          </profile-github-account-list-slide-group-item>
        </template>
      </v-slide-group>
    </div>
    <div>
      <custom-label icon="mdi-account-multiple-plus">Following(6)</custom-label>
      <v-slide-group v-model="followersSlidGroupState">
        <template v-for="n in 3">
          <profile-github-account-list-slide-group-item class-name="ma-1">
          </profile-github-account-list-slide-group-item>
        </template>
      </v-slide-group>
    </div>
  </div>
</template>

<script>
import CustomLabel from "../../components/custom/Label";
import ProfileGithubRepositoryListSlideGroupItem from "../../components/ProfileGitHubRepositoryListSlideGroupItem";
import ProfileGithubAccountListSlideGroupItem from "../../components/ProfileGitHubAccountListSlideGroupItem";
export default {
  components: {
    ProfileGithubAccountListSlideGroupItem,
    ProfileGithubRepositoryListSlideGroupItem,
    CustomLabel,
  },
  data() {
    return {
      repositoriesSlidGroupState: null,
      followersSlidGroupState: null,
    };
  },
};
</script>
