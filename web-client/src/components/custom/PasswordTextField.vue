<template>
  <v-text-field
    :append-icon="isPasswordShow ? 'mdi-eye-off' : 'mdi-eye'"
    :type="isPasswordShow ? 'text' : 'password'"
    @click:append="isPasswordShow = !isPasswordShow"
    :outlined="outlined"
    :label="label"
    v-model="passwordLocal"
    :error="error"
    :error-messages="errorMessages"
  ></v-text-field>
</template>

<script>
export default {
  name: "custom-password-text-field",

  props: {
    outlined: {
      type: Boolean,
      required: false,
    },

    label: {
      type: String,
      required: false,
    },

    password: {
      type: String,
      required: true,
    },

    error: {
      type: Boolean,
      required: false,
    },

    errorMessages: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      isPasswordShow: false,
      passwordLocal: "",
    };
  },

  watch: {
    password(val) {
      this.passwordLocal = val;
    },

    passwordLocal(val) {
      this.$emit("update:password", val);
    },
  },
};
</script>
