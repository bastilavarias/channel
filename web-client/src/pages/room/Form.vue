<template>
  <v-card flat color="white">
    <v-card-text>
      <custom-breadcrumbs :routes="breadcrumbs"></custom-breadcrumbs>
    </v-card-text>
    <v-card-title>
      <span class="display-1 font-weight-bold">Room Information</span>
    </v-card-title>
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
      <v-btn
        color="primary"
        block
        rounded
        :disabled="!isFormValid"
        @click="createRoom"
        :loading="isLoading"
      >
        <span class="text-capitalize">
          Create Room
        </span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import CustomPasswordTextField from "../../components/custom/PasswordTextField";
import { ROOM_CREATE } from "../../store/types/room";
import CustomBreadcrumbs from "../../components/custom/Breadcrumbs";
const defaultForm = {
  name: "",
  description: "",
  type: "",
  password: "",
};
export default {
  components: { CustomBreadcrumbs, CustomPasswordTextField },
  data() {
    return {
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

    isFormValid() {
      const { name, type, password } = this.form;
      if (this.isPrivateRoom) return name && type && password;
      return name && type;
    },

    breadcrumbs() {
      return this.$route.meta.breadcrumbs;
    },
  },

  methods: {
    async createRoom() {
      this.isLoading = true;
      const createdRoomId = await this.$store.dispatch(ROOM_CREATE, this.form);
      if (createdRoomId) {
        await this.$router.push({
          name: "chat-list",
          params: { roomId: createdRoomId },
        });
        return;
      }
      this.isLoading = false;
    },
  },
};
</script>
