<template>
  <v-card flat color="white">
    <v-card-text>
      <custom-breadcrumbs :routes="breadcrumbs"></custom-breadcrumbs>
    </v-card-text>
    <v-card-title>
      <span class="display-1 font-weight-bold">Rooms</span>
      <div class="flex-grow-1"></div>
      <v-btn outlined color="primary" rounded :to="{ name: 'room-form' }">
        <span class="font-weight-bold text-capitalize">Create Room</span>
      </v-btn>
    </v-card-title>

    <v-list rounded dense>
      <v-text-field
        dense
        rounded
        filled
        single-line
        label="Search Room"
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>
      <template v-for="n in 3">
        <v-list-item :key="n" @click="isRoomDetailsDialogShow = true">
          <v-list-item-avatar :size="45">
            <v-img
              src="../../assets/noah-halpert.png"
              lazy-src="../../assets/noah-halpert.png"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              <span class="title font-weight-bold">CET - Developers</span>
            </v-list-item-title>
            <v-list-item-subtitle>
              <span class="font-weight-bold success--text">Public Room</span>
              <span class="mx-1">
                ·
              </span>
              8 Members
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <span class="font-weight-bold"
                >Admin:
                <span class="font-weight-regular text-capitalize">
                  test
                </span></span
              >
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <v-dialog width="500" v-model="isRoomDetailsDialogShow">
      <v-card tile>
        <v-card-title class="font-weight-bold">Room Information </v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                rounded
                filled
                value="Room Name"
                readonly
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                rounded
                filled
                placeholder="Password"
                append-icon="mdi-eye"
                type="password"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="black" text @click="isRoomDetailsDialogShow = false">
            <span class="text-capitalize">Cancel</span>
          </v-btn>
          <v-btn color="success">
            <span class="font-weight-bold text-capitalize mr-1">
              Join
            </span>
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import CustomBreadcrumbs from "../../components/custom/Breadcrumbs";
export default {
  components: { CustomBreadcrumbs },
  data() {
    return {
      isRoomDetailsDialogShow: false,
    };
  },

  computed: {
    breadcrumbs() {
      return this.$route.meta.breadcrumbs;
    },
  },
};
</script>
