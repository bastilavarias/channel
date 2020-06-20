<template>
  <v-select
    :label="label"
    :outlined="outlined"
    :items="types"
    v-model="roomTypeLocal"
  >
    <template v-slot:item="{ item }">
      <span
        :class="`text-capitalize ${
          item === 'public' ? 'success--text' : 'error--text'
        } font-weight-bold`"
        >{{ item }}</span
      >
    </template>
    <template v-slot:selection="{ item }">
      <span
        :class="`text-capitalize ${
          item === 'public' ? 'success--text' : 'error--text'
        } font-weight-bold`"
        >{{ item }}</span
      >
    </template>
  </v-select>
</template>

<script>
export default {
  name: "room-type-selection",

  props: {
    roomType: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      required: true,
    },

    outlined: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      roomTypeLocal: "",
      types: ["public", "private"],
    };
  },

  watch: {
    roomType(type) {
      this.roomTypeLocal = type;
    },

    roomTypeLocal(type) {
      this.$emit("update:roomType", type);
    },
  },

  created() {
    this.roomTypeLocal = this.roomType;
  },
};
</script>
