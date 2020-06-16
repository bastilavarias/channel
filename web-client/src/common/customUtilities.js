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

    formatTimestamp(timestamp) {
      return moment(new Date(timestamp)).format("MMM Do  h:mm A");
    },

    getFirstName(name) {
      const firstName = name.split(" ")[0];
      return firstName ? firstName : name;
    },

    hasError(error) {
      return Object.keys(error).length > 0;
    },
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },

  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
