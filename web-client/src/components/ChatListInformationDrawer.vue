<template>
  <div>
    <v-card flat color="white">
      <v-card-title>
        <span class="font-weight-bold">
          Room Information
        </span>
        <div class="flex-grow-1"></div>
        <v-btn icon @click="isCustomizeMode = true" v-if="isAccountAdmin">
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </v-card-title>
      <div class="text-center">
        <v-avatar :size="95">
          <v-img :src="roomAvatarUrl" :lazy-src="roomAvatarUrl"></v-img>
        </v-avatar>
      </div>
      <v-card color="white" flat v-if="isCustomizeMode">
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                color="primary"
                outlined
                label="Room Name"
                v-model="roomNameLocal"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                color="primary"
                outlined
                label="Room Description"
                v-model="roomDescriptionLocal"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <room-type-selection
                label="Room Type"
                outlined
                :room-type.sync="roomTypeLocal"
              ></room-type-selection>
            </v-col>
            <v-col cols="12" v-if="isRoomTypePrivate">
              <custom-password-text-field
                :password.sync="roomPasswordLocal"
                label="Room Password"
                outlined
              ></custom-password-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            color="black"
            text
            class="text-capitalize"
            @click="isCustomizeMode = false"
          >
            Cancel
          </v-btn>
          <v-btn color="error">
            <span class="text-capitalize font-weight-bold mr-1"
              >Destroy Room</span
            >
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
          <v-btn color="primary">
            <span class="text-capitalize">
              <span class="mr-1">Update</span>
              <v-icon>mdi-pencil</v-icon>
            </span>
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-list v-else>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>Room Name</v-list-item-subtitle>
            <v-list-item-title class="font-weight-bold">{{
              roomName
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="roomDescription">
          <v-list-item-content>
            <v-list-item-subtitle>Description</v-list-item-subtitle>
            <v-list-item-title>{{ roomDescription }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>Room Type</v-list-item-subtitle>
            <v-list-item-title>
              <span :class="`${roomTypeLabelColor} text-capitalize`">
                {{ roomType }}
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-card-title class="font-weight-bold">
        <span>
          Members
        </span>
        <div class="flex-grow-1"></div>
        <v-btn
          color="error"
          icon
          @click="leaveRoom"
          :disabled="!roomId"
          :loading="isLeaveRoomStart"
          v-if="!isAccountAdmin"
        >
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-subtitle>{{ membersTitle }} </v-card-subtitle>
      <v-list>
        <template v-for="(member, index) in members">
          <chat-list-information-drawer-member-list-item
            :key="index"
            :admin="admin"
            :room-id="roomId"
            :member-id="member.id"
            :name="member.name"
            :username="member.username"
            :avatar-url="member.avatarUrl"
          ></chat-list-information-drawer-member-list-item>
        </template>
      </v-list>
      <v-card-actions>
        <!--        <div class="px-2 pb-5">-->
        <!--          <v-btn-->
        <!--            color="error"-->
        <!--            block-->
        <!--            @click="isDestroyRoomWarningDialogShow = true"-->
        <!--            v-if="isAccountAdmin"-->
        <!--          >-->
        <!--            <span class="text-capitalize font-weight-bold mr-1">-->
        <!--              Destroy Room-->
        <!--            </span>-->
        <!--            <v-icon>mdi-trash-can</v-icon>-->
        <!--          </v-btn>-->
        <!--          <v-btn-->
        <!--            color="error"-->
        <!--            block-->
        <!--            @click="leaveRoom"-->
        <!--            :disabled="!roomId"-->
        <!--            :loading="isLeaveRoomStart"-->
        <!--            v-else-->
        <!--          >-->
        <!--            <span class="text-capitalize font-weight-bold mr-1">-->
        <!--              Leave Room-->
        <!--            </span>-->
        <!--            <v-icon>mdi-logout</v-icon>-->
        <!--          </v-btn>-->
        <!--        </div>-->
      </v-card-actions>
    </v-card>
    <v-dialog v-model="isDestroyRoomWarningDialogShow" width="700">
      <v-card>
        <v-card-title>
          Destroy Room
        </v-card-title>
        <v-card-text>
          <v-alert text type="error"
            >Destroying this room will delete chat data and room members, click
            destroy if you'are sure.</v-alert
          >
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            text
            class="text-capitalize"
            @click="isDestroyRoomWarningDialogShow = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="error"
            @click="destroyRoom"
            :loading="isDestroyRoomStart"
          >
            <span class="text-capitalize mr-1">Destroy</span>
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ChatListInformationDrawerMemberListItem from "./ChatListInformationDrawerMemberListItem";
import { ROOM_DESTROY, ROOM_LEAVE } from "../store/types/room";
import CustomPasswordTextField from "./custom/PasswordTextField";
import RoomTypeSelection from "./RoomTypeSelection";

export default {
  name: "chat-list-information-drawer",

  components: {
    RoomTypeSelection,
    CustomPasswordTextField,
    ChatListInformationDrawerMemberListItem,
  },

  props: {
    roomId: {
      type: String,
      required: true,
    },

    roomName: {
      type: String,
      required: true,
    },

    roomAvatarUrl: {
      type: String,
      required: true,
    },

    roomDescription: {
      type: String,
      required: true,
    },

    roomType: {
      type: String,
      required: true,
    },

    admin: {
      type: Object,
      required: true,
    },

    isGetInformationStart: {
      type: Boolean,
      required: true,
    },

    members: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      isLeaveRoomStart: false,
      isDestroyRoomWarningDialogShow: false,
      isDestroyRoomStart: false,
      isCustomizeMode: false,
      roomAvatarUrlLocal: "",
      roomNameLocal: "",
      roomDescriptionLocal: "",
      roomTypeLocal: "",
      roomPasswordLocal: "",
    };
  },

  computed: {
    membersTitle() {
      const members = this.members;
      return members.length <= 1
        ? `You're the only member in this chat group`
        : `${members.length} Members in this chat group`;
    },

    currentAccount() {
      const account = this.$store.state.account.current;
      return account ? account : {};
    },

    isAccountAdmin() {
      return this.currentAccount.id === this.admin.id;
    },

    isRoomTypePrivate() {
      return this.roomTypeLocal === "private";
    },

    roomTypeLabelColor() {
      return this.roomType === "public" ? "success--text" : "error--text";
    },
  },

  watch: {
    roomName(name) {
      this.roomNameLocal = name;
    },

    roomDescription(description) {
      this.roomDescriptionLocal = description;
    },

    roomType(roomType) {
      this.roomTypeLocal = roomType;
    },
  },

  methods: {
    async leaveRoom() {
      this.isLeaveRoomStart = true;
      const isLeft = await this.$store.dispatch(ROOM_LEAVE, this.roomId);
      this.isLeaveRoomStart = false;
      if (isLeft) {
        const roomLeavePayload = {
          roomId: this.roomId,
          accountId: this.currentAccount.id,
        };
        this.$socket.client.emit("room_leave", roomLeavePayload);
        await this.$router.push({ name: "room-list" });
      }
    },

    async destroyRoom() {
      this.isDestroyRoomStart = true;
      const isDestroyed = await this.$store.dispatch(ROOM_DESTROY, this.roomId);
      if (isDestroyed) {
        this.$socket.client.emit("room_destroy", this.roomId);
        await this.$router.push({ name: "room-list" });
      }
      this.isDestroyRoomStart = false;
    },
  },

  created() {
    this.roomAvatarUrlLocal = this.roomAvatarUrl;
    this.roomNameLocal = this.roomName;
    this.roomDescriptionLocal = this.roomDescription;
    this.roomTypeLocal = this.roomType;
  },
};
</script>
