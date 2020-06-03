<template>
  <v-app>
    <Header :version="version" :user="user" />
    <v-content>
      <InputModal />
      <!-- Check that the SDK client is not currently loading before accessing its methods -->
      <div v-if="!loading">
        <!-- show login when not authenticated -->
        <button v-if="!isAuthenticated" @click="login">Log in</button>
        <!-- show logout when authenticated -->
        <button v-if="isAuthenticated" @click="logout">Log out</button>
      </div>
      Loading: {{ loading }}
      <br />
      Authenticated: {{ isAuthenticated }}
      <!-- <Button text="refresh" :onClick="refresh" /> -->
      <!-- <Button text="test" :onClick="login" /> -->
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import Header from "./components/TheHeader.vue";
import Button from "./components/Button.vue";

import InputModal from "./components/modal/InputModal.vue";

import User from "./models/User";

@Component({
  components: {
    Header,
    InputModal,
    Button,
  },
})
export default class App extends Vue {
  user: User = {
    name: "userName",
  };

  version = "0.0.1";

  isAuthenticated = this.$auth.isAuthenticated;
  // loading = this.$auth.loading;
  get loading() {
    return this.$auth.loading;
  }

  // refresh() {
  //   console.log("auth loading:", this.$auth.loading);
  //   this.loading = this.$auth.loading;
  // }

  mounted() {
    console.log(this.$auth.isAuthenticated);
    // setInterval(() => {
    //   console.log("loading true:", this.$auth.loading);
    //   console.log("loading:", this.loading);
    // }, 2000);
  }

  login() {
    this.$auth.loginWithRedirect();
  }
  // Log the user out
  logout() {
    this.$auth.logout({
      returnTo: window.location.origin,
    });
  }
}
</script>
