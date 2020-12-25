import Vue from "vue";
import Router from "vue-router";
// import Home from "@/views/Home";
import Album from "@/views/Album";
import Artist from "@/views/Artist";
import Playlist from "../views/Playlist";
import Home from "@/views/Home";
import Search from "@/views/Search";
import Register from "@/views/Register";
import Wave from "@/views/Wave";
import User from "../views/User";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Register",
      component: Register
    },
    {
      path: "/artist/:id",
      name: "Artist",
      component: Artist
    },
    {
      path: "/album/:id",
      name: "Album",
      component: Album
    },
    {
      path: "/playlist",
      name: "Playlist",
      component: Playlist
    },
    {
      path: "/search",
      name: "Search",
      component: Search
    },
    {
      path: "/Home",
      name: "Home",
      component: Home
    },
    {
      path: "/wave",
      name: "Wave",
      component: Wave
    },

    {
      path: "/User",
      name: "User",
      component: User
    }

  ]
});
