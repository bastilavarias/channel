<template>
  <v-dialog v-model="isShowLocal" width="600">
    <v-card>
      <v-card-title>Update Room Information</v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <v-text-field
              label="Room Name"
              outlined
              v-model="form.name"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              label="Room Description"
              outlined
              v-model="form.description"
            ></v-textarea>
          </v-col>
          <v-col cols="12" :md="isPrivateRoom ? '2' : '12'">
            <v-select
              label="Room Type"
              outlined
              :items="types"
              v-model="form.type"
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
          </v-col>
          <v-col cols="12" md="10" v-if="isPrivateRoom">
            <custom-password-text-field
              outlined
              label="Password"
              :password.sync="form.password"
            ></custom-password-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error">
          <span class="text-capitalize mr-1">Destroy Room</span>
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
        <div class="flex-grow-1"></div>
        <v-btn
          text
          color="black"
          class="text-capitalize"
          @click="isShowLocal = false"
          >Cancel</v-btn
        >
        <v-btn color="info">
          <span class="text-capitalize mr-1">
            Update
          </span>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CustomPasswordTextField from "./custom/PasswordTextField";
const defaultForm = {
  name: "",
  description: "",
  type: "",
  password: "",
};

export default {
  name: "chat-list-information-drawer-update-form",
  components: { CustomPasswordTextField },
  props: {
    isShow: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      isShowLocal: false,
      form: Object.assign({}, defaultForm),
      defaultForm,
      types: ["public", "private"],
      isLoading: false,
    };
  },

  computed: {
    isPrivateRoom() {
      return this.form.type === "private";
    },
  },

  watch: {
    isShow(isShow) {
      this.isShowLocal = isShow;
    },

    isShowLocal(isShow) {
      this.$emit("update:isShow", isShow);
    },
  },

  created() {
    this.isShowLocal = this.isShow;
  },
};
</script>
