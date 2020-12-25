<template id="playlist">
  <div style="display: flex; justify-content: center; flex-direction: column">
    <!---------------------------------------------------------------------------------------------->
    <!---------------------------------------------------------------------------------------------->
    <!------------------------------------------------------------------->

    <v-row justify="center">
      <v-dialog
        v-model="dialogBoxState"
        max-width="590"
        persistent
        overlay-opacity="0.94"
      >
        <v-card>
          <v-card-title class="headline" style="color: #ff1744"
          >{{textToDisplay}}</v-card-title
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
    <v-container
      style="display: flex; flex-direction: row; justify-content: space-around; align-items: flex-start; margin-top: 2%"
    >
      <v-row>
        <v-col cols="12" sm="12">
          <v-text-field
            id="textField"
            label="Create your playlist"
            single-line
            solo
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn
        style="background-color:	#ff1744 ;margin-left: 5%; border-radius: 50px 50px 50px 50px"
        :elevation="9"
        :width="80"
        :height="80"
        v-on:click="createPlaylist"
      >
        <v-icon style="color: #ffffff; font-size: xx-large">mdi-plus</v-icon>
      </v-btn>
    </v-container>
    <!---------------------------------------------------------------------------------------------->
    <!---------------------------------------------------------------------------------------------->
    <v-container>
      <v-row justify="center">
        <v-col
          v-for="(item, index) in this.listOfPlaylistCreateShare"
          :key="index"
          cols="auto"
          :id="index"
        >
          <v-card
            :elevation="9"
            height="900"
            width="2000"
            id="cardMain"
            style="display: flex; flex-direction: column; background-color: #E0E0E0"
          >
            <v-card-title
              style="font-family: Aclonica"
              v-text="item"
            ></v-card-title>
            <!---------------------------------------------------------------------------------------------->
            <!---------------------------------------------------------------------------------------------->
            <v-tooltip bottom style="height: max-content; width: content-box">
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on"
                  style="background-color: #1e1e1e; margin-top: 1%; position: absolute; bottom: 0; right: 0"
                  :elevation="6"
                  v-on:click="deletePlaylist(index)"
                >
                  <v-icon
                    style="color: #ff1744; background-color: #1e1e1e; font-size: xx-large"
                    >mdi-delete-empty</v-icon
                  >
                </v-btn>
              </template>
              <span>Click to delete playlist</span>
            </v-tooltip>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import * as api from "@/api";
import Cookies from "js-cookie";

export default {
  name: "playlist",
  components: {},
  data() {
    return {
      ListOfPlayList: 0,
      email: "florian-aurelien.amette.1@ulaval.ca",
      ListIdOfPlaylist: [],
      dialogBoxState: false,
      textToDisplay : "",
      musicList : []
    };
  },
  props: {
    listOfPlaylistCreateShare: Array,
    ListIdOfPlaylistShare: Array,
    listOfTrackIdSongSendToPlaylist: Array,
  },
  methods: {
    closeDialogbox(){
      this.dialogBoxState = false;
    },
    sendDataToParent(value) {
      this.$emit("updateState", value);
    },
    sendDataToNavigationArtist(value){
      this.$emit("UpdateStateSliderPositionInNavifationPage", value);
    },
    async createPlaylist() {
      if(document.getElementById("textField").value === ""){
        this.textToDisplay = "Give name of your plalist before create";
        this.dialogBoxState = true;
      }else{
        if(this.listOfPlaylistCreateShare < 2){
          this.ListOfPlayList = this.ListOfPlayList + 1;
          let playlistName = document.getElementById("textField").value;
          this.listOfPlaylistCreateShare.push(playlistName);
          let value = await api.createPlaylist(playlistName, this.email);
          this.ListIdOfPlaylistShare.push(value.id);
          document.getElementById("textField").value = null;
        }
        else{
          this.dialogBoxState = true;
          this.textToDisplay = "you can only create on playlist here"
        }
      }


    },

    async deletePlaylist(index) {
      if (index > -1) {
        await api.deletePlaylist(this.ListIdOfPlaylistShare[index]);
        this.listOfPlaylistCreateShare.splice(index, 1);
        this.ListOfPlayList = this.ListOfPlayList - 1;
      }
    }
  },
  created() {
  },
  mounted() {
    if(Cookies.get("tokenNewLogin") === null || Cookies.get("tokenNewLogin") === undefined){
      this.$router.push({ name: "Register" });
    }
    else{
      this.sendDataToNavigationArtist(2);
      this.sendDataToParent(true);
    }

  }
};
</script>
<style>
.title {
  display: flex;
  justify-content: center;
}
</style>
