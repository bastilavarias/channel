<template>
  <p class="subtitle-2 grey--text">
    <v-icon class="mr-1" v-if="icon">{{ icon }}</v-icon
    ><slot></slot>
  </p>
</template>

<script>
export default {
  name: "custom-label",

  props: {
    icon: {
      type: String,
      required: false,
    },
  },
};
</script>
