<template>
  <div class="text-center">
    <v-progress-circular
      color="primary"
      indeterminate
      class="mb-3"
    ></v-progress-circular>
    <h1 class="caption primary--text" v-if="text">
      {{ text }}
    </h1>
  </div>
</template>

<script>
export default {
  name: "custom-progress-circular",

  props: {
    text: {
      type: String,
      required: false,
    },
  },
};
</script>
