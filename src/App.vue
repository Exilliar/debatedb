<template>
  <v-app>
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
}
</script>
