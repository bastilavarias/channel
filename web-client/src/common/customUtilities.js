import moment from "moment";

export default {
  data() {
    return {
      scrollYPosition: 0,
    };
  },

  computed: {
    isScrolled() {
      return this.scrollYPosition > 1;
    },
  },

  methods: {
    handleScroll() {
      this.scrollYPosition = window.scrollY;
    },

    formatRelativeTime(timestamp) {
      return moment(new Date(timestamp)).fromNow();
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
