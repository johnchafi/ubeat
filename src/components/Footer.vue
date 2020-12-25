<template>
  <v-app id="Footer" v-if="this.activeFooter">
    <v-card tile>
      <v-footer
        fixed
        color="#FFFFFF"
        class="pa-0 font-weight-medium"
        display="flex"
        tile
      >
        <v-progress-linear
          :value="100"
          class="my-0"
          height="3"
          color="#ff1744"
        ></v-progress-linear>

        <v-container class="pa-0">
          <v-row>
            <v-col cols="2" class="pa-5">
              {{ this.artistsNameSendToFooter }}
              <br>
              {{ this.typeMusicSendToFooter }}
            </v-col>
            <v-col cols="10" class="pa-0">
              <wave :soundUrl="soundUrl"></wave>
            </v-col>
          </v-row>

        </v-container>
      </v-footer>
    </v-card>
  </v-app>
</template>

<script>
// import {Howl} from "howler";

import { Howl } from "howler";
import Wave from "../views/Wave.vue";

export default {
  name: "Footer",
  components: {
    wave: Wave
  },
  data() {
    return {}
  },
  props: {
    activeFooter: Boolean,
    artistsNameSendToFooter: String,
    typeMusicSendToFooter: String,
    soundUrl: String
  },
  methods: { },

  mounted() { console.log("foot mounted " + this.soundUrl); },

  watch: {
    soundUrl: function(newV, oldV) {
      console.log("foot watch    Old " + oldV + "      New " + newV);
    }
  }
};
</script>

<style></style>
