<template>
  <div id="search">
    <v-app id="inspire">
      <v-container
        style="display: flex; flex-direction: row; justify-content: space-around; align-items: flex-start; margin-top: 2%"
      >
        <v-row>
          <v-col cols="12" sm="12">
            <!--            <v-text-field-->
            <!--              id="textField"-->
            <!--              label="Create your playlist"-->
            <!--              single-line-->
            <!--              solo-->
            <!--            ></v-text-field>-->
            <!------------------------------------------------------------------->
            <!------------------------------------------------------------------->
            <!------------------------------------------------------------------->
            <!------------------------------------------------------------------->
            <v-card color="#E0E0E0" elevation="7">
              <v-card-text>
                <v-autocomplete
                  v-on:input="makeSearch"


                  v-model="model"
                  :items="items"
                  :loading="isLoading"
                  :search-input.sync="search"
                  color="#ff1744"
                  hide-no-data
                  hide-selected
                  item-text="artistName"
                  item-value="API"
                  :label="LabelSearch"
                  :placeholder="placeholderSearch"
                  prepend-icon="mdi-magnify"
                  return-object
                ></v-autocomplete>
              </v-card-text>
              <v-divider></v-divider>
            </v-card>
            <!------------------------------------------------------------------->
            <!------------------------------------------------------------------->
          </v-col>
        </v-row>
        <!------------------------------------------------------------------->
        <!------------------------------------------------------------------->
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              style="background-color:	#ff1744 ;margin-left: 5%; border-radius: 50px 50px 50px 50px"
              :elevation="9"
              :width="80"
              :height="80"
              v-on="on"
              @click="OpenDialogSettingsSearch"
            >
              <v-icon style="color: #ffffff; font-size: xx-large"
              >mdi-tune</v-icon
              >
            </v-btn>
          </template>
          <span>click button to set your search</span>
        </v-tooltip>
      </v-container>
      <!---------------------------------------------------------------------------------------------->
      <!----------------- C est ici que l"affiche de la liste des resultat se fera ----------------------------->

      <div style="display: flex; flex-direction: column; justify-content: space-around; align-items: center;"
      >
        <v-card
          v-if="this.displayArtistCard"
          :elevation="9"
          height="maximum"
          width="2000"
          id="cardMainArtist"
          style="display: flex; flex-direction: column; background-color: #E0E0E0; align-items: center"
        >
          <v-card-title
            style="font-family: Aclonica"
          >Artist</v-card-title>

          <v-divider></v-divider>
          <v-row justify="center">
            <v-col   v-for="(item, index) in this.listOfArtistsName"
                     :key="index" cols="auto">
              <v-card id="ArtistNameSearchPage" @click="sendInfosToArtistPage(index)" :elevation="9" height="70" width="500" dark style="display: flex; flex-direction: row; justify-content: center; align-items: center">
                <v-card-title v-text="item"></v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </v-card>

        <v-card
          id="magniol"
          v-if="this.displayAlbumsCard"
          :elevation="9"
          height="maximum"
          width="2000"

          style="display: flex; flex-direction: column; background-color: #E0E0E0; align-items: center; margin-top: 3%"
        >
          <v-card-title
            style="font-family: Aclonica"
          >Albums</v-card-title>
          <v-divider></v-divider>
          <!---------------------------------------------------------------------------------------->
          <!---------------------------------------------------------------------------------------->
          <v-container>
            <v-row justify="center">
              <v-col
                v-for="(item, index) in this.ListOfArtistId"
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
                  v-on:click="sendInfosToAlbumPage(index)"
                >
                  <v-img
                    class="img"
                    max-height="100"
                    max-width="100"
                    height="100"
                    width="100"
                    :elevation="5"
                    :src="listOfWorkurl1100[index]"
                    style="border-radius: 12px 12px 12px 12px; opacity: 1"
                  ></v-img>
                  <div>
                    <v-card-title class="card-title" style="font-family: Aclonica">{{
                      listOfCollectionCensoredName[index]
                      }}</v-card-title>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <!---------------------------------------------------------------------------------------->
          <!---------------------------------------------------------------------------------------->
        </v-card>

        <v-card
          v-if="this.displaySongsCard"
          :elevation="9"
          height="maximum"
          width="2000"
          id="cardMainTracks"
          style="display: flex; flex-direction: column; background-color: #E0E0E0; align-items: center; margin-top: 3%"
        >
          <v-card-title
            style="font-family: Aclonica"
          >songs</v-card-title>
          <v-divider></v-divider>
          <!---------------------------------------------------------------------------------------->
          <!-------------------------------- Songs ------------------------------------------------>
          <!---------------------------------------------------------------------------------------->

          <v-row justify="center">
            <v-col
              v-for="(item, index) in this.ListOfCollectionId"
              :key="index"
              cols="auto"
            >
              <v-card :elevation="9" height="70" width="500" dark id="cardMainSongs" >
                <div id="cardMainDiv">
                  <v-card-text v-text="index"></v-card-text>
                  <v-btn
                    style="border-radius: 100px 100px 100px 10px"
                  >
                    <v-icon color="#ff1744" size="30" class="stop"
                    >mdi-play-circle</v-icon
                    >
                  </v-btn>
                </div>
                <div class="containerRepeat">
                  <v-card-text v-text="listOfTrackCensoredName[index]"></v-card-text>
                </div>
                <div class="containerRepeat">
                  <v-card-text v-text="listOfPrimaryGenreName[index]"></v-card-text>
                </div>

                <div class="containerRepeat">
                  <v-card-text
                    v-text="millisToMinutesAndSeconds(listOfTrackTimeMillis[index])"
                  ></v-card-text>
                </div>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      v-on="on"
                      style="background-color: #1e1e1e"
                      :elevation="6"
                    >
                      <v-icon
                        style="color: #ff1744; background-color: #1e1e1e; font-size: xx-large"
                      >mdi-plus</v-icon
                      >
                    </v-btn>
                  </template>
                  <span>Click to add music in playlist</span>
                </v-tooltip>
              </v-card>
            </v-col>
          </v-row>
          <!---------------------------------------------------------------------------------------------->
          <!---------------------------------------------------------------------------------------------->

        </v-card>
      </div>
      <!---------------------------------------------------------------------------------------------->
      <!---------------------------------------------------------------------------------------------->
      <v-row justify="center">
        <v-dialog
          v-model="dialogSettingsSearch"
          max-width="290"
          persistent
          overlay-opacity="0.8"
        >
          <v-card>
            <v-card-title class="headline" style="color: #ff1744"
            >search settings</v-card-title
            >

            <v-card-text style="font-size: large; font-weight: bold">
              <v-list>
                <v-list-item>
                  <v-list-item-action>
                    <v-switch
                      v-model="globalSearch"
                      color="#ff1744"
                      @change="globalSearchfunctionSwitch"
                    ></v-switch>
                  </v-list-item-action>
                  <v-list-item-title> global search</v-list-item-title>
                </v-list-item>

                <v-list-item>
                  <v-list-item-action>
                    <v-switch
                      v-model="SearchByAlbum"
                      color="#ff1744"
                      @change="SearchByAlbumfunctionSwitch"
                    ></v-switch>
                  </v-list-item-action>
                  <v-list-item-title>Search by album</v-list-item-title>
                </v-list-item>

                <v-list-item>
                  <v-list-item-action>
                    <v-switch
                      v-model="SearchByArtist"
                      color="#ff1744"
                      @change="SearchByArtistfunctionSwitch"
                    ></v-switch>
                  </v-list-item-action>
                  <v-list-item-title>Search by artist</v-list-item-title>
                </v-list-item>

                <v-list-item>
                  <v-list-item-action>
                    <v-switch
                      v-model="SearchBySong"
                      color="#ff1744"
                      @change="SearchBySongfunctionSwitch"
                    ></v-switch>
                  </v-list-item-action>
                  <v-list-item-title> Search by song</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card-text>
            <!---------------------------------------------------------------------------------------------->
            <!---------------------------------------------------------------------------------------------->
            <v-container fluid>
              <v-row>
                <v-col cols="12">
                  <v-combobox
                    v-model="selectAutocompleteLimitFetchData"
                    :items="itemsCombobox1"
                    label="limit autocomplete data"
                    type="Number"
                    outlined
                    dense
                  ></v-combobox>
                </v-col>
              </v-row>
            </v-container>
            <!---------------------------------------------------------------------------------------------->
            <v-container fluid>
              <v-row>
                <v-col cols="12">
                  <v-combobox
                    v-model="selectLimitFetchData"
                    :items="itemsCombobox2"
                    label="maximum number of results"
                    type="Number"
                    outlined
                    dense
                  ></v-combobox>
                </v-col>
              </v-row>
            </v-container>
            <!---------------------------------------------------------------------------------------------->
            <!---------------------------------------------------------------------------------------------->
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                style="border-style: solid; border-color: #ff1744; color: #ff1744"
                text
                @click="closeDialogSettingsSearch"
              >
                ok
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <!---------------------------------------------------------------------------------------------->
    </v-app>
  </div>
</template>

<script>
  import * as api from "@/api";
  import Cookies from "js-cookie";
  export default {
    name: "Search",
    components: {},

    data: () => ({
      dialogSettingsSearch: false,
      globalSearch: true,
      SearchByAlbum: false,
      SearchByArtist: false,
      SearchBySong: false,
      descriptionLimit: 60,
      results: [],
      isLoading: false,
      model: null,
      search: null,
      LabelSearch: "Global Search",
      placeholderSearch: "Start typing to make global search",
      tokenSearchVue: "",
      displayArtistCard: true,
      displayAlbumsCard: true,
      displaySongsCard: true,
      autocompleteLimitFetchDataDefault: 30,
      limitFetchDataDefault: 10,
      selectAutocompleteLimitFetchData: 30,
      selectLimitFetchData: 10,
      itemsCombobox1: [
        10,
        20,
        40,
        60,
        80,
        100
      ],
      itemsCombobox2: [
        10,
        20,
        40,
        60,
        80,
        100
      ],
      listOfArtistsName: [],
      ListOfCollectionId: [],
      ListOfArtistId: [],
      listOfWorkurl1100: [],
      listOfCollectionCensoredName: [],
      listOfPreviewUrl: [],
      listOfTrackCensoredName: [],
      listOfPrimaryGenreName: [],
      listOfTrackTimeMillis: []

    }),
    props:{
      isRegister : Boolean
    },
    computed: {
      fields() {
        if (!this.model) return [];

        return Object.keys(this.model).map(key => {
          return {
            key,
            value: this.model[key] || "n/a"
          };
        });
      },
      items() {
        return this.results.map(entry => {
          const artistName =
            entry.artistName.length > this.descriptionLimit
              ? entry.artistName.slice(0, this.descriptionLimit) + "..."
              : entry.artistName;

          return Object.assign({}, entry, { artistName });
        });
      }
    },
    watch: {
      search() {
        // Items have already been loaded
        if (this.items.length > 0) return;

        // Items have already been requested
        if (this.isLoading) return;

        this.isLoading = true;

        var myHeads = new Headers();
        myHeads.append(
          "Authorization",
          this.tokenSearchVue
        );

        var request = {
          method: "GET",
          headers: myHeads,
          redirect: "follow"
        };

        const queryParams = { q: this.search, limit: "30" };
        const queryString = new URLSearchParams(queryParams).toString();
        fetch(`https://ubeat.herokuapp.com/search?${queryString}`, request)
          .then(response => response.json())
          .then(json => {
            const { resultCount, results } = json;
            this.resultCount = resultCount;
            this.results = results;
          })
          .catch(error => {
            console.log("error", error);
          })
          .finally(() => (this.isLoading = false));
      }
    },
    methods: {
      sendInfosToAlbumPage(index) {
       let value = this.ListOfCollectionId[index];
        this.$router.push({
          name: "Album",
          params: { id: value },
          query: { state: true }
        });
      },
      sendInfosToArtistPage(index) {
        let value = this.ListOfArtistId[index];
        this.$router.push({
          name: "Artist",
          params: { id: value },
          query: { state: true }
        });
      },
      sendDataToParent(value) {
        this.$emit("updateState", value);
      },
      millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
      },
      sendDataToNavigationArtist(value){
        this.$emit("UpdateStateSliderPositionInNavifationPage", value);
      },
      closeDialogSettingsSearch() {
        this.dialogSettingsSearch = false;
        this.autocompleteLimitFetchDataDefault = this.selectAutocompleteLimitFetchData;
        this.limitFetchDataDefault = this.selectLimitFetchData;
      },
      OpenDialogSettingsSearch() {
        this.dialogSettingsSearch = true;
        this.listOfArtistsName = [];
        this.ListOfCollectionId = [];
        this.ListOfArtistId = [];
        this.listOfWorkurl1100 = [];
        this.listOfCollectionCensoredName = [];
        this.listOfPreviewUrl = [];
        this.listOfTrackCensoredName = [];
        this.listOfPrimaryGenreName = [];
        this.listOfTrackTimeMillis = [];
      },
      globalSearchfunctionSwitch() {
        if (this.globalSearch) {
          this.SearchByAlbum = false;
          this.SearchByArtist = false;
          this.SearchBySong = false;
          this.LabelSearch = "Global Search";
          this.placeholderSearch = "Start typing to make global search";
          this.displayArtistCard = true;
          this.displayAlbumsCard = true;
          this.displaySongsCard = true;
        } else {
          if (
            (this.SearchBySong === false) &
            (this.SearchByAlbum === false) &
            (this.SearchByArtist === false)
          ) {
            this.globalSearch = true;
            this.LabelSearch = "Global Search";
            this.placeholderSearch = "Start typing to make global search";
            this.displayArtistCard = true;
            this.displayAlbumsCard = true;
            this.displaySongsCard = true;
          }
        }
      },
      SearchByAlbumfunctionSwitch() {
        if (this.SearchByAlbum) {
          this.globalSearch = false;
          this.SearchByArtist = false;
          this.SearchBySong = false;
          this.LabelSearch = "Search by Album";
          this.placeholderSearch = "Start typing to find Album";
          this.displayArtistCard = false;
          this.displayAlbumsCard = true;
          this.displaySongsCard = false;
        } else {
          if (
            (this.SearchBySong === false) &
            (this.SearchByAlbum === false) &
            (this.SearchByArtist === false) &
            (this.globalSearch === false)
          ) {
            this.globalSearch = true;
            this.LabelSearch = "Global Search";
            this.placeholderSearch = "Start typing to make global search";
            this.displayArtistCard = true;
            this.displayAlbumsCard = true;
            this.displaySongsCard = true;
          }
        }
      },
      SearchByArtistfunctionSwitch() {
        if (this.SearchByArtist) {
          this.SearchByAlbum = false;
          this.globalSearch = false;
          this.SearchBySong = false;
          this.LabelSearch = "Search by Artist";
          this.placeholderSearch = "Start typing to find Artist";
          this.displayArtistCard = true;
          this.displayAlbumsCard = false;
          this.displaySongsCard = false;
        } else {
          if (
            (this.SearchBySong === false) &
            (this.SearchByAlbum === false) &
            (this.SearchByArtist === false) &
            (this.globalSearch === false)
          ) {
            this.globalSearch = true;
            this.LabelSearch = "Global Search";
            this.placeholderSearch = "Start typing to make global search";
            this.displayArtistCard = true;
            this.displayAlbumsCard = true;
            this.displaySongsCard = true;
          }
        }
      },
      SearchBySongfunctionSwitch() {
        if (this.SearchBySong) {
          this.SearchByAlbum = false;
          this.SearchByArtist = false;
          this.globalSearch = false;
          this.LabelSearch = "Search by Song";
          this.placeholderSearch = "Start typing to make find song";
          this.displayArtistCard = false;
          this.displayAlbumsCard = false;
          this.displaySongsCard = true;
        } else {
          if (
            (this.SearchBySong === false) &
            (this.SearchByAlbum === false) &
            (this.SearchByArtist === false) &
            (this.globalSearch === false)
          ) {
            this.globalSearch = true;
            this.LabelSearch = "Global Search";
            this.placeholderSearch = "Start typing to make global search";
            this.displayArtistCard = true;
            this.displayAlbumsCard = true;
            this.displaySongsCard = true;
          }
        }
      },
      async getGlobalSearchApiSearchVue(search, limit, myHeads){
        return await api.getGlobalSearchApi(search, limit, myHeads)
      },
      async makeSearch() {
        if(this.model !== null & this.model !== undefined){
          if (this.globalSearch) {
            this.listOfArtistsName = [];
            this.ListOfCollectionId = [];
            this.ListOfArtistId = [];
            this.listOfWorkurl1100 = [];
            this.listOfCollectionCensoredName = [];
            this.listOfPreviewUrl = [];
            this.listOfTrackCensoredName = [];
            this.listOfPrimaryGenreName = [];
            this.listOfTrackTimeMillis = [];
            let myHeads = new Headers();
            myHeads.append(
              "Authorization",
              this.tokenSearchVue
            );
            let value = await api.getGlobalSearchApi(this.model.artistName, this.limitFetchDataDefault, myHeads);
            value.forEach((item) => {
              this.listOfArtistsName.push(item.artistName);
              this.ListOfCollectionId.push(item.collectionId);
              this.ListOfArtistId.push(item.artistId);
              this.listOfWorkurl1100.push(item.artworkUrl100);
              this.listOfCollectionCensoredName.push(item.collectionCensoredName);
              //--------------------------------------------------------------------------------------
              this.listOfPreviewUrl.push(item.previewUrl);
              this.listOfTrackCensoredName.push(item.trackCensoredName);
              this.listOfPrimaryGenreName.push(item.primaryGenreName);
              this.listOfTrackTimeMillis.push(item.trackTimeMillis);
            });
          } else if (this.SearchByAlbum) {
            this.listOfArtistsName = [];
            this.ListOfCollectionId = [];
            this.ListOfArtistId = [];
            this.listOfWorkurl1100 = [];
            this.listOfCollectionCensoredName = [];
            this.listOfPreviewUrl = [];
            this.listOfTrackCensoredName = [];
            this.listOfPrimaryGenreName = [];
            this.listOfTrackTimeMillis = [];
            let myHeads = new Headers();
            myHeads.append(
              "Authorization",
              this.tokenSearchVue
            );
            let value = await api.getAlbumSearch(this.model.artistName, this.limitFetchDataDefault, myHeads);
            value.forEach((item) => {
              this.ListOfArtistId.push(item.artistId);
              this.listOfWorkurl1100.push(item.artworkUrl100);
              this.listOfCollectionCensoredName.push(item.collectionCensoredName);
            });
          } else if (this.SearchByArtist) {
            this.listOfArtistsName = [];
            this.ListOfCollectionId = [];
            this.ListOfArtistId = [];
            this.listOfWorkurl1100 = [];
            this.listOfCollectionCensoredName = [];
            this.listOfPreviewUrl = [];
            this.listOfTrackCensoredName = [];
            this.listOfPrimaryGenreName = [];
            this.listOfTrackTimeMillis = [];
            let myHeads = new Headers();
            myHeads.append(
              "Authorization",
              this.tokenSearchVue
            );
            let value = await api.getArtistSearch(this.model.artistName, this.limitFetchDataDefault, myHeads);
            value.forEach((item) => {
              this.listOfArtistsName.push(item.artistName);
            });
          } else if (this.SearchBySong) {
            this.listOfArtistsName = [];
            this.ListOfCollectionId = [];
            this.ListOfArtistId = [];
            this.listOfWorkurl1100 = [];
            this.listOfCollectionCensoredName = [];
            this.listOfPreviewUrl = [];
            this.listOfTrackCensoredName = [];
            this.listOfPrimaryGenreName = [];
            this.listOfTrackTimeMillis = [];
            let myHeads = new Headers();
            myHeads.append(
              "Authorization",
              this.tokenSearchVue
            );
            let value = await api.getSongSearch(this.model.artistName, this.limitFetchDataDefault, myHeads);
            value.forEach((item) => {
              this.ListOfCollectionId.push(item.collectionId);
              this.listOfPreviewUrl.push(item.previewUrl);
              this.listOfTrackCensoredName.push(item.trackCensoredName);
              this.listOfPrimaryGenreName.push(item.primaryGenreName);
              this.listOfTrackTimeMillis.push(item.trackTimeMillis);
            });

          }
        }
      }
    },
    created() {
      if(Cookies.get("tokenNewLogin") === null || Cookies.get("tokenNewLogin") === undefined){
        this.$router.push({ name: "Register" });
      }
    },
    mounted() {
      if(Cookies.get("tokenNewLogin") === null || Cookies.get("tokenNewLogin") === undefined){
        this.$router.push({ name: "Register" });
      }else {
        this.sendDataToNavigationArtist(4);
        this.tokenSearchVue = Cookies.get("tokenNewLogin");
        this.displayArtistCard = true;
        this.displayAlbumsCard = true;
        this.displaySongsCard = true;
        this.sendDataToParent(true);
      }
    }
  };
</script>

<style scoped>
  #cardMainSongs {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
  }

  #cardMainSongs:hover{
    cursor: grab;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    background-color: #ff1744;
  }

  #ArtistNameSearchPage:hover{
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

  #cardMain:hover{
    background-color: #00c853;
  }
  #magniol:hover{
    background-color: #00c853;
  }
</style>
