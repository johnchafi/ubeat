<template>
  <div id="Home">
    <v-container>
      <v-row justify="center">
        <v-col v-for="n in 4" :key="n" cols="auto">
          <v-card
            :elevation="9"
            height="380"
            width="380"
            dark
            style="display: flex; justify-content: space-between; flex-direction: row; align-items: center"
          >
            <div
              style="display: flex; justify-content: center; flex-direction: row; align-items: center"
            >
              <v-img
                v-bind:src="items[n - 1].src"
                height="380"
                width="380"
              ></v-img>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style></style>
<script>
import Cookies from "js-cookie";

export default {
  name: "Home",

  data() {
    return {
      state: false,
      items: [
        {
          src:
            "https://i.pinimg.com/564x/dd/c2/60/ddc260a35ff9054a0b9b9acaa39888b3.jpg"
        },
        {
          src:
            "https://i.pinimg.com/originals/63/51/af/6351af35bf781335d459007b8189f9ba.jpg"
        },
        {
          src:
            "https://i.pinimg.com/originals/65/0e/e4/650ee475427480a89613670e031304aa.jpg"
        },
        {
          src:
            "https://i.pinimg.com/originals/c7/d1/7e/c7d17e830909ab4367759a93def35d84.jpg"
        }
      ]
    };
  },
  props:{
    isRegister : Boolean
  },
  methods: {
    sendDataToParent(value) {
      this.$emit("updateState", value);
    },
    sendDataToNavigationArtist(value){
      this.$emit("UpdateStateSliderPositionInNavifationPage", value);
    }
  },
  created() {
    if(Cookies.get("tokenNewLogin") === null || Cookies.get("tokenNewLogin") === undefined){
      this.$router.push({ name: "Register" });
    }
  },
  mounted(
  ) {

    if(Cookies.get("tokenNewLogin") == null || Cookies.get("tokenNewLogin") === undefined){
      this.$router.push({ name: "Register" });
    }
    else{
      this.sendDataToNavigationArtist(0);
      this.sendDataToParent(true);
    }
  },
};
</script>

<style>
#Home {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}
</style>
