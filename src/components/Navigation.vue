<template>
  <div id="Navigation">
    <link
      rel="stylesheet"
      type="text/css"
      href="//fonts.googleapis.com/css?family=Aclonica"
    />
    <!---------------------------------------------------------------------------------------------->
    <v-row justify="center">
      <v-dialog
        v-model="dialogForUserProfil"
        max-width="290"
        persistent
        :overlay-opacity="0.98"
      >
          <v-card
            class="mx-auto"
            width="700"
          >
            <v-list>
              <v-list-item>
                <v-list-item-avatar>
                  <v-img :src= this.userAvatar
                  ></v-img>
                </v-list-item-avatar>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title class="title">{{this.nameUser}}</v-list-item-title>
                  <v-list-item-subtitle>{{this.emailUser}}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-icon>mdi-menu-down</v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-list
              nav
              dense
            >
              <v-list-item-group v-model=" userFollowers" color="primary">
                <v-card
                  v-for="(obj, i) in  userFollowers"
                  :key="i"
                >
                  <v-btn>
                    <v-subheader>follow</v-subheader>
                  </v-btn>
                  <v-btn>
                    <v-subheader>unfollow</v-subheader>
                  </v-btn>

                  <v-list-item-content>
                    <v-list-item-title v-text="obj.name"></v-list-item-title>
                  </v-list-item-content>
                </v-card>
              </v-list-item-group>
            </v-list>


            <v-list
            >
              <v-list-item-group
              >
                <v-subheader>List of songs</v-subheader>
                <v-list-item
                  v-for="i in this.tracks"
                  :key="i"
                >
                  <v-list-item-content>
                    <v-list-item-title > {{i}}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <v-btn
              style="border-style: solid; border-color: #32CD32; color: #32CD32"
              text
              @click="closeDialogUserProfil"
            >
              YES
            </v-btn>
          </v-card>
      </v-dialog>
    </v-row>
    <!---------------------------------------------------------------------------------------------->
    <!---------------------------------------------------------------------------------------------->
    <v-row justify="center">
      <v-dialog
        v-model="dialogForlogOut"
        max-width="290"
        persistent
        :overlay-opacity="0.94"
      >
        <v-card>
          <v-card-title class="headline" style="color: #ff1744"
          >Logout to my account</v-card-title
          >

          <v-card-text
            style="font-size: medium; font-weight: bold"
          >
            Are you sure you want log out ?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              style="border-style: solid; border-color: #ff1744; color: #ff1744"
              text
              @click="closeDialogForLogOut"
            >
              NO
            </v-btn>
            <v-btn
              style="border-style: solid; border-color: #32CD32; color: #32CD32"
              text
              @click="logOut"
            >
              YES
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!---------------------------------------------------------------------------------------------->
    <!---------------- This is the first app bar : when we are on website --------------------->
    <!------------------------------------------------------------------->
    <!------------------------------------------------------------------->
    <v-app-bar id="appBarWeb" dark :elevation="24" :inverted-scroll="false">

      <v-list-item-avatar v-on:click="OpenDialogUserProfile()">
        <v-img size="80" :src= this.userAvatar
        ></v-img>
      </v-list-item-avatar>
      <v-list-item-subtitle>
        Click image to view profile
      </v-list-item-subtitle>

      <template v-slot:extension>
        <v-tabs
          align-with-title
          id="navigationButton"
          :slider-size="5"
          :value="sliderValue"
        >
          <v-tab v-on:click="loadAHomePage()">
            <v-icon>mdi-home</v-icon>
            <h5>Home</h5>
          </v-tab>

          <v-tab v-on:click="loadArtistPage()">
            <v-icon>mdi-account-box-multiple</v-icon>
            <h5>Artist</h5>
          </v-tab>

          <v-tab v-on:click="loadAPlaylistPage()">
            <v-icon>mdi-playlist-music-outline</v-icon>
            <h5>Playlist</h5>
          </v-tab>

          <v-tab v-on:click="loadAlbumPage()">
            <v-icon>mdi-clipboard-play-multiple</v-icon>
            <h5>Album</h5>
          </v-tab>

          <v-tab v-on:click="loadSearchPage()">
            <v-icon>mdi-magnify</v-icon>
            <h5>Search</h5>
          </v-tab>
        </v-tabs>
      </template>

      <v-spacer></v-spacer>

      <div id="appBarIcon">
        <v-btn icon v-on:click="OpenDialogCard()">
          <v-icon>mdi-application-import</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <!------------------------------------------------------------------->
    <!------------------------------------------------------------------->

    <!----- This is the second app bar : when we are on mobile ----->
    <v-app-bar id="appBarMobile" dark :elevation="24" :hide-on-scroll="true">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <div id="appBarIconMobile">
        <v-btn icon>
          <v-icon v-on:click="loadSearchPage()">mdi-magnify</v-icon>
        </v-btn>

      </div>
    </v-app-bar>

    <!-------------------------- This is the navigation drawer -------------------->
    <!------------------------------------------------------------------->
    <!------------------------------------------------------------------->
    <v-navigation-drawer
      id="navigationDrawer"
      v-model="drawer"
      absolute
      temporary
      overlay-opacity="0.7"
    >
      <v-list nav dense dark>
        <v-list-item-group
          id="listItemGroup"
          v-model="test"
          active-class="white--text text--accent-4"
        >
          <v-list-item id="ProfileUserMobile">
            <v-icon size="80">mdi-account-circle</v-icon>
            <v-list-item-action-text id="navigationDrawerTextUser"
              >User</v-list-item-action-text
            >
          </v-list-item>

          <v-list-item class="list-item" v-on:click="loadAHomePage()">
            <v-icon size="30">mdi-home</v-icon>
            <v-list-item-action-text class="navigationDrawerText"
              >Home</v-list-item-action-text
            >
          </v-list-item>

          <v-list-item class="list-item" v-on:click="loadArtistPage()">
            <v-icon size="30">mdi-account-box-multiple</v-icon>
            <v-list-item-action-text class="navigationDrawerText"
              >Artist</v-list-item-action-text
            >
          </v-list-item>

          <v-list-item class="list-item" v-on:click="loadAPlaylistPage()">
            <v-icon size="30">mdi-playlist-music-outline</v-icon>
            <v-list-item-action-text class="navigationDrawerText"
              >Playlist</v-list-item-action-text
            >
          </v-list-item>

          <v-list-item class="list-item" v-on:click="loadAlbumPage()">
            <v-icon size="30">mdi-clipboard-play-multiple</v-icon>
            <v-list-item-action-text class="navigationDrawerText"
              >Album</v-list-item-action-text
            >
          </v-list-item>

          <v-list-item class="list-item" v-on:click="loadSearchPage()">
            <v-icon size="30">mdi-magnify</v-icon>
            <v-list-item-action-text class="navigationDrawerText"
              >Search</v-list-item-action-text
            >
          </v-list-item>


          <v-list-item class="list-item" v-on:click="OpenDialogCard()">
            <v-icon size="30">mdi-application-import</v-icon>
            <v-list-item-action-text class="navigationDrawerText"
              >Logout</v-list-item-action-text
            >
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!------------------------------------------------------------------->
    <!------------------------------------------------------------------->
  </div>
</template>

<style></style>

<script>
  import Cookies from "js-cookie";
  export default {
  name: "Navigation",
  components: {},

  data() {
    return {
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" }
      ],
      drawer: false,
      group: null,
      collapse: false,
      dialogForlogOut: false,
      dialogForUserProfil: false,
      obj: 0,


    };
  },

  props: {
    sliderValue: Number,
    showEmailAddressInNavigationVue: String,
    userAvatar:String,
    nameUser:String,
    emailUser:String,
    userFollowers:Array,
    tracks:Array
  },

  methods: {
    OpenDialogUserProfile(){
      this.dialogForUserProfil = true;
    },
    closeDialogUserProfil(){
      this.dialogForUserProfil = false;
    },
    logOut(){
      this.$router.push({ name: "Register"});
      Cookies.remove("tokenNewLogin");
      Cookies.remove("isRegisterCookies");
      Cookies.remove("emailAddress");
    },
    closeDialogForLogOut(){
      this.dialogForlogOut = false;
    },
    loadArtistPage() {
      if(this.sliderValue !== 1){
        this.$router.push({ name: "Artist" });
      }
    },

    manageResponsiveHomePage() {
      if (window.innerWidth >= 768) {
        document.getElementById("appBarWeb").style.display = "block";
        document.getElementById("appBarMobile").style.display = "none";
      } else {
        document.getElementById("appBarWeb").style.display = "none";
        document.getElementById("appBarMobile").style.display = "block";
      }
    },


    loadAlbumPage() {
      if(this.sliderValue !== 3){
        this.$router.push({
          name: "Album",
          params: { collectionId: 1499149935 }
        });
      }
    },


    loadUserPage() {
      this.$router.push({ name: "User" });
    },




    loadAHomePage() {
      if(this.sliderValue !== 0){
        this.$router.push({ name: "Home" });
      }
    },

    loadAPlaylistPage() {
      if(this.sliderValue !== 2){
        this.$router.push({ name: "Playlist" });
      }
    },


    test() {
      this.drawer = true;
    },


    OpenDialogCard() {
      this.dialogForlogOut = true;
    },

    loadSearchPage() {
      if(this.sliderValue !== 4){
        this.$router.push({ name: "Search" });
      }
    }
  },
  created() {

  },
  mounted() {
    //========================= Important ==============================
    window.addEventListener("resize", this.manageResponsiveHomePage);
    this.manageResponsiveHomePage();
  }
};
</script>

<style>
#navigationButton {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
#userIcon {
  margin-left: auto;
  margin-top: 10%;
}
h5,
h3 {
  font-family: Aclonica;
}
#appBarWeb {
  background-color: #ff1744;
  border-radius: 0px 0px 0px 0px;
}
#appBarMobile {
  background-color: #ff1744;
  border-radius: 0px 0px 0px 0px;
}
#listItemGroup {
}
#navigationDrawer {
  background-color: #ff1744;
}
.list-item {
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
}
#ProfileUserMobile {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.navigationDrawerText {
  font-family: Aclonica;
  font-size: 200%;
}
#navigationDrawerTextUser {
  font-family: Aclonica;
  font-size: 250%;
}
</style>
