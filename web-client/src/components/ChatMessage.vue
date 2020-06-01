<template>
  <div class="mb-5">
    <div class="d-flex justify-space-between" v-if="isAuthorAndUserSame">
      <div class="flex-grow-1"></div>
      <div>
        <v-card color="primary" flat min-width="200" max-width="600" tile>
          <v-card-text>
            <span class="body-1 white--text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
              blanditiis, consectetur deleniti eos iste, laboriosam molestias
              nemo nulla obcaecati praesentium quibusdam quisquam ratione,
              reprehenderit rerum voluptatibus. Ab aperiam assumenda, ex impedit
              laborum libero magni nam quae, quam quisquam sint sunt unde
              voluptatibus. Aspernatur consectetur est eveniet explicabo
              possimus quia, suscipit?
            </span>
          </v-card-text>
        </v-card>
        <div class="d-flex mt-1">
          <div class="flex-grow-1"></div>
          <span class="caption grey--text">Sent · An hour ago</span>
        </div>
      </div>
    </div>

    <div class="d-flex" v-else>
      <v-avatar class="mr-3 align-self-end">
        <v-img
          src="../assets/noah-halpert.png"
          lazy-src="../assets/noah-halpert.png"
        ></v-img>
      </v-avatar>
      <div>
        <v-card color="#ECD4EA" flat min-width="200" max-width="600" shaped>
          <v-card-text>
            <span class="subtitle-1 font-weight-bold black--text d-block"
              >Cindy
            </span>
            <span class="body-1 black--text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
              blanditiis, consectetur deleniti eos iste, laboriosam molestias
              nemo nulla obcaecati praesentium quibusdam quisquam ratione,
              reprehenderit rerum voluptatibus. Ab aperiam assumenda, ex impedit
              laborum libero magni nam quae, quam quisquam sint sunt unde
              voluptatibus. Aspernatur consectetur est eveniet explicabo
              possimus quia, suscipit?
            </span>
          </v-card-text>
        </v-card>
        <div class="d-flex mt-1">
          <span class="caption grey--text">Sent · An hour ago</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "chat-message",

  props: {
    isAuthorAndUserSame: {
      type: Boolean,
      required: false,
    },
  },
};
</script>
