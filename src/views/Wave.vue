<template>
  <div id="wave">
    <v-container class="pa-0">
      <v-row >
        <v-col cols="8" class="pa-lg-1" >
          <div id="wavesurfer" class="histo"></div>
        </v-col>
        <v-col cols="4" class="pa-3">
          <div>
            <v-list-item-icon>
              <v-btn icon @click="backward()">
                <v-icon>mdi-rewind</v-icon>
              </v-btn>
            </v-list-item-icon>
            <v-list-item-icon>
              <v-btn icon @click="playPause()">
                <v-icon>mdi-play-pause</v-icon>
              </v-btn>
            </v-list-item-icon>
            <v-list-item-icon>
              <v-btn icon @click="forward()">
                <v-icon>mdi-fast-forward</v-icon>
              </v-btn>
            </v-list-item-icon>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Wavesurfer from 'wavesurfer.js'

export default {
  name: 'wave',

  data: () => ({
    wavesurfer: null
  }),

  props: {
    soundUrl: String
  },

 async mounted() {
    console.log("wave mounted  " + this.soundUrl);
    this.createWaveSurfer();
    this.wavesurfer.load(this.soundUrl);
    this.$nextTick(async function() {
      console.log("wave play  " + this.soundUrl);
      this.wavesurfer.playPause();
    });
  },

  created() {},

  watch: {
    soundUrl: function(newVal, oldVal) {
      console.log("wavewatch    Old " + oldVal + "   New " + newVal);
      this.wavesurfer.load(newVal);
      this.wavesurfer.playPause();
    }
  },

  methods: {
    playPause() {
      this.wavesurfer.playPause();
    },
    backward() {
      this.wavesurfer.skipBackward();
    },
    forward() {
      this.wavesurfer.skipForward();
    },
    createWaveSurfer() {
      this.wavesurfer = Wavesurfer.create({
        container: "#wavesurfer",
        waveColor: '#ff1744',
        hideScrollbar: true,
        backend: 'MediaElement'
      });
    }
  }
}
</script>

<style scoped>
.histo {
  background-color: white;
}
</style>
