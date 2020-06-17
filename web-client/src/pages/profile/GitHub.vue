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

    <div>
      <custom-label icon="mdi-account-multiple-check">Followers</custom-label>
      <v-slide-group v-model="followersSlidGroupState">
        <template v-for="n in 3">
          <profile-github-follower-list-slide-group-item
            class-name="ma-1"
          ></profile-github-follower-list-slide-group-item>
        </template>
      </v-slide-group>
    </div>
  </div>
</template>

<script>
import CustomLabel from "../../components/custom/Label";
import ProfileGithubRepositoryListSlideGroupItem from "../../components/ProfileGitHubRepositoryListSlideGroupItem";
import ProfileGithubFollowerListSlideGroupItem from "../../components/ProfileGitHubFollowerListSlideGroupItem";
export default {
  components: {
    ProfileGithubFollowerListSlideGroupItem,
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
