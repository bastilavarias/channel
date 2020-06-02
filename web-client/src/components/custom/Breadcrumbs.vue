<template>
  <v-breadcrumbs
    :items="routes"
    style="padding-left: 0 !important;"
    :class="className"
  >
    <template v-slot:item="{ item }">
      <router-link :to="item.to" class="primary--text route">
        <div class="d-flex align-center">
          <v-icon class="mr-1" color="primary">{{ item.icon }}</v-icon>
          <span>{{ item.text }}</span>
        </div>
      </router-link>
    </template>
  </v-breadcrumbs>
</template>
<script>
export default {
  name: "custom-breadcrumbs",
  props: {
    routes: {
      type: Array,
      required: true,
    },
    className: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped>
.route {
  text-decoration: none;
}
</style>
