<template>
  <v-app>
    <v-app-bar
      :color="isScrolled ? 'white' : 'transparent'"
      :flat="!isScrolled"
      app
    >
      <v-toolbar-title>
        <div class="d-flex">
          <span class="mr-2 text-uppercase font-weight-bold primary--text"
            >Channel</span
          >
          <v-icon color="primary">mdi-access-point-network</v-icon>
        </div>
      </v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container class="fill-height">
        <v-row>
          <v-col cols="12" sm="10" md="8" lg="6">
            <div class="content-holder">
              <h1 class="display-3 font-weight-bold mb-10">
                Welcome to <span class="d-block mt-3">Channel.</span>
              </h1>
              <h1
                class="font-weight-regular mb-10"
                style="color: #212121; opacity: 0.8;"
              >
                Connect with your team anytime,
                <span class="d-block">anywhere</span>
              </h1>
              <v-btn
                color="primary"
                x-large
                rounded
                @click="isLoginDialogShow = true"
              >
                <v-icon class="mr-3" large>mdi-github</v-icon>
                <span>Login With Github</span>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <div class="banner">
      <img
        :src="require('../assets/login-background.png')"
        alt="Login Banner"
        class="banner-image"
      />
    </div>
    <v-dialog v-model="isLoginDialogShow" width="600">
      <v-card>
        <div class="text-center py-10">
          <v-avatar :size="100" class="mb-5">
            <v-img
              src="../assets/github-logo.png"
              lazy-src="../assets/github-logo.png"
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
          <v-btn
            color="primary"
            x-large
            rounded
            :to="{ name: 'chat-window', params: { chatId: '1' } }"
          >
            <v-icon class="mr-3" large>mdi-github</v-icon>
            <span>Login With Github</span>
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import customUtilities from "../common/customUtilities";

export default {
  data() {
    return {
      isLoginDialogShow: false,
    };
  },

  mixins: [customUtilities],
};
</script>

<style scoped>
@media only screen and (max-width: 768px) {
  .banner {
    display: none;
  }
}
@media (min-width: 769px) and (max-width: 1023px) {
  .banner {
    display: none;
  }
}
@media (min-width: 1024px) and (max-width: 1439px) {
  .banner {
    position: absolute;
    top: -50%;
    right: -65%;
  }
  .banner-image {
    width: 100%;
  }
}
@media only screen and (min-width: 1440px) {
  .banner {
    position: absolute;
    top: -50%;
    right: -20%;
  }
  .banner-image {
    width: 100%;
  }
}
</style>
