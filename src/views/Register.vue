<template>
  <div id="app">
    <v-app id="inspire">
      <v-content id="loginPage" v-show="this.loginStateView">
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-8">
                <v-toolbar style="background-color: #ff1744" dark flat>
                  <v-toolbar-title
                    >Sign in to your Ubeat Account
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>

                <v-card-text>
                  <v-form>
                    <v-col cols="12" sm="20">
                      <v-text-field
                        v-model="emailSignIn"
                        solo
                        label="Enter your Email"
                        clearable
                        id="emailInSignIn"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="20">
                      <v-text-field
                        id="passwordInSignIn"
                        v-model="passwordSignIn"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rulesSignIn.required, rulesSignIn.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        hint="At least 1 characters"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                  </v-form>
                </v-card-text>
                <v-card-actions
                  style="display: flex; flex-direction: row; justify-content: center"
                >
                  <!---------------------------------------------------------------------------------------------->
                  <!---------------------------------------------------------------------------------------------->
                  <!---------------------------------------------------------------------------------------------->
                  <v-row justify="center">
                    <v-dialog
                      v-model="dialogForWrongSignIn"
                      max-width="290"
                      persistent
                    >
                      <v-card>
                        <v-card-title class="headline" style="color: #ff1744"
                          >login failed</v-card-title
                        >

                        <v-card-text
                          style="font-size: large; font-weight: bold"
                        >
                          Incorrect Username or password. Please try again
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>

                          <v-btn
                            style="border-style: solid; border-color: #ff1744; color: #ff1744"
                            text
                            @click="displayLoginView"
                          >
                            Close
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-row>
                  <!---------------------------------------------------------------------------------------------->
                  <!---------------------------------------------------------------------------------------------->
                  <!---------------------------------------------------------------------------------------------->

                  <v-btn
                    color="#ff1744"
                    style="width: 30%; color: white"
                    id="signUp"
                    v-on:click="gotoRegisterPage"
                    >Sign up</v-btn
                  >
                  <v-btn
                    style="background-color: #1e1e1e; color: white; width: 30%"
                    v-on:click="goToHomepage"
                    >Sign in</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>

      <v-content v-show="this.registerState" id="registerPage">
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-8">
                <v-toolbar style="background-color: #1e1e1e" dark flat>
                  <v-toolbar-title>Sign Out</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <!---------------------------------------------------------------------------------------------->
                <!---------------------------------------------------------------------------------------------->
                <v-card-text>
                  <v-form>
                    <v-col cols="12" sm="20">
                      <v-text-field
                        id="NameRegister"
                        v-model="NameSignOut"
                        solo
                        label="Enter your Name"
                        clearable
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="20">
                      <v-text-field
                        id="emailRegister"
                        v-model="emailSignOut"
                        solo
                        label="Enter your Email"
                        clearable
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="20">
                      <v-text-field
                        id="password1Register"
                        v-model="passwordSignOut1"
                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rulesSignOut1.required, rulesSignOut1.min]"
                        :type="show2 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        hint="At least 1 characters"
                        counter
                        @click:append="show2 = !show2"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="20">
                      <v-text-field
                        id="password2Register"
                        v-model="passwordSignOut2"
                        :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rulesSignOut2.required, rulesSignOut2.min]"
                        :type="show3 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Confirm your password"
                        hint="At least 1 characters"
                        counter
                        @click:append="show3 = !show3"
                      ></v-text-field>
                    </v-col>
                  </v-form>
                </v-card-text>
                <!---------------------------------------------------------------------------------------------->
                <!---------------------------------------------------------------------------------------------->
                <v-card-actions>
                  <!---------------------------------------------------------------------------------------------->
                  <!---------------------------------------------------------------------------------------------->
                  <v-row justify="center">
                    <v-dialog
                      v-model="dialogForgoodSignUp"
                      max-width="290"
                      persistent
                    >
                      <v-card>
                        <v-card-title class="headline" style="color: #32CD32"
                        >Sign Out success</v-card-title
                        >

                        <v-card-text style="font-size: medium; color: black">
                          Your sing out  is successfuly. Please click on  OK to go at login page
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>

                          <v-btn
                            style="border-style: solid; border-color: #32CD32; color: #32CD32"
                            text
                            @click="closeSignUpSuccessDialog"
                          >
                            OK
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-row>
                  <!---------------------------------------------------------------------------------------------->
                  <!---------------------------------------------------------------------------------------------->
                  <v-row justify="center">
                    <v-dialog
                      v-model="dialogForWrongSignOut"
                      max-width="290"
                      persistent
                    >
                      <v-card>
                        <v-card-title class="headline" style="color: #ff1744"
                          >Sign Out failed</v-card-title
                        >

                        <v-card-text style="font-size: medium; color: black">
                          Something wrong during sing out
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>

                          <v-btn
                            style="border-style: solid; border-color: #ff1744; color: #ff1744"
                            text
                            @click="closeSignOutfailedFrame"
                          >
                            Close
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-row>
                  <!---------------------------------------------------------------------------------------------->
                  <!---------------------------------------------------------------------------------------------->
                  <!---------------------------------------------------------------------------------------------->

                  <v-btn
                    style="background-color: #ff1744; color: white; width: 30%"
                    v-on:click="backToSignInPage"
                    >cancel</v-btn
                  >
                  <v-btn
                    style="background-color: #1e1e1e; color: white; width: 30%"
                    v-on:click="signOut"
                    >Sign up</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import * as api from "@/api";
import Cookies from "js-cookie";
export default {
  name: "Register",
  data() {
    return {
      emailSignIn: "",
      emailSignOut: "",
      NameSignOut: "",
      emailComeFromSignOut: "",
      passwordSignIn: "",
      passwordSignOut1: "",
      passwordSignOut2: "",
      passwordComeFromSignOut: "",
      drawer: null,
      show1: false,
      show2: false,
      show3: false,
      dialog: false,
      dialogForWrongSignIn: false,
      dialogForWrongSignOut: false,
      rulesSignIn: {
        required: value => !!value || "Required.",
        min: v => v.length >= 1 || "Min 1 characters",
        emailMatch: () => "The email and password you entered don't match"
      },
      rulesSignOut1: {
        required: value => !!value || "Required.",
        min: v => v.length >= 1 || "Min 1 characters",
        emailMatch: () => "The email and password you entered don't match"
      },
      rulesSignOut2: {
        required: value => !!value || "Required.",
        min: v => v.length >= 1 || "Min 1 characters",
        emailMatch: () => "The email and password you entered don't match"
      },
      registerState: false,
      loginStateView: true,
      wrongSignIn: false,
      dialogForgoodSignUp: false,
    };
  },
  props: {
    isRegister: Boolean
  },
  methods: {
    closeSignUpSuccessDialog()
    {
      this.dialogForgoodSignUp = false;
      this.registerState = false;
      this.loginStateView = true;
    },
    sendDataToParent(value) {
      this.$emit("updateState", value);
    },
    gotoRegisterPage() {
      this.registerState = true;
      this.loginStateView = false;
    },

    backToSignInPage() {
      this.registerState = false;
      this.loginStateView = true;
    },

    async goToHomepage() {
      //fonction a revoir comment amelioer
      if (
        (this.checkEmail(this.emailSignIn) === true) &
        (this.passwordSignIn !== "")
      ) {
        let Params = new URLSearchParams({
          email: this.emailSignIn,
          password: this.passwordSignIn
        });
        let value = await api.LoginApi(Params);
        if (value !== undefined) {
          this.sendDataToParent(true);
          Cookies.set("tokenNewLogin", value.token, { expires: 7});
          Cookies.set("idUser", value.id)
          console.log("idUser", value.token)
          console.log(value.id);
          //Cookies.set("emailAddress", this.emailSignIn, { expires: 7});

          this.$router.push({ name: "Home" });
        } else {

        }
      } else {
        this.dialogForWrongSignIn = true;
        this.loginStateView = false;
      }
    },

    async signOut() {
      if (
        (this.passwordSignOut1 === this.passwordSignOut2) &
        (this.passwordSignOut1 !== "") &
        (this.passwordSignOut2 !== "") &
        (this.checkEmail(this.emailSignOut) === true) & this.NameSignOut !== ""
      ) {

        let ParamsSignUp = new URLSearchParams({
          name: this.NameSignOut,
          email: this.emailSignOut,
          password: this.passwordSignOut2
        });
        let value = await api.SignUp(ParamsSignUp);
        if (value !== undefined) {
          this.dialogForgoodSignUp = true;
          this.passwordComeFromSignOut = this.passwordSignOut1;
        }
      } else {
        this.registerState = false;
        this.dialogForWrongSignOut = true;

      }
    },
    closeSignOutfailedFrame() {
      this.dialogForWrongSignOut = false;
      this.registerState = true;
      this.passwordSignOut1 = "";
      this.passwordSignOut2 = "";
    },
    checkEmail(email) {
      // eslint-disable-next-line no-useless-escape
      let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    displayLoginView() {
      this.dialogForWrongSignIn = false;
      this.loginStateView = true;
      window.location.reload();
    }
  },
  mounted() {
    Cookies.remove("isRegisterCookies");
   this.sendDataToParent(false);
  }
};
</script>

<style scoped>
.ml4 {
  position: relative;
  font-weight: 900;
  font-size: 4.5em;
}
.ml4 .letters {
  position: absolute;
  margin: auto;
  left: 0;
  top: 0.3em;
  right: 0;
  opacity: 0;
}
</style>
