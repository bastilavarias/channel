export default {
  data() {
    return {
      scrollYPosition: 0,
    };
  },

  computed: {
    isDesktopMode() {
      return this.$vuetify.breakpoint.mdAndUp;
    },

    isSmallLaptopMode() {
      const currentWidth = this.$vuetify.breakpoint.width;
      return currentWidth > 1024 && currentWidth < 1439;
    },

    isScrolled() {
      return this.scrollYPosition > 1;
    },
  },

  methods: {
    handleScroll() {
      this.scrollYPosition = window.scrollY;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
