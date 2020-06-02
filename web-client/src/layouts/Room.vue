<template>
  <section>
    <v-container>
      <custom-breadcrumbs :routes="breadcrumbs"></custom-breadcrumbs>
      <v-row>
        <v-col cols="12" md="8">
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import CustomBreadcrumbs from "../components/custom/Breadcrumbs";
export default {
  name: "room-layout",
  components: { CustomBreadcrumbs },

  computed: {
    breadcrumbs() {
      return this.$route.meta.breadcrumbs;
    },
  },
};
</script>
