<template>
  <div id="app">
    <v-app id="inspire">
        <v-card
                class="mx-auto"
                width="500"
                tile
        >
          <v-navigation-drawer permanent  class="mx-auto"  width="500">
            <v-system-bar></v-system-bar>
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
            <!--          <v-divider></v-divider>-->
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
                    <v-subheader follow></v-subheader>
                  </v-btn>
                  <v-btn>
                    <v-subheader>unfollow></v-subheader>
                  </v-btn>

                  <v-list-item-content>
                    <v-list-item-title v-text="obj.name"></v-list-item-title>
                  </v-list-item-content>
                </v-card>
              </v-list-item-group>
            </v-list>
          </v-navigation-drawer>
        </v-card>
      <div>
        <v-card
          class="mx-auto"
          width="500"
        >
          <v-list
          >
            <v-list-item-group
            >
              <v-list-item
                v-for="i in count"
                :key="i"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </div>
    </v-app>
  </div>
</template>

<script>
  import * as api from "@/api";
    export default {
      data: () => ({
        obj: 0,
        item: {
          icon: 'mdi-wifi',
          text: 'Wifi',
        },
        count:4

      }),

      props: {
        userAvatar:String,
        nameUser:String,
        emailUser:String,
        userFollowers:Array
      },
      methods: {



      },
      created() {

      },
      mounted() {
      }

    }

</script>

<style scoped>

</style>
