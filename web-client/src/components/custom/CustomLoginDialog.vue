<template>
  <v-dialog v-model="isShowLocal" width="600">
    <v-card>
      <div class="text-center py-10">
        <v-avatar :size="100" class="mb-5">
          <v-img
            src="../../assets/github-logo.png"
            lazy-src="../../assets/github-logo.png"
          ></v-img>
        </v-avatar>
        <h1 class="display-1 font-weight-bold black--text mb-5">
          GitHub access required.
        </h1>
        <h1 class="title mb-5">
          Login to your <span class="font-weight-bold">GitHub Account</span>
          to
          <span class="d-block"
            >access <span class="font-weight-bold">Channel</span></span
          >
        </h1>
        <v-btn color="primary" x-large rounded @click="openGithubLogin">
          <v-icon class="mr-3" large>mdi-github</v-icon>
          <span>Login With Github</span>
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "custom-login-dialog",

  props: {
    isShow: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      isShowLocal: false,
    };
  },

  watch: {
    isShow(val) {
      this.isShowLocal = val;
    },

    isShowLocal(val) {
      this.$emit("update:isShow", val);
    },
  },

  methods: {
    openGithubLogin() {
      const githubClientId = process.env.VUE_APP_GITHUB_CLIENT_ID;
      const oauthURL = `https://github.com/login/oauth/authorize?client_id=${githubClientId}`;
      window.location.href = oauthURL;
    },
  },
};
</script>
