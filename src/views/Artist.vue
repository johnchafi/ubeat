<template>
  <div
    id="artist"
    style="display: flex; flex-direction: column; justify-content: center"
  >
    <div
      style="display:flex; flex-direction: column; justify-content: center; margin-top: 15%"
      v-if="this.displayArtistPage === false"
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
    <v-app id="inspire" v-if="this.displayArtistPage">
      <div class="presentation">
        <v-card
          height="75"
          width="400"
          :elevation="5"
          class="containerCard"
          style="display: flex; justify-content: center; flex-direction: row; align-items: center"
          @click="
            event => {
              this.sendInfosToAlbumPage(this.test);
            }
          "
        >

            <v-card-title style="font-family: Aclonica">{{
              this.ArtistName
              }}</v-card-title>
            <v-card-subtitle
            >{{ this.NumberOfArtistsAlbum }} Albums</v-card-subtitle
            >

        </v-card>
      </div>


      <v-container>
        <v-row justify="center">
          <v-col
            v-for="(item, index) in this.listAlbumsArtist"
            :key="index"
            cols="auto"
          >
            <v-card
              :elevation="9"
              height="maximum"
              width="400"
              dark
              id="cardMain"
              style="display: flex; flex-direction: row; border-radius: 320px 50px 50px 320px"
              class="cardAlbums"
              @click="sendInfosToAlbumPage(item.collectionId)"
            >
              <v-img
                class="img"
                max-height="100"
                max-width="100"
                height="100"
                width="100"
                :elevation="5"
                :src="item.artworkUrl100"
                style="border-radius: 12px 12px 12px 12px; opacity: 1"
              ></v-img>
              <div>
                <v-card-title class="card-title" style="font-family: Aclonica">{{
                  item.collectionCensoredName
                  }}</v-card-title>
                <v-card-subtitle class="card-subtitle">{{
                  item.copyright
                  }}</v-card-subtitle>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-card tile>
        <v-footer
          fixed
          color="#E0E0E0"
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

          <v-list style="width: 100%;display: flex; flex-direction: row; justify-content: center; align-items: center">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title style="color: #ff1744">BIOGRAPHY</v-list-item-title>
              </v-list-item-content>
              <v-spacer></v-spacer>
            </v-list-item>
            <h6>{{artistBio}}</h6>
          </v-list>
        </v-footer>
      </v-card>
      <!------------------------------------------------------------------------------------------------------->
      <!------------------------------------------------------------------------------------------------------->
    </v-app>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import * as api from "@/api";

export default {
  data() {
    return {
      dialog: true,
      artistIdSendToAlbumPage: null,
      collectionIdSendToAlbumPage: null,
      artistNameSendToAlbumPage: null,
      test: "le test",
    };
  },
  props: {
    filterArtistList: Array,
    ArtistName: String,
    NumberOfArtistsAlbum: Number,
    listAlbumsArtist: Array,
    displayArtistPage: Boolean,
    artistBio : String,
    isRegister : Boolean
  },
  methods: {
    sendManyVariableToParent1(valeu1){
      this.$emit("updateVariableInArtistVueFastInArtistPAge1", valeu1);
    },
    sendManyVariableToParent2(value2){
      this.$emit("updateVariableInArtistVueFastInArtistPAge2",value2);
    },
    sendManyVariableToParent3(value3){
      this.$emit("updateVariableInArtistVueFastInArtistPAge3", value3);
    },
    sendManyVariableToParent4(value4){
      this.$emit("updateVariableInArtistVueFastInArtistPAge4", value4);
    },
    sendDataToParent(value) {
      this.$emit("updateState", value);
    },
    sendDataToNavigationArtist(value){
      this.$emit("UpdateStateSliderPositionInNavifationPage", value);
    },
    affiche() {
      alert("test");
    },
    sendInfosToAlbumPage(collectionId) {
      this.collectionIdSendToAlbumPage = collectionId;
      this.$router.push({
        name: "Album",
        params: { id: this.collectionIdSendToAlbumPage },
        query: { state: true }
      });
    }
  },
  created() {
    if(Cookies.get("tokenNewLogin") === null || Cookies.get("tokenNewLogin") === undefined){
      this.$router.push({ name: "Register" });
    }
    else{
    }

  },
  async mounted() {
    if(Cookies.get("tokenNewLogin") === null || Cookies.get("tokenNewLogin") === undefined){
      this.$router.push({ name: "Register" });
    }
    else{
      this.sendDataToNavigationArtist(1);
      this.sendDataToParent(true);

      if (this.$route.query.state !== true || this.$route.query.state === undefined) {
        console.log("c est le bon idi dans le if");
      } else {

       console.log("c est le bon idi dans le else");
        let value = this.$route.params.id;
        let returnedValue = await api.getAlbumsInfos(value);
        let value1 = returnedValue.resultCount-1;
        let value2= returnedValue.results;
        let value3 = returnedValue.results[0].artistName;
        let artistInfo = await api.getInfoArtist(this.ArtistName);
        let value4 = artistInfo.json.artist.bio.summary;

        this.sendManyVariableToParent1(value1);
        this.sendManyVariableToParent2(value2);
        this.sendManyVariableToParent3(value3);
        this.sendManyVariableToParent4(value4);
      }

    }
  }
};
</script>
<style>
#artist {
  display: flex;
  flex-direction: column;
}
.presentation {
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 2%;
}
.containerCard {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
}
.card-title {
  font-size: 70%;
}
.card-subtitle {
  font-size: x-small;
}
.cardAlbums:hover {
  cursor: grab;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background-color: #ff1744;
}
.v-progress-circular {
  margin: 1rem;
}
.img {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
</style>
