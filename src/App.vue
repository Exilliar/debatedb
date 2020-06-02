<template>
  <v-app>
    <!-- Check that the SDK client is not currently loading before accessing its methods -->
    <div v-if="!$auth.loading">
      <!-- show login when not authenticated -->
      <button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
      <!-- show logout when authenticated -->
      <button v-if="$auth.isAuthenticated" @click="logout">Log out</button>
    </div>
    <Header :version="version" :user="user" />
    <v-content>
      <InputModal />
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import Header from "./components/TheHeader.vue";

import InputModal from "./components/modal/InputModal.vue";

import User from "./models/User";

@Component({
  components: {
    Header,
    InputModal,
  },
})
export default class App extends Vue {
  user: User = {
    name: "userName",
  };

  version = "0.0.1";

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
