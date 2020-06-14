<template>
  <v-card :disabled="isAccountAlreadyJoined">
    <v-list-item>
      <v-list-item-avatar :size="45">
        <v-img :src="avatarUrl" :lazy-src="avatarUrl"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          <span class="title font-weight-bold">{{ name }}</span>
        </v-list-item-title>
        <v-list-item-subtitle>
          <span
            :class="`font-weight-bold ${
              type === 'public' ? 'success--text' : 'error--text'
            } text-capitalize`"
            >{{ type }} Room</span
          >
          <span class="mx-1">
            ·
          </span>
          {{ membersTitle }}
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          <span class="font-weight-bold"
            >Admin:
            <span class="font-weight-regular text-capitalize">
              {{ admin.name }}
            </span></span
          >
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn
        color="primary"
        small
        @click="selectRoom"
        :disabled="isAccountAlreadyJoined"
      >
        <span class="text-capitalize">
          {{ isAccountAlreadyJoined ? "Already Joined" : "Join" }}
        </span>
        <v-icon small>mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-actions>
    <v-dialog width="500" v-model="isPasswordPromptShow">
      <v-card tile>
        <v-card-title class="font-weight-bold"
          >Enter {{ name }}'s room password
        </v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <custom-password-text-field
                label="Password"
                outlined
                :password.sync="password"
                :error="hasError(joinError)"
                :error-messages="joinError.password ? joinError.password : ''"
              ></custom-password-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="black" text @click="isPasswordPromptShow = false">
            <span class="text-capitalize">Cancel</span>
          </v-btn>
          <v-btn
            color="primary"
            :disabled="!isPrivatePasswordValid"
            @click="joinRoom"
            :loading="isJoiningRoomStart"
          >
            <span class="text-capitalize">
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
import CustomPasswordTextField from "./custom/PasswordTextField";
import { ROOM_JOIN } from "../store/types/room";
import customUtilities from "../common/customUtilities";

export default {
  name: "room-list-item",

  mixins: [customUtilities],

  components: { CustomPasswordTextField },

  props: {
    roomId: {
      type: String,
      required: true,
    },

    avatarUrl: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    members: {
      type: Number,
      required: true,
    },

    admin: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      isPasswordPromptShow: false,
      password: "",
      isJoiningRoomStart: false,
      joinError: {},
    };
  },

  computed: {
    membersTitle() {
      const members = this.members;
      return members > 1 ? `${members} Members` : `${members} Member`;
    },

    isPrivatePasswordValid() {
      return this.type === "private" && this.password;
    },

    joinedRooms() {
      const rooms = this.$store.state.room.joined;
      return rooms ? rooms : [];
    },

    isAccountAlreadyJoined() {
      let isJoined = false;
      const foundRoom = this.joinedRooms.find(
        (room) => room.id === this.roomId
      );
      if (foundRoom) isJoined = true;
      return isJoined;
    },
  },

  methods: {
    async selectRoom() {
      if (this.type === "private") return (this.isPasswordPromptShow = true);
      await this.joinRoom();
    },

    async joinRoom(roomId, password) {
      this.isJoiningRoomStart = true;
      const roomDetails = {
        roomId: this.roomId,
        password: this.password,
      };
      const { isAuthenticated, room, error } = await this.$store.dispatch(
        ROOM_JOIN,
        roomDetails
      );
      if (isAuthenticated) {
        await this.$router.push({
          name: "chat-list",
          params: {
            roomId: room.id,
          },
        });
      }
      this.joinError = error;
      this.isJoiningRoomStart = false;
    },
  },
};
</script>
