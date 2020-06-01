<template>
  <v-card flat color="white">
    <v-card-title>
      <span class="display-1 font-weight-bold">Room Information</span>
    </v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col cols="12">
          <v-text-field label="Room Name" outlined></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-textarea label="Room Description" outlined></v-textarea>
        </v-col>

        <v-col cols="12" :md="isPrivateRoom ? '4' : '12'">
          <v-select
            label="Room Type"
            outlined
            :items="types"
            v-model="form.type"
          >
            <template v-slot:item="{ item }">
              <span class="text-capitalize">{{ item }}</span>
            </template>

            <template v-slot:selection="{ item }">
              <span class="text-capitalize">{{ item }}</span>
            </template>
          </v-select>
        </v-col>

        <v-col cols="12" md="8" v-if="isPrivateRoom">
          <v-text-field
            label="Password"
            outlined
            type="password"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" block rounded>
        <span class="text-capitalize">
          Create Room
        </span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
const defaultForm = {
  type: "",
};
export default {
  data() {
    return {
      form: Object.assign({}, defaultForm),
      defaultForm,

      types: ["public", "private"],
    };
  },

  computed: {
    isPrivateRoom() {
      return this.form.type === "private" && this.form.type;
    },
  },
};
</script>
