<template>
  <v-container>
    <vue-headful title="Rooms"></vue-headful>
    <custom-breadcrumbs :routes="breadcrumbs"></custom-breadcrumbs>
    <v-card flat color="white">
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
          v-model="keyword"
        ></v-text-field>
        <div class="text-center" v-if="isSearchRoomsStart">
          <custom-progress-circular
            text="Fetching rooms. Please wait..."
          ></custom-progress-circular>
        </div>
      </v-card-text>
      <template v-if="shouldShowFeaturedRooms">
        <v-card-title>Featured Rooms 💯🔥 </v-card-title>
      </template>
      <v-card-text>
        <v-row>
          <template v-for="(room, index) in rooms" v-if="!isSearchRoomsStart">
            <v-col cols="12" sm="6" md="3">
              <room-list-item
                :key="index"
                :room-id="room.id"
                :avatar-url="room.avatarUrl"
                :name="room.name"
                :type="room.type"
                :members="room.members"
                :admin="room.admin"
              ></room-list-item>
            </v-col>
          </template>
        </v-row>
        <v-subheader v-if="isSearchRoomNoResults">
          <div class="flex-grow-1"></div>
          <span>Searched room not found.</span>
          <div class="flex-grow-1"></div>
        </v-subheader>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import CustomBreadcrumbs from "../../components/custom/Breadcrumbs";
import { ROOM_GET_FEATURED, ROOM_SEARCH } from "../../store/types/room";
import RoomListItem from "../../components/RoomListItem";
import CustomProgressCircular from "../../components/custom/ProgressCircular";

export default {
  components: { CustomProgressCircular, RoomListItem, CustomBreadcrumbs },
  data() {
    return {
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
      return !this.keyword && this.rooms.length > 0;
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
      this.rooms = await this.$store.dispatch(ROOM_GET_FEATURED, this.offset);
    },
  },

  async created() {
    await this.getFeaturedRooms();
  },
};
</script>
