<template>
  <section>
    <v-toolbar clipped-right flat color="white">
      <v-toolbar-title>
        <v-list-item-avatar :size="45">
          <v-img
            src="../assets/noah-halpert.png"
            lazy-src="../assets/noah-halpert.png"
          ></v-img>
        </v-list-item-avatar>
        <span class="font-weight-bold">CET - Developers</span>
      </v-toolbar-title>
    </v-toolbar>
    <div id="chat-messages">
      <template v-for="n in 200">
        <v-list-item>sfsdf</v-list-item>
      </template>
    </div>
    <div id="chat-input">
      <v-row no-gutters>
        <v-col cols="11">
          <v-textarea
            class="ml-5"
            placeholder="Write a message..."
            auto-grow
            rows="3"
            outlined
            rounded
            row-height="15"
            full-width
          ></v-textarea>
        </v-col>
        <v-col cols="1">
          <div class="text-center">
            <v-btn color="primary" fab>
              <v-icon>mdi-send</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
    <v-navigation-drawer app right width="400">
      <v-card flat color="white">
        <v-card-title class="font-weight-bold">Members</v-card-title>
        <v-card-subtitle>5 Members in this room</v-card-subtitle>
        <v-list>
          <template v-for="n in 35">
            <v-list-item :key="n">
              <v-list-item-avatar :size="45">
                <v-img
                  src="../assets/noah-halpert.png"
                  lazy-src="../assets/noah-halpert.png"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <span class="font-weight-bold">User Name</span>
                </v-list-item-title>
                <v-list-item-subtitle>Username</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
      <template v-slot:append>
        <v-card-actions>
          <v-btn color="error" outlined block>
            <span class="text-capitalize font-weight-bold mr-1">
              Leave Room
            </span>
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </v-card-actions>
      </template>
    </v-navigation-drawer>
  </section>
</template>

<style scoped>
#chat-messages {
  flex: 1 0 100%;
  overflow: auto;
  height: 85vh;
}
#chat-input {
}
</style>
