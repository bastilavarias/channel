<template>
  <v-list-item>
    <v-list-item-avatar :size="45">
      <v-img :src="avatarUrl" :lazy-src="avatarUrl"></v-img>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>
        <span class="title font-weight-bold text-capitalize">{{ name }}</span>
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
</template>

<script>
export default {
  name: "room-list-item",

  props: {
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

  computed: {
    membersTitle() {
      const members = this.members;
      return members > 1 ? `${members} Members` : `${members} Member`;
    },
  },
};
</script>
