<template>
  <v-app id="inspire">
    <!------------------------------------------------------------------->
    <!------------------------------------------------------------------->
    <div
      style="display:flex; flex-direction: column; justify-content: center; margin-top: 15%"
      v-if="this.displayAlbum === false"
    >
      <v-row justify="center">
        <v-progress-circular
          :size="200"
          :width="25"
          color="#ff1744"
          indeterminate
        ></v-progress-circular>
      </v-row>
    </div>
    <!------------------------------------------------------------------->
    <!------------------------------------------------------------------->

    <v-row justify="center">
      <v-dialog
        v-model="dialogAddThingInPlaylist"
        max-width="290"
        persistent
        overlay-opacity="0.94"
      >
        <v-card>
          <v-card-title class="headline" style="color: #ff1744"
          >Please create playlist before add song</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              style="border-style: solid; border-color: #00ff00; color: #00ff00"
              text
              @click="closeDialogbox"
            >
              ok
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!---------------------------------------------------------------------------------------------->
    <!---------------------------------------------------------------------------------------------->
    <div v-if="this.displayAlbum">
      <div id="presentation">
        <v-card
          :elevation="9"
          height="200"
          width="400"
          dark
          style="display: flex; flex-direction: column; justify-content: center; align-items: center"
        >
          <v-card-title style="font-family: Aclonica">{{
            this.albumName
          }}</v-card-title>
          <v-card-subtitle style="font-family: Aclonica"
            >{{ this.musicNumber }} musics</v-card-subtitle
          >

          <v-bottom-sheet v-model="sheet1" persistent>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                style="background-color: #1e1e1e; margin-top: 1%; position: absolute; bottom: 0; right: 0"
                :elevation="6"
              >
                <v-icon
                  style="color: #ff1744; background-color: #1e1e1e; font-size: xx-large"
                  >mdi-plus</v-icon
                >
              </v-btn>
            </template>
            <v-sheet class="text-center" height="200px">
              <v-btn class="mt-6" color="error" @click="sheet1 = !sheet1"
                >close</v-btn
              >
            </v-sheet>
          </v-bottom-sheet>
        </v-card>
      </div>

      <v-container
        style="display: flex; flex-direction: column; justify-content: center"
      >
        <div id="otherDiv">
          <v-btn :elevation="9" v-on:click="openItunes()">
            <v-icon size="30" class="itune">mdi-apple</v-icon>
            <h3>Itunes</h3>
          </v-btn>
        </div>


        <!--------------------------------------------------------------------------------------------->
        <!--------------------------------------------------------------------------------------------->
        <v-row justify="center">
          <v-col
            v-for="(item, index) in this.musicList"
            :key="index"
            cols="auto"
          >
            <v-card :elevation="9" height="70" width="500" dark id="cardMain">
              <div id="cardMainDiv">
                <v-card-text v-text="index"></v-card-text>
                <v-btn
                  style="border-radius: 100px 100px 100px 10px"
                  v-on:click="
                    playMusic(
                      item.previewUrl,
                      item.trackCensoredName,
                      item.primaryGenreName
                    )
                  "
                >
                  <v-icon color="#ff1744" size="30" class="stop"
                    >mdi-play-circle</v-icon
                  >
                </v-btn>
              </div>
              <div class="containerRepeat">
                <v-card-text v-text="item.trackCensoredName"></v-card-text>
              </div>
              <div class="containerRepeat">
                <v-card-text v-text="item.primaryGenreName"></v-card-text>
              </div>

              <div class="containerRepeat">
                <v-card-text
                  v-text="millisToMinutesAndSeconds(item.trackTimeMillis)"
                ></v-card-text>
              </div>

              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-menu
                    bottom
                    origin="center center"
                    transition="scale-transition"
                  >
                    <template   v-slot:activator="{ on }">
                      <v-btn
                        v-on="on"
                        style="background-color: #1e1e1e"
                        :elevation="6"
                        @click="addSongToPlaylist"
                      >
                        <v-icon
                          style="color: #ff1744; background-color: #1e1e1e; font-size: xx-large"
                        >mdi-plus</v-icon
                        >
                      </v-btn>
                    </template>

                    <v-list v-if="displayMenu" >
                      <v-list-item id="menuListItems"
                        v-for="(itemsub, i) in listOfPlaylistCreateShare"
                        :key="i"
                                   @click="sendTrackIdSongInGoodPlaylist(itemsub, item.trackId)"
                      >
                        <v-list-item-title>{{ itemsub }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </template>
                <span>Click to add music in playlist</span>
              </v-tooltip>
            </v-card>
          </v-col>
        </v-row>
        <!--------------------------------------------------------------------------------------------->
        <!--------------------------------------------------------------------------------------------->
      </v-container>
      <Footer
        :activeFooter="activeFooter"
        :artistsNameSendToFooter="artistsNameSendToFooter"
        :typeMusicSendToFooter="typeMusicSendToFooter"
        :soundUrl="soundUrl"
      ></Footer>
    </div>
  </v-app>
</template>
<script>
import * as api from "@/api";
import Footer from "../components/Footer.vue";
export default {
  name: "inspire",
  components: {
    Footer: Footer
  },
  data() {
    return {
      musicNumber: null,
      albumName: "",
      test: "test1",
      musicList: [],
      activeFooter: false,
      artistsNameSendToFooter: "",
      typeMusicSendToFooter: "",
      soundUrl: "",
      displayAlbum: false,
      sheet: false,
      sheet1: false,
      dialogAddThingInPlaylist: false,
      displayMenu: false
    };
  },
  props: {
    listAlbumsArtist: Array,
    listOfMusicShare: Array,
    listOfPlaylistCreateShare: Array,
    listOfTrackIdSongSendToPlaylist: Array,
    isRegister : Boolean,
  },
  methods: {
    sendTrackIdSongUsingInPlaylistToparent(value){
      this.$emit("updatelistOfTrackIdSongSendToPlaylistInOtherVue", value);
    },
    sendTrackIdSongInGoodPlaylist(playlistName, trackId){
      this.sendTrackIdSongUsingInPlaylistToparent(trackId);
    },
    sendDataToParent(value) {
      this.$emit("updateState", value);
    },
    addSongToPlaylist(){
      if(this.listOfPlaylistCreateShare.length <= 0){
        this.dialogAddThingInPlaylist = true;
      }else {
        this.displayMenu = true;

      }
    },
    closeDialogbox(){
      this.dialogAddThingInPlaylist = false;
    },
    sendDataToNavigationArtist(value){
      this.$emit("UpdateStateSliderPositionInNavifationPage", value);
    },
    millisToMinutesAndSeconds(millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    },
    openItunes() {
      window.open("https://music.apple.com/ca/artist/drake/271256?l=fr");
    },
    async getAllMusicInOnAlbum(collectionId) {
      let value = await api.getAllMusicInOnAlbum(collectionId);
      this.musicNumber = value.resultCount;
      this.albumName = value.results[0].collectionCensoredName;
      this.musicList = value.results;
      this.soundUrl = this.musicList[0].previewUrl;
      this.displayAlbum = true;
      this.musicList.forEach(e => this.listOfMusicShare.push(e));
      return value;
    },
    sendInfosToAlbumPage() {},
    playMusic(url, name, type) {
      this.activeFooter = true;
      this.artistsNameSendToFooter = name;
      this.typeMusicSendToFooter = type;
      this.soundUrl = url;
    }
  },
  create() {
    if(!this.isRegister){
      this.$router.push({ name: "Register" });
    }
    else{
    }
  },
  watch: {},
  mounted() {

    if(!this.isRegister){
      this.$router.push({ name: "Register" });
    }
    else{
      this.sendDataToNavigationArtist(3);
      if (this.$route.query.state !== true) {
        this.getAllMusicInOnAlbum(1458632160);
      } else {
        this.getAllMusicInOnAlbum(this.$route.params.id);
        this.sendDataToParent(true);
      }
    }



  }
};
</script>
<style>
#presentation {
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 2%;
}
#cardMain {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
}

#cardMain:hover{
  cursor: grab;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background-color: #ff1744;
}

#cardMainDiv {
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
}
#otherDiv {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.containerRepeat {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

#menuListItems:hover{
  cursor: grab;
  background-color: #ff1744;
}

</style>
