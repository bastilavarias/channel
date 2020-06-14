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
    <v-card-text>
      <v-text-field
        dense
        rounded
        filled
        single-line
        label="Search Room"
        prepend-inner-icon="mdi-magnify"
        autofocus
        v-model="keyword"
      ></v-text-field>
      <v-skeleton-loader
        type="list-item-avatar-three-line"
        v-if="isSearchRoomsStart"
      ></v-skeleton-loader>
    </v-card-text>
    <template v-if="shouldShowFeaturedRooms">
      <v-card-title>Featured Rooms</v-card-title>
    </template>
    <v-card-text v-else>
      <v-row dense>
        <v-col cols="12" sm="6" md="3">
          <template v-for="(room, index) in rooms" v-if="!isSearchRoomsStart">
            <room-list-item
              :key="index"
              :avatar-url="room.avatarUrl"
              :name="room.name"
              :type="room.type"
              :members="room.members"
              :admin="room.admin"
            ></room-list-item>
          </template>
        </v-col>
      </v-row>
      <v-subheader v-if="isSearchRoomNoResults">
        <div class="flex-grow-1"></div>
        <span>Searched room not found.</span>
        <div class="flex-grow-1"></div>
      </v-subheader>
    </v-card-text>
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
import { ROOM_GET_FEATURED, ROOM_SEARCH } from "../../store/types/room";
import RoomListItem from "../../components/RoomListItem";

export default {
  components: { RoomListItem, CustomBreadcrumbs },
  data() {
    return {
      isRoomDetailsDialogShow: false,
      keyword: "",
      offset: 0,
      rooms: [],
      isSearchRoomsStart: false,
    };
  },

  computed: {
    breadcrumbs() {
      return this.$route.meta.breadcrumbs;
    },

    shouldShowFeaturedRooms() {
      return (
        this.rooms.length === 0 && !this.isSearchRoomsStart && !this.keyword
      );
    },

    isSearchRoomNoResults() {
      return (
        this.rooms.length === 0 && !this.isSearchRoomsStart && this.keyword
      );
    },
  },

  watch: {
    async keyword(val) {
      if (this.keyword) {
        return await this.searchRooms();
      }
      await this.getFeaturedRooms();
    },
  },

  methods: {
    async searchRooms() {
      this.isSearchRoomsStart = true;
      if (this.keyword.length > 0) {
        this.rooms = await this.$store.dispatch(ROOM_SEARCH, {
          keyword: this.keyword,
          offset: this.offset,
        });
      } else {
        this.rooms = [];
      }
      this.isSearchRoomsStart = false;
    },

    async getFeaturedRooms() {
      await this.$store.dispatch(ROOM_GET_FEATURED, this.offset);
    },
  },

  async created() {
    await this.getFeaturedRooms();
  },
};
</script>
