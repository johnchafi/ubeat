<template>
  <v-app>
    <Navigation v-if="this.isRegister"
                :sliderValue="sliderValue"
                :userAvatar="userAvatar"
                :emailUser="emailUser"
                :nameUser="nameUser"
                :userFollowers="userFollowers"
                :tracks="tracks"
                :showEmailAddressInNavigationVue="showEmailAddressInNavigationVue"></Navigation>
    <v-content class="content">
      <router-view
        :filterArtistList="filterArtistList"
        :ArtistName="ArtistName"
        :NumberOfArtistsAlbum="NumberOfArtistsAlbum"
        :listAlbumsArtist="listAlbumsArtist"
        :displayArtistPage="displayArtistPage"
        :listOfMusicShare="listOfMusicShare"
        :listOfPlaylistCreateShare="listOfPlaylistCreateShare"
        @updateState="update($event)"
        @UpdateStateSliderPositionInNavifationPage="UpdateSliderPositionInNavifationPage($event)"
        :imageArtist="imageArtist"
        :artistBio="artistBio"
        :showEmailAddressInNavigationVue="showEmailAddressInNavigationVue"
        :isRegister="isRegister"
        :ListIdOfPlaylistShare="ListIdOfPlaylistShare"
        :listOfTrackIdSongSendToPlaylist="listOfTrackIdSongSendToPlaylist"
        @updatelistOfTrackIdSongSendToPlaylistInOtherVue="updatelistOfTrackIdSongSendToPlaylist($event)"
        @updateVariableInArtistVueFastInArtistPAge1="updateVariableInArtistVue1($event)"
        @updateVariableInArtistVueFastInArtistPAge2="updateVariableInArtistVue2($event)"
        @updateVariableInArtistVueFastInArtistPAge3="updateVariableInArtistVue3($event)"
        @updateVariableInArtistVueFastInArtistPAge4="updateVariableInArtistVue4($event)"
      ></router-view>
    </v-content>
  </v-app>
</template>
<script>
import Navigation from "./components/Navigation.vue";
import * as api from "@/api";
import Cookies from "js-cookie";

export default {
  name: "App",
  components: { Navigation: Navigation },
  data: () => ({
    randomItemId: 0,
    listIdArtist: [],
    listIdNameArtist: [],
    listAlbumsArtist: [],
    mainList: [],
    filterArtistList: [],
    filterIdNameArtist: [],
    artistInfosList: [],
    ArtistName: "",
    NumberOfArtistsAlbum: null,
    artistAlbum: [],
    artistAlbumName: [],
    logInfo: "",
    email: "",
    token: "",
    globalSearch: "",
    albumSearch: "",
    artistSearch: "",
    userSearch: "",
    displayArtistPage: false,
    listOfMusicShare: [],
    listOfPlaylistCreateShare: [],
    ListIdOfPlaylistShare: [],
    isRegister: false,
    avatar: "",
    imageArtist: "",
    artistBio:"",
    sliderValue: 0,
    showEmailAddressInNavigationVue: "",
    userAvatar:"",
    TokenUser:"",
    emailUser:"",
    nameUser:"",
    userFollowers:[],
    tracks:[],
    listOfTrackIdSongSendToPlaylist: [],
    idUser:""
  }),
  methods: {
    updateVariableInArtistVue1(value1){
      this.NumberOfArtistsAlbum = value1;
    },
    updateVariableInArtistVue2(value2){
      this.listAlbumsArtist = value2;
    },
    updateVariableInArtistVue3(value3){
      this.ArtistName = value3;
    },
    updateVariableInArtistVue4(value4){
      this.artistBio = value4;
    },
    update(event) {
      this.isRegister = event;
    },
    UpdateSliderPositionInNavifationPage(event){
      this.sliderValue = event;
    },
    updatelistOfTrackIdSongSendToPlaylist(event){
      this.listOfTrackIdSongSendToPlaylist.push(event);
    },
    radomFilterArtistListId() {
      this.randomItemId = this.filterArtistList[
        Math.floor(Math.random() * this.filterArtistList.length)
      ];
    }
  },
  async created() {
   let idUser = "5e2c9748c9d8250004f61599"
    this.ArtistName = "PNL";
    let returnedValue = await api.getAlbumsInfos("370571621");
    this.listAlbumsArtist = returnedValue.results;
    this.listAlbumsArtist.shift(); //eleve le premier element de la liste album artist que nous n avons pas besoin
    this.NumberOfArtistsAlbum = returnedValue.resultCount-1;
    this.displayArtistPage = true;

    const myHeaders = new Headers();
    myHeaders.append("Authorization",this.TokenUser);
    const requestParameters = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };


      var userInfo = await api.getInfoUser(idUser, requestParameters);
      this.emailUser = userInfo.email;
      this.nameUser = userInfo.name;
      this.userFollowers = userInfo.following;

    let artistInfo = await api.getInfoArtist(this.ArtistName);
    this.imageArtist = artistInfo.json.artist.image[2]["#text"];
    this.artistBio = artistInfo.json.artist.bio.summary;
    this.userAvatar = await api.getAvatarImage(this.emailUser);



    let userPlaylist = await api.getPlaylistUser(idUser, requestParameters);
   let listTracks ="";
    userPlaylist.forEach(item => {
      listTracks=item.tracks
    })
    this.tracks = [];
    listTracks.forEach(item => {
      this.tracks.push(item.trackName)
    })

  },
  mounted() {
    this.showEmailAddressInNavigationVue = Cookies.get("emailAddress");
    this.TokenUser = Cookies.get("tokenNewLogin");
    console.log("Email ", this.showEmailAddressInNavigationVue);
    if(Cookies.get("tokenNewLogin") === null || Cookies.get("tokenNewLogin") === undefined){
      this.$router.push({ name: "Register" });
      this.isRegister =false;
    }

    else{
        console.log("la valeur est", this.listOfPlaylistCreateShare);
    }

  }
};
</script>
<style scoped>
.content {
}
</style>
