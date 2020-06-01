<template>
  <v-card flat color="white">
    <v-card-title>
      <span class="display-1 font-weight-bold">Rooms</span>
      <div class="flex-grow-1"></div>
      <v-btn outlined color="primary" rounded :to="{ name: 'room-form' }">
        <span class="font-weight-bold">Create Room</span>
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
        <v-list-item :key="n">
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
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script></script>
