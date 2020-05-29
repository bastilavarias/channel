export default {
  computed: {
    isDesktopMode() {
      return this.$vuetify.breakpoint.mdAndUp;
    },

    isSmallLaptopMode() {
      const currentWidth = this.$vuetify.breakpoint.width;
      return currentWidth > 1024 && currentWidth < 1439;
    },
  },
};
