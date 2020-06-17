<template>
  <div class="py-10">
    <custom-label icon="mdi-source-repository">Repositories</custom-label>
    <v-slide-group v-model="repositoriesSlidGroupState">
      <template v-for="n in 3">
        <profile-github-repository-item
          class-name="ma-1"
        ></profile-github-repository-item>
      </template>
    </v-slide-group>
  </div>
</template>

<script>
import CustomLabel from "../../components/custom/Label";
import ProfileGithubRepositoryItem from "../../components/ProfileGitHubRepositoryItem";
export default {
  components: { ProfileGithubRepositoryItem, CustomLabel },
  data() {
    return {
      repositoriesSlidGroupState: null,
    };
  },
};
</script>
